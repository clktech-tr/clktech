import { useQuery } from "@tanstack/react-query";
import { useParams, Link } from "wouter";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { OrderForm } from "@/components/order/order-form";
import { ArrowLeft, ExternalLink } from "lucide-react";
import { useState } from "react";
import type { Product } from "@shared/schema";

export default function ProductDetail() {
  const { id } = useParams();
  const [showOrderForm, setShowOrderForm] = useState(false);

  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["/api/products", id],
    enabled: !!id,
  });

  if (isLoading) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-orange-500 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading product details...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!product) {
    return (
      <div className="min-h-screen py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-2xl font-bold clk-text-black mb-4">Product Not Found</h1>
            <p className="text-gray-600 mb-8">The product you're looking for doesn't exist.</p>
            <Link href="/products">
              <Button className="btn-primary">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Products
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const specs = product.specs ? JSON.parse(product.specs) : {};

  return (
    <div className="min-h-screen py-20 clk-bg-gray">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb */}
        <div className="mb-8">
          <Link href="/products" className="inline-flex items-center text-gray-600 hover:text-orange-500">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Products
          </Link>
        </div>

        {/* Product Detail */}
        <Card className="overflow-hidden">
          <CardContent className="p-8">
            <div className="grid lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div>
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full rounded-lg shadow-lg"
                />
              </div>

              {/* Product Info */}
              <div>
                <div className="mb-6">
                  <h1 className="text-3xl font-bold clk-text-black mb-4">{product.name}</h1>
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-4xl font-bold clk-text-orange">${product.price}</span>
                    <Badge className={product.inStock ? "product-badge" : "bg-red-500"}>
                      {product.inStock ? "In Stock" : "Out of Stock"}
                    </Badge>
                  </div>
                  <p className="text-gray-600 text-lg">{product.description}</p>
                </div>

                {/* Technical Specifications */}
                <div className="tech-spec p-6 rounded-lg mb-8">
                  <h3 className="text-xl font-semibold clk-text-black mb-4">Technical Specifications</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {Object.entries(specs).map(([key, value]) => (
                      <div key={key} className="flex justify-between border-b pb-2">
                        <span className="font-medium capitalize">{key.replace('_', ' ')}:</span>
                        <span className="text-gray-600">{value as string}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Full Description */}
                <div className="mb-8">
                  <h3 className="text-xl font-semibold clk-text-black mb-4">Product Details</h3>
                  <p className="text-gray-600 leading-relaxed">{product.fullDescription}</p>
                </div>

                {/* Purchase Options */}
                <div className="space-y-4">
                  <Button
                    size="lg"
                    className="btn-primary w-full py-4 text-lg"
                    onClick={() => setShowOrderForm(true)}
                    disabled={!product.inStock}
                  >
                    Buy via Bank Transfer
                  </Button>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Button
                      variant="outline"
                      size="lg"
                      className="btn-secondary py-4"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Buy from Etsy
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                    <Button
                      variant="outline"
                      size="lg"
                      className="btn-secondary py-4"
                      asChild
                    >
                      <a href="#" target="_blank" rel="noopener noreferrer">
                        Buy from N11
                        <ExternalLink className="w-4 h-4 ml-2" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <OrderForm
        product={product}
        isOpen={showOrderForm}
        onClose={() => setShowOrderForm(false)}
      />
    </div>
  );
}
