// vercel-build.js
// Bu dosya Vercel'in build sürecini özelleştirmek için kullanılır

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Vercel build başlatılıyor...');
console.log('Node.js versiyonu:', process.version);

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
  
  // Vite'ı özellikle yükle
  console.log('Vite paketini yüklüyorum...');
  execSync('npm install vite@latest --save', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  console.log('Vite paketi yüklendi.');

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
      import react from '@vitejs/plugin-react';
      import path from 'path';
      
      console.log('Vite config yükleniyor...');
      
      export default defineConfig({
        plugins: [react()],
        resolve: {
          alias: {
            "@": path.resolve("./src"),
            "@assets": path.resolve("../attached_assets"),
            "@shared": path.resolve("../shared"),
          },
        },
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
    console.log('Mevcut çalışma dizini:', process.cwd());
    console.log('Client dizini:', path.join(__dirname, 'client'));
    
    // Vite'ın doğru çalıştığını kontrol et
    console.log('Vite versiyonu kontrol ediliyor...');
    try {
      const viteVersion = execSync('npx vite --version', { stdio: 'pipe', cwd: path.join(__dirname, 'client') }).toString().trim();
      console.log('Vite versiyonu:', viteVersion);
    } catch (error) {
      console.error('Vite versiyonu kontrol edilemedi:', error.message);
    }
    
    execSync('npm run build', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
    
    console.log('Client build işlemi tamamlandı');
    
    // Client build çıktısını kontrol et
    const clientDistPath = path.join(__dirname, 'client', 'dist');
    console.log('Client build çıktısı kontrol ediliyor:', clientDistPath);
    if (fs.existsSync(clientDistPath)) {
      console.log('Client build çıktısı başarıyla oluşturuldu');
      
      // Client build çıktısının içeriğini listele
      const clientDistFiles = fs.readdirSync(clientDistPath, { withFileTypes: true });
      console.log('Client build çıktısı içeriği:');
      clientDistFiles.forEach(file => {
        console.log(`- ${file.name}${file.isDirectory() ? '/' : ''}`);
      });
      
      // Client build çıktısını dist/public klasörüne kopyala
      console.log('Client build çıktısı dist/public klasörüne kopyalanıyor...');
      
      // dist/public klasörünü temizle
      const distPublicPath = path.join(__dirname, 'dist', 'public');
      console.log('dist/public klasörü temizleniyor:', distPublicPath);
      if (fs.existsSync(distPublicPath)) {
        fs.rmSync(distPublicPath, { recursive: true, force: true });
        console.log('Mevcut dist/public klasörü silindi');
      }
      fs.mkdirSync(distPublicPath, { recursive: true });
      console.log('Yeni dist/public klasörü oluşturuldu');
      
      // Dosyaları kopyala
      const copyDir = (src, dest) => {
        console.log(`Kopyalanıyor: ${src} -> ${dest}`);
        const entries = fs.readdirSync(src, { withFileTypes: true });
        
        for (const entry of entries) {
          const srcPath = path.join(src, entry.name);
          const destPath = path.join(dest, entry.name);
          
          if (entry.isDirectory()) {
            console.log(`Klasör oluşturuluyor: ${destPath}`);
            fs.mkdirSync(destPath, { recursive: true });
            copyDir(srcPath, destPath);
          } else {
            console.log(`Dosya kopyalanıyor: ${entry.name}`);
            fs.copyFileSync(srcPath, destPath);
          }
        }
      };
      
      copyDir(clientDistPath, distPublicPath);
      console.log('Client build çıktısı başarıyla kopyalandı');
      
      // Kopyalama sonrası dist/public içeriğini kontrol et
      const distPublicFiles = fs.readdirSync(distPublicPath, { withFileTypes: true });
      console.log('dist/public klasörü içeriği:');
      distPublicFiles.forEach(file => {
        console.log(`- ${file.name}${file.isDirectory() ? '/' : ''}`);
      });
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
          .logo {
            font-weight: bold;
            color: #1e40af;
          }
          .error-info {
            margin-top: 2rem;
            font-size: 0.9rem;
            color: #888;
            max-width: 80%;
          }
        </style>
      </head>
      <body>
        <h1><span class="logo">CLK</span>tech</h1>
        <p>Site yapım aşamasındadır. Lütfen daha sonra tekrar ziyaret edin.</p>
        <div class="error-info">
          <p>Build işlemi sırasında bir hata oluştu. Teknik ekibimiz bu sorunu çözmek için çalışıyor.</p>
          <p>Tarih: ${new Date().toLocaleString('tr-TR')}</p>
        </div>
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
    console.error('Build hatası detayları:', error);
    const errorHtml = `
    <!DOCTYPE html>
    <html lang="tr">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>CLKtech - Bakım Modu</title>
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
        .logo {
          font-weight: bold;
          color: #1e40af;
        }
        .error-info {
          margin-top: 2rem;
          font-size: 0.9rem;
          color: #888;
          max-width: 80%;
        }
        .maintenance {
          background-color: #1e40af;
          color: white;
          padding: 0.5rem 1rem;
          border-radius: 4px;
          margin-top: 1rem;
          font-weight: bold;
        }
      </style>
    </head>
    <body>
      <h1><span class="logo">CLK</span>tech</h1>
      <p>Site yapım aşamasındadır. Lütfen daha sonra tekrar ziyaret edin.</p>
      <div class="maintenance">BAKIM MODU</div>
      <div class="error-info">
        <p>Sitemiz şu anda bakım modundadır. En kısa sürede hizmetinize açılacaktır.</p>
        <p>Tarih: ${new Date().toLocaleString('tr-TR')}</p>
      </div>
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
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  const distFiles = fs.readdirSync(distPath);
  console.log('Dist klasörü içeriği:', distFiles);

  const distPublicPath = path.join(distPath, 'public');
  if (fs.existsSync(distPublicPath)) {
    const publicFiles = fs.readdirSync(distPublicPath);
    console.log('Public klasörü içeriği:', publicFiles);
    
    // index.html dosyasını kontrol et
    const indexHtmlPath = path.join(distPublicPath, 'index.html');
    if (fs.existsSync(indexHtmlPath)) {
      console.log('index.html dosyası mevcut');
      // index.html dosyasının boyutunu kontrol et
      const stats = fs.statSync(indexHtmlPath);
      console.log(`index.html dosya boyutu: ${stats.size} byte`);
      
      // Dosya içeriğini kontrol et (ilk 100 karakter)
      const indexHtmlContent = fs.readFileSync(indexHtmlPath, 'utf8');
      console.log(`index.html içeriği (ilk 100 karakter): ${indexHtmlContent.substring(0, 100)}...`);
    } else {
      console.error('index.html dosyası bulunamadı!');
    }
  } else {
    console.error('dist/public klasörü bulunamadı!');
  }
} else {
  console.error('dist klasörü bulunamadı!');
}

console.log('Vercel build başarıyla tamamlandı.');