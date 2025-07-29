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
  console.log('Vite ve gerekli paketler yükleniyor...');
  execSync('npm install vite@5.4.19 autoprefixer@10.4.16 postcss@8.5.6 tailwindcss@3.4.17 @vitejs/plugin-react @replit/vite-plugin-runtime-error-modal @replit/vite-plugin-cartographer --no-save', { stdio: 'inherit' });
  
  // React ve diğer gerekli paketleri yükle
  console.log('React ve diğer gerekli paketler yükleniyor...');
  execSync('npm install react react-dom wouter @tanstack/react-query --no-save', { stdio: 'inherit' });

  // Client dizinindeki bağımlılıkları yükle
  console.log('Client dizinindeki bağımlılıklar yükleniyor...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  // Vite'ı açıkça yükle
  console.log('Vite açıkça yükleniyor...');
  execSync('npm install vite@5.4.19 --no-save', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  
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
  
  // Client build işlemini gerçekleştir
  console.log('Client build işlemi başlatılıyor...');
  try {
    // Client dizininde build işlemini gerçekleştir
    console.log('Vite build komutu doğrudan çalıştırılıyor...');
    execSync('npx vite build', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
    console.log('Client build işlemi tamamlandı');
    
    // Client build çıktısını dist/public klasörüne kopyala
    console.log('Client build çıktısı dist/public klasörüne kopyalanıyor...');
    if (fs.existsSync(path.join(__dirname, 'client', 'dist'))) {
      // client/dist içindeki tüm dosyaları dist/public'e kopyala
      const files = fs.readdirSync(path.join(__dirname, 'client', 'dist'));
      for (const file of files) {
        const srcPath = path.join(__dirname, 'client', 'dist', file);
        const destPath = path.join(__dirname, 'dist', 'public', file);
        if (fs.statSync(srcPath).isDirectory()) {
          // Dizin ise recursive kopyala
          fs.cpSync(srcPath, destPath, { recursive: true });
        } else {
          // Dosya ise kopyala
          fs.copyFileSync(srcPath, destPath);
        }
      }
      console.log('Build çıktısı başarıyla kopyalandı');
    } else {
      throw new Error('client/dist dizini bulunamadı');
    }
    
    // Build çıktısının varlığını kontrol et
    if (fs.existsSync(path.join(__dirname, 'dist', 'public', 'index.html'))) {
      console.log('Client build başarıyla tamamlandı');
      
      // Dosyaları listele
      const publicFiles = fs.readdirSync(path.join(__dirname, 'dist', 'public'));
      console.log('Build çıktısı dosyaları:', publicFiles);
    } else {
      throw new Error('Client build çıktısı oluşturulamadı!');
    }
  } catch (buildError) {
    console.error('Client build hatası:', buildError);
    throw buildError;
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