const http = require('http');
const fs = require('fs');

// Test file write permission
try {
  fs.writeFileSync('test-write.txt', 'Test write permission');
  console.log('✓ Can write to directory');
} catch (err) {
  console.error('✗ Cannot write to directory:', err.message);
}

// Create server
const server = http.createServer((req, res) => {
  console.log('Request received:', req.method, req.url);
  res.end('Hello from test server!');
});

// Handle server errors
server.on('error', (err) => {
  console.error('Server error:', err.message);
  if (err.code === 'EADDRINUSE') {
    console.error('Port 3000 is already in use');
  } else if (err.code === 'EACCES') {
    console.error('Permission denied. Try running as administrator');
  }
});

// Start server
const PORT = 3000;
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
