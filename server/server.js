// server/server.js
import express from "express";
import cors from "cors";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
import multer from "multer";
import path from "path";
import fs from "fs";

dotenv.config();

const app = express();

// --- Configuración CORS ---
app.use(
  cors({
    origin: process.env.CLIENT_ORIGIN || "*",
  })
);

// --- Middleware ---
app.use(express.json());

// --- Configurar carpeta de subida ---
const uploadDir = "./uploads";
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// --- Configurar almacenamiento de archivos ---
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    const uniqueName = Date.now() + "-" + file.originalname;
    cb(null, uniqueName);
  },
});

const upload = multer({ storage });

// --- Conexión MySQL ---
const db = await mysql.createPool({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT ? Number(process.env.DB_PORT) : 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "root",
  database: process.env.DB_NAME || "incuvalab",
  waitForConnections: true,
  connectionLimit: 10,
});

// --- Crear Proyecto (acepta JSON o archivos) ---
app.post(
  "/proyectos",
  upload.fields([
    { name: "imagen", maxCount: 1 },
    { name: "producto", maxCount: 1 },
  ]),
  async (req, res) => {
    try {
      // ✅ Si no vienen archivos, req.files será undefined
      const imagenFile = req.files?.["imagen"]?.[0] || null;
      const productoFile = req.files?.["producto"]?.[0] || null;

      // ✅ Si el frontend mandó JSON, los datos están en req.body
      const { titulo, descripcionBreve, descripcionGeneral, video } = req.body;

      if (!titulo || !descripcionGeneral) {
        return res.status(400).json({
          success: false,
          message: "⚠️ El Título y la Descripción General son obligatorios",
        });
      }

      const idCreador = 1; // debe existir en tabla usuario
      const contribLimite = 100;

      const sql = `
        INSERT INTO proyecto
        (Nombre, DescripcionCorta, DescripcionGeneral, ImagenPrincipal, ProductoFinal, Video, IdCreador, ContribuyenteLimite)
        VALUES (?, ?, ?, ?, ?, ?, ?, ?)
      `;

      const params = [
        titulo,
        descripcionBreve || null,
        descripcionGeneral,
        imagenFile ? imagenFile.filename : null,
        productoFile ? productoFile.filename : null,
        video || null,
        idCreador,
        contribLimite,
      ];

      const [result] = await db.execute(sql, params);
      res.json({ success: true, id: result.insertId });
    } catch (err) {
      console.error("❌ Error al insertar:", err);
      res.status(500).json({
        success: false,
        message: "❌ Error en el servidor al insertar el proyecto",
      });
    }
  }
);

// --- Health check ---
app.get("/health", async (_req, res) => {
  try {
    const [rows] = await db.query("SELECT 1 AS ok");
    res.json({ ok: rows?.[0]?.ok === 1 });
  } catch (error) {
    res.status(500).json({ ok: false, error: "DB no disponible" });
  }
});

// --- Servir archivos subidos ---
app.use("/uploads", express.static(path.resolve("./uploads")));

// --- Iniciar servidor ---
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
});

// --- Cierre limpio ---
process.on("SIGINT", async () => {
  try {
    await db.end();
  } catch {}
  process.exit(0);
});
