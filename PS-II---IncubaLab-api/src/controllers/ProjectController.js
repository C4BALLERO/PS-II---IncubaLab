const ProjectModel = require('../models/Project');
const ErrorHandler = require('../middleware/errorHandler');

class ProjectController {
  // Solo mantenemos el método que realmente se usa en el frontend
  static async getCategories(req, res) {
    try {
      const categories = await ProjectModel.getCategories();
      res.json({
        success: true,
        data: categories
      });
    } catch (error) {
      ErrorHandler.handle(error, req, res);
    }
  }
}

module.exports = ProjectController;
