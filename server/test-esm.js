import { writeFileSync, readFileSync, unlinkSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const testFile = 'test-esm.txt';

try {
  console.log('Testing ESM module system...');
  
  // Test file writing
  console.log('\n1. Testing file write...');
  writeFileSync(testFile, 'Test content from ESM');
  console.log('✓ File written successfully');
  
  // Test file reading
  console.log('\n2. Testing file read...');
  const content = readFileSync(testFile, 'utf8');
  console.log('✓ File content:', content);
  
  // Test HTTP server
  console.log('\n3. Testing HTTP server...');
  const { createServer } = await import('http');
  const server = createServer((req, res) => {
    res.end('Hello from ESM server!');
  });
  
  server.listen(0, '127.0.0.1', () => {
    const port = server.address().port;
    console.log(`✓ Server running at http://127.0.0.1:${port}`);
    
    // Test HTTP request
    console.log('\n4. Testing HTTP request...');
    fetch(`http://127.0.0.1:${port}`)
      .then(res => res.text())
      .then(text => {
        console.log('✓ HTTP Response:', text);
        console.log('\n✓ All tests passed!');
        server.close();
      });
  });
  
} catch (error) {
  console.error('Test failed:', error);
} finally {
  // Cleanup
  try { unlinkSync(testFile); } catch {}
}
