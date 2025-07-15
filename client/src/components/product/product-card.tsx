import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Link } from "wouter";
import type { Product } from "@shared/schema";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="card-hover bg-white rounded-xl shadow-lg overflow-hidden">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-48 object-cover"
        />
        <Badge className="product-badge absolute top-4 right-4">
          {product.inStock ? "In Stock" : "Out of Stock"}
        </Badge>
      </div>
      <CardContent className="p-6">
        <h3 className="text-xl font-semibold clk-text-black mb-2">{product.name}</h3>
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex items-center justify-between">
          <span className="text-2xl font-bold clk-text-orange">${product.price}</span>
          <Link href={`/products/${product.id}`}>
            <Button className="btn-primary">View Details</Button>
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}
