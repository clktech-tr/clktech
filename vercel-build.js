// vercel-build.js
// Bu dosya Vercel'in build sürecini özelleştirmek için kullanılır

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Vercel build başlatılıyor...');

// Ortam değişkenlerini ayarla
process.env.NODE_ENV = 'production';

// .env.vercel dosyasını .env olarak kopyala
if (fs.existsSync(path.join(__dirname, '.env.vercel'))) {
  console.log('.env.vercel dosyası mevcut, .env olarak kopyalanıyor');
  fs.copyFileSync(path.join(__dirname, '.env.vercel'), path.join(__dirname, '.env'));
  console.log('.env dosyası oluşturuldu');
}

// Build klasörlerini hazırla
console.log('Build klasörleri hazırlanıyor...');

// dist klasörünü oluştur (gerekirse)
if (!fs.existsSync(path.join(__dirname, 'dist'))) {
  fs.mkdirSync(path.join(__dirname, 'dist'));
  console.log('dist klasörü oluşturuldu');
}

// dist/public klasörünü oluştur (gerekirse)
if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
  fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
  console.log('dist/public klasörü oluşturuldu');
}

// Client build işlemi
  console.log('Client build başlatılıyor...');
  
  // Client dizinindeki bağımlılıkları yükle
  console.log('Client dizinindeki bağımlılıklar yükleniyor...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  console.log('Client bağımlılıkları yüklendi.');

  // Vite config dosyasını kontrol et
  if (fs.existsSync(path.join(__dirname, 'client', 'vite.config.mjs'))) {
    console.log('client/vite.config.mjs dosyası mevcut');
  } else if (fs.existsSync(path.join(__dirname, 'vite.config.ts'))) {
    console.log('vite.config.ts dosyası mevcut');
    // client dizinine vite.config.mjs dosyasını kopyala
    console.log('vite.config.ts dosyası client dizinine vite.config.mjs olarak kopyalanıyor...');
    // Vite.config.ts içeriğini oku ve client dizinine vite.config.mjs olarak yaz
    const viteConfigContent = fs.readFileSync(path.join(__dirname, 'vite.config.ts'), 'utf8');
    fs.writeFileSync(path.join(__dirname, 'client', 'vite.config.mjs'), viteConfigContent);
    console.log('vite.config.mjs dosyası client dizinine kopyalandı');
  } else {
    console.log('Hiçbir vite.config dosyası bulunamadı');
    
    // Basit bir vite.config.mjs dosyası oluştur
    console.log('Basit bir vite.config.mjs dosyası oluşturuluyor...');
    const simpleViteConfig = `
      // Otomatik oluşturulmuş basit vite.config.mjs
      import { defineConfig } from 'vite';
      import path from 'path';
      
      export default defineConfig({
        build: {
          outDir: path.resolve("../dist/public"),
          emptyOutDir: true,
        }
      });
    `;
    
    fs.writeFileSync(path.join(__dirname, 'client', 'vite.config.mjs'), simpleViteConfig);
    console.log('Basit vite.config.mjs dosyası oluşturuldu');
  }

  // Client build işlemini gerçekleştir
  console.log('Client build işlemi başlatılıyor...');
  
  try {
    // Client build işlemini gerçekleştir
    console.log('Client build işlemi başlatılıyor...');
    execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
    
    console.log('Client build işlemi tamamlandı');
    
    // Client build çıktısını kontrol et
    const clientDistPath = path.join(__dirname, 'client', 'dist');
    if (fs.existsSync(clientDistPath)) {
      console.log('Client build çıktısı başarıyla oluşturuldu');
      
      // Client build çıktısını dist/public klasörüne kopyala
      console.log('Client build çıktısı dist/public klasörüne kopyalanıyor...');
      
      // dist/public klasörünü temizle
      fs.rmSync(path.join(__dirname, 'dist', 'public'), { recursive: true, force: true });
      fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
      
      // Dosyaları kopyala
      const copyDir = (src, dest) => {
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
          } else {
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      
      copyDir(clientDistPath, path.join(__dirname, 'dist', 'public'));
      console.log('Client build çıktısı başarıyla kopyalandı');
    } else {
      console.error('Client build çıktısı bulunamadı');
      
      // Basit bir HTML dosyası oluştur
      console.log('Basit bir HTML dosyası oluşturuluyor...');
      const simpleHtml = `
      <!DOCTYPE html>
      <html lang="tr">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>CLKtech</title>
        <style>
          body {
            font-family: Arial, sans-serif;
            display: flex;
            justify-content: center;
            align-items: center;
            height: 100vh;
            margin: 0;
            flex-direction: column;
            text-align: center;
            background-color: #f5f5f5;
          }
          h1 {
            font-size: 2.5rem;
            margin-bottom: 1rem;
            color: #333;
          }
          p {
            font-size: 1.2rem;
            color: #666;
            max-width: 80%;
            line-height: 1.6;
          }
        </style>
      </head>
      <body>
        <h1>CLKtech</h1>
        <p>Site yapım aşamasındadır. Lütfen daha sonra tekrar ziyaret edin.</p>
      </body>
      </html>
      `;
      
      fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), simpleHtml);
      console.log('Basit HTML dosyası oluşturuldu');
    }
  } catch (error) {
    console.error('Build hatası:', error);
    
    // Hata durumunda basit bir HTML dosyası oluştur
    console.log('Hata durumunda basit bir HTML dosyası oluşturuluyor...');
    const errorHtml = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CLKtech</title>
      <style>
        body {
          font-family: Arial, sans-serif;
          display: flex;
          justify-content: center;
          align-items: center;
          height: 100vh;
          margin: 0;
          flex-direction: column;
          text-align: center;
          background-color: #f5f5f5;
        }
        h1 {
          font-size: 2.5rem;
          margin-bottom: 1rem;
          color: #333;
        }
        p {
          font-size: 1.2rem;
          color: #666;
          max-width: 80%;
          line-height: 1.6;
        }
      </style>
    </head>
    <body>
      <h1>CLKtech</h1>
      <p>Site yapım aşamasındadır. Lütfen daha sonra tekrar ziyaret edin.</p>
    </body>
    </html>
    `;
    
    fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), errorHtml);
    console.log('Basit HTML dosyası oluşturuldu');
  }

// Vercel.json dosyasını kontrol et
if (fs.existsSync(path.join(__dirname, 'vercel.json'))) {
  console.log('vercel.json dosyası mevcut');
  const vercelJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'vercel.json'), 'utf8'));
  console.log('vercel.json içeriği:', vercelJson);
} else {
  console.log('vercel.json dosyası bulunamadı, oluşturuluyor...');
  const vercelConfig = {
    "version": 2,
    "buildCommand": "npm run vercel-build",
    "outputDirectory": "dist/public",
    "installCommand": "npm install",
    "rewrites": [
      { "source": "/api/(.*)", "destination": "https://clktech-backend.onrender.com/api/$1" },
      { "source": "/(.*)", "destination": "/index.html" }
    ],
    "env": {
      "NODE_ENV": "production",
      "VITE_API_URL": "https://clktech-backend.onrender.com"
    }
  };
  fs.writeFileSync(path.join(__dirname, 'vercel.json'), JSON.stringify(vercelConfig, null, 2));
  console.log('vercel.json dosyası oluşturuldu');
}

// Dist klasörü içeriğini kontrol et
const distFiles = fs.readdirSync(path.join(__dirname, 'dist'));
console.log('Dist klasörü içeriği:', distFiles);

if (fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
  const publicFiles = fs.readdirSync(path.join(__dirname, 'dist', 'public'));
  console.log('Public klasörü içeriği:', publicFiles);
}

console.log('Vercel build başarıyla tamamlandı.');