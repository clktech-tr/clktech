console.log('Testing ESM module...');

// Test dynamic import
const testModule = await import('./test-esm-module.mjs');
await testModule.runTest();
