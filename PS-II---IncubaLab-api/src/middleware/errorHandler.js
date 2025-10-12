class ErrorHandler {
  static handle(error, req, res) {
    // console.error('Error:', error);

    // Database errors
    if (error.code === 'ER_DUP_ENTRY') {
      return res.status(409).json({
        success: false,
        message: 'Resource already exists',
        details: 'Duplicate entry found'
      });
    }

    if (error.code === 'ER_NO_REFERENCED_ROW_2') {
      return res.status(400).json({
        success: false,
        message: 'Invalid reference',
        details: 'Referenced resource does not exist'
      });
    }

    // Validation errors
    if (error.name === 'ValidationError') {
      return res.status(400).json({
        success: false,
        message: 'Validation error',
        details: error.message
      });
    }

    // JWT errors
    if (error.name === 'JsonWebTokenError') {
      return res.status(401).json({
        success: false,
        message: 'Invalid token'
      });
    }

    if (error.name === 'TokenExpiredError') {
      return res.status(401).json({
        success: false,
        message: 'Token expired'
      });
    }

    // Default error
    res.status(500).json({
      success: false,
      message: 'Internal server error',
      details: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }

  static notFound(req, res) {
    res.status(404).json({
      success: false,
      message: 'Route not found',
      path: req.originalUrl
    });
  }

  static asyncWrapper(fn) {
    return (req, res, next) => {
      Promise.resolve(fn(req, res, next)).catch((error) => {
        ErrorHandler.handle(error, req, res);
      });
    };
  }
}

module.exports = ErrorHandler;
