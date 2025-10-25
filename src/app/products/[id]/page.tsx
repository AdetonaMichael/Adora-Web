"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  Heart,
  Share2,
  ShoppingCart,
  Truck,
  Shield,
  RotateCcw,
  ChevronRight,
  Check,
  Minus,
  Plus,
  Store,
  MessageCircle
} from "lucide-react";
import { formatMonetaryValue } from "@/helper/global";
import { EcommerceNav } from "@/components/shared/EcommerceNav";
import { Footer } from "@/components/layout/Footer";

const product = {
  id: 1,
  name: "Wireless Noise-Cancelling Headphones Pro",
  description: "Experience premium audio quality with our flagship wireless headphones. Advanced noise cancellation technology blocks out distractions while delivering crystal-clear sound. Perfect for music lovers, travelers, and professionals.",
  price: 129.99,
  originalPrice: 199.99,
  images: [
    "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=800&h=800&fit=crop",
    "https://images.unsplash.com/photo-1545127398-14699f92334b?w=800&h=800&fit=crop"
  ],
  rating: 4.8,
  reviews: 2543,
  stock: 45,
  sku: "WH-PRO-2024",
  vendor: {
    id: 1,
    name: "AudioTech Store",
    logo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    rating: 4.7,
    verified: true
  },
  features: [
    "Active Noise Cancellation",
    "40-hour battery life",
    "Premium leather ear cushions",
    "Bluetooth 5.0 connectivity",
    "Built-in microphone",
    "Foldable design with carrying case"
  ],
  specifications: {
    Brand: "AudioTech",
    Model: "WH-PRO-2024",
    Color: "Black",
    Connectivity: "Wireless/Bluetooth 5.0",
    Battery: "40 hours",
    Weight: "250g",
    Warranty: "2 Years"
  },
  colors: ["Black", "Silver", "Blue"],
  inStock: true
};

const relatedProducts = [
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8
  },
  {
    id: 3,
    name: "Wireless Earbuds Pro",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7ac52?w=400&h=400&fit=crop",
    rating: 4.6
  },
  {
    id: 4,
    name: "Portable Speaker",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.7
  },
  {
    id: 5,
    name: "USB-C Cable",
    price: 19.99,
    image: "https://images.unsplash.com/photo-1591290619762-c588f0c5b5c9?w=400&h=400&fit=crop",
    rating: 4.5
  }
];

const reviews = [
  {
    id: 1,
    user: "John D.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Absolutely amazing! The sound quality is incredible and the noise cancellation works perfectly. Best headphones I've ever owned.",
    helpful: 24
  },
  {
    id: 2,
    user: "Sarah M.",
    rating: 4,
    date: "1 month ago",
    comment: "Great headphones overall. Very comfortable for long listening sessions. Only minor complaint is the case could be smaller.",
    helpful: 18
  },
  {
    id: 3,
    user: "Mike R.",
    rating: 5,
    date: "2 months ago",
    comment: "Worth every penny! Battery life is outstanding and they're so comfortable I forget I'm wearing them.",
    helpful: 31
  }
];

