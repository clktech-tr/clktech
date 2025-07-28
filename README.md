# CLKtech Web Uygulaması

## Proje Hakkında

CLKtech, modern teknoloji ürünleri sunan bir e-ticaret platformudur. Bu repo, CLKtech web uygulamasının kaynak kodunu içerir.

## Teknoloji Stack

- **Frontend**: React, TypeScript, Vite, Tailwind CSS
- **Backend**: Node.js, Express, TypeScript
- **Veritabanı**: Supabase
- **Deployment**: Vercel (Frontend), Render (Backend)

## Geliştirme

### Gereksinimler

- Node.js 18 veya üzeri
- npm

### Kurulum

```bash
# Repo'yu klonlayın
git clone https://github.com/yourusername/clktech.git
cd clktech

# Bağımlılıkları yükleyin
npm install

# .env dosyasını oluşturun
cp .env.example .env
# .env dosyasını düzenleyin ve gerekli değerleri ekleyin

# Geliştirme sunucusunu başlatın
npm run dev
```

## Deployment

Bu proje, frontend için Vercel ve backend için Render kullanılarak deploy edilmiştir. Deployment adımları için [DEPLOY.md](./DEPLOY.md) dosyasına bakın.

## Proje Yapısı

```
├── client/             # Frontend kodu
│   ├── index.html      # Ana HTML dosyası
│   └── src/            # React kaynak kodu
├── server/             # Backend kodu
│   ├── index.ts        # Ana sunucu dosyası
│   ├── routes.ts       # API rotaları
│   └── storage.ts      # Veritabanı işlemleri
├── shared/             # Frontend ve backend arasında paylaşılan kod
├── public/             # Statik dosyalar
├── .env.example        # Örnek çevre değişkenleri
└── package.json        # Proje bağımlılıkları ve komutları
```

## Lisans

Bu proje MIT lisansı altında lisanslanmıştır. Detaylar için [LICENSE](./LICENSE) dosyasına bakın.