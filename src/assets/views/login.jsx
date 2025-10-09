import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import ForgotPasswordPopup from "../components/forgotPasswordPopup"; // componente pop-up
import "../../styles/Login.css";

const Login = () => {
  const navigate = useNavigate();
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      // Petición al backend con login via POST
      const res = await fetch("http://localhost:3001/api/usuarios/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.error || "❌ Credenciales incorrectas");
        return;
      }

      console.log("✅ Login exitoso:", data.user);

      // Guardar sesión
      localStorage.setItem("user", JSON.stringify(data.user));

      // Redirigir al perfil
      navigate("/profile");
    } catch (error) {
      console.error("Error en login:", error);
      alert("Ocurrió un error en el inicio de sesión");
    }
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-split">
        {/* Lado izquierdo: Formulario */}
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
            />

            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              name="password"
              required
              placeholder="Ingresa tu contraseña"
            />

            {/* Enlace que abre el pop-up */}
            <a
              href="#"
              onClick={() => setIsPopupOpen(true)}
              className="forgot-password"
            >
              ¿Olvidaste tu contraseña?
            </a>

            <button type="submit" className="login-btn">
              Iniciar Sesión
            </button>
          </form>
        </div>

        {/* Lado derecho: Bienvenida */}
        <div className="login-right">
          <h2>¡Bienvenido!</h2>
          <p>Estamos a tu disposición para ayudarte</p>
          <p>¿No tienes una cuenta?</p>
          <Link to="/register" className="register-btn">
            Regístrate
          </Link>
        </div>
      </div>

      <Footer />

      {/* Pop-up de recuperación */}
      <ForgotPasswordPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
      />
    </div>
  );
};

export default Login;
