const fs = require('fs');

// Create a test file to verify write permissions
fs.writeFileSync('test-output.txt', 'Node.js can write to disk!');
console.log('Test file created successfully!');
