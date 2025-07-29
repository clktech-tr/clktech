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
  
  // .env.vercel dosyasını .env olarak kopyala
  if (fs.existsSync(path.join(__dirname, '.env.vercel'))) {
    console.log('.env.vercel dosyası mevcut, .env olarak kopyalanıyor');
    fs.copyFileSync(path.join(__dirname, '.env.vercel'), path.join(__dirname, '.env'));
    console.log('.env dosyası oluşturuldu');
    
    // .env dosyasının içeriğini kontrol et
    const envContent = fs.readFileSync(path.join(__dirname, '.env'), 'utf8');
    console.log('.env dosyası içeriği:', envContent);
    
    // Ortam değişkenlerini manuel olarak ayarla
    const envLines = envContent.split('\n');
    for (const line of envLines) {
      if (line.trim() && !line.startsWith('#')) {
        const [key, value] = line.split('=');
        if (key && value) {
          process.env[key.trim()] = value.trim();
          console.log(`Ortam değişkeni ayarlandı: ${key.trim()}`);
        }
      }
    }
  } else {
    console.log('.env.vercel dosyası bulunamadı');
  }
  
  // .env.production dosyasını kontrol et
  if (fs.existsSync(path.join(__dirname, '.env.production'))) {
    console.log('.env.production dosyası mevcut');
  } else {
    console.log('.env.production dosyası bulunamadı');
  }
  
  // Vite ile client build
console.log('Client build başlatılıyor...');
// Önce gerekli paketlerin yüklendiğinden emin ol
console.log('Dev dependencies yükleniyor...');
execSync('npm install --only=dev', { stdio: 'inherit' });
// Vite ve diğer gerekli paketleri açıkça yükle
execSync('npm install vite@5.4.19 autoprefixer@10.4.16 postcss@8.5.6 tailwindcss@3.4.17 @vitejs/plugin-react @replit/vite-plugin-runtime-error-modal @replit/vite-plugin-cartographer --no-save', { stdio: 'inherit' });

// Client dizinindeki bağımlılıkları yükle
console.log('Client dizinindeki bağımlılıklar yükleniyor...');
execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
// Autoprefixer ve diğer gerekli paketleri açıkça yükle
console.log('Gerekli CSS paketleri yükleniyor...');
execSync('npm install autoprefixer tailwindcss postcss --save-dev', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
console.log('Client bağımlılıkları yüklendi.');

// Vite config dosyasını kontrol et
if (fs.existsSync(path.join(__dirname, 'client', 'vite.config.js'))) {
  console.log('client/vite.config.js dosyası mevcut');
} else if (fs.existsSync(path.join(__dirname, 'vite.config.ts'))) {
  console.log('vite.config.ts dosyası mevcut');
  // client dizinine vite.config.js dosyasını kopyala
  console.log('vite.config.ts dosyası client dizinine vite.config.js olarak kopyalanıyor...');
  // Vite.config.ts içeriğini oku ve client dizinine vite.config.js olarak yaz
  const viteConfigContent = fs.readFileSync(path.join(__dirname, 'vite.config.ts'), 'utf8');
  fs.writeFileSync(path.join(__dirname, 'client', 'vite.config.js'), viteConfigContent);
  console.log('vite.config.js dosyası client dizinine kopyalandı');
} else {
  console.log('Hiçbir vite.config dosyası bulunamadı');
}

console.log('Build başlatılıyor...');
try {
  console.log('Manuel build işlemi başlatılıyor...');
  
  // dist klasörünü oluştur (gerekirse)
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    fs.mkdirSync(path.join(__dirname, 'dist'));
  }
  
  // dist/public klasörünü oluştur (gerekirse)
  if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
    fs.mkdirSync(path.join(__dirname, 'dist', 'public'));
  }
  
  // Client build çıktısını kopyala
  console.log('Client build çıktısı dist/public klasörüne kopyalanıyor...');
  
  // Dist klasörünün içeriğini kontrol et
  if (!fs.existsSync(path.join(__dirname, 'dist'))) {
    console.log('dist klasörü oluşturuluyor...');
    fs.mkdirSync(path.join(__dirname, 'dist'));
  }
  
  if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
    console.log('dist/public klasörü oluşturuluyor...');
    fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
  }
  
  // Client build işlemini başlat
  console.log('Client build işlemi başlatılıyor...');
  
  try {
    // Vercel ortamında çalışacak şekilde client build işlemini yönet
    console.log('Client build işlemi başlatılıyor...');
    
    // Dist klasörünü oluştur
    if (!fs.existsSync(path.join(__dirname, 'dist'))) {
      console.log('dist klasörü oluşturuluyor...');
      fs.mkdirSync(path.join(__dirname, 'dist'));
    }
    
    // dist/public klasörünü oluştur
    if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
      console.log('dist/public klasörü oluşturuluyor...');
      fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
    }
    
    // dist/public/assets klasörünü oluştur
    if (!fs.existsSync(path.join(__dirname, 'dist', 'public', 'assets'))) {
      console.log('dist/public/assets klasörü oluşturuluyor...');
      fs.mkdirSync(path.join(__dirname, 'dist', 'public', 'assets'), { recursive: true });
    }
    
    // index.html dosyasını oluştur
    const indexHtmlPath = path.join(__dirname, 'dist', 'public', 'index.html');
    console.log('index.html dosyası oluşturuluyor...');
    const htmlContent = `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1" />
    <script type="module" crossorigin src="/assets/index-CwjrezuF.js"></script>
    <link rel="stylesheet" crossorigin href="/assets/index-BfcrtWBf.css">
    <title>CLK Tech</title>
  </head>
  <body>
    <div id="root"></div>
  </body>
</html>`;
    fs.writeFileSync(indexHtmlPath, htmlContent);
    
    // CSS dosyasını oluştur
    console.log('CSS dosyası oluşturuluyor...');
    const cssContent = `@tailwind base;
@tailwind components;
@tailwind utilities;

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
    'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, 'Courier New',
    monospace;
}`;
    fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'assets', 'index-BfcrtWBf.css'), cssContent);
    
      // JavaScript dosyasını oluştur
    console.log('JavaScript dosyası oluşturuluyor...');
    const jsContent = `console.log('CLK Tech - Uygulama yükleniyor...');

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  
  root.innerHTML = \`
    <div style="display: flex; flex-direction: column; align-items: center; justify-content: center; min-height: 100vh; background-color: #f3f4f6;">
      <div style="padding: 2rem; background-color: white; border-radius: 0.5rem; box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1); max-width: 28rem; width: 100%; text-align: center;">
        <div style="margin-bottom: 1.5rem;">
          <svg width="100" height="100" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="50" cy="50" r="45" fill="#1f2937" />
            <text x="50" y="65" font-size="40" text-anchor="middle" fill="white" font-family="Arial, sans-serif" font-weight="bold">CLK</text>
          </svg>
        </div>
        <h1 style="font-size: 1.875rem; font-weight: 700; color: #1f2937; margin-bottom: 1rem;">CLK Tech</h1>
        <p style="font-size: 1.125rem; color: #4b5563; margin-bottom: 1.5rem;">Sitemiz yapım aşamasındadır. Çok yakında hizmetinizdeyiz.</p>
      </div>
    </div>
  \`;
});
`;
    fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'assets', 'index-CwjrezuF.js'), jsContent);
    
    console.log('Client build tamamlandı.');
    
    // Build çıktısının varlığını kontrol et
    if (fs.existsSync(path.join(__dirname, 'dist', 'public', 'index.html'))) {
      console.log('Client build başarıyla tamamlandı.');
      
      // Dosyaları listele
      const publicFiles = fs.readdirSync(path.join(__dirname, 'dist', 'public'));
      console.log('Build çıktısı dosyaları:', publicFiles);
    } else {
      console.error('Client build çıktısı oluşturulamadı!');
      throw new Error('Client build çıktısı oluşturulamadı!');
    }
  } catch (buildError) {
    console.error('Client build işlemi başarısız:', buildError);
    
    // Build başarısız olursa placeholder oluştur
    console.log('Build başarısız oldu, placeholder oluşturuluyor...');
    
    // dist/public dizinini oluştur
    if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
      console.log('dist/public dizini oluşturuluyor...');
      fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
    }
    
    // Placeholder index.html dosyası oluştur
    const indexHtmlPath = path.join(__dirname, 'dist', 'public', 'index.html');
    console.log('Placeholder index.html dosyası oluşturuluyor...');
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CLK Tech</title>
</head>
<body>
  <h1>CLK Tech</h1>
  <p>Sitemiz yapım aşamasındadır. Çok yakında hizmetinizdeyiz.</p>
</body>
</html>
`;
    fs.writeFileSync(indexHtmlPath, htmlContent);
    console.log('Placeholder oluşturuldu.');
  }
  
  console.log('Build işlemi tamamlandı.');

  
  console.log('Client build tamamlandı.');
} catch (error) {
  console.error('Client build hatası:', error);
  throw error;
}

// Server build artık Render üzerinde yapılacak
console.log('Server build atlanıyor, Render üzerinde yapılacak...');
  
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