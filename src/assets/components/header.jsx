// src/assets/components/header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import "../../styles/Header.css";
import reactLogo from "../react.svg";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <header className="header">
      <div className="left-section">
        <div className="logo">
          <Link to="/">
            <img src={reactLogo} alt="Logo" className="logo-img" />
            IncUVa Lab
          </Link>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          {/* usar Link para navegación SPA */}
          <Link to="/">Inicio</Link>
          <Link to="/prueba">Catálogo de proyectos</Link>
          <Link to="/faq">Preguntas Frecuentes</Link>
          <Link to="/sobre">Sobre nosotros</Link>

          <div className="nav-buttons">
            <button className="login-btn" onClick={() => navigate("/login")}>
              Iniciar Sesión
            </button>
            <button
              className="register-btn"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </button>
          </div>
        </nav>
      </div>

      <div className="header-buttons">
        <button
          className="login-btn desktop-btn"
          onClick={() => navigate("/login")}
        >
          Iniciar Sesión
        </button>
        <button
          className="register-btn desktop-btn"
          onClick={() => navigate("/register")}
        >
          Registrarse
        </button>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
        aria-label="Abrir menú"
        aria-expanded={menuOpen}
      >
        ☰
      </button>
    </header>
  );
};

export default Header;
