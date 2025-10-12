import React, { useState, useEffect, useCallback } from 'react';
import { HeroSection, ProjectCard, SearchBar } from '../components/HomeComponents';
import { projectService } from '../../services/api';
import { filterProjects } from '../../data/mockData';
import '../../styles/globals.css';

const Home = () => {
  const [featuredProjects, setFeaturedProjects] = useState([]);
  const [allProjects, setAllProjects] = useState([]);
  const [filteredProjects, setFilteredProjects] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');

  const loadProjects = async () => {
    try {
      setLoading(true);
      setError(null);
      const featuredResponse = await projectService.getFeaturedProjects();
      setFeaturedProjects(featuredResponse.data || []);
      const allResponse = await projectService.getAllProjects();
      setAllProjects(allResponse.data || []);
      setFilteredProjects(allResponse.data || []);
    } catch (err) {
      console.error('Error loading projects:', err);
      setError('Error al cargar los proyectos. Por favor, intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };

  const filterProjectsLocal = useCallback(() => {
    const filtered = filterProjects(allProjects, searchQuery, selectedCategory);
    setFilteredProjects(filtered);
  }, [allProjects, searchQuery, selectedCategory]);

  useEffect(() => { loadProjects(); }, []);
  useEffect(() => { filterProjectsLocal(); }, [filterProjectsLocal]);

  const handleSearch = (q) => setSearchQuery(q);
  const handleCategoryChange = (e) => setSelectedCategory(e.target.value);

  if (loading) {
    return (
      <div style={{
        display: 'flex', justifyContent: 'center', alignItems: 'center',
        height: '100vh', fontFamily: 'var(--font-secondary)'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: 50, height: 50,
            border: '4px solid var(--color-gris-claro)',
            borderTop: '4px solid var(--color-guindo)',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }} />
          <p>Cargando proyectos...</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh' }}>
      {/* HERO nuevo con panel de vidrio + grid + imagen */}
      <HeroSection />

      {/* DESTACADOS (cards horizontales) */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--color-blanco)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)', fontSize: '2.5rem', fontWeight: 'bold',
            color: 'var(--color-negro)', marginBottom: '3rem', textAlign: 'left'
          }}>
            Proyectos Destacados
          </h2>

          {error ? (
            <div style={{
              textAlign: 'center', padding: '2rem', backgroundColor: '#ffebee',
              borderRadius: '8px', color: '#c62828', fontFamily: 'var(--font-secondary)'
            }}>
              {error}
            </div>
          ) : (
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
              gap: '2rem',
              marginBottom: '4rem'
            }}>
              {featuredProjects.map((project) => (
                <ProjectCard key={project.IdProyecto} project={project} variant="horizontal" />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* CATÁLOGO (cards horizontales) */}
      <section style={{ padding: '4rem 2rem', backgroundColor: 'var(--color-gris-claro)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h2 style={{
            fontFamily: 'var(--font-primary)', fontSize: '2.5rem', fontWeight: 'bold',
            color: 'var(--color-negro)', marginBottom: '2rem', textAlign: 'left'
          }}>
            Catálogo
          </h2>

        <SearchBar onSearch={handleSearch} onCategoryChange={handleCategoryChange} />

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '2rem'
        }}>
          {filteredProjects.length > 0 ? (
            filteredProjects.map((project) => (
              <ProjectCard key={project.IdProyecto} project={project} variant="horizontal" />
            ))
          ) : (
            <div style={{
              gridColumn: '1 / -1', textAlign: 'center', padding: '3rem',
              backgroundColor: 'var(--color-blanco)', borderRadius: '12px',
              fontFamily: 'var(--font-secondary)', color: 'var(--color-plomo)'
            }}>
              <p style={{ fontSize: '1.2rem', marginBottom: '1rem' }}>
                {searchQuery || selectedCategory
                  ? 'No se encontraron proyectos con los criterios de búsqueda.'
                  : 'No hay proyectos disponibles en este momento.'}
              </p>
              {(searchQuery || selectedCategory) && (
                <button
                  className="btn-primary"
                  onClick={() => { setSearchQuery(''); setSelectedCategory(''); }}
                >
                  Limpiar filtros
                </button>
              )}
            </div>
          )}
        </div>

        {filteredProjects.length > 0 && (
          <div style={{
            marginTop: '2rem', textAlign: 'center',
            fontFamily: 'var(--font-secondary)', color: 'var(--color-plomo)'
          }}>
            <p>
              Mostrando {filteredProjects.length} proyecto{filteredProjects.length !== 1 ? 's' : ''}
              {searchQuery && ` para "${searchQuery}"`}
              {selectedCategory && ` en categoría "${selectedCategory}"`}
            </p>
          </div>
        )}
        </div>
      </section>

      <style dangerouslySetInnerHTML={{
        __html: `
          @keyframes spin { 0%{transform:rotate(0)}100%{transform:rotate(360deg)} }
        `
      }} />
    </div>
  );
};

export default Home;
