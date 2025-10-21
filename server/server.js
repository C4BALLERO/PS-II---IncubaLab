// server/server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";

// Rutas
import usuarioRoutes from "./src/routes/usuarios.js";
import usersRoutes from "./src/routes/users.js";
import proyectosRoutes from "./src/routes/proyecto.js";
import twoFARoutes from "./src/routes/2fa.js";

dotenv.config();

const app = express();

// -------------------------------------------------------------
// 🌐 CONFIGURACIÓN CORS Y MIDDLEWARE
// -------------------------------------------------------------
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "http://localhost:5173",
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
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

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
// 🧪 FUNCIÓN checkDb() ORIGINAL DEL INDEX
// -------------------------------------------------------------
const checkDb = async () => {
  try {
    const [rows] = await db.query("SELECT 1");
    return rows.length > 0;
  } catch (err) {
    console.error("Error en DB:", err.message);
    return false;
  }
};

// -------------------------------------------------------------
// 🔗 ENDPOINTS BASE
// -------------------------------------------------------------
app.get("/", (_req, res) => res.send("API Incuvalab viva"));

// Ruta para probar conexión DB como en index.js
app.get("/check-db", async (_req, res) => {
  const ok = await checkDb();
  res.json({ dbOk: ok });
});

// -------------------------------------------------------------
// 💡 RUTA DIRECTA PARA CREAR PROYECTOS
// -------------------------------------------------------------
app.post("/proyectos", async (req, res) => {
  const { titulo, descripcionBreve, descripcionGeneral } = req.body;

  if (!titulo || !descripcionGeneral) {
    return res.status(400).json({
      success: false,
      message: "El Título y la Descripción General son obligatorios",
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
    console.error("Error al insertar:", err.code || err.message);

    if (err.code === "ER_NO_REFERENCED_ROW_2") {
      return res.status(400).json({
        success: false,
        message: "El IdCreador no existe en la tabla usuario",
      });
    }

    return res.status(500).json({
      success: false,
      message: "Error en el servidor al insertar el proyecto",
    });
  }
});

// -------------------------------------------------------------
// 🧩 RUTAS EXTERNAS
// -------------------------------------------------------------
app.use("/api/usuarios", usuarioRoutes);
app.use("/api/users", usersRoutes);
app.use("/api/proyectos", proyectosRoutes);
app.use("/api/2fa", twoFARoutes);

// -------------------------------------------------------------
// 🚀 INICIAR SERVIDOR (ahora usa checkDb para validar DB antes de escuchar)
// -------------------------------------------------------------
const PORT = process.env.PORT || 4000;
const start = async () => {
  try {
    const ok = await checkDb();
    console.log(ok ? "DB OK" : "DB check failed");
    app.listen(PORT, () => console.log(`API escuchando en http://localhost:${PORT}`));
  } catch (e) {
    console.error("Error al iniciar:", e);
    process.exit(1);
  }
};
start();

// Cerrar conexión al salir
process.on("SIGINT", async () => {
  try { await db.end(); } catch {}
  process.exit(0);
});
