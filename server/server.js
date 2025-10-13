// server/server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import usuarioRoutes from "./src/routes/usuarios.js";
import usersRoutes from "./src/routes/users.js"; // 👈 nuevo import

dotenv.config();

const app = express();

app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);
app.use(express.json());

// Pool MySQL
const db = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "incuvalab",
  waitForConnections: true,
  connectionLimit: 10,
});

// Endpoints
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

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

process.on("SIGINT", async () => {
  try {
    await db.end();
  } catch {}
  process.exit(0);
});

app.use("/api/usuarios", usuarioRoutes);
app.use("/users", usersRoutes); // 👈 nueva línea
