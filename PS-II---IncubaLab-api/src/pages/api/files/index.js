const express = require('express');
const path = require('path');
const fs = require('fs');

const router = express.Router();

// Servir archivos estáticos desde la carpeta uploads
router.use('/uploads', express.static(path.join(__dirname, '../../public/uploads')));

// Endpoint para obtener información de un archivo
router.get('/file-info/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../public/uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
    }

    const stats = fs.statSync(filePath);
    const ext = path.extname(filename).toLowerCase();
    
    res.json({
      success: true,
      data: {
        filename,
        size: stats.size,
        type: getFileType(ext),
        createdAt: stats.birthtime,
        modifiedAt: stats.mtime,
        url: `/api/files/uploads/${filename}`
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al obtener información del archivo'
    });
  }
});

// Endpoint para eliminar un archivo
router.delete('/delete/:filename', (req, res) => {
  try {
    const { filename } = req.params;
    const filePath = path.join(__dirname, '../../public/uploads', filename);
    
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({
        success: false,
        message: 'Archivo no encontrado'
      });
    }

    fs.unlinkSync(filePath);
    
    res.json({
      success: true,
      message: 'Archivo eliminado correctamente'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Error al eliminar el archivo'
    });
  }
});

// Función auxiliar para determinar el tipo de archivo
function getFileType(extension) {
  const imageExts = ['.jpg', '.jpeg', '.png', '.gif', '.bmp', '.webp'];
  const videoExts = ['.mp4', '.avi', '.mov', '.wmv', '.flv', '.webm'];
  
  if (imageExts.includes(extension)) {
    return 'image';
  } else if (videoExts.includes(extension)) {
    return 'video';
  } else {
    return 'unknown';
  }
}

module.exports = router;
