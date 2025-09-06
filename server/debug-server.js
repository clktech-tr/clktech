console.log('Starting debug server...');
try {
  const http = require('http');
  const port = 3000;
  
  const server = http.createServer((req, res) => {
    console.log('Request received:', req.method, req.url);
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Hello from debug server!');
  });

  server.on('error', (error) => {
    console.error('Server error:', error);
  });

  server.listen(port, '127.0.0.1', () => {
    console.log(`Server running at http://127.0.0.1:${port}/`);
    console.log('Press Ctrl+C to stop the server');
  });
} catch (error) {
  console.error('Failed to start server:', error);
  process.exit(1);
}
