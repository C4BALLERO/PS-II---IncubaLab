# Archivos de imagen de ejemplo para pruebas

Estos son archivos placeholder que representan las imágenes de los usuarios y proyectos.

## Estructura de archivos multimedia:

```
public/uploads/
├── images/
│   ├── carlos.jpg      # Imagen de perfil de Carlos (Admin)
│   ├── ana.jpg         # Imagen de perfil de Ana (Creador)
│   ├── luis.jpg        # Imagen de perfil de Luis (Contribuyente)
│   ├── maria.jpg       # Imagen de perfil de Maria (Contribuyente)
│   ├── jose.jpg        # Imagen de perfil de Jose (Creador)
│   ├── solar.jpg       # Imagen del proyecto solar
│   ├── appedu.jpg      # Imagen del proyecto app educativa
│   ├── huerto.jpg      # Imagen del proyecto huerto urbano
│   └── arte.jpg        # Imagen del proyecto arte
└── videos/
    ├── solar.mp4       # Video del proyecto solar
    ├── appedu.mp4      # Video del proyecto app educativa
    ├── huerto.mp4      # Video del proyecto huerto urbano
    └── arte.mp4        # Video del proyecto arte
```

## Notas importantes:

1. **Almacenamiento**: Los archivos se almacenan en el servidor (backend)
2. **URLs**: Las rutas se guardan en la base de datos como `/uploads/images/filename.jpg`
3. **Acceso**: Los archivos se sirven a través de `/api/files/uploads/`
4. **Seguridad**: Solo usuarios autenticados pueden subir archivos
5. **Límites**: 
   - Imágenes: máximo 5MB
   - Videos: máximo 50MB

## Para desarrollo:

1. Coloca archivos de imagen reales en `public/uploads/images/`
2. Coloca archivos de video reales en `public/uploads/videos/`
3. Los archivos se servirán automáticamente a través de la API

## Endpoints de archivos:

- `GET /api/files/uploads/{filename}` - Servir archivo
- `GET /api/files/file-info/{filename}` - Información del archivo
- `DELETE /api/files/delete/{filename}` - Eliminar archivo
