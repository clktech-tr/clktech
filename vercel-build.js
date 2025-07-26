// vercel-build.js
// Bu dosya Vercel'in build sürecini özelleştirmek için kullanılır

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Vercel build başlatılıyor...');

try {
  // Ortam değişkenlerini kontrol et
  console.log('Ortam değişkenleri kontrol ediliyor...');
  console.log('NODE_ENV:', process.env.NODE_ENV);
  console.log('SUPABASE_URL:', process.env.SUPABASE_URL ? 'Tanımlı' : 'Tanımlı değil');
  console.log('SUPABASE_SERVICE_KEY:', process.env.SUPABASE_SERVICE_KEY ? 'Tanımlı' : 'Tanımlı değil');
  
  // .env.production dosyasını kontrol et
  if (fs.existsSync(path.join(__dirname, '.env.production'))) {
    console.log('.env.production dosyası mevcut');
  } else {
    console.log('.env.production dosyası bulunamadı');
  }
  
  // Vite ile client build
  console.log('Client build başlatılıyor...');
  execSync('npx vite build', { stdio: 'inherit' });
  console.log('Client build tamamlandı.');
  
  // Server build
  console.log('Server build başlatılıyor...');
  execSync('npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist', { stdio: 'inherit' });
  console.log('Server build tamamlandı.');
  
  // Dist klasörünün içeriğini kontrol et
  const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
  console.log('Dist klasörü içeriği:', distFiles);
  
  // Public klasörünün içeriğini kontrol et
  if (fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
    const publicFiles = fs.readdirSync(path.join(__dirname, 'dist', 'public'));
    console.log('Public klasörü içeriği:', publicFiles);
  } else {
    console.log('Public klasörü bulunamadı');
  }
  
  // Vercel.json dosyasını kontrol et
  if (fs.existsSync(path.join(__dirname, 'vercel.json'))) {
    console.log('vercel.json dosyası mevcut');
    const vercelConfig = fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8');
    console.log('vercel.json içeriği:', vercelConfig);
  } else {
    console.log('vercel.json dosyası bulunamadı');
  }
  
  console.log('Vercel build başarıyla tamamlandı.');
} catch (error) {
  console.error('Vercel build hatası:', error);
  process.exit(1);
}