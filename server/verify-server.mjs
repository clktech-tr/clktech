import { writeFileSync, unlinkSync } from 'fs';
import { createServer } from 'http';

// Test 1: Check file system access
try {
  const testFile = 'test-fs.txt';
  writeFileSync(testFile, 'Test content');
  console.log('✓ File system write test passed');
  unlinkSync(testFile);
} catch (err) {
  console.error('File system error:', err);
}

// Test 2: Create HTTP server
const server = createServer((req, res) => {
  res.end('Hello from test server!');
});

server.on('error', (err) => {
  console.error('Server error:', err);
});

server.listen(3000, '127.0.0.1', () => {
  console.log('✓ Test server running at http://127.0.0.1:3000');
  console.log('Press Ctrl+C to stop the server');
});
