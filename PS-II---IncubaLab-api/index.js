const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');
const { app, initializeDatabase } = require('./server');

const dev = process.env.NODE_ENV !== 'production';
const hostname = 'localhost';
const port = process.env.PORT || 3000;

// Initialize Next.js app
const nextApp = next({ dev, hostname, port });
const handle = nextApp.getRequestHandler();

nextApp.prepare().then(async () => {
  // Initialize database
  await initializeDatabase();

  // Create HTTP server
  const server = createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      const { pathname, query } = parsedUrl;

      // Handle API routes with custom middleware
      if (pathname.startsWith('/api/')) {
        // Apply Express middleware to API routes
        app(req, res, () => {
          handle(req, res, parsedUrl);
        });
      } else {
        // Handle other routes with Next.js
        handle(req, res, parsedUrl);
      }
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  });

  server.listen(port, (err) => {
    if (err) throw err;
    console.log(`🚀 Server ready on http://${hostname}:${port}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  });
});
