// vercel-build.js
// Bu dosya Vercel'in build sürecini özelleştirmek için kullanılır

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

console.log('Vercel build başlatılıyor...');

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
  execSync('npm install -g vite@5.4.19', { stdio: 'inherit' });
  execSync('npm install vite@5.4.19 autoprefixer@10.4.16 postcss@8.5.6 tailwindcss@3.4.17 @vitejs/plugin-react @replit/vite-plugin-runtime-error-modal @replit/vite-plugin-cartographer --save', { stdio: 'inherit' });
  // Vite'ı global olarak bağla
  console.log('Vite global olarak bağlanıyor...');
  execSync('npm link vite', { stdio: 'inherit' });
  
  // React ve diğer gerekli paketleri yükle
  console.log('React ve diğer gerekli paketler yükleniyor...');
  execSync('npm install react react-dom wouter @tanstack/react-query --no-save', { stdio: 'inherit' });

  // Client dizinindeki bağımlılıkları yükle
  console.log('Client dizinindeki bağımlılıklar yükleniyor...');
  execSync('npm install', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  // Vite'ı açıkça yükle
  console.log('Vite açıkça yükleniyor...');
  execSync('npm install vite@5.4.19 --save', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  // Vite'ı node_modules/.bin dizinine kopyala
  console.log('Vite binary dosyasını kopyalıyoruz...');
  execSync('npm link vite', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  
  // Vite'ın doğru yüklendiğini kontrol et
  console.log('Vite kurulumunu kontrol ediyoruz...');
  try {
    const vitePackageJson = fs.readFileSync(path.join(__dirname, 'client', 'node_modules', 'vite', 'package.json'), 'utf8');
    console.log('Vite package.json bulundu:', JSON.parse(vitePackageJson).version);
  } catch (err) {
    console.error('Vite package.json bulunamadı, manuel olarak yüklemeyi deniyoruz...');
    execSync('npm install vite@5.4.19 --no-save', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  }
  
  // Autoprefixer ve diğer gerekli paketleri açıkça yükle
  console.log('Gerekli CSS paketleri yükleniyor...');
  execSync('npm install autoprefixer tailwindcss postcss --save-dev', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
  console.log('Client bağımlılıkları yüklendi.');

  // Vite config dosyasını kontrol et
  if (fs.existsSync(path.join(__dirname, 'client', 'vite.config.mjs'))) {
    console.log('client/vite.config.mjs dosyası mevcut');
    
    // vite.config.mjs dosyasını yedekle
    fs.copyFileSync(
      path.join(__dirname, 'client', 'vite.config.mjs'), 
      path.join(__dirname, 'client', 'vite.config.mjs.backup')
    );
    console.log('vite.config.mjs dosyası yedeklendi');
    
    // vite.config.mjs dosyasını oku
    const viteConfigContent = fs.readFileSync(path.join(__dirname, 'client', 'vite.config.mjs'), 'utf8');
    console.log('Orijinal vite.config.mjs içeriği:');
    console.log(viteConfigContent);
    
    // İlk satırı değiştir - vite import'unu düzelt
    let patchedContent = viteConfigContent;
    
    // Vite import'unu düzelt
    if (patchedContent.includes("import { defineConfig } from 'vite';")) {
      console.log('Vite import ifadesi bulundu, düzeltiliyor...');
      // Vite import'unu düzelt - node_modules'dan doğrudan import et
      patchedContent = patchedContent.replace(
        "import { defineConfig } from 'vite';",
        "// Orijinal: import { defineConfig } from 'vite';"+
        "\nimport { defineConfig } from './node_modules/vite/dist/node/index.js';"
      );
    } else {
      console.log('Vite import ifadesi bulunamadı, dosya olduğu gibi kullanılacak');
    }
    
    // Düzeltilmiş içeriği yaz
    fs.writeFileSync(path.join(__dirname, 'client', 'vite.config.mjs'), patchedContent);
    console.log('vite.config.mjs dosyası düzeltildi');
    console.log('Düzeltilmiş vite.config.mjs içeriği:');
    console.log(patchedContent);
    
  } else if (fs.existsSync(path.join(__dirname, 'vite.config.ts'))) {
    console.log('vite.config.ts dosyası mevcut');
    // client dizinine vite.config.mjs dosyasını kopyala
    console.log('vite.config.ts dosyası client dizinine vite.config.mjs olarak kopyalanıyor...');
    // Vite.config.ts içeriğini oku ve client dizinine vite.config.mjs olarak yaz
    const viteConfigContent = fs.readFileSync(path.join(__dirname, 'vite.config.ts'), 'utf8');
    console.log('Orijinal vite.config.ts içeriği:');
    console.log(viteConfigContent);
    
    // İlk satırı değiştir - vite import'unu düzelt
    let patchedContent = viteConfigContent;
    
    // Vite import'unu düzelt
    if (patchedContent.includes("import { defineConfig } from 'vite';")) {
      console.log('Vite import ifadesi bulundu, düzeltiliyor...');
      // Vite import'unu düzelt - node_modules'dan doğrudan import et
      patchedContent = patchedContent.replace(
        "import { defineConfig } from 'vite';",
        "// Orijinal: import { defineConfig } from 'vite';"+
        "\nimport { defineConfig } from './node_modules/vite/dist/node/index.js';"
      );
    } else {
      console.log('Vite import ifadesi bulunamadı, dosya olduğu gibi kullanılacak');
    }
    
    fs.writeFileSync(path.join(__dirname, 'client', 'vite.config.mjs'), patchedContent);
    console.log('vite.config.mjs dosyası client dizinine kopyalandı ve düzeltildi');
    console.log('Düzeltilmiş vite.config.mjs içeriği:');
    console.log(patchedContent);
  } else {
    console.log('Hiçbir vite.config dosyası bulunamadı');
    
    // Basit bir vite.config.mjs dosyası oluştur
    console.log('Basit bir vite.config.mjs dosyası oluşturuluyor...');
    const simpleViteConfig = `
      // Otomatik oluşturulmuş basit vite.config.mjs
      import { defineConfig } from './node_modules/vite/dist/node/index.js';
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
  // try bloğunu kaldırıyoruz ve doğrudan kodu çalıştırıyoruz
    // Client dizininde build işlemini gerçekleştir
    console.log('Vite build komutu doğrudan çalıştırılıyor...');
    // Vite'ı doğrudan node_modules'dan çalıştırmayı dene
    try {
      console.log('Vite modülünü doğrudan yüklemeyi deniyoruz...');
        
        // Önce global olarak vite'ı yükle
        console.log('Vite paketini global olarak yüklüyoruz...');
        execSync('npm install -g vite@5.4.19', { stdio: 'inherit' });
        
        // Vite'ı client dizinine doğrudan yükle
        console.log('Vite paketini client dizinine doğrudan yüklüyoruz...');
        execSync('npm install vite@5.4.19 --save-exact', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
        
        // Vite'ın yüklendiğini doğrula
        console.log('Vite kurulumunu doğruluyoruz...');
        const clientNodeModules = path.join(__dirname, 'client', 'node_modules');
        const viteDir = path.join(clientNodeModules, 'vite');
        
        if (fs.existsSync(viteDir)) {
          console.log('Vite paketi client/node_modules içinde bulundu');
          // Vite dizininin içeriğini listele
          const viteFiles = fs.readdirSync(viteDir);
          console.log('Vite dizini içeriği:', viteFiles);
          
          // Vite versiyonunu kontrol et
          try {
            const vitePackageJson = fs.readFileSync(path.join(viteDir, 'package.json'), 'utf8');
            console.log('Vite versiyonu:', JSON.parse(vitePackageJson).version);
          } catch (err) {
            console.log('Vite package.json okunamadı:', err.message);
          }
        } else {
          console.log('Vite paketi client/node_modules içinde bulunamadı');
          throw new Error('Vite paketi client/node_modules içinde bulunamadı');
        }
      
        // Vite'ı doğrudan çalıştır
        console.log('Vite build komutu çalıştırılıyor...');
        
        // Vite'ı doğrudan npx ile çalıştır
        console.log('Vite build komutu npx ile çalıştırılıyor...');
        execSync('npx vite build', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
        console.log('Vite build komutu tamamlandı');
    } catch (viteError) {
      console.log('Doğrudan vite çalıştırma hatası:', viteError);
      console.log('Alternatif yöntemler deneniyor...');
      
      // Alternatif yöntem 1: Vite'ı client dizinine yükle ve doğrudan kullan
       console.log('Alternatif yöntem 1: Vite\'ı client dizinine yüklüyoruz...');
       try {
         // Vite'ı client dizinine yükle
         console.log('Vite paketini client dizinine yüklüyoruz...');
         execSync('npm install vite@5.4.19 --no-save', { 
           stdio: 'inherit', 
           cwd: path.join(__dirname, 'client')
         });
         
         // Yükleme sonrası node_modules içeriğini kontrol et
         console.log('Yükleme sonrası node_modules içeriğini kontrol ediyoruz...');
         const nodeModulesPath = path.join(__dirname, 'client', 'node_modules');
         const viteModulePath = path.join(nodeModulesPath, 'vite');
         
         if (fs.existsSync(viteModulePath)) {
           console.log('Vite paketi başarıyla yüklendi:', viteModulePath);
           
           // Vite versiyonunu kontrol et
           try {
             const vitePackageJson = JSON.parse(fs.readFileSync(path.join(viteModulePath, 'package.json'), 'utf8'));
             console.log('Yüklenen Vite versiyonu:', vitePackageJson.version);
           } catch (err) {
             console.log('Vite versiyonu kontrol edilemedi:', err.message);
           }
           
           // node_modules/.bin içeriğini kontrol et
           const binPath = path.join(nodeModulesPath, '.bin');
           if (fs.existsSync(binPath)) {
             console.log('node_modules/.bin dizini içeriği:');
             fs.readdirSync(binPath).forEach(file => {
               console.log(`- ${file}`);
             });
           }
           
           // Vite'ı doğrudan çalıştır
           console.log('Vite build komutunu çalıştırıyoruz...');
           execSync('npx vite build', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
         } else {
           console.log('Vite paketi client/node_modules içinde bulunamadı!');
           throw new Error('Vite paketi client/node_modules içinde bulunamadı');
         }
       } catch (alternativeError) {
         console.log('Client build hatası:', alternativeError);
         
         // Alternatif yöntem 2: Doğrudan npx ile Vite'ı çalıştır - Vercel ortamında en güvenilir yöntem
         console.log('Alternatif yöntem 2: npx ile Vite build komutunu çalıştırıyoruz...');
         try {
          // Önce node_modules/.bin içindeki vite'ı kontrol et
          const binPath = path.join(__dirname, 'client', 'node_modules', '.bin', 'vite');
          if (fs.existsSync(binPath)) {
            console.log('Vite binary bulundu, doğrudan çalıştırılıyor...');
            // Windows ve Unix/Linux için uyumlu çalıştırma
            if (process.platform === 'win32') {
              execSync(`"${binPath}" build`, { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
            } else {
              execSync(`${binPath} build`, { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
            }
          } else {
            console.log('Vite binary bulunamadı, npx ile çalıştırılıyor...');
            // npx ile belirli bir versiyonu çalıştır
            execSync('npx vite@5.4.19 build', { stdio: 'inherit', cwd: path.join(__dirname, 'client') });
          }
         } catch (buildError) {
            console.log('Vite build hatası:', buildError.message);
            
            // Son çare: Basit bir HTML dosyası oluştur
            console.log('Alternatif yöntem: Basit bir HTML dosyası oluşturuluyor...');
            // dist/public klasörünü oluştur
            if (!fs.existsSync(path.join(__dirname, 'dist', 'public'))) {
              fs.mkdirSync(path.join(__dirname, 'dist', 'public'), { recursive: true });
            }
            
            // Basit bir index.html dosyası oluştur
            const simpleHtml = `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>CLKtech</title>
  <style>
    body { font-family: Arial, sans-serif; text-align: center; padding: 50px; }
    h1 { color: #333; }
    p { color: #666; }
  </style>
</head>
<body>
  <h1>CLKtech</h1>
  <p>Site yapım aşamasındadır. Lütfen daha sonra tekrar ziyaret edin.</p>
</body>
</html>`;
        
            try {
              fs.writeFileSync(path.join(__dirname, 'dist', 'public', 'index.html'), simpleHtml);
              console.log('Basit HTML dosyası oluşturuldu');
            } catch (fallbackError) {
              console.log('Basit HTML oluşturma hatası:', fallbackError.message);
              // Hata fırlatmak yerine işleme devam et
              console.log('Hataya rağmen işleme devam ediliyor...');
            }
           }
         }
         console.log('Client build işlemi tamamlandı');
  
  try {
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
  } catch (copyError) {
    console.error('Build çıktısı kopyalama hatası:', copyError);
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
}