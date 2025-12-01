// server/src/controllers/users.controller.js
import { pool } from "../db.js";
import bcrypt from "bcrypt"; 

/* LISTAR */
export async function getUsers(req, res) {
  try {
    const includeDeleted =
      req.query.includeDeleted === "1" || req.query.includeDeleted === "true";

    const where = includeDeleted ? "" : "WHERE Estado = 1";

    const sql = `
      SELECT
        IdUser,
        NombreUsuario,
        Nombre,
        PrimerApellido,
        SegundoApellido,
        ImagenPerfil,
        Correo,
        Telefono,
        Estado,
        Id_Rol,
        FechaCreacion
      FROM Usuario
      ${where}
      ORDER BY IdUser DESC
    `;
    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (e) {
    console.error("❌ getUsers:", e);
    res.status(500).json({ error: e.message });
  }
}

/* OBTENER POR ID */
export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `
      SELECT
        IdUser,
        NombreUsuario,
        Nombre,
        PrimerApellido,
        SegundoApellido,
        ImagenPerfil,
        Correo,
        Telefono,
        Estado,
        Id_Rol,
        FechaCreacion
      FROM Usuario
      WHERE IdUser = ?
    `,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (e) {
    console.error("❌ getUserById:", e);
    res.status(500).json({ error: e.message });
  }
}

/* CREAR */
export async function createUser(req, res) {
  try {
    const {
      NombreUsuario,
      Nombre,
      PrimerApellido,
      SegundoApellido = null,
      ImagenPerfil = null,
      Correo,
      Contrasenia = "",
      Telefono = null,
      Id_Rol = 2,
      Estado = 1,
    } = req.body;

    //Encriptar contraseña antes de guardar
    const hashedPassword = await bcrypt.hash(Contrasenia, 10);

    const [result] = await pool.query(
      `
      INSERT INTO Usuario
        (NombreUsuario, Nombre, PrimerApellido, SegundoApellido, ImagenPerfil,
         Correo, Contrasenia, Telefono, Estado, Id_Rol)
      VALUES (?,?,?,?,?,?,?,?,?,?)
    `,
      [
        NombreUsuario,
        Nombre,
        PrimerApellido,
        SegundoApellido,
        ImagenPerfil,
        Correo,
        hashedPassword, //Guardar la contraseña encriptada
        Telefono,
        Estado,
        Id_Rol,
      ]
    );

    res.status(201).json({ IdUser: result.insertId });
  } catch (e) {
    console.error("❌ createUser:", e);
    res.status(500).json({ error: e.message });
  }
}

/* ACTUALIZAR */
export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const body = { ...req.body };

    const fields = [
      "NombreUsuario",
      "Nombre",
      "PrimerApellido",
      "SegundoApellido",
      "ImagenPerfil",
      "Correo",
      "Contrasenia",
      "Telefono",
      "Estado",
      "Id_Rol",
    ];

    //Si se proporciona una contraseña, encriptarla
    if (body.Contrasenia) {
      body.Contrasenia = await bcrypt.hash(body.Contrasenia, 10);
    }

    const sets = [];
    const values = [];
    for (const f of fields) {
      if (Object.prototype.hasOwnProperty.call(body, f)) {
        if (f === "Contrasenia" && !body[f]) continue;
        sets.push(`${f} = ?`);
        values.push(body[f]);
      }
    }

    if (sets.length === 0) return res.status(400).json({ error: "Nada para actualizar" });

    values.push(id);
    const [result] = await pool.query(
      `UPDATE Usuario SET ${sets.join(", ")} WHERE IdUser = ?`,
      values
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (e) {
    console.error("❌ updateUser:", e);
    res.status(500).json({ error: e.message });
  }
}

/* ELIMINACIÓN LÓGICA */
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `UPDATE Usuario SET Estado = 0 WHERE IdUser = ? AND Estado <> 0`,
      [id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado o ya inactivo" });
    res.json({ ok: true });
  } catch (e) {
    console.error("❌ deleteUser:", e);
    res.status(500).json({ error: e.message });
  }
}

/* RESTAURAR */
export async function restoreUser(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `UPDATE Usuario SET Estado = 1 WHERE IdUser = ? AND Estado = 0`,
      [id]
    );
    if (result.affectedRows === 0) return res.status(404).json({ error: "No encontrado o ya activo" });
    res.json({ ok: true });
  } catch (e) {
    console.error("❌ restoreUser:", e);
    res.status(500).json({ error: e.message });
  }
}
