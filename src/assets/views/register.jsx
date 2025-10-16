import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../styles/Register.css";

const Register = () => {
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const firstName = e.target.firstName.value;
    const lastName = e.target.lastName.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const confirmPassword = e.target.confirmPassword.value;

    if (password !== confirmPassword) {
      alert("Las contraseñas no coinciden");
      return;
    }

    const formData = { firstName, lastName, email, password };

    try {
      const res = await fetch("http://localhost:4000/api/usuarios", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Error en el registro");

      const data = await res.json();
      console.log("Usuario creado:", data);

      alert("✅ Usuario registrado con éxito");
      navigate("/login"); 
    } catch (error) {
      console.error("Error al registrar usuario:", error);
      alert("❌ Ocurrió un error al registrar el usuario");
    }
  };

  return (
    <div className="register-page">
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

              <div className="checkbox-group">
                <input type="checkbox" id="newsletter" name="newsletter" />
                <label htmlFor="newsletter">
                  Envíeme una combinación semanal de proyectos seleccionados
                  exclusivamente para mí, además de noticias ocasionales.
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
    </div>
  );
};

export default Register;
