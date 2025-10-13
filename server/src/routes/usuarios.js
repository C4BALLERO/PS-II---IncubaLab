import express from "express";
import crypto from "crypto";
import nodemailer from "nodemailer";
import Usuario from "../models/usuario.js"; // asegúrate de que también sea ESM

const router = express.Router();

// -----------------------------
// Registro
// -----------------------------
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
    DobleFactorActivo: false,
    Telefono: null,
    Estado: true,
    Id_Rol: 1,
  };

  console.log("Insertando usuario:", nuevoUsuario);

  Usuario.create(nuevoUsuario, (err, results) => {
    if (err) {
      console.error("Error en creación:", err.sqlMessage);
      return res.status(500).json({ error: "Error en el registro" });
    }
    res.json({ id: results.insertId, ...nuevoUsuario });
  });
});

// -----------------------------
// Login
// -----------------------------
router.post("/login", (req, res) => {
  const { email, password } = req.body;

  Usuario.getByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en servidor" });

    if (results.length === 0)
      return res.status(401).json({ error: "Usuario no encontrado" });

    const user = results[0];

    if (user.Contrasenia !== password)
      return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({ message: "Login exitoso", user });
  });
});

// -----------------------------
// Recuperar contraseña
// -----------------------------
const passwordResetTokens = {};

// 1️⃣ Enviar token al correo
router.post("/send-token", (req, res) => {
  const { email } = req.body;

  if (!email) return res.status(400).json({ error: "Correo obligatorio" });

  Usuario.getByEmail(email, (err, results) => {
    if (err) return res.status(500).json({ error: "Error en servidor" });
    if (results.length === 0)
      return res.status(404).json({ error: "Usuario no encontrado" });

    const token = crypto.randomBytes(3).toString("hex");
    const expiresAt = Date.now() + 15 * 60 * 1000;

    passwordResetTokens[email] = { token, expiresAt, validated: false };

    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "landesl502@gmail.com",
        pass: "perw nbtu xrqc vqps",
      },
    });

    const mailOptions = {
      from: "Soporte IncubaLab <landesl502@gmail.com>",
      to: email,
      subject: "Código para restablecer tu contraseña",
      html: `
        <div style="text-align: center;">
          <h2>Código de recuperación</h2>
          <p>Usa este código para restablecer tu contraseña:</p>
          <div style="font-size: 32px; font-weight: bold; color: #d9534f; margin: 20px 0;">${token}</div>
          <p>Expira en 15 minutos.</p>
        </div>
      `,
    };

    transporter.sendMail(mailOptions, (error) => {
      if (error) {
        console.error("Error al enviar correo:", error);
        return res.status(500).json({ error: "Error enviando correo" });
      }
      res.json({ success: true, message: "Código enviado al correo" });
    });
  });
});

// 2️⃣ Validar token ingresado
router.post("/validate-token", (req, res) => {
  const { email, token } = req.body;

  const stored = passwordResetTokens[email];
  if (!stored) return res.status(400).json({ error: "Token no generado" });
  if (stored.token !== token)
    return res.status(400).json({ error: "Token inválido" });
  if (Date.now() > stored.expiresAt)
    return res.status(400).json({ error: "Token expirado" });

  stored.validated = true;
  res.json({ success: true, message: "Token válido" });
});

// 3️⃣ Actualizar contraseña
router.post("/reset-password", (req, res) => {
  const { email, token, newPassword } = req.body;

  const stored = passwordResetTokens[email];
  if (!stored) return res.status(400).json({ error: "Token no generado" });
  if (!stored.validated)
    return res.status(400).json({ error: "Token no validado aún" });
  if (stored.token !== token)
    return res.status(400).json({ error: "Token inválido" });
  if (Date.now() > stored.expiresAt)
    return res.status(400).json({ error: "Token expirado" });

  Usuario.updateByEmail(email, { Contrasenia: newPassword }, (err) => {
    if (err)
      return res.status(500).json({ error: "Error actualizando contraseña" });

    delete passwordResetTokens[email];
    res.json({
      success: true,
      message: "Contraseña actualizada correctamente",
    });
  });
});

export default router;
