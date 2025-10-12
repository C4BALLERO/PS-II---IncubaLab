import axios from 'axios';
import { config } from '../config/app';
import { mockProjects, delay, filterProjects } from '../data/mockData';

// Configuración base de la API
const API_BASE_URL = config.API_BASE_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor para manejar errores
api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error('API Error:', error);
    return Promise.reject(error);
  }
);

// Servicios para proyectos
export const projectService = {
  // Obtener todos los proyectos (usando datos mock temporalmente)
  getAllProjects: async (params = {}) => {
    try {
      // Simular delay de API
      await delay(500);
      
      const { limit = 50, offset = 0, search } = params;
      
      // Filtrar proyectos
      let filteredProjects = filterProjects(mockProjects, search || '', '');
      
      // Aplicar paginación
      const startIndex = parseInt(offset);
      const endIndex = startIndex + parseInt(limit);
      const paginatedProjects = filteredProjects.slice(startIndex, endIndex);
      
      return {
        success: true,
        data: paginatedProjects,
        pagination: {
          limit: parseInt(limit),
          offset: parseInt(offset),
          total: filteredProjects.length
        }
      };
    } catch (error) {
      console.error('Error fetching projects:', error);
      throw error;
    }
  },

  // Obtener proyecto por ID
  getProjectById: async (id) => {
    try {
      const response = await api.get(`/projects/${id}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching project:', error);
      throw error;
    }
  },

  // Buscar proyectos
  searchProjects: async (query) => {
    try {
      const response = await api.get('/projects', { 
        params: { search: query } 
      });
      return response.data;
    } catch (error) {
      console.error('Error searching projects:', error);
      throw error;
    }
  },

  // Obtener proyectos destacados (usando datos mock temporalmente)
  getFeaturedProjects: async () => {
    try {
      // Simular delay de API
      await delay(300);
      
      // Obtener los primeros 3 proyectos
      const featuredProjects = mockProjects.slice(0, 3);
      
      return {
        success: true,
        data: featuredProjects,
        pagination: {
          limit: 3,
          offset: 0,
          total: featuredProjects.length
        }
      };
    } catch (error) {
      console.error('Error fetching featured projects:', error);
      throw error;
    }
  }
};

// Servicios para autenticación
export const authService = {
  // Login
  login: async (credentials) => {
    try {
      const response = await api.post('/auth?action=login', credentials);
      return response.data;
    } catch (error) {
      console.error('Error logging in:', error);
      throw error;
    }
  },

  // Registro
  register: async (userData) => {
    try {
      const response = await api.post('/auth?action=register', userData);
      return response.data;
    } catch (error) {
      console.error('Error registering:', error);
      throw error;
    }
  },

  // Obtener perfil del usuario
  getProfile: async (token) => {
    try {
      const response = await api.get('/auth', {
        headers: { Authorization: `Bearer ${token}` }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching profile:', error);
      throw error;
    }
  }
};

// Función para obtener URL de imagen con fallback
export const getImageUrl = (imagePath, defaultImage = '/default-project.svg') => {
  if (!imagePath) return defaultImage;
  
  // Si es una URL completa, devolverla tal como está
  if (imagePath.startsWith('http')) {
    return imagePath;
  }
  
  // Si es una ruta relativa, construir la URL completa
  if (imagePath.startsWith('/uploads/')) {
    // Remover el /uploads/ del inicio para el parámetro filepath
    const filepath = imagePath.replace('/uploads/', '');
    return `${API_BASE_URL}/files/${filepath}?filepath=${filepath}`;
  }
  
  // Si no tiene /uploads/, agregarlo
  return `${API_BASE_URL}/files/${imagePath}?filepath=${imagePath}`;
};

// Servicio para obtener categorías
export const categoryService = {
  // Obtener categorías desde la API
  getCategories: async () => {
    try {
      const response = await api.get('/projects/categories');
      return response.data;
    } catch (error) {
      console.error('Error loading categories:', error);
      // Fallback a categorías estáticas si falla la API
      return {
        success: true,
        data: [
          { value: 'tecnologia', label: 'Tecnología' },
          { value: 'educacion', label: 'Educación' },
          { value: 'arte', label: 'Arte' },
          { value: 'medio-ambiente', label: 'Medio Ambiente' }
        ]
      };
    }
  }
};

export default api;
