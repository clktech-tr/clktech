const fs = require('fs');
const path = require('path');

const testFile = path.join(__dirname, 'permission-test.txt');

try {
  console.log('Attempting to write to file...');
  fs.writeFileSync(testFile, 'Test content', 'utf8');
  console.log('✓ Successfully wrote to file');
  
  console.log('\nFile content:');
  console.log(fs.readFileSync(testFile, 'utf8'));
  
  console.log('\nDeleting test file...');
  fs.unlinkSync(testFile);
  console.log('✓ Test file deleted');
  
  console.log('\n✓ All tests passed!');
} catch (error) {
  console.error('Error:', error.message);
  console.error('Error code:', error.code);
  console.error('Error path:', error.path);
  console.error('\nPlease check directory permissions for:', __dirname);
}
