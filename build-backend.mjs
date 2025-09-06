#!/usr/bin/env node

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const rootDir = process.cwd();
const distDir = path.join(rootDir, 'dist');

// Clean dist directory
if (fs.existsSync(distDir)) {
  fs.rmSync(distDir, { recursive: true });
}

console.log('Building backend for production...');

// Create required directories if they don't exist
const requiredDirs = [
  path.join(distDir, 'server'),
  path.join(distDir, 'shared')
];

for (const dir of requiredDirs) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
}

try {
  console.log('Compiling TypeScript...');
  const tsconfigPath = path.join(rootDir, 'tsconfig-backend.json');
  console.log('Looking for tsconfig at:', tsconfigPath);
  console.log('File exists:', fs.existsSync(tsconfigPath));
  
  execSync(`npx tsc --project "${tsconfigPath}"`, { 
    stdio: 'inherit',
    cwd: rootDir 
  });
  
  // Copy shared schemas
  const sharedDir = path.join(rootDir, 'shared');
  const distSharedDir = path.join(distDir, 'shared');
  
  if (fs.existsSync(sharedDir) && !fs.existsSync(distSharedDir)) {
    fs.mkdirSync(distSharedDir, { recursive: true });
    
    // Copy JS files
    const sharedFiles = fs.readdirSync(sharedDir);
    for (const file of sharedFiles) {
      if (file.endsWith('.js') || file.endsWith('.ts')) {
        const srcPath = path.join(sharedDir, file);
        const destPath = path.join(distSharedDir, file.replace('.ts', '.js'));
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  // Copy types directory if it exists
  const typesDir = path.join(rootDir, 'types');
  const distTypesDir = path.join(distDir, 'types');
  
  if (fs.existsSync(typesDir) && !fs.existsSync(distTypesDir)) {
    fs.mkdirSync(distTypesDir, { recursive: true });
    
    const typeFiles = fs.readdirSync(typesDir);
    for (const file of typeFiles) {
      if (file.endsWith('.js') || file.endsWith('.d.ts')) {
        const srcPath = path.join(typesDir, file);
        const destPath = path.join(distTypesDir, file);
        fs.copyFileSync(srcPath, destPath);
      }
    }
  }
  
  console.log('Backend build completed successfully!');
  
  // Fix ES module imports by adding .js extensions
  console.log('Fixing ES module imports...');
  const distServerDir = path.join(rootDir, 'dist', 'server');
  const files = fs.readdirSync(distServerDir).filter(f => f.endsWith('.js'));
  
  for (const file of files) {
    const filePath = path.join(distServerDir, file);
    let content = fs.readFileSync(filePath, 'utf8');
    
    // Fix relative imports without extensions
    content = content.replace(/from\s+["']\.\/([^"']+)["']/g, (match, p1) => {
      if (!p1.endsWith('.js')) {
        return `from "./${p1}.js"`;
      }
      return match;
    });
    
    content = content.replace(/from\s+["']\.\.\/([^"']+)["']/g, (match, p1) => {
      if (!p1.endsWith('.js')) {
        return `from "../${p1}.js"`;
      }
      return match;
    });
    
    fs.writeFileSync(filePath, content);
  }
  
  console.log('ES module imports fixed!');
  
} catch (error) {
  console.error('Build failed:', error);
  process.exit(1);
}