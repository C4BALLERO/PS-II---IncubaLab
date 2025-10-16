import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ForgotPasswordPopup from "../components/forgotPasswordPopup";
import "../../styles/Login.css";

const Login = ({ setUser }) => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [is2FAOpen, setIs2FAOpen] = useState(false);
  const [tempUser, setTempUser] = useState(null);
  const [code, setCode] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value.trim();
    const password = e.target.password.value;

    try {
      const res = await fetch("http://localhost:4000/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "❌ Credenciales incorrectas");
        return;
      }

      // 🔍 Si el usuario tiene 2FA activo, pedimos el código
      if (data.user && data.user.DobleFactorActivo === true) {
        setTempUser(data.user);
        setIs2FAOpen(true);
      } else {
        // ✅ Si no tiene 2FA, inicia sesión directo
        localStorage.setItem("user", JSON.stringify(data.user));
        window.dispatchEvent(new Event("auth-changed"));
        setUser(data.user);
        navigate("/profile");
      }
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error en el inicio de sesión");
    }
  };

  const handleVerify2FA = async () => {
    if (!code || code.length !== 6) {
      alert("⚠️ Ingrese el código completo de 6 dígitos.");
      return;
    }

    try {
      const res = await fetch("http://localhost:4000/api/usuarios/verify-2fa", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        // 🔑 Cambié "code" a "token" para coincidir con backend
        body: JSON.stringify({ userId: tempUser.IdUser, token: code }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "Código inválido ❌");
        return;
      }

      // ✅ Código correcto → guarda sesión
      localStorage.setItem("user", JSON.stringify(tempUser));
      window.dispatchEvent(new Event("auth-changed"));
      setUser(tempUser);
      setIs2FAOpen(false);
      navigate("/profile");
    } catch (err) {
      console.error("Error verificando 2FA:", err);
      alert("Ocurrió un error verificando el código");
    }
  };

  return (
    <div className="login-page">
      <div className="login-split">
        <div className="login-left">
          <h2>Inicio de Sesión</h2>
          <form onSubmit={handleSubmit} className="login-form">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              required
              placeholder="nombre@ejemplo.com"
              autoComplete="username"
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Ingresa tu contraseña"
              autoComplete="current-password"
            />

            <a
              href="#"
              className="forgot-password"
              onClick={(e) => {
                e.preventDefault();
                setIsPopupOpen(true);
              }}
            >
              ¿Olvidaste tu contraseña?
            </a>

            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
          </form>
        </div>

        <div className="login-right">
          <h2>¡Bienvenido!</h2>
          <p>Estamos a tu disposición para ayudarte</p>
          <p>¿No tienes una cuenta?</p>
          <Link to="/register" className="register-btn">
            Regístrate
          </Link>
        </div>
      </div>

      <ForgotPasswordPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />

      {is2FAOpen && (
        <div style={overlayStyle}>
          <div style={modalStyle}>
            <h3>Verificación en dos pasos</h3>
            <p>Introduce el código de 6 dígitos de tu app autenticadora:</p>
            <input
              type="text"
              maxLength="6"
              value={code}
              onChange={(e) => setCode(e.target.value.replace(/\D/g, ""))}
              style={inputStyle}
              placeholder="123456"
            />
            <div style={{ display: "flex", justifyContent: "space-between" }}>
              <button onClick={handleVerify2FA} style={verifyBtn}>
                Verificar
              </button>
              <button onClick={() => setIs2FAOpen(false)} style={cancelBtn}>
                Cancelar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

// --- Estilos inline del modal 2FA ---
const overlayStyle = {
  position: "fixed",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  background: "rgba(0, 0, 0, 0.6)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 9999,
};

const modalStyle = {
  background: "#fff",
  padding: "2rem",
  borderRadius: "12px",
  width: "350px",
  textAlign: "center",
  boxShadow: "0 4px 20px rgba(0, 0, 0, 0.25)",
};

const inputStyle = {
  width: "100%",
  padding: "10px",
  fontSize: "1.2rem",
  letterSpacing: "4px",
  textAlign: "center",
  margin: "1rem 0",
  border: "1px solid #ccc",
  borderRadius: "8px",
};

const verifyBtn = {
  background: "#528cb0 ",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

const cancelBtn = {
  background: "#7a0c3f",
  color: "white",
  border: "none",
  padding: "8px 16px",
  borderRadius: "8px",
  cursor: "pointer",
};

export default Login;
