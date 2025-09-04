import { writeFileSync, readFileSync, unlinkSync } from 'fs';

export async function runTest() {
  const testFile = 'test-file.txt';
  
  try {
    // Test file writing
    console.log('1. Testing file write...');
    writeFileSync(testFile, 'Test content from ESM module');
    console.log('✓ File written successfully');
    
    // Test file reading
    console.log('\n2. Testing file read...');
    const content = readFileSync(testFile, 'utf8');
    console.log('✓ File content:', content);
    
    return 'All tests passed!';
  } catch (error) {
    console.error('Test failed:', error);
    throw error;
  } finally {
    // Cleanup
    try { unlinkSync(testFile); } catch {}
  }
}
