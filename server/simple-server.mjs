console.log('Starting server...');

try {
  // Test basic functionality
  console.log('1. Testing basic functionality...');
  
  // Test HTTP server
  console.log('2. Creating HTTP server...');
  const { createServer } = await import('http');
  
  const server = createServer((req, res) => {
    console.log('Request received:', req.method, req.url);
    res.end('Hello from simple server!');
  });
  
  server.on('error', (error) => {
    console.error('Server error:', error);
    process.exit(1);
  });
  
  const PORT = 3000;
  console.log(`3. Starting server on port ${PORT}...`);
  
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`✓ Server running at http://127.0.0.1:${PORT}`);
    console.log('Press Ctrl+C to stop the server');
  });
  
  // Handle process termination
  process.on('SIGINT', () => {
    console.log('\nShutting down server...');
    server.close();
    process.exit(0);
  });
  
} catch (error) {
  console.error('Fatal error:', error);
  process.exit(1);
}