export default function ProductDetailsPage() {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState("Black");
  const [activeTab, setActiveTab] = useState("description");

  const discount = Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100);

  return (
    <>
    <EcommerceNav/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Breadcrumb */}
      <div className="bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
            <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
            <ChevronRight size={16} />
            <Link href="/categories/electronics" className="hover:text-blue-600 dark:hover:text-blue-400">Electronics</Link>
            <ChevronRight size={16} />
            <span className="text-gray-900 dark:text-white font-medium">Headphones</span>
          </div>
        </div>
      </div>

      <div className="container-fluid mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12 mb-12">
          {/* Product Images */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="sticky top-24"
            >
              <div className="bg-white dark:bg-gray-800 rounded-2xl overflow-hidden border border-gray-200 dark:border-gray-700 mb-4">
                <div className="relative aspect-square">
                  <Image
                    src={product.images[selectedImage]}
                    alt={product.name}
                    fill
                    className="object-cover"
                    priority
                  />
                  {discount > 0 && (
                    <div className="absolute top-4 left-4 bg-red-500 text-white px-3 py-1 rounded-lg font-bold">
                      -{discount}% OFF
                    </div>
                  )}
                  <div className="absolute top-4 right-4 flex gap-2">
                    <button className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-red-50 dark:hover:bg-red-900/20">
                      <Heart size={20} className="text-gray-700 dark:text-gray-300" />
                    </button>
                    <button className="bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg hover:bg-blue-50 dark:hover:bg-blue-900/20">
                      <Share2 size={20} className="text-gray-700 dark:text-gray-300" />
                    </button>
                  </div>
                </div>
              </div>

              {/* Thumbnails */}
              <div className="grid grid-cols-4 gap-3">
                {product.images.map((image, idx) => (
                  <button
                    key={idx}
                    onClick={() => setSelectedImage(idx)}
                    className={`relative aspect-square rounded-xl overflow-hidden border-2 transition ${
                      selectedImage === idx
                        ? "border-blue-600 dark:border-blue-400"
                        : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`${product.name} ${idx + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </motion.div>
          </div>

          {/* Product Info */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
          >
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-4">
              {product.name}
            </h1>

            {/* Rating & Reviews */}
            <div className="flex items-center gap-4 mb-6">
              <div className="flex items-center gap-1">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    size={20}
                    className={i < Math.floor(product.rating) ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                  />
                ))}
              </div>
              <span className="text-lg font-semibold dark:text-white">{product.rating}</span>
              <span className="text-gray-600 dark:text-gray-400">({product.reviews} reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-center gap-4 mb-6">
              <span className="text-4xl font-bold text-gray-900 dark:text-white">
                {formatMonetaryValue(product.price)}
              </span>
              {product.originalPrice && (
                <>
                  <span className="text-2xl text-gray-400 line-through">
                    {formatMonetaryValue(product.originalPrice)}
                  </span>
                  <span className="bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400 px-3 py-1 rounded-lg font-bold">
                    Save {formatMonetaryValue((product.originalPrice - product.price))}
                  </span>
                </>
              )}
            </div>

            {/* Stock Status */}
            <div className="flex items-center gap-2 mb-6">
              {product.inStock ? (
                <>
                  <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                  <span className="text-green-600 dark:text-green-400 font-medium">
                    In Stock ({product.stock} available)
                  </span>
                </>
              ) : (
                <>
                  <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                  <span className="text-red-600 dark:text-red-400 font-medium">Out of Stock</span>
                </>
              )}
            </div>

            {/* Description */}
            <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
              {product.description}
            </p>

            {/* Color Selection */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Color</h3>
              <div className="flex gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-6 py-3 rounded-lg border-2 transition ${
                      selectedColor === color
                        ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 font-semibold"
                        : "border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500"
                    }`}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity */}
            <div className="mb-6">
              <h3 className="font-semibold text-gray-900 dark:text-white mb-3">Quantity</h3>
              <div className="flex items-center gap-4">
                <div className="flex items-center border-2 border-gray-300 dark:border-gray-600 rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Minus size={20} />
                  </button>
                  <span className="px-6 py-3 font-semibold dark:text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                    className="p-3 hover:bg-gray-100 dark:hover:bg-gray-700"
                  >
                    <Plus size={20} />
                  </button>
                </div>
                <span className="text-gray-600 dark:text-gray-400">
                  Max: {product.stock} items
                </span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mb-8">
              <button className="flex-1 flex items-center justify-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl hover:bg-blue-700 transition font-bold text-lg shadow-lg">
                <ShoppingCart size={24} />
                Add to Cart
              </button>
              <Link href="/checkout" className="flex-1">
              <button className="flex items-center justify-center gap-2 border-2 border-blue-600 text-blue-600 dark:text-blue-400 px-8 py-4 rounded-xl hover:bg-blue-50 dark:hover:bg-blue-900/20 transition font-bold">
                Buy Now
              </button>
              </Link>
            </div>

            {/* Trust Badges */}
            <div className="grid grid-cols-3 gap-4 p-6 bg-gray-100 dark:bg-gray-800 rounded-xl mb-6">
              <div className="text-center">
                <Truck className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                <div className="text-xs font-medium dark:text-white">Free Shipping</div>
              </div>
              <div className="text-center">
                <Shield className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                <div className="text-xs font-medium dark:text-white">2-Year Warranty</div>
              </div>
              <div className="text-center">
                <RotateCcw className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
                <div className="text-xs font-medium dark:text-white">30-Day Returns</div>
              </div>
            </div>

            {/* Vendor Info */}
            <div className="border-2 border-gray-200 dark:border-gray-700 rounded-xl p-6">
              <div className="flex items-center gap-4 mb-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden">
                  <Image
                    src={product.vendor.logo}
                    alt={product.vendor.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h4 className="font-bold text-lg dark:text-white">{product.vendor.name}</h4>
                    {product.vendor.verified && (
                      <div className="bg-blue-600 text-white p-1 rounded-full">
                        <Check size={12} />
                      </div>
                    )}
                  </div>
                  <div className="flex items-center gap-1 text-sm">
                    <Star size={14} className="fill-yellow-400 text-yellow-400" />
                    <span className="font-medium dark:text-white">{product.vendor.rating}</span>
                    <span className="text-gray-500 dark:text-gray-400">Vendor Rating</span>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <Link
                  href={`/vendors/${product.vendor.id}`}
                  className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                >
                  <Store size={18} />
                  Visit Store
                </Link>
                <button className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 px-4 py-3 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium">
                  <MessageCircle size={18} />
                  Chat
                </button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Tabs Section */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden mb-12">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex">
              {["description", "specifications", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 px-6 py-4 font-semibold capitalize ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          <div className="p-8">
            {activeTab === "description" && (
              <div>
                <h3 className="text-2xl font-bold mb-4 dark:text-white">Product Description</h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {product.description}
                </p>
                <h4 className="text-xl font-bold mb-4 dark:text-white">Key Features</h4>
                <ul className="grid md:grid-cols-2 gap-3">
                  {product.features.map((feature, idx) => (
                    <li key={idx} className="flex items-start gap-3">
                      <Check className="text-green-500 flex-shrink-0 mt-1" size={20} />
                      <span className="text-gray-700 dark:text-gray-300">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {activeTab === "specifications" && (
              <div>
                <h3 className="text-2xl font-bold mb-6 dark:text-white">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between border-b border-gray-200 dark:border-gray-700 pb-3">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">{key}:</span>
                      <span className="text-gray-900 dark:text-white">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h3 className="text-2xl font-bold dark:text-white">Customer Reviews</h3>
                    <p className="text-gray-600 dark:text-gray-400">{product.reviews} total reviews</p>
                  </div>
                  <button className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 font-semibold">
                    Write a Review
                  </button>
                </div>

                <div className="space-y-6">
                  {reviews.map((review) => (
                    <div key={review.id} className="border-b border-gray-200 dark:border-gray-700 pb-6 last:border-0">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h4 className="font-bold dark:text-white">{review.user}</h4>
                          <div className="flex items-center gap-2 mt-1">
                            <div className="flex">
                              {Array.from({ length: 5 }).map((_, i) => (
                                <Star
                                  key={i}
                                  size={16}
                                  className={i < review.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300 dark:text-gray-600"}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500 dark:text-gray-400">{review.date}</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-gray-700 dark:text-gray-300 mb-3">{review.comment}</p>
                      <button className="text-sm text-gray-600 dark:text-gray-400 hover:text-blue-600 dark:hover:text-blue-400">
                        Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Related Products */}
        <div>
          <h2 className="text-3xl font-bold mb-8 dark:text-white">Related Products</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {relatedProducts.map((item) => (
              <Link key={item.id} href={`/products/${item.id}`} className="group">
                <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition">
                  <div className="relative aspect-square bg-gray-100 dark:bg-gray-700">
                    <Image
                      src={item.image}
                      alt={item.name}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-sm mb-2 line-clamp-2 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {item.name}
                    </h3>
                    <div className="flex items-center gap-1 mb-2">
                      <Star size={14} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-sm font-medium dark:text-white">{item.rating}</span>
                    </div>
                    <p className="text-lg font-bold dark:text-white">{formatMonetaryValue(item.price)}</p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}