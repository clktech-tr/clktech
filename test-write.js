const fs = require('fs');
try {
  fs.writeFileSync('test-node.txt', 'Test content');
  console.log('File written successfully');
} catch (err) {
  console.error('Error:', err.message);
}
