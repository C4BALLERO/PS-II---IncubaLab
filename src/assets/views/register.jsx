import React from "react";
import { Link } from "react-router-dom";
import Header from "../components/header"; // Importación del Header
import Footer from "../components/footer"; // Importación del Footer
import "../../styles/Register.css";

const Register = () => {
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Formulario enviado");
  };

  return (
    <div className="register-page">
      {/* Header integrado */}
      <Header />

      <div className="register-container">
        <div className="register-wrapper">
          {/* Sección de bienvenida */}
          <div className="welcome-section">
            <h1>¡Bienvenido!</h1>
            <p>Estamos a tu disposición para ayudarte</p>

            <div className="login-prompt">
              <p>¿Ya tienes una cuenta?</p>
              <Link to="/login" className="login-link">
                Iniciar Sesión
              </Link>
            </div>
          </div>

          {/* Sección del formulario */}
          <div className="form-section">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="register-form">
              {/* Fila de nombre y apellido */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="firstName">Ingresa tu nombre</label>
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    required
                    placeholder="Ej: Juan"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="lastName">Ingresa tu apellido</label>
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    required
                    placeholder="Ej: Pérez"
                  />
                </div>
              </div>

              {/* Email */}
              <div className="form-group full-width">
                <label htmlFor="email">Ingresa tu correo</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  required
                  placeholder="ejemplo@correo.com"
                />
              </div>

              {/* Contraseñas */}
              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="password">Contraseña</label>
                  <input
                    type="password"
                    id="password"
                    name="password"
                    required
                    placeholder="Mínimo 8 caracteres"
                  />
                </div>
                <div className="form-group">
                  <label htmlFor="confirmPassword">Confirmar contraseña</label>
                  <input
                    type="password"
                    id="confirmPassword"
                    name="confirmPassword"
                    required
                    placeholder="Repite la contraseña"
                  />
                </div>
              </div>

              {/* Checkboxes */}
              <div className="checkbox-group">
                <input type="checkbox" id="newsletter" name="newsletter" />
                <label htmlFor="newsletter">
                  Envíeme una combinación semanal de proyectos seleccionados
                  exclusivamente para mí, además de noticias ocasionales de
                  incluya lab.
                </label>
              </div>

              <div className="checkbox-group">
                <input type="checkbox" id="terms" name="terms" required />
                <label htmlFor="terms">
                  Acepto la <a href="#">Política de privacidad</a>,{" "}
                  <a href="#">política de cookies</a> y los{" "}
                  <a href="#">términos de uso</a>.
                </label>
              </div>

              <button type="submit" className="register-btn">
                Crear cuenta
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Footer integrado */}
      <Footer />
    </div>
  );
};

export default Register;

