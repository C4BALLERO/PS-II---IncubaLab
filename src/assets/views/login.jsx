import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header";
import Footer from "../components/footer";
import "../../styles/Login.css"; // CSS específico para Login

const Login = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario de login enviado");
  };

  return (
    <div className="login-page">
      <Header />

      <div className="login-container">
        <div className="login-wrapper">
          {/* Sección de bienvenida (DERECHA) */}
          <div className="welcome-section-login">
            <h1>¡Bienvenido!</h1>
            <p>Estamos a tu disposición para ayudarte</p>

            <div className="login-prompt">
              <p>¿No tienes una cuenta?</p>
              <Link to="/register" className="login-link">
                Regístrate
              </Link>
            </div>
          </div>

          {/* Sección del formulario (IZQUIERDA) */}
          <div className="form-section-login">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit} className="login-form">
              {/* Email */}
              <div className="form-group-login">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="nombre@ejemplo.com"
                />
              </div>

              {/* Contraseña */}
              <div className="form-group-login">
                <label htmlFor="password">Contraseña</label>
                <input
                  type="password"
                  id="password"
                  name="password"
                  required
                  placeholder="Ingresa tu contraseña"
                />
              </div>

              {/* Enlace de olvidar contraseña */}
              <div className="forgot-password">
                <Link to="/forgot-password">¿Olvidaste tu contraseña?</Link>
              </div>

              <button type="submit" className="login-btn">
                Iniciar Sesión
              </button>
            </form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Login;
