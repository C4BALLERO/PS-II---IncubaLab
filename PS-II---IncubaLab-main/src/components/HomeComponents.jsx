import React from 'react';
import { FaSearch } from 'react-icons/fa';
import { getImageUrl } from '../services/api';

// Componente Hero Section
export const HeroSection = () => {
  return (
    <section className="hero-gradient" style={{
      padding: '4rem 2rem',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      minHeight: '500px'
    }}>
      {/* Contenido izquierdo */}
      <div style={{ flex: 1, maxWidth: '500px' }}>
        <h1 style={{
          fontFamily: 'var(--font-primary)',
          fontSize: '3rem',
          fontWeight: 'bold',
          color: 'var(--color-negro)',
          marginBottom: '1rem',
          lineHeight: '1.2'
        }}>
          ¿Listo para empezar?
        </h1>
        <p style={{
          fontFamily: 'var(--font-secondary)',
          fontSize: '1.2rem',
          color: 'var(--color-negro)',
          marginBottom: '2rem',
          lineHeight: '1.6'
        }}>
          Únete ahora mismo a miles de personas.
        </p>
        <button className="btn-primary" style={{
          fontSize: '1.1rem',
          padding: '15px 30px'
        }}>
          Iniciar Campaña
        </button>
      </div>

      {/* Ilustración derecha */}
      <div style={{ flex: 1, textAlign: 'center' }}>
        <div style={{
          width: '300px',
          height: '300px',
          backgroundColor: 'rgba(255,255,255,0.2)',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto',
          fontSize: '4rem'
        }}>
          🏦💰
        </div>
      </div>
    </section>
  );
};

// Componente Project Card
export const ProjectCard = ({ project }) => {
  const progressPercentage = project.ContribuyenteLimite 
    ? Math.min((project.ContribuyentesTotales || 0) / project.ContribuyenteLimite * 100, 100)
    : 0;

  return (
    <div className="project-card" style={{
      maxWidth: '350px',
      margin: '0 auto'
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
              {project.ContribuyentesTotales || 0}Bs.
            </span>
            <span style={{
              fontFamily: 'var(--font-secondary)',
              color: 'var(--color-plomo)'
            }}>
              Meta: {project.ContribuyenteLimite || 0}Bs.
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

// Componente Search Bar
export const SearchBar = ({ onSearch, onCategoryChange }) => {
  return (
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      flexWrap: 'wrap',
      alignItems: 'center'
    }}>
      {/* Dropdown de categoría */}
      <select style={{
        padding: '12px 16px',
        border: '1px solid var(--color-gris-claro)',
        borderRadius: '8px',
        backgroundColor: 'var(--color-gris-claro)',
        fontFamily: 'var(--font-secondary)',
        fontSize: '1rem',
        minWidth: '200px'
      }} onChange={onCategoryChange}>
        <option value="">Buscar por categoría -</option>
        <option value="tecnologia">Tecnología</option>
        <option value="educacion">Educación</option>
        <option value="arte">Arte</option>
        <option value="medio-ambiente">Medio Ambiente</option>
      </select>

      {/* Input de búsqueda */}
      <input
        type="text"
        placeholder="Buscar"
        style={{
          flex: 1,
          padding: '12px 16px',
          border: '1px solid var(--color-celeste)',
          borderRadius: '8px',
          backgroundColor: 'var(--color-celeste)',
          fontFamily: 'var(--font-secondary)',
          fontSize: '1rem',
          minWidth: '200px'
        }}
        onChange={(e) => onSearch(e.target.value)}
      />

      {/* Botón de búsqueda */}
      <button className="btn-primary" style={{
        display: 'flex',
        alignItems: 'center',
        gap: '0.5rem'
      }}>
        <FaSearch />
        Buscar
      </button>
    </div>
  );
};

