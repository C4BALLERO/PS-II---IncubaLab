# 📁 Manejo de Archivos Multimedia - IncuvaLab API

## 🎯 Arquitectura de Archivos

### **Backend (Servidor)**
- ✅ **Almacena** los archivos físicamente en `public/uploads/`
- ✅ **Guarda** las rutas en la base de datos
- ✅ **Sirve** los archivos a través de endpoints API
- ✅ **Valida** tipos y tamaños de archivos

### **Frontend (Cliente)**
- ✅ **Sube** archivos usando formularios multipart/form-data
- ✅ **Muestra** archivos usando las URLs del backend
- ✅ **Gestiona** la interfaz de usuario para archivos

## 📂 Estructura de Directorios

```
public/uploads/
├── images/           # Imágenes de perfil y proyectos
│   ├── carlos.jpg    # Admin
│   ├── ana.jpg       # Creador
│   ├── luis.jpg      # Contribuyente
│   ├── maria.jpg     # Contribuyente
│   ├── jose.jpg      # Creador
│   ├── solar.jpg     # Proyecto Solar
│   ├── appedu.jpg    # App Educativa
│   ├── huerto.jpg    # Huerto Urbano
│   └── arte.jpg      # Proyecto Arte
└── videos/           # Videos de proyectos
    ├── solar.mp4     # Video Proyecto Solar
    ├── appedu.mp4    # Video App Educativa
    ├── huerto.mp4    # Video Huerto Urbano
    └── arte.mp4      # Video Proyecto Arte
```

## 🔧 Configuración de Archivos

### **Límites de Archivos**
- **Imágenes**: Máximo 5MB
- **Videos**: Máximo 50MB
- **Formatos soportados**:
  - Imágenes: JPG, JPEG, PNG, GIF, BMP, WEBP
  - Videos: MP4, AVI, MOV, WMV, FLV, WEBM

### **Nomenclatura de Archivos**
- Formato: `{campo}-{timestamp}-{random}.{extension}`
- Ejemplo: `imagenPerfil-1695123456789-123456789.jpg`

## 🌐 Endpoints de Archivos

### **Servir Archivos**
```http
GET /api/files/uploads/{filename}
```
**Ejemplo**: `GET /api/files/uploads/carlos.jpg`

### **Información de Archivo**
```http
GET /api/files/file-info/{filename}
```
**Respuesta**:
```json
{
  "success": true,
  "data": {
    "filename": "carlos.jpg",
    "size": 245760,
    "type": "image",
    "createdAt": "2025-09-30T12:00:00.000Z",
    "modifiedAt": "2025-09-30T12:00:00.000Z",
    "url": "/api/files/uploads/carlos.jpg"
  }
}
```

### **Eliminar Archivo**
```http
DELETE /api/files/delete/{filename}
```

## 📤 Subida de Archivos

### **Imagen de Perfil**
```http
POST /api/users/upload-image
Content-Type: multipart/form-data

imagenPerfil: [archivo]
```

### **Imagen de Proyecto**
```http
POST /api/projects/upload-image
Content-Type: multipart/form-data

imagen: [archivo]
```

### **Video de Proyecto**
```http
POST /api/projects/upload-video
Content-Type: multipart/form-data

video: [archivo]
```

## 💾 Base de Datos

### **Campos de Archivos**
- **Usuario.ImagenPerfil**: `/uploads/images/imagenPerfil-1234567890-987654321.jpg`
- **Proyecto.Imagen**: `/uploads/images/imagen-1234567890-987654321.jpg`
- **Proyecto.Video**: `/uploads/videos/video-1234567890-987654321.mp4`

### **Ejemplo de Datos**
```sql
-- Usuario con imagen de perfil
INSERT INTO Usuario (..., ImagenPerfil, ...) 
VALUES (..., '/uploads/images/carlos.jpg', ...);

-- Proyecto con imagen y video
INSERT INTO Proyecto (..., Imagen, Video, ...) 
VALUES (..., '/uploads/images/solar.jpg', '/uploads/videos/solar.mp4', ...);
```

## 🔒 Seguridad

### **Autenticación Requerida**
- ✅ Solo usuarios autenticados pueden subir archivos
- ✅ Solo el propietario puede modificar sus archivos
- ✅ Validación de tipos MIME

### **Validaciones**
- ✅ Verificación de extensión de archivo
- ✅ Límites de tamaño
- ✅ Sanitización de nombres de archivo
- ✅ Prevención de path traversal

## 🚀 Uso en Frontend

### **Subir Imagen de Perfil**
```javascript
const formData = new FormData();
formData.append('imagenPerfil', file);

const response = await fetch('/api/users/upload-image', {
  method: 'POST',
  headers: {
    'Authorization': `Bearer ${token}`
  },
  body: formData
});
```

### **Mostrar Imagen**
```html
<img src="/api/files/uploads/carlos.jpg" alt="Imagen de perfil" />
```

### **Mostrar Video**
```html
<video controls>
  <source src="/api/files/uploads/solar.mp4" type="video/mp4">
</video>
```

## 📊 Script de Población

### **Ejecutar Población**
```bash
npm run populate
```

### **Datos Incluidos**
- ✅ 5 usuarios con imágenes de perfil
- ✅ 4 proyectos con imágenes y videos
- ✅ Rutas de archivos en la base de datos
- ✅ Estructura de directorios creada

## 🔧 Desarrollo

### **Archivos de Prueba**
1. Coloca archivos reales en `public/uploads/images/`
2. Coloca archivos reales en `public/uploads/videos/`
3. Los archivos se servirán automáticamente

### **Testing**
```bash
# Probar endpoint de archivos
curl http://localhost:3000/api/files/uploads/carlos.jpg

# Probar información de archivo
curl http://localhost:3000/api/files/file-info/carlos.jpg
```

## 📝 Notas Importantes

1. **Backup**: Los archivos se almacenan localmente, considera backup
2. **CDN**: Para producción, considera usar un CDN
3. **Compresión**: Implementa compresión de imágenes para optimizar
4. **Caché**: Configura headers de caché para archivos estáticos
5. **Monitoreo**: Monitorea el uso de espacio en disco

## 🎯 Flujo Completo

1. **Usuario sube archivo** → Frontend envía multipart/form-data
2. **Backend valida archivo** → Verifica tipo, tamaño, autenticación
3. **Backend guarda archivo** → Almacena en `public/uploads/`
4. **Backend actualiza BD** → Guarda ruta en base de datos
5. **Frontend muestra archivo** → Usa URL del backend para mostrar
6. **Backend sirve archivo** → Endpoint `/api/files/uploads/` sirve el archivo
