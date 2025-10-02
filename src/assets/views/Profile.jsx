// src/assets/views/Profile.jsx
import { useState } from "react";
import "../../styles/Profile.css";

function Profile() {
  const [activeAccordion, setActiveAccordion] = useState(0); // 0 para el primero activo

  const toggleAccordion = (index) => {
    setActiveAccordion(activeAccordion === index ? -1 : index);
  };

  return (
    <div className="profile-container">
      {/* Panel Izquierdo - Información de perfil */}
      <aside className="profile-left">
        <div className="profile-avatar">
          <span>👤</span>
        </div>
        <h2 className="profile-title">MI Perfil</h2>
        <h3 className="profile-name">IncubaLabOficial</h3>
        <p className="profile-username">@INCUVALAB</p>

        <div className="profile-links">
          <a href="#">Configurar Cuenta</a>
          <a href="#">Editar Perfil</a>
        </div>

        <div className="profile-extra-links">
          <a href="#">Ayuda</a>
        </div>

        <div className="profile-stats">
          <div>
            <strong>0</strong>
            <span>CAMPAÑAS</span>
          </div>
          <div>
            <strong>1</strong>
            <span>SEGUIDAS</span>
          </div>
          <div>
            <strong>0</strong>
            <span>DONADAS</span>
          </div>
        </div>

        <div className="profile-info">
          <p><strong>Email</strong><br />incuvalab@gmail.com</p>
          <p><strong>Número de teléfono</strong><br />74263489</p>
          <p><strong>Participa desde</strong><br />23/07/2001</p>
        </div>
      </aside>

      {/* Panel Derecho - Dashboard */}
      <section className="profile-right">
        <h2 className="dashboard-title">MI Panel de control</h2>

        <div className="accordion">
          {/* Campañas que sigues */}
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeAccordion === 0 ? 'active' : ''}`}
              onClick={() => toggleAccordion(0)}
            >
              Campañas a las que sigues
              <span className="arrow">{activeAccordion === 0 ? '⌃' : '⌄'}</span>
            </div>
            {activeAccordion === 0 && (
              <div className="accordion-body">
                <h3>Mark three 4: Un portaminas mínimo y duradero</h3>
                <p>INFO. DEL PRODUCTO</p>
                <a href="#">Ir a proyecto</a>
              </div>
            )}
          </div>

          {/* Campañas donadas */}
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeAccordion === 1 ? 'active' : ''}`}
              onClick={() => toggleAccordion(1)}
            >
              Campañas a las que donaste
              <span className="arrow">{activeAccordion === 1 ? '⌃' : '⌄'}</span>
            </div>
            {activeAccordion === 1 && (
              <div className="accordion-body">
                <p>Aún no has realizado donaciones.</p>
              </div>
            )}
          </div>

          {/* Mis campañas */}
          <div className="accordion-item">
            <div 
              className={`accordion-header ${activeAccordion === 2 ? 'active' : ''}`}
              onClick={() => toggleAccordion(2)}
            >
              Mis Campañas
              <span className="arrow">{activeAccordion === 2 ? '⌃' : '⌄'}</span>
            </div>
            {activeAccordion === 2 && (
              <div className="accordion-body">
                <p>Aún no has creado ninguna campaña.</p>
                <a href="#">Crear mi primera campaña</a>
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

export default Profile;