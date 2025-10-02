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
          <Link to="/"><img src={reactLogo} alt="Logo" className="logo-img" />
          IncUVa Lab</Link>
        </div>

        <nav className={`nav ${menuOpen ? "open" : ""}`}>
          <a href="/">Inicio</a>
          <Link to="/prueba">Catálogo de proyectos</Link>
          <a href="/">Preguntas Frecuentes</a>

          <div className="nav-buttons">
            <button className="login-btn" onClick={() => navigate("/login")}>Iniciar Sesión</button>
            <button className="register-btn" onClick={() => navigate("/register")}>Registrarse</button>
          </div>
        </nav>
      </div>

      <div className="header-buttons">
        <button className="login-btn desktop-btn" onClick={() => navigate("/login")}>Iniciar Sesión</button>
        <button className="register-btn desktop-btn" onClick={() => navigate("/register")}>Registrarse</button>
      </div>

      <button
        className="menu-toggle"
        onClick={() => setMenuOpen(!menuOpen)}
      >
        ☰
      </button>
    </header>
  );
};

export default Header;