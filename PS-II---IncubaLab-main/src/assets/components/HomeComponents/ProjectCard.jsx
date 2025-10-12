import React from "react";
import { getImageUrl } from "../../../services/api";

const ProjectCard = ({ project, variant = "horizontal" }) => {
  const progressPercentage = project.ContribuyenteLimite 
    ? Math.min((project.ContribuyentesTotales || 0) / project.ContribuyenteLimite * 100, 100)
    : 0;

  if (variant === "horizontal") {
    return (
      <div style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        overflow: 'hidden',
        transition: 'transform 0.3s ease, box-shadow 0.3s ease',
        maxWidth: '400px',
        margin: '0 auto'
      }}>
        {/* Imagen del proyecto */}
        <div style={{
          width: '100%',
          height: '250px',
          backgroundColor: '#F5F5F5',
          backgroundImage: `url(${getImageUrl(project.Imagen)})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}>
          {!project.Imagen && (
            <div style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              fontSize: '3rem',
              color: '#8D8D8D'
            }}>
              📁
            </div>
          )}
        </div>

        {/* Contenido del proyecto */}
        <div style={{ padding: '1.5rem' }}>
          <h3 style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '1.3rem',
            fontWeight: '600',
            marginBottom: '1rem',
            color: '#000000',
            lineHeight: '1.3'
          }}>
            {project.Nombre}
          </h3>

          {/* Barra de progreso */}
          <div style={{ marginBottom: '1rem' }}>
            <div style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '0.5rem'
            }}>
              <span style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                fontWeight: '600',
                color: '#880430'
              }}>
                {project.ContribuyentesTotales || 0} contribuyentes
              </span>
              <span style={{
                fontFamily: "'Be Vietnam Pro', sans-serif",
                color: '#8D8D8D'
              }}>
                Meta: {project.ContribuyenteLimite || 0} contribuyentes
              </span>
            </div>
            <div style={{
              width: '100%',
              height: '8px',
              backgroundColor: '#F5F5F5',
              borderRadius: '4px',
              overflow: 'hidden'
            }}>
              <div style={{
                width: `${progressPercentage}%`,
                height: '100%',
                backgroundColor: '#4CAF50',
                transition: 'width 0.3s ease'
              }}></div>
            </div>
          </div>

          {/* Descripción */}
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.95rem',
            color: '#8D8D8D',
            lineHeight: '1.5',
            marginBottom: '1rem'
          }}>
            {project.DescripcionCorta || project.DescripcionGeneral || 'Sin descripción disponible'}
          </p>

          {/* Fecha */}
          <p style={{
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontSize: '0.8rem',
            color: '#8D8D8D',
            fontStyle: 'italic',
            marginBottom: '1rem'
          }}>
            Campaña subida el: {new Date(project.FechaCreacion).toLocaleDateString('es-ES')}
          </p>

          {/* Botón */}
          <button style={{
            backgroundColor: '#880430',
            color: '#FFFFFF',
            border: 'none',
            padding: '12px 24px',
            borderRadius: '8px',
            fontSize: '1rem',
            fontFamily: "'Be Vietnam Pro', sans-serif",
            fontWeight: '500',
            cursor: 'pointer',
            transition: 'all 0.3s ease',
            width: '100%'
          }}>
            Ver proyecto
          </button>
        </div>
      </div>
    );
  }

  // Versión vertical (mantener para compatibilidad)
  return (
    <div className="project-card" style={{
      maxWidth: '350px',
      margin: '0 auto',
      backgroundColor: 'var(--color-blanco)',
      borderRadius: '12px',
      boxShadow: 'var(--shadow-card)',
      overflow: 'hidden',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease'
    }}>
      {/* Imagen del proyecto */}
      <div style={{
        width: '100%',
        height: '200px',
        backgroundColor: 'var(--color-gris-claro)',
        backgroundImage: `url(${getImageUrl(project.Imagen)})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        {!project.Imagen && (
          <div style={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            fontSize: '3rem',
            color: 'var(--color-plomo)'
          }}>
            📁
          </div>
        )}
      </div>

      {/* Contenido del proyecto */}
      <div style={{ padding: '1.5rem' }}>
        <h3 style={{
          fontFamily: 'var(--font-secondary)',
          fontSize: '1.2rem',
          fontWeight: '600',
          marginBottom: '1rem',
          color: 'var(--color-negro)',
          lineHeight: '1.4'
        }}>
          {project.Nombre}
        </h3>

        {/* Barra de progreso */}
        <div style={{ marginBottom: '1rem' }}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem'
          }}>
            <span style={{
              fontFamily: 'var(--font-secondary)',
              fontWeight: '600',
              color: 'var(--color-guindo)'
            }}>
              {project.ContribuyentesTotales || 0} contribuyentes
            </span>
            <span style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--color-plomo)'
            }}>
              Meta: {project.ContribuyenteLimite || 0} contribuyentes
            </span>
          </div>
          <div style={{
            width: '100%',
            height: '8px',
            backgroundColor: 'var(--color-gris-claro)',
            borderRadius: '4px',
            overflow: 'hidden'
          }}>
            <div style={{
              width: `${progressPercentage}%`,
              height: '100%',
              backgroundColor: '#4CAF50',
              transition: 'width 0.3s ease'
            }}></div>
          </div>
        </div>

        {/* Descripción */}
        <p style={{
          fontFamily: 'var(--font-secondary)',
          fontSize: '0.9rem',
          color: 'var(--color-plomo)',
          marginBottom: '1rem',
          lineHeight: '1.5'
        }}>
          {project.DescripcionCorta || project.DescripcionGeneral || 'Sin descripción disponible'}
        </p>

        {/* Fecha */}
        <p style={{
          fontFamily: 'var(--font-secondary)',
          fontSize: '0.8rem',
          color: 'var(--color-plomo)',
          fontStyle: 'italic'
        }}>
          Campaña subida el: {new Date(project.FechaCreacion).toLocaleDateString('es-ES')}
        </p>
      </div>
    </div>
  );
};

export { ProjectCard };
export default ProjectCard;
