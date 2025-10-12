// Datos mock para proyectos (temporal mientras se soluciona el backend)
export const mockProjects = [
  {
    IdProyecto: 1,
    Nombre: "Proyecto Solar",
    DescripcionGeneral: "Desarrollo de paneles solares para comunidades rurales",
    DescripcionCorta: "Paneles solares rurales",
    Imagen: "/uploads/images/solar.jpg",
    Video: "/uploads/videos/solar.mp4",
    FechaInicio: "2025-09-01",
    FechaFin: "2025-12-01",
    FechaCaducacion: "2025-11-30",
    ContribuyenteLimite: 100,
    ContribuyentesTotales: 25,
    Estado: "Activo",
    FechaCreacion: "2025-09-01T00:00:00.000Z",
    ModificadoPor: 2,
    CreadorNombre: "Ana",
    CreadorApellido: "Lopez"
  },
  {
    IdProyecto: 2,
    Nombre: "App Educativa",
    DescripcionGeneral: "Aplicación para aprender matemáticas online",
    DescripcionCorta: "App de matemáticas",
    Imagen: "/uploads/images/appedu.jpg",
    Video: "/uploads/videos/appedu.mp4",
    FechaInicio: "2025-08-15",
    FechaFin: "2025-11-15",
    FechaCaducacion: "2025-11-10",
    ContribuyenteLimite: 50,
    ContribuyentesTotales: 15,
    Estado: "Activo",
    FechaCreacion: "2025-08-15T00:00:00.000Z",
    ModificadoPor: 2,
    CreadorNombre: "Ana",
    CreadorApellido: "Lopez"
  },
  {
    IdProyecto: 3,
    Nombre: "Huerto Urbano",
    DescripcionGeneral: "Creación de huertos en zonas urbanas",
    DescripcionCorta: "Huertos urbanos",
    Imagen: "/uploads/images/huerto.jpg",
    Video: "/uploads/videos/huerto.mp4",
    FechaInicio: "2025-09-05",
    FechaFin: "2025-12-05",
    FechaCaducacion: "2025-12-01",
    ContribuyenteLimite: 30,
    ContribuyentesTotales: 8,
    Estado: "Activo",
    FechaCreacion: "2025-09-05T00:00:00.000Z",
    ModificadoPor: 5,
    CreadorNombre: "Jose",
    CreadorApellido: "Martinez"
  },
  {
    IdProyecto: 4,
    Nombre: "Proyecto Arte",
    DescripcionGeneral: "Exposición de arte digital",
    DescripcionCorta: "Arte digital",
    Imagen: "/uploads/images/arte.jpg",
    Video: "/uploads/videos/solar.mp4",
    FechaInicio: "2025-07-01",
    FechaFin: "2025-10-01",
    FechaCaducacion: "2025-09-30",
    ContribuyenteLimite: 20,
    ContribuyentesTotales: 12,
    Estado: "Activo",
    FechaCreacion: "2025-07-01T00:00:00.000Z",
    ModificadoPor: 2,
    CreadorNombre: "Ana",
    CreadorApellido: "Lopez"
  },
  {
    IdProyecto: 5,
    Nombre: "Tecnología Verde",
    DescripcionGeneral: "Desarrollo de tecnologías sostenibles para el medio ambiente",
    DescripcionCorta: "Tecnología sostenible",
    Imagen: null,
    Video: null,
    FechaInicio: "2025-10-01",
    FechaFin: "2026-01-01",
    FechaCaducacion: "2025-12-31",
    ContribuyenteLimite: 75,
    ContribuyentesTotales: 18,
    Estado: "Activo",
    FechaCreacion: "2025-10-01T00:00:00.000Z",
    ModificadoPor: 5,
    CreadorNombre: "Jose",
    CreadorApellido: "Martinez"
  },
  {
    IdProyecto: 6,
    Nombre: "Educación Digital",
    DescripcionGeneral: "Plataforma educativa para estudiantes de primaria",
    DescripcionCorta: "Plataforma educativa",
    Imagen: null,
    Video: null,
    FechaInicio: "2025-09-15",
    FechaFin: "2025-12-15",
    FechaCaducacion: "2025-12-10",
    ContribuyenteLimite: 40,
    ContribuyentesTotales: 22,
    Estado: "Activo",
    FechaCreacion: "2025-09-15T00:00:00.000Z",
    ModificadoPor: 2,
    CreadorNombre: "Ana",
    CreadorApellido: "Lopez"
  }
];

// Función para simular delay de API
export const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms));

// Función para filtrar proyectos
export const filterProjects = (projects, searchQuery, selectedCategory) => {
  let filtered = [...projects];

  // Filtrar por búsqueda
  if (searchQuery.trim()) {
    filtered = filtered.filter(project =>
      project.Nombre.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.DescripcionGeneral?.toLowerCase().includes(searchQuery.toLowerCase()) ||
      project.DescripcionCorta?.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Filtrar por categoría
  if (selectedCategory) {
    filtered = filtered.filter(project => {
      const description = (project.DescripcionGeneral + ' ' + project.DescripcionCorta).toLowerCase();
      return description.includes(selectedCategory.toLowerCase());
    });
  }

  return filtered;
};
