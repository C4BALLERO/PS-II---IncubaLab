import { pool } from "../db.js";

// LISTAR (con soporte para includeDeleted)
export async function getUsers(req, res) {
  try {
    const includeDeleted =
      req.query.includeDeleted === "1" || req.query.includeDeleted === "true";

    const sql = `
      SELECT 
        IdUser, NombreUsuario, Nombre, PrimerApellido, ImagenPerfil, Correo, 
        Id_Rol, FechaCreacion, FechaModificacion, Eliminado, FechaEliminacion
      FROM Usuario
      ${includeDeleted ? "" : "WHERE Eliminado = 0"}
      ORDER BY IdUser DESC
    `;

    const [rows] = await pool.query(sql);
    res.json(rows);
  } catch (e) {
    console.error("❌ Error en getUsers:", e);
    res.status(500).json({ error: e.message });
  }
}

export async function getUserById(req, res) {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT 
         IdUser, NombreUsuario, Nombre, PrimerApellido, ImagenPerfil, Correo, 
         Id_Rol, FechaCreacion, FechaModificacion, Eliminado, FechaEliminacion
       FROM Usuario
       WHERE IdUser = ?`,
      [id]
    );
    if (rows.length === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json(rows[0]);
  } catch (e) {
    console.error("❌ Error en getUserById:", e);
    res.status(500).json({ error: e.message });
  }
}

export async function createUser(req, res) {
  try {
    const {
      NombreUsuario,
      Nombre,
      Apellido,
      ImagenPerfil = null,
      Correo,
      Contrasenia = "", // por si no llega, evita NOT NULL
      Id_Rol = 3,
    } = req.body;

    const [result] = await pool.query(
      `INSERT INTO Usuario
       (NombreUsuario, Nombre, PrimerApellido, ImagenPerfil, Correo, Contrasenia, Id_Rol)
       VALUES (?,?,?,?,?,?,?)`,
      [
        NombreUsuario,
        Nombre,
        Apellido,
        ImagenPerfil,
        Correo,
        Contrasenia,
        Id_Rol,
      ]
    );
    res.status(201).json({ IdUser: result.insertId });
  } catch (e) {
    console.error("❌ Error en createUser:", e);
    res.status(500).json({ error: e.message });
  }
}

export async function updateUser(req, res) {
  try {
    const { id } = req.params;
    const fields = [
      "NombreUsuario",
      "Nombre",
      "PrimerApellido",
      "ImagenPerfil",
      "Correo",
      "Contrasenia",
      "Id_Rol",
    ];
    const sets = [];
    const values = [];

    for (const f of fields) {
      if (f in req.body) {
        sets.push(`${f} = ?`);
        values.push(req.body[f]);
      }
    }
    if (sets.length === 0)
      return res.status(400).json({ error: "Nada para actualizar" });

    values.push(id);
    const [result] = await pool.query(
      `UPDATE Usuario SET ${sets.join(", ")} WHERE IdUser = ?`,
      values
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (e) {
    console.error("❌ Error en updateUser:", e);
    res.status(500).json({ error: e.message });
  }
}

// ELIMINACIÓN LÓGICA
export async function deleteUser(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `UPDATE Usuario 
         SET Eliminado = 1, FechaEliminacion = NOW() 
       WHERE IdUser = ? AND Eliminado = 0`,
      [id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (e) {
    console.error("❌ Error en deleteUser:", e);
    res.status(500).json({ error: e.message });
  }
}

// RESTAURAR
export async function restoreUser(req, res) {
  try {
    const { id } = req.params;
    const [result] = await pool.query(
      `UPDATE Usuario 
         SET Eliminado = 0, FechaEliminacion = NULL 
       WHERE IdUser = ? AND Eliminado = 1`,
      [id]
    );
    if (result.affectedRows === 0)
      return res.status(404).json({ error: "No encontrado" });
    res.json({ ok: true });
  } catch (e) {
    console.error("❌ Error en restoreUser:", e);
    res.status(500).json({ error: e.message });
  }
}
