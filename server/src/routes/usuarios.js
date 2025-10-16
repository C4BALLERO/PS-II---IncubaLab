import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import path from "path";
import multer from "multer";
import speakeasy from "speakeasy"; 
import Usuario from "../models/usuario.js";

const router = express.Router();

// 🧩 Multer para subir imágenes
const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname));
  },
});
const upload = multer({ storage });

// 🧍 Registro
router.post("/", (req, res) => {
  const { firstName, lastName, email, password } = req.body;
  const nuevoUsuario = {
    NombreUsuario: email.split("@")[0],
    Nombre: firstName,
    PrimerApellido: lastName,
    SegundoApellido: null,
    ImagenPerfil: null,
    Correo: email,
    Contrasenia: password,
    CodigoSecreto: null,
    DobleFactorActivo: 0,
    Telefono: null,
    Estado: 1,
    Id_Rol: 1,
  };

  Usuario.create(nuevoUsuario, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en el registro" });
    res.json({ id: results.insertId, ...nuevoUsuario });
  });
});

// 🔐 Login (ya está funcional, lo dejamos intacto)
router.post("/login", (req, res) => {
  const { email, password } = req.body;
  Usuario.getByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en servidor" });
    if (!results.length) return res.status(401).json({ error: "Usuario no encontrado" });
    const user = results[0];
    if (user.Contrasenia !== password) return res.status(401).json({ error: "Contraseña incorrecta" });
    user.DobleFactorActivo = Boolean(user.DobleFactorActivo);
    res.json({ message: "Login exitoso", user });
  });
});

// 🔐 Verificación 2FA
router.post("/verify-2fa", (req, res) => {
  const { userId, token } = req.body; // ⚠️ cambiado a "token"

  if (!userId || !token)
    return res.status(400).json({ error: "Faltan datos obligatorios" });

  Usuario.getById(userId, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en servidor" });
    if (!results.length) return res.status(404).json({ error: "Usuario no encontrado" });

    const user = results[0];
    if (!user.CodigoSecreto)
      return res.status(400).json({ error: "Usuario no tiene 2FA activo" });

    const verified = speakeasy.totp.verify({
      secret: user.CodigoSecreto,
      encoding: "base32",
      token,
      window: 1,
    });

    if (!verified) return res.status(400).json({ error: "Código incorrecto" });

    res.json({ success: true, message: "Código verificado" });
  });
});

// 🔹 Desactivar 2FA
router.post("/disable-2fa", (req, res) => {
  const { userId } = req.body;
  if (!userId) return res.status(400).json({ error: "Faltan datos obligatorios" });

  Usuario.update(userId, { DobleFactorActivo: 0, CodigoSecreto: null }, (err) => {
    if (err) return res.status(500).json({ error: "Error desactivando 2FA" });
    res.json({ success: true, message: "Doble factor desactivado correctamente" });
  });
});

// 🔹 Estado 2FA
router.get("/2fa-status/:userId", (req, res) => {
  const { userId } = req.params;

  Usuario.getById(userId, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en servidor" });
    if (!results.length) return res.status(404).json({ error: "Usuario no encontrado" });
    res.json({ isActive: Boolean(results[0].DobleFactorActivo) });
  });
});

// 🔄 Recuperar contraseña (sin cambios)
const passwordResetTokens = {};
router.post("/send-token", async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(400).json({ error: "Correo obligatorio" });

  Usuario.getByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en servidor" });
    if (!results.length) return res.status(404).json({ error: "Usuario no encontrado" });

    const token = crypto.randomBytes(3).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000;
    passwordResetTokens[email] = { token, expiresAt, validated: false };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: { user: "landesl502@gmail.com", pass: "perw nbtu xrqc vqps" },
    });

    const mailOptions = {
      from: "Soporte IncubaLab <landesl502@gmail.com>",
      to: email,
      subject: "Código para restablecer tu contraseña",
      html: `<div style="text-align:center;">
              <h2>Código de recuperación</h2>
              <div style="font-size:32px;font-weight:bold;color:#d9534f;margin:20px 0;">${token}</div>
              <p>Expira en 15 minutos.</p>
            </div>`,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) return res.status(500).json({ error: "Error enviando correo" });
      res.json({ success: true, message: "Código enviado al correo" });
    });
  });
});

router.post("/validate-token", (req, res) => {
  const { email, token } = req.body;
  const stored = passwordResetTokens[email];
  if (!stored) return res.status(400).json({ error: "Token no generado" });
  if (stored.token !== token) return res.status(400).json({ error: "Token inválido" });
  if (Date.now() > stored.expiresAt) return res.status(400).json({ error: "Token expirado" });

  stored.validated = true;
  res.json({ success: true, message: "Token válido" });
});

router.post("/reset-password", (req, res) => {
  const { email, token, newPassword } = req.body;
  const stored = passwordResetTokens[email];
  if (!stored) return res.status(400).json({ error: "Token no generado" });
  if (!stored.validated) return res.status(400).json({ error: "Token no validado aún" });
  if (stored.token !== token) return res.status(400).json({ error: "Token inválido" });
  if (Date.now() > stored.expiresAt) return res.status(400).json({ error: "Token expirado" });

  Usuario.updateByEmail(email, { Contrasenia: newPassword }, (err) => {
    if (err) return res.status(500).json({ error: "Error actualizando contraseña" });
    delete passwordResetTokens[email];
    res.json({ success: true, message: "Contraseña actualizada correctamente" });
  });
});

// ✏️ Editar perfil
router.put("/editar/:id", upload.single("imagen"), (req, res) => {
  const { id } = req.params;
  const data = req.body;
  if (req.file) data.ImagenPerfil = "/uploads/" + req.file.filename;

  Usuario.update(id, data, (err) => {
    if (err) return res.status(500).json({ error: "Error al actualizar usuario" });
    res.json({ message: "Usuario actualizado", data });
  });
});

export default router;
