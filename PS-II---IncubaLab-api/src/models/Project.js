const database = require('../config/database');

class ProjectModel {
  // Solo mantenemos el método que realmente se usa en el frontend
  static async getCategories() {
    // Por ahora, vamos a extraer categorías basadas en las palabras clave de las descripciones
    // En el futuro se podría agregar un campo Categoria específico a la tabla Proyecto
    const sql = `
      SELECT DISTINCT 
        CASE 
          WHEN DescripcionGeneral LIKE '%solar%' OR DescripcionCorta LIKE '%solar%' THEN 'Energía Solar'
          WHEN DescripcionGeneral LIKE '%matemática%' OR DescripcionCorta LIKE '%matemática%' 
               OR DescripcionGeneral LIKE '%educativa%' OR DescripcionCorta LIKE '%educativa%' THEN 'Educación'
          WHEN DescripcionGeneral LIKE '%huerto%' OR DescripcionCorta LIKE '%huerto%' 
               OR DescripcionGeneral LIKE '%urbano%' OR DescripcionCorta LIKE '%urbano%' THEN 'Medio Ambiente'
          WHEN DescripcionGeneral LIKE '%arte%' OR DescripcionCorta LIKE '%arte%' 
               OR DescripcionGeneral LIKE '%digital%' OR DescripcionCorta LIKE '%digital%' THEN 'Arte'
          WHEN DescripcionGeneral LIKE '%tecnología%' OR DescripcionCorta LIKE '%tecnología%' 
               OR DescripcionGeneral LIKE '%app%' OR DescripcionCorta LIKE '%app%' THEN 'Tecnología'
          ELSE 'General'
        END as categoria
      FROM Proyecto 
      WHERE Estado = 'Activo'
      ORDER BY categoria
    `;
    
    const result = await database.query(sql);
    return result.filter(row => row.categoria !== 'General').map(row => ({
      value: row.categoria.toLowerCase().replace(' ', '-'),
      label: row.categoria
    }));
  }
}

module.exports = ProjectModel;
