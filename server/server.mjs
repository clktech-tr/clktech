import { createServer } from 'http';

const server = createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  res.end('Hello from ES Modules server!');
});

const PORT = 3000;
server.listen(PORT, '127.0.0.1', () => {
  console.log(`Server running at http://127.0.0.1:${PORT}`);
  console.log('Press Ctrl+C to stop the server');
});

// Handle process termination
process.on('SIGINT', () => {
  console.log('\nShutting down server...');
  server.close();
  process.exit(0);
});
