const fs = require('fs');
try {
  fs.writeFileSync('test-write.txt', 'Test content');
  console.log('File written successfully');
} catch (err) {
  console.error('Error writing file:', err);
}
