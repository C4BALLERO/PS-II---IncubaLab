import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../../../styles/AdminPerfil.css";
import { FaUser, FaTrash, FaUsers, FaProjectDiagram, FaCheckCircle } from "react-icons/fa";

export default function Perfil() {
  const [openSeguidas, setOpenSeguidas] = useState(true);
  const [openDonadas, setOpenDonadas] = useState(false);
  const [openMis, setOpenMis] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser) setUser(storedUser);
  }, []);

  if (!user) return <p>Cargando perfil...</p>;

  return (
    <div className="perfil-container">
      <div className="perfil-left">
        <div className="perfil-avatar">
          {user.ImagenPerfil ? (
            <img src={user.ImagenPerfil} alt="avatar" />
          ) : (
            <FaUser className="user-icon" />
          )}
        </div>
        <h2>Mi Perfil</h2>
        <h3>{user.Nombre} {user.PrimerApellido}</h3>
        <p className="username">@{user.NombreUsuario}</p>

        <div className="perfil-links">
          <a href="#">Configurar Cuenta</a>
          <a href="#">Editar Perfil</a>
          <a href="#">Ayuda</a>
        </div>

        <div className="perfil-stats">
          <div>
            <span>0</span>
            <p>CAMPAÑAS</p>
          </div>
          <div>
            <span>1</span>
            <p>SEGUIDAS</p>
          </div>
          <div>
            <span>0</span>
            <p>DONADAS</p>
          </div>
        </div>

        <div className="perfil-info">
          <strong>Información</strong>
          <p><strong>Email:</strong> {user.Correo}</p>
          <p><strong>Número de teléfono:</strong> {user.Telefono || "No registrado"}</p>
          <p><strong>Participa desde:</strong> {new Date(user.FechaCreacion).toLocaleDateString()}</p>
        </div>
      </div>

      <div className="perfil-right">
        <h2>Mi Panel de control</h2>
        <div className="panel-section">
          <div
            className="panel-header"
            onClick={() => setOpenSeguidas(!openSeguidas)}
          >
            <h3>Menu de Administracion</h3>
            <span>{openSeguidas ? "˄" : "˅"}</span>
          </div>
          {openSeguidas && (
            <div className="panel-body">
              <div className="dashboard-links">
                <Link to="/admin/proyectos-removidos" className="dashboard-card">
                  <FaTrash className="dashboard-icon" />
                  <h2>Remover Proyectos</h2>
                  <p>Revisa los proyectos eliminados y decide restaurarlos.</p>
                </Link>

                <Link to="/admin/users" className="dashboard-card">
                  <FaUsers className="dashboard-icon" />
                  <h2>Gestión de Usuarios</h2>
                  <p>Administra usuarios: crear, editar o eliminar cuentas.</p>
                </Link>

                <Link to="/admin/proyectos" className="dashboard-card">
                  <FaProjectDiagram className="dashboard-icon" />
                  <h2>Gestión de Proyectos</h2>
                  <p>Controla proyectos activos y pendientes.</p>
                </Link>

                <Link to="/admin/aprobar-proyectos" className="dashboard-card">
                  <FaCheckCircle className="dashboard-icon" />
                  <h2>Aprobar Proyectos</h2>
                  <p>Revisa propuestas y aprueba las que correspondan.</p>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
