// server/src/db.js
import "dotenv/config";
import mysql from "mysql2/promise";

const {
  DB_HOST = "localhost",
  DB_USER = "root",
  DB_PASSWORD = "Alanes567",
  DB_NAME = "incuvalab",
  DB_PORT = 3306,
} = process.env;

export const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  port: Number(DB_PORT),
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

// prueba de conexión en arranque (útil para ver errores rápido)
export async function checkDb() {
  const [rows] = await pool.query("SELECT 1 AS ok");
  return rows[0]?.ok === 1;
}
