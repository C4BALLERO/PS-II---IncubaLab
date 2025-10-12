const rateLimit = require('express-rate-limit');

class RateLimitMiddleware {
  static createLimiter(windowMs = 15 * 60 * 1000, max = 100) {
    return rateLimit({
      windowMs: windowMs,
      max: max,
      message: {
        success: false,
        message: 'Too many requests from this IP, please try again later.'
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  }

  static authLimiter() {
    return rateLimit({
      windowMs: 15 * 60 * 1000, // 15 minutes
      max: 5, // 5 attempts per window
      message: {
        success: false,
        message: 'Too many authentication attempts, please try again later.'
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  }

  static apiLimiter() {
    return rateLimit({
      windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS) || 15 * 60 * 1000,
      max: parseInt(process.env.RATE_LIMIT_MAX_REQUESTS) || 100,
      message: {
        success: false,
        message: 'Too many API requests, please try again later.'
      },
      standardHeaders: true,
      legacyHeaders: false,
    });
  }
}

module.exports = RateLimitMiddleware;
