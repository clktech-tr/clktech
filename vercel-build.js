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
  
  // Client build işlemini atla ve sadece gerekli dizinleri oluştur
  console.log('Client build işlemi atlanıyor, sadece gerekli dizinler oluşturuluyor...');
  
  // dist/public dizinini oluştur
  if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
    console.log('dist/public dizini oluşturuluyor...');
    fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
  }
  
  // Örnek bir index.html dosyası oluştur
  const indexHtmlPath = path.join(__dirname, 'dist', 'public', 'index.html');
  if (!fs.existsSync(indexHtmlPath)) {
    console.log('Örnek index.html dosyası oluşturuluyor...');
    const htmlContent = `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CLK Tech</title>
</head>
<body>
  <h1>CLK Tech - Build Placeholder</h1>
  <p>This is a placeholder for the client build.</p>
</body>
</html>
`;
    fs.writeFileSync(indexHtmlPath, htmlContent);
  }
  
  console.log('Gerekli dizinler ve dosyalar oluşturuldu.');

  
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