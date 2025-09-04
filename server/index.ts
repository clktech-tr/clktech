import 'dotenv/config';
import express, { Request, Response, NextFunction, Application } from 'express';
import cors from 'cors';
import { registerRoutes } from "./routes";
import { setupVite, serveStatic, log } from "./vite";

// Create Express app
const app = express();

// Basic middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Request logging middleware
app.use((req: Request, res: Response, next: NextFunction) => {
  const start = Date.now();
  const path = req.path;
  let capturedJsonResponse: Record<string, any> | undefined = undefined;

  const originalResJson = res.json.bind(res);
  res.json = function (body: any) {
    capturedJsonResponse = body;
    return originalResJson(body);
  };

  res.on("finish", () => {
    const duration = Date.now() - start;
    if (path.startsWith("/api")) {
      let logLine = `${req.method} ${path} ${res.statusCode} in ${duration}ms`;
      if (capturedJsonResponse) {
        logLine += ` :: ${JSON.stringify(capturedJsonResponse)}`;
      }

      if (logLine.length > 80) {
        logLine = logLine.slice(0, 79) + "…";
      }

      log(logLine);
    }
  });

  next();
});

// Register routes and start server
(async () => {
  try {
    // Register all routes and get the server instance
    const httpServer = await registerRoutes(app);
    
    // Error handling middleware
    app.use((err: any, _req: Request, res: Response, _next: NextFunction) => {
      const status = err.status || err.statusCode || 500;
      const message = err.message || "Internal Server Error";
      res.status(status).json({ message });
    });

    // Serve static files in development
    if (process.env.NODE_ENV === "development") {
      await setupVite(app, httpServer);
    } else {
      // In production, serve static files from the public directory
      app.use(express.static('public'));
    }

    // Start the server
    const port = process.env.PORT ? parseInt(process.env.PORT) : 5000;
    const host = process.env.NODE_ENV === 'production' ? '0.0.0.0' : '127.0.0.1';
    
    httpServer.listen(port, host, () => {
      log(`Server running on http://${host}:${port}`);
      log(`API available at http://${host}:${port}/api`);
    });

    return httpServer;
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
})();
