const ProjectController = require('../../../controllers/ProjectController');
const RateLimitMiddleware = require('../../../middleware/rateLimit');
const ErrorHandler = require('../../../middleware/errorHandler');

export default function handler(req, res) {
  const { method } = req;

  switch (method) {
    case 'GET':
      return getCategoriesHandler(req, res);
    default:
      res.setHeader('Allow', ['GET']);
      res.status(405).json({ success: false, message: `Method ${method} not allowed` });
  }
}

async function getCategoriesHandler(req, res) {
  try {
    // Apply rate limiting
    const apiLimiter = RateLimitMiddleware.apiLimiter();
    await new Promise((resolve, reject) => {
      apiLimiter(req, res, (err) => {
        if (err) reject(err);
        else resolve();
      });
    });

    ErrorHandler.asyncWrapper(ProjectController.getCategories)(req, res);
  } catch (error) {
    ErrorHandler.handle(error, req, res);
  }
}
