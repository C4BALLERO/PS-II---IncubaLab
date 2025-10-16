import express from "express";
import multer from "multer";
import path from "path";
import { pool } from "../db.js"; // ✅ Usamos el pool de tu compañero

const router = express.Router();

// =========================
// Configuración de multer para subida de imágenes
// =========================
const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) =>
    cb(null, Date.now() + path.extname(file.originalname)),
});
const upload = multer({ storage });

// =========================
// Obtener todos los proyectos activos
// =========================
router.get("/", async (req, res) => {
  const sql = `
    SELECT 
      p.IdProyecto,
      p.Nombre AS Titulo,
      p.DescripcionCorta,
      p.ImagenPrincipal,
      p.EstadoAprobacion,
      p.FechaInicio,
      p.FechaFin,
      u.IdUser AS IdCreador,
      u.Nombre AS NombreCreador,
      u.PrimerApellido AS ApellidoCreador,
      u.ImagenPerfil AS ImagenCreador
    FROM Proyecto p
    INNER JOIN Usuario u ON p.IdCreador = u.IdUser
    WHERE p.EstadoActivo = TRUE AND p.EstadoAprobacion = 'Activo'
    ORDER BY p.FechaInicio DESC;
  `;
  try {
    const [results] = await pool.query(sql);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Obtener proyectos “donados” por un usuario
// =========================
router.get("/donados/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const sql = `
    SELECT 
      up.IdProyecto,
      p.Nombre AS Titulo,
      p.DescripcionCorta,
      p.ImagenPrincipal,
      u.Nombre AS NombreCreador,
      u.PrimerApellido AS ApellidoCreador,
      u.ImagenPerfil AS ImagenCreador,
      up.FechaAporte AS FechaMeGusta
    FROM Usuario_Proyecto up
    INNER JOIN Proyecto p ON up.IdProyecto = p.IdProyecto
    INNER JOIN Usuario u ON p.IdCreador = u.IdUser
    WHERE up.IdUser = ? AND p.EstadoActivo = TRUE;
  `;
  try {
    const [results] = await pool.query(sql, [idUser]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Obtener proyectos creados por un usuario
// =========================
router.get("/creados/:idUser", async (req, res) => {
  const { idUser } = req.params;
  const sql = `
    SELECT 
      p.IdProyecto,
      p.Nombre AS Titulo,
      p.DescripcionCorta,
      p.ImagenPrincipal,
      p.EstadoAprobacion,
      p.FechaInicio,
      p.FechaFin
    FROM Proyecto p
    WHERE p.IdCreador = ? AND p.EstadoActivo = TRUE
    ORDER BY p.FechaInicio DESC;
  `;
  try {
    const [results] = await pool.query(sql, [idUser]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Dar "me gusta" (seguir proyecto)
// =========================
router.post("/seguir", async (req, res) => {
  const { IdUser, IdProyecto } = req.body;
  if (!IdUser || !IdProyecto) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const sql = "INSERT INTO Usuario_Proyecto (IdUser, IdProyecto) VALUES (?, ?)";
  try {
    await pool.query(sql, [IdUser, IdProyecto]);
    res.json({ message: "Me gusta registrado correctamente" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") {
      return res.status(400).json({ error: "Ya diste me gusta a este proyecto" });
    }
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Quitar "me gusta"
// =========================
router.delete("/seguir", async (req, res) => {
  const { IdUser, IdProyecto } = req.body;
  if (!IdUser || !IdProyecto) {
    return res.status(400).json({ error: "Datos incompletos" });
  }

  const sql = "DELETE FROM Usuario_Proyecto WHERE IdUser = ? AND IdProyecto = ?";
  try {
    await pool.query(sql, [IdUser, IdProyecto]);
    res.json({ message: "Me gusta eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Crear proyecto
// =========================
router.post("/crear", upload.single("ImagenPrincipal"), async (req, res) => {
  const {
    Nombre,
    DescripcionCorta,
    DescripcionGeneral,
    FechaInicio,
    FechaFin,
    Video,
    IdCreador,
  } = req.body;

  if (!Nombre || !DescripcionCorta || !DescripcionGeneral || !IdCreador) {
    return res.status(400).json({ error: "Todos los campos obligatorios deben completarse" });
  }

  if (FechaInicio && FechaFin && new Date(FechaInicio) > new Date(FechaFin)) {
    return res.status(400).json({ error: "La fecha de inicio no puede ser posterior a la fecha de fin" });
  }

  const ImagenPrincipal = req.file ? "/uploads/" + req.file.filename : null;

  const sql = `
    INSERT INTO Proyecto 
    (Nombre, DescripcionCorta, DescripcionGeneral, FechaInicio, FechaFin, Video, ImagenPrincipal, IdCreador, ContribuyenteLimite, EstadoActivo, EstadoAprobacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, TRUE, 'Activo')
  `;

  try {
    const [result] = await pool.query(sql, [
      Nombre,
      DescripcionCorta,
      DescripcionGeneral,
      FechaInicio,
      FechaFin,
      Video,
      ImagenPrincipal,
      IdCreador,
    ]);
    res.json({ message: "Proyecto creado correctamente", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

export default router;
