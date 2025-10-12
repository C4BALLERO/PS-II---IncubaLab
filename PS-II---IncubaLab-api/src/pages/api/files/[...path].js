import { NextApiRequest, NextApiResponse } from 'next';
import path from 'path';
import fs from 'fs';

export default function handler(req, res) {
  if (req.method !== 'GET') {
    return res.status(405).json({ message: 'Method not allowed' });
  }

  try {
    // Obtener la ruta del archivo desde la query
    const { filepath } = req.query;
    
    if (!filepath) {
      return res.status(400).json({ message: 'File path is required' });
    }

    // Construir la ruta completa del archivo
    const filePath = path.join(process.cwd(), 'public', 'uploads', filepath);
    
    // Verificar si el archivo existe
    if (!fs.existsSync(filePath)) {
      return res.status(404).json({ message: 'File not found' });
    }

    // Obtener información del archivo
    const stats = fs.statSync(filePath);
    const ext = path.extname(filePath).toLowerCase();
    
    // Determinar el tipo de contenido
    let contentType = 'application/octet-stream';
    if (ext === '.jpg' || ext === '.jpeg') {
      contentType = 'image/jpeg';
    } else if (ext === '.png') {
      contentType = 'image/png';
    } else if (ext === '.gif') {
      contentType = 'image/gif';
    } else if (ext === '.mp4') {
      contentType = 'video/mp4';
    } else if (ext === '.webm') {
      contentType = 'video/webm';
    }

    // Establecer headers
    res.setHeader('Content-Type', contentType);
    res.setHeader('Content-Length', stats.size);
    res.setHeader('Cache-Control', 'public, max-age=31536000'); // Cache por 1 año

    // Leer y enviar el archivo
    const fileStream = fs.createReadStream(filePath);
    fileStream.pipe(res);

  } catch (error) {
    console.error('Error serving file:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
}
