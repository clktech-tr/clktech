import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

console.log('Vite yapılandırması yükleniyor...');
console.log('Çalışma dizini:', process.cwd());
console.log('Node.js sürümü:', process.version);

export default defineConfig({
  plugins: [
    react(),
  ],
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
    minify: process.env.NODE_ENV === 'production',
    sourcemap: true,
    reportCompressedSize: true,
    chunkSizeWarningLimit: 1000,
    rollupOptions: {
      output: {
        manualChunks: (id) => {
          if (id.includes('node_modules')) {
            return 'vendor';
          }
        }
      }
    },
    // Build işlemi sırasında oluşan hataları yakalamak için
    onwarn: (warning, warn) => {
      console.log('Vite build uyarısı:', warning);
      warn(warning);
    }
  }
});