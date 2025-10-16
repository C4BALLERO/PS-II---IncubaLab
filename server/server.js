// server/server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Rutas
import usuarioRoutes from "./src/routes/usuarios.js";
import usersRoutes from "./src/routes/users.js"; // Rutas originales de tu compañero
import proyectosRoutes from "./src/routes/proyecto.js"; // 👈 agregado desde tu versión
import twoFARoutes from "./src/routes/2fa.js";


dotenv.config();

const app = express();

// -------------------------------------------------------------
// 🌐 CONFIGURACIÓN CORS Y MIDDLEWARE
// -------------------------------------------------------------
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173", // 👈 agregado: CORS fijo al frontend Vite
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(express.json());

// -------------------------------------------------------------
// 📁 CONFIGURAR STATIC /uploads PARA IMÁGENES
// -------------------------------------------------------------
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use("/uploads", express.static(path.join(__dirname, "uploads"))); // 👈 agregado

// -------------------------------------------------------------
// 💾 POOL DE CONEXIÓN MYSQL
// -------------------------------------------------------------
const db = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "incuvalab",
  waitForConnections: true,
  connectionLimit: 10,
});

// -------------------------------------------------------------
// 🧪 RUTA DE PRUEBA PARA CONEXIÓN A DB
// -------------------------------------------------------------
app.get("/test-db", async (req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 + 1 AS result");
    res.json({ resultado: rows[0].result });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// -------------------------------------------------------------
// 🔗 ENDPOINTS BASE
// -------------------------------------------------------------
app.get("/", (_req, res) => {
  res.send("✅ API de Incuvalab activa. Usa POST /proyectos");
});

app.get("/health", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json({ ok: rows?.[0]?.ok === 1 });
  } catch (e) {
    res.status(500).json({ ok: false, error: "DB no disponible" });
  }
});

// -------------------------------------------------------------
// 💡 RUTA DIRECTA PARA CREAR PROYECTOS (del server original)
// -------------------------------------------------------------
app.post("/proyectos", async (req, res) => {
  const { titulo, descripcionBreve, descripcionGeneral } = req.body;

  if (!titulo || !descripcionGeneral) {
    return res.status(400).json({
      success: false,
      message: "⚠️ El Título y la Descripción General son obligatorios",
    });
  }

  const idCreador = 1;
  const contribLimite = 100;

  try {
    const sql = `
      INSERT INTO proyecto
        (Nombre, DescripcionCorta, DescripcionGeneral, IdCreador, ContribuyenteLimite)
      VALUES (?, ?, ?, ?, ?)
    `;
    const params = [
      titulo,
      descripcionBreve || null,
      descripcionGeneral,
      idCreador,
      contribLimite,
    ];

    const [result] = await db.execute(sql, params);
    return res.json({ success: true, id: result.insertId });
  } catch (err) {
    console.error("❌ Error al insertar:", err.code || err.message);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "El IdCreador no existe en la tabla usuario",
      });
    }

    return res.status(500).json({
      success: false,
      message: "❌ Error en el servidor al insertar el proyecto",
    });
  }
});

// -------------------------------------------------------------
// 🚀 INICIAR SERVIDOR
// -------------------------------------------------------------
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// Cerrar conexión al salir
process.on("SIGINT", async () => {
  try {
    await db.end();
  } catch {}
  process.exit(0);
});

// -------------------------------------------------------------
// 🧩 RUTAS EXTERNAS
// -------------------------------------------------------------
app.use("/api/usuarios", usuarioRoutes); // fusionado con tu ruta extendida (multer, editar, etc.)
app.use("/users", usersRoutes);
app.use("/api/proyectos", proyectosRoutes); 
app.use("/api/2fa", twoFARoutes);// 👈 agregada desde tu versión
