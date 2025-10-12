# 🚀 IncuvaLab Frontend - Página Principal

## 📋 Descripción

Esta es la implementación de la página principal de IncuvaLab basada en el diseño del Figma. La página incluye:

- **Hero Section** con llamada a la acción y gradiente
- **Proyectos Destacados** con cards de proyectos
- **Catálogo** con búsqueda y filtros

> **Nota**: Los componentes Header y Footer ya existen en la aplicación principal, por lo que no se incluyen en esta implementación.

## 🎨 Diseño Implementado

### Colores Utilizados
- **Guindo**: `#880430` - Color principal para botones y acentos
- **Celeste**: `#66B5CB` - Color secundario para gradientes y elementos
- **Plomo**: `#8D8D8D` - Color para texto secundario
- **Blanco**: `#FFFFFF` - Fondo principal
- **Negro**: `#000000` - Texto principal

### Tipografías
- **Principal**: DM Serif Display - Para títulos y elementos destacados
- **Secundaria**: Be Vietnam Pro - Para texto general y navegación

## 🔧 Funcionalidades

### ✅ Implementadas
- [x] Diseño responsive basado en el Figma
- [x] Integración con API backend (puerto 3003)
- [x] Carga de proyectos desde la base de datos
- [x] Sistema de búsqueda por nombre y descripción
- [x] Filtros por categoría
- [x] Imágenes por defecto cuando no hay imagen del proyecto
- [x] Estados de carga y error
- [x] Animaciones y transiciones suaves

### 🔄 Funcionalidades de la API
- **GET** `/api/projects` - Obtener todos los proyectos
- **GET** `/api/projects?limit=3` - Obtener proyectos destacados
- **GET** `/api/files/uploads/{filename}` - Servir archivos multimedia

## 🚀 Instalación y Uso

### Prerrequisitos
- Node.js (versión 16 o superior)
- Backend API ejecutándose en puerto 3003

### Instalación
```bash
# Instalar dependencias
npm install

# Iniciar servidor de desarrollo
npm run dev
```

### Configuración
La aplicación se conecta automáticamente a la API en `http://localhost:3003/api`

Para cambiar la URL de la API, edita el archivo `src/config/app.js`:
```javascript
export const config = {
  API_BASE_URL: 'http://localhost:3003/api', // Cambiar aquí
  // ... resto de configuración
};
```

## 📁 Estructura del Proyecto

```
src/
├── components/
│   └── HomeComponents.jsx    # Componentes específicos de la página
├── services/
│   └── api.js               # Servicios de API
├── config/
│   └── app.js               # Configuración de la aplicación
├── styles/
│   └── globals.css          # Estilos globales y variables CSS
├── assets/
│   └── views/
│       └── Home.jsx         # Página principal
└── main.jsx                 # Punto de entrada
```

## 🎯 Componentes Principales

> **Nota**: Header y Footer se manejan por separado en la aplicación principal

### HeroSection
- Título principal "¿Listo para empezar?"
- Subtítulo descriptivo
- Botón "Iniciar Campaña"
- Ilustración con gradiente de fondo

### ProjectCard
- Imagen del proyecto (con fallback)
- Nombre del proyecto
- Barra de progreso de financiación
- Descripción corta
- Fecha de creación

### SearchBar
- Dropdown de categorías
- Input de búsqueda
- Botón de búsqueda

## 🔍 Sistema de Búsqueda

### Búsqueda por Texto
- Busca en nombre del proyecto
- Busca en descripción general
- Busca en descripción corta
- Búsqueda case-insensitive

### Filtros por Categoría
- Tecnología
- Educación
- Arte
- Medio Ambiente

## 🖼️ Manejo de Imágenes

### Imágenes de Proyectos
- Si el proyecto tiene imagen: se muestra desde `/api/files/uploads/`
- Si no tiene imagen: se muestra imagen por defecto SVG
- Fallback visual con icono de carpeta

### Imagen por Defecto
- Archivo: `/public/default-project.svg`
- Diseño con gradiente de colores del tema
- Icono de carpeta y texto descriptivo

## 📱 Responsive Design

### Breakpoints
- **Desktop**: > 1200px - Grid de 3 columnas
- **Tablet**: 768px - 1200px - Grid de 2 columnas
- **Mobile**: < 768px - Grid de 1 columna

### Adaptaciones Móviles
- Header con navegación colapsable
- Cards de proyectos apiladas verticalmente
- Botones con tamaño optimizado para touch
- Texto con tamaños legibles

## 🎨 Animaciones

### Transiciones
- Hover en cards de proyectos (elevación)
- Hover en botones (cambio de color)
- Transiciones suaves en barras de progreso
- Animación de carga con spinner

### Efectos Visuales
- Sombras dinámicas en hover
- Gradientes en hero section
- Bordes redondeados consistentes

## 🔧 Configuración de Desarrollo

### Variables de Entorno
```env
VITE_API_URL=http://localhost:3002/api
```

### Scripts Disponibles
```bash
npm run dev      # Servidor de desarrollo
npm run build    # Build de producción
npm run preview  # Preview del build
npm run lint     # Linter de código
```

## 🐛 Solución de Problemas

### Error de Conexión a API
- Verificar que el backend esté ejecutándose en puerto 3002
- Comprobar la URL en `src/services/api.js`

### Imágenes No Se Muestran
- Verificar que el endpoint `/api/files/uploads/` esté funcionando
- Comprobar que la imagen por defecto esté en `/public/`

### Problemas de CORS
- El backend ya tiene CORS configurado para `http://localhost:3000`
- Si usas otro puerto, actualizar la configuración CORS en el backend

## 📈 Próximas Mejoras

### Funcionalidades Pendientes
- [ ] Autenticación de usuarios
- [ ] Paginación de resultados
- [ ] Filtros avanzados
- [ ] Ordenamiento de proyectos
- [ ] Modo oscuro
- [ ] Internacionalización

### Optimizaciones
- [ ] Lazy loading de imágenes
- [ ] Caché de datos de API
- [ ] Compresión de imágenes
- [ ] Service Worker para offline

## 🤝 Contribución

1. Fork del proyecto
2. Crear rama para feature (`git checkout -b feature/nueva-funcionalidad`)
3. Commit de cambios (`git commit -m 'Agregar nueva funcionalidad'`)
4. Push a la rama (`git push origin feature/nueva-funcionalidad`)
5. Crear Pull Request

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver `LICENSE` para más detalles.

---

**Desarrollado con ❤️ para IncuvaLab**
