console.log('=== Starting Diagnostic Test ===');

// Test 1: Basic console output
console.log('1. Testing basic console output...');

// Test 2: File system operations
try {
  console.log('2. Testing file system...');
  const fs = await import('fs/promises');
  const path = await import('path');
  
  const testFile = path.join(process.cwd(), 'test-fs.txt');
  await fs.writeFile(testFile, 'Test content');
  console.log('   ✓ File written successfully');
  
  const content = await fs.readFile(testFile, 'utf8');
  console.log('   ✓ File read successfully');
  
  await fs.unlink(testFile);
  console.log('   ✓ File deleted successfully');
} catch (error) {
  console.error('   ✗ File system error:', error);
}

// Test 3: HTTP server
try {
  console.log('3. Testing HTTP server...');
  const { createServer } = await import('http');
  
  const server = createServer((req, res) => {
    console.log(`   ✓ Request received: ${req.method} ${req.url}`);
    res.end('Hello from test server!');
  });
  
  server.on('error', (error) => {
    console.error('   ✗ Server error:', error);
  });
  
  const PORT = 3000;
  server.listen(PORT, '127.0.0.1', () => {
    console.log(`   ✓ Server listening on http://127.0.0.1:${PORT}`);
    
    // Test HTTP request
    import('node:http').then(({ request }) => {
      const req = request(
        `http://127.0.0.1:${PORT}`,
        { timeout: 1000 },
        (res) => {
          let data = '';
          res.on('data', (chunk) => (data += chunk));
          res.on('end', () => {
            console.log(`   ✓ HTTP request successful: ${data}`);
            server.close();
          });
        }
      );
      
      req.on('error', (error) => {
        console.error('   ✗ HTTP request failed:', error);
        server.close();
      });
      
      req.end();
    });
  });
  
} catch (error) {
  console.error('   ✗ HTTP server test failed:', error);
}

console.log('=== Diagnostic Test Complete ===');
