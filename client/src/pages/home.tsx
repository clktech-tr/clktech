import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { ProductCard } from "@/components/product/product-card";
import { Cpu, Code, Shield, ArrowRight, Check } from "lucide-react";
import type { Product } from "@shared/schema";

export default function Home() {
  const { data: products = [] } = useQuery<Product[]>({
    queryKey: ["/api/products"],
  });

  const featuredProducts = products.slice(0, 3);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="hero-gradient text-white py-20 lg:py-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Advanced Robot Controller Boards & Electronic Modules
              </h1>
              <p className="text-xl mb-8 opacity-90">
                Design, build, and program your next robotics project with CLKtech's professional-grade controller boards and intuitive block-based coding environment.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link href="/products">
                  <Button size="lg" className="btn-primary px-8 py-4 text-lg">
                    Explore Products
                  </Button>
                </Link>
                <Link href="/coding-app">
                  <Button size="lg" variant="outline" className="btn-secondary px-8 py-4 text-lg">
                    Download Coding App
                  </Button>
                </Link>
              </div>
            </div>
            <div className="text-center">
              <div className="w-full max-w-md mx-auto bg-gray-800 rounded-xl p-8 shadow-2xl">
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                  <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                </div>
                <div className="bg-orange-500 rounded-lg p-4 mb-4">
                  <p className="text-white font-semibold">CLKtech Controller</p>
                </div>
                <div className="flex justify-center space-x-2">
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                  <div className="w-6 h-6 bg-orange-500 rounded-full"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold clk-text-black mb-4">
              Why Choose CLKtech?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Professional-grade robotics development tools designed for makers, educators, and engineers
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="feature-card p-8">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Cpu className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-black mb-4 text-center">Advanced Controllers</h3>
              <p className="text-gray-600 text-center">
                High-performance microcontrollers with extensive I/O capabilities for complex robotics projects
              </p>
            </Card>
            <Card className="feature-card p-8">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Code className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-black mb-4 text-center">Block-Based Coding</h3>
              <p className="text-gray-600 text-center">
                Intuitive visual programming environment that generates optimized code for your robot
              </p>
            </Card>
            <Card className="feature-card p-8">
              <div className="w-16 h-16 hero-gradient rounded-full flex items-center justify-center mb-6 mx-auto">
                <Shield className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold clk-text-black mb-4 text-center">Professional Grade</h3>
              <p className="text-gray-600 text-center">
                Industrial-quality components with comprehensive testing and documentation
              </p>
            </Card>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section className="py-20 clk-bg-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold clk-text-black mb-4">
              Our Products
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Explore our range of robot controller boards and electronic modules
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProducts.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
          
          <div className="text-center mt-12">
            <Link href="/products">
              <Button size="lg" variant="outline" className="btn-secondary px-8 py-3">
                View All Products
                <ArrowRight className="w-5 h-5 ml-2" />
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
              <h2 className="text-3xl lg:text-4xl font-bold clk-text-black mb-6">
                CLK Block Code
              </h2>
              <p className="text-xl text-gray-600 mb-8">
                Our intuitive block-based coding environment makes programming robots accessible to everyone.
              </p>
              
              <div className="bg-gray-50 p-6 rounded-xl mb-8">
                <h3 className="text-lg font-semibold clk-text-black mb-4">Key Features:</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    Visual block-based programming
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    Real-time code generation
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    Hardware simulation
                  </li>
                  <li className="flex items-center">
                    <Check className="w-5 h-5 clk-text-orange mr-3" />
                    Multi-platform support
                  </li>
                </ul>
              </div>

              <Link href="/coding-app">
                <Button size="lg" className="btn-primary px-8 py-4">
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="bg-gray-900 rounded-xl p-4">
              <div className="aspect-video bg-gray-800 rounded-lg flex items-center justify-center">
                <div className="text-center text-white">
                  <div className="w-20 h-20 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Code className="w-10 h-10" />
                  </div>
                  <h4 className="text-lg font-semibold mb-2">Block-Based Coding</h4>
                  <p className="text-sm opacity-75">Drag & drop programming interface</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
