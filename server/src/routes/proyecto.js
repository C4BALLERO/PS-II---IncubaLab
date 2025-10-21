import express from "express";
import multer from "multer";
import path from "path";
import { pool } from "../db.js";

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
// Obtener todos los proyectos activos (para explorar)
// =========================
router.get("/todos", async (req, res) => {
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
      p.FechaFin,
      u.Nombre AS NombreCreador,
      u.PrimerApellido AS ApellidoCreador
    FROM Proyecto p
    INNER JOIN Usuario u ON p.IdCreador = u.IdUser
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
// Obtener proyectos eliminados (EstadoActivo = FALSE)
// =========================
router.get("/removidos", async (req, res) => {
  const sql = `
    SELECT 
      p.IdProyecto,
      p.Nombre AS Titulo,
      p.DescripcionCorta,
      p.ImagenPrincipal,
      p.EstadoAprobacion,
      p.FechaInicio,
      p.FechaFin,
      u.Nombre AS NombreCreador,
      u.PrimerApellido AS ApellidoCreador
    FROM Proyecto p
    INNER JOIN Usuario u ON p.IdCreador = u.IdUser
    WHERE p.EstadoActivo = FALSE
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
// Restaurar proyecto eliminado (EstadoActivo = TRUE)
// =========================
router.put("/restaurar/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE Proyecto SET EstadoActivo = TRUE WHERE IdProyecto = ?";
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json({ message: "Proyecto restaurado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Eliminar proyecto físicamente
// =========================
router.delete("/borrar/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM Proyecto WHERE IdProyecto = ?";
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json({ message: "Proyecto eliminado permanentemente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// =========================
// Otros endpoints: seguir, crear, editar, eliminar lógico
// =========================

// Dar "me gusta"
router.post("/seguir", async (req, res) => {
  const { IdUser, IdProyecto } = req.body;
  if (!IdUser || !IdProyecto) return res.status(400).json({ error: "Datos incompletos" });

  const sql = "INSERT INTO Usuario_Proyecto (IdUser, IdProyecto) VALUES (?, ?)";
  try {
    await pool.query(sql, [IdUser, IdProyecto]);
    res.json({ message: "Me gusta registrado correctamente" });
  } catch (err) {
    if (err.code === "ER_DUP_ENTRY") return res.status(400).json({ error: "Ya diste me gusta a este proyecto" });
    res.status(500).json({ error: err.message });
  }
});

// Quitar "me gusta"
router.delete("/seguir", async (req, res) => {
  const { IdUser, IdProyecto } = req.body;
  if (!IdUser || !IdProyecto) return res.status(400).json({ error: "Datos incompletos" });

  const sql = "DELETE FROM Usuario_Proyecto WHERE IdUser = ? AND IdProyecto = ?";
  try {
    await pool.query(sql, [IdUser, IdProyecto]);
    res.json({ message: "Me gusta eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Crear proyecto
router.post("/crear", upload.single("ImagenPrincipal"), async (req, res) => {
  const { Nombre, DescripcionCorta, DescripcionGeneral, FechaInicio, FechaFin, Video, IdCreador } = req.body;

  if (!Nombre || !DescripcionCorta || !DescripcionGeneral || !IdCreador)
    return res.status(400).json({ error: "Todos los campos obligatorios deben completarse" });

  if (FechaInicio && FechaFin && new Date(FechaInicio) > new Date(FechaFin))
    return res.status(400).json({ error: "La fecha de inicio no puede ser posterior a la fecha de fin" });

  const ImagenPrincipal = req.file ? "/uploads/" + req.file.filename : null;

  const sql = `
    INSERT INTO Proyecto 
    (Nombre, DescripcionCorta, DescripcionGeneral, FechaInicio, FechaFin, Video, ImagenPrincipal, IdCreador, ContribuyenteLimite, EstadoActivo, EstadoAprobacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, 0, TRUE, 'Activo')
  `;
  try {
    const [result] = await pool.query(sql, [Nombre, DescripcionCorta, DescripcionGeneral, FechaInicio, FechaFin, Video, ImagenPrincipal, IdCreador]);
    res.json({ message: "Proyecto creado correctamente", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Editar proyecto
// Editar proyecto
// Editar proyecto con historial
router.put("/editar/:id", upload.single("ImagenPrincipal"), async (req, res) => {
  const { id } = req.params;
  const { Nombre, DescripcionCorta, DescripcionGeneral, FechaInicio, FechaFin, Video, ModificadoPor } = req.body;

  if (!Nombre || !DescripcionGeneral)
    return res.status(400).json({ error: "Nombre y descripción general son obligatorios" });

  if (FechaInicio && FechaFin && new Date(FechaInicio) > new Date(FechaFin))
    return res.status(400).json({ error: "La fecha de inicio no puede ser posterior a la fecha de fin" });

  const ImagenPrincipal = req.file ? "/uploads/" + req.file.filename : null;

  // Construir SET dinámico sin FechaActualizacion
  const campos = [
    "Nombre = ?",
    "DescripcionCorta = ?",
    "DescripcionGeneral = ?",
    "FechaInicio = ?",
    "FechaFin = ?",
    "Video = ?"
  ];
  const params = [Nombre, DescripcionCorta, DescripcionGeneral, FechaInicio, FechaFin, Video];

  if (ImagenPrincipal) {
    campos.push("ImagenPrincipal = ?");
    params.push(ImagenPrincipal);
  }

  const sqlUpdate = `UPDATE Proyecto SET ${campos.join(", ")} WHERE IdProyecto = ?;`;
  params.push(id);

  const sqlHistorial = `
    INSERT INTO Proyecto_Historial 
      (IdProyecto, FechaModificacion, ModificadoPor, TipoCambio)
    VALUES (?, NOW(), ?, 'Update')
  `;

  try {
    const [result] = await pool.query(sqlUpdate, params);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Proyecto no encontrado" });

    await pool.query(sqlHistorial, [id, ModificadoPor || null]);
    res.json({ message: "Proyecto actualizado correctamente y registrado en historial" });
  } catch (err) {
    console.error(err); // loguea el error completo para debugging
    res.status(500).json({ error: err.message });
  }
});


// Obtener proyecto por Id
router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT 
      p.IdProyecto,
      p.Nombre AS Titulo,
      p.DescripcionCorta,
      p.DescripcionGeneral,
      p.FechaInicio,
      p.FechaFin,
      p.Video,
      p.ImagenPrincipal
    FROM Proyecto p
    WHERE p.IdProyecto = ?;
  `;
  try {
    const [results] = await pool.query(sql, [id]);
    if (results.length === 0) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json(results[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// Eliminar proyecto (lógico)
router.delete("/eliminar/:id", async (req, res) => {
  const { id } = req.params;
  const sql = "UPDATE Proyecto SET EstadoActivo = FALSE WHERE IdProyecto = ?";
  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Proyecto no encontrado" });
    res.json({ message: "Proyecto eliminado correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get("/donados/:idUser", async (req, res) => {
  const { idUser } = req.params;

  const sql = `
    SELECT 
      p.IdProyecto,
      p.Nombre AS Titulo,
      p.DescripcionCorta,
      p.ImagenPrincipal,
      u.Nombre AS NombreCreador,
      u.PrimerApellido AS ApellidoCreador
    FROM Proyecto p
    INNER JOIN Usuario_Proyecto up ON p.IdProyecto = up.IdProyecto
    INNER JOIN Usuario u ON p.IdCreador = u.IdUser
    WHERE up.IdUser = ?
    ORDER BY p.FechaInicio DESC
  `;

  try {
    const [results] = await pool.query(sql, [idUser]);
    res.json(results);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
export default router;
