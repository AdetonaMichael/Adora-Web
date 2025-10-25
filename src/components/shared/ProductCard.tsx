import Link from "next/link";
import { Star, Heart } from "lucide-react";
import Image from "next/image";
import { formatMonetaryValue } from "@/helper/global";

interface ProductCardProps {
  product: {
    id: number;
    name: string;
    price: number;
    originalPrice?: number;
    image: string;
    vendor: string;
    rating: number;
    reviews: number;
  };
}

export function ProductCard({ product }: ProductCardProps) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white rounded-lg shadow-sm hover:shadow-xl transition-all overflow-hidden">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={product.image} 
            alt={product.name}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            className="object-cover group-hover:scale-105 transition-transform duration-300"
            priority={false}
          />
        
          {discount > 0 && (
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-md text-xs font-semibold">
              -{discount}%
            </div>
          )}
          <button className="absolute top-2 right-2 bg-white p-2 rounded-full shadow-md hover:bg-red-50 transition">
            <Heart size={18} className="text-gray-600 hover:text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 text-gray-600 line-clamp-2 group-hover:text-blue-600">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 mb-2">{product.vendor}</p>
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium">{product.rating}</span>
            <span className="text-xs text-gray-500">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900">
              {formatMonetaryValue(product.price)}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                {formatMonetaryValue(product.originalPrice)}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}