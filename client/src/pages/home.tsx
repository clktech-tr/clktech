import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product/product-card";
import { Cpu, Code, Shield, ArrowRight, Check, ChevronLeft, ChevronRight, Zap, Wifi, Wrench } from "lucide-react";
import type { Product } from "@shared/schema";
import { useState, useEffect } from "react";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products.slice(0, 3);

  const [currentSlide, setCurrentSlide] = useState(0);
  const slides = [
    {
      title: "Gelişmiş Robot Kontrol Kartları",
      subtitle: "Geleceğin Robotik Projeleriniz İçin",
      description: "CLKtech'in profesyonel seviye kontrol kartları ve sezgisel blok tabanlı kodlama ortamı ile robotik projenizi tasarlayın, inşa edin ve programlayın.",
      image: "/api/uploads/linex.png",
      features: ["ARM Cortex-M İşlemci", "WiFi Bağlantısı", "32 Giriş/Çıkış"]
    },
    {
      title: "Elektronik Modüller & Sensörler",
      subtitle: "Her Proje İçin Doğru Çözüm",
      description: "Profesyonel kalitede elektronik modüller ve sensörler ile robotik projelerinize güç katın. Endüstri standardında kalite ve performans.",
      image: "/api/uploads/mazex.png",
      features: ["Hassas Sensörler", "Güçlü Motor Sürücüler", "Uzun Ömürlü Tasarım"]
    },
    {
      title: "Blok Tabanlı Kodlama",
      subtitle: "Programlama Artık Çok Kolay",
      description: "Görsel blok tabanlı kodlama ortamı ile programlama öğrenin ve robotunuzu hayata geçirin. Hem yeni başlayanlar hem de uzmanlar için ideal.",
      image: "/api/uploads/vivianx.png",
      features: ["Görsel Programlama", "Gerçek Zamanlı Test", "Proje Şablonları"]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section with Modern Slider */}
      <section className="hero-gradient text-white py-20 lg:py-32 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="mb-4">
                <span className="inline-block px-4 py-2 bg-white/10 rounded-full text-sm font-medium backdrop-blur-sm">
                  {slides[currentSlide].subtitle}
                </span>
              </div>
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                {slides[currentSlide].title}
              </h1>
              <p className="text-xl mb-8 opacity-90">
                {slides[currentSlide].description}
              </p>
              
              <div className="flex flex-wrap gap-4 mb-8">
                {slides[currentSlide].features.map((feature, index) => (
                  <div key={index} className="flex items-center gap-2 bg-white/10 px-3 py-1 rounded-full backdrop-blur-sm">
                    <Check className="w-4 h-4" />
                    <span className="text-sm">{feature}</span>
                  </div>
                ))}
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button size="lg" className="btn-primary px-8 py-4 text-lg">
                    Ürünleri Keşfedin
                  </Button>
                </Link>
                <Link href="/coding-app">
                  <Button size="lg" variant="outline" className="btn-secondary px-8 py-4 text-lg">
                    Kodlama Uygulaması
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="w-full max-w-md mx-auto bg-white/10 backdrop-blur-md rounded-xl p-8 shadow-2xl border border-white/20">
                <div className="mb-6">
                  <img 
                    src={slides[currentSlide].image} 
                    alt={slides[currentSlide].title}
                    className="w-full h-48 object-cover rounded-lg mb-4"
                  />
                  <div className="grid grid-cols-3 gap-4">
                    <div className="h-2 bg-white/20 rounded-full">
                      <div className="h-full bg-white rounded-full w-3/4"></div>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full">
                      <div className="h-full bg-white rounded-full w-1/2"></div>
                    </div>
                    <div className="h-2 bg-white/20 rounded-full">
                      <div className="h-full bg-white rounded-full w-5/6"></div>
                    </div>
                  </div>
                </div>
                <div className="flex justify-center space-x-2">
                  {slides.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentSlide(index)}
                      className={`w-3 h-3 rounded-full transition-all ${
                        currentSlide === index ? 'bg-white' : 'bg-white/40'
                      }`}
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Slider Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/10 hover:bg-white/20 p-2 rounded-full backdrop-blur-sm transition-colors"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
        
        {/* Background Effects */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent"></div>
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-48 h-48 bg-white/10 rounded-full blur-3xl"></div>
      </section>

      {/* Features Section */}
      <section className="py-20 clk-bg-light">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold clk-text-dark mb-4">
              Neden CLKtech'i Tercih Etmelisiniz?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Yaratıcılar, eğitimciler ve mühendisler için tasarlanmış profesyonel seviye robotik geliştirme araçları
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card p-8 card-hover">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-dark mb-4 text-center">Gelişmiş Kontrol Kartları</h3>
              <p className="text-gray-600 text-center">
                Karmaşık robotik projeler için geniş giriş/çıkış kabiliyetleri olan yüksek performanslı mikrokontrolörler
              </p>
            </Card>
            <Card className="feature-card p-8 card-hover">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-dark mb-4 text-center">Blok Tabanlı Kodlama</h3>
              <p className="text-gray-600 text-center">
                Robotunuz için optimize edilmiş kod üreten sezgisel görsel programlama ortamı
              </p>
            </Card>
            <Card className="feature-card p-8 card-hover">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-dark mb-4 text-center">Profesyonel Kalite</h3>
              <p className="text-gray-600 text-center">
                Kapsamlı test ve dokümantasyon ile endüstriyel kalite bileşenler
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 clk-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold clk-text-dark mb-4">
              Ürünlerimiz
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Robot kontrol kartları ve elektronik modüller ürün yelpazemizi keşfedin
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" className="btn-primary px-8 py-4 text-lg">
                Tüm Ürünleri Görüntüle
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Coding App Preview */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl lg:text-4xl font-bold clk-text-dark mb-6">
                CLK Block Code
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Sezgisel blok tabanlı kodlama ortamımız robot programlamayı herkes için erişilebilir hale getirir.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold clk-text-dark mb-4">Temel Özellikler:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-primary mr-3" />
                    Görsel blok tabanlı programlama
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-primary mr-3" />
                    Gerçek zamanlı kod üretimi
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-primary mr-3" />
                    Donanım simülasyonu
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-primary mr-3" />
                    Çoklu platform desteği
                  </li>
                </ul>
              </div>

              <Link href="/coding-app">
                <Button size="lg" className="btn-primary px-8 py-4">
                  Daha Fazla Bilgi
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-gray-900 rounded-xl p-4">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 hero-gradient rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Blok Tabanlı Kodlama</h4>
                  <p className="text-sm opacity-75">Sürükle & bırak programlama arayüzü</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
