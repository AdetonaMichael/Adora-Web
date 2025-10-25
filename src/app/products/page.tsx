"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  SlidersHorizontal, 
  ChevronDown, 
  Star,
  Heart,
  Grid3x3,
  List,
} from "lucide-react";
import { EcommerceNav } from "@/components/shared/EcommerceNav";
import { Footer } from "@/components/layout/Footer";

interface Product {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  image: string;
  vendor: string;
  rating: number;
  reviews: number;
  category: string;
}

const products: Product[] = [
  {
    id: 1,
    name: "Wireless Noise-Cancelling Headphones Pro",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    vendor: "AudioTech Store",
    rating: 4.5,
    reviews: 234,
    category: "Electronics"
  },
  {
    id: 2,
    name: "Smart Watch Series 5 - GPS + Cellular",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    vendor: "TechGear Plus",
    rating: 4.8,
    reviews: 456,
    category: "Electronics"
  },
  {
    id: 3,
    name: "Premium Leather Crossbody Bag",
    price: 89.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    vendor: "Fashion House",
    rating: 4.6,
    reviews: 189,
    category: "Fashion"
  },
  {
    id: 4,
    name: "Automatic Coffee Maker with Grinder",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    vendor: "HomeEssentials",
    rating: 4.7,
    reviews: 312,
    category: "Home"
  },
  {
    id: 5,
    name: "Professional Yoga Mat with Strap",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    vendor: "FitLife Store",
    rating: 4.4,
    reviews: 167,
    category: "Sports"
  },
  {
    id: 6,
    name: "4K Ultra HD Action Camera",
    price: 249.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    vendor: "TechGear Plus",
    rating: 4.9,
    reviews: 523,
    category: "Electronics"
  },
  {
    id: 7,
    name: "Designer Sunglasses Collection",
    price: 129.99,
    image: "https://images.unsplash.com/photo-1572635196237-14b3f281503f?w=400&h=400&fit=crop",
    vendor: "Fashion House",
    rating: 4.3,
    reviews: 98,
    category: "Fashion"
  },
  {
    id: 8,
    name: "Organic Bamboo Bed Sheet Set",
    price: 79.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1631049307264-da0ec9d70304?w=400&h=400&fit=crop",
    vendor: "HomeEssentials",
    rating: 4.7,
    reviews: 276,
    category: "Home"
  }
];

const heroImages = [
  "https://images.unsplash.com/photo-1607082348824-0a96f2a4b9da?w=1920&h=600&fit=crop",
  "https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=1920&h=600&fit=crop",
  "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=1920&h=600&fit=crop",
  "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920&h=600&fit=crop",
  "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=1920&h=600&fit=crop"
];

export default function ProductsListingPage() {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [sortBy, setSortBy] = useState("featured");
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const categories = ["All", "Electronics", "Fashion", "Home", "Sports"];
  const priceRanges = ["Under $50", "$50 - $100", "$100 - $200", "Over $200"];

  const filteredProducts = selectedCategory === "All" 
    ? products 
    : products.filter(p => p.category === selectedCategory);

  // Auto-scroll background images
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % heroImages.length);
    }, 5000); // Change image every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <>
    <EcommerceNav/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-gray-600 via-gray-600 to-gray-700 dark:from-gray-800 dark:via-gray-800 dark:to-gray text-white py-16 overflow-hidden">
        {/* Auto-scrolling Background Images */}
        <div className="absolute inset-0">
          {heroImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: currentImageIndex === index ? 1 : 0,
                scale: currentImageIndex === index ? 1 : 1.1
              }}
              transition={{ duration: 1.5, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src={image}
                alt={`Hero background ${index + 1}`}
                fill
                className="object-cover"
                priority={index === 0}
              />
            </motion.div>
          ))}
          {/* Gradient Overlay */}
          {/* <div className="absolute inset-0 bg-gradient-to-r from-gray-900/90 dark:via-gray-800/90 dark:to-black/90"></div> */}
        </div>

        {/* Decorative Overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_60%)]"></div>
        
        {/* Progress Indicators */}
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex gap-2 z-10">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentImageIndex(index)}
              className={`h-1.5 rounded-full transition-all ${
                currentImageIndex === index 
                  ? "w-8 bg-white" 
                  : "w-1.5 bg-white/50 hover:bg-white/75"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <div className="container-fluid mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Discover Amazing Products
            </h1>
            <p className="text-lg text-blue-100 dark:text-gray-300 mb-8">
              Browse through thousands of products from verified vendors
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search for products, brands, or categories..."
                className="w-full px-6 py-4 pr-14 rounded-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-blue-400 focus:outline-none shadow-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-full hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-fluid mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <aside className={`lg:w-64 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-gray-700 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-lg">Filters</h3>
                <button className="text-blue-600 dark:text-blue-400 text-sm font-medium">
                  Clear All
                </button>
              </div>

              {/* Categories */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Categories</h4>
                <div className="space-y-2">
                  {categories.map((category) => (
                    <label key={category} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="radio"
                        name="category"
                        checked={selectedCategory === category}
                        onChange={() => setSelectedCategory(category)}
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {category}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price Range */}
              <div className="mb-6">
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Price Range</h4>
                <div className="space-y-2">
                  {priceRanges.map((range) => (
                    <label key={range} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700 dark:text-gray-300 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                        {range}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Rating */}
              <div>
                <h4 className="font-semibold mb-3 text-gray-900 dark:text-white">Rating</h4>
                <div className="space-y-2">
                  {[4, 3, 2, 1].map((rating) => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer group">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                      />
                      <div className="flex items-center gap-1">
                        {Array.from({ length: rating }).map((_, i) => (
                          <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="text-sm text-gray-700 dark:text-gray-300 ml-1">& Up</span>
                      </div>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Main Content */}
          <main className="flex-1">
            {/* Toolbar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-4 flex-wrap">
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="lg:hidden flex items-center gap-2 px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700"
                  >
                    <SlidersHorizontal size={18} />
                    Filters
                  </button>
                  <span className="text-gray-600 dark:text-gray-400">
                    <strong className="text-gray-900 dark:text-white">{filteredProducts.length}</strong> products found
                  </span>
                </div>

                <div className="flex items-center gap-3">
                  {/* Sort */}
                  <div className="relative">
                    <select
                      value={sortBy}
                      onChange={(e) => setSortBy(e.target.value)}
                      className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="featured">Featured</option>
                      <option value="price-low">Price: Low to High</option>
                      <option value="price-high">Price: High to Low</option>
                      <option value="rating">Highest Rated</option>
                      <option value="newest">Newest</option>
                    </select>
                    <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                  </div>

                  {/* View Mode */}
                  <div className="flex border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
                    <button
                      onClick={() => setViewMode("grid")}
                      className={`p-2 ${viewMode === "grid" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
                    >
                      <Grid3x3 size={18} />
                    </button>
                    <button
                      onClick={() => setViewMode("list")}
                      className={`p-2 ${viewMode === "list" ? "bg-blue-600 text-white" : "bg-white dark:bg-gray-700 text-gray-600 dark:text-gray-300"}`}
                    >
                      <List size={18} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Products Grid/List */}
            <div className={viewMode === "grid" 
              ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-5 gap-6" 
              : "space-y-4"
            }>
              {filteredProducts.map((product, idx) => (
                <motion.div
                  key={product.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  {viewMode === "grid" ? (
                    <ProductGridCard product={product} />
                  ) : (
                    <ProductListCard product={product} />
                  )}
                </motion.div>
              ))}
            </div>

            {/* Pagination */}
            <div className="mt-12 flex justify-center">
              <div className="flex items-center gap-2">
                {[1, 2, 3, 4, 5].map((page) => (
                  <button
                    key={page}
                    className={`w-10 h-10 rounded-lg ${
                      page === 1 
                        ? "bg-blue-600 text-white" 
                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 border border-gray-200 dark:border-gray-700"
                    }`}
                  >
                    {page}
                  </button>
                ))}
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}

function ProductGridCard({ product }: { product: Product }) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-gray-700">
        <div className="relative aspect-square overflow-hidden bg-gray-100 dark:bg-gray-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              -{discount}%
            </div>
          )}
          <button className="absolute top-3 right-3 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 transition">
            <Heart size={18} className="text-gray-600 dark:text-gray-300 hover:text-red-500" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-white">
            {product.name}
          </h3>
          <p className="text-xs text-gray-500 dark:text-gray-400 mb-2">{product.vendor}</p>
          <div className="flex items-center gap-1 mb-3">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium dark:text-white">{product.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-gray-900 dark:text-white">
              ${product.price}
            </span>
            {product.originalPrice && (
              <span className="text-sm text-gray-400 line-through">
                ${product.originalPrice}
              </span>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

function ProductListCard({ product }: { product: Product }) {
  const discount = product.originalPrice 
    ? Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)
    : 0;

  return (
    <Link href={`/products/${product.id}`} className="group">
      <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-gray-700 flex">
        <div className="relative w-48 h-48 flex-shrink-0 bg-gray-100 dark:bg-gray-700">
          <Image
            src={product.image}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
          {discount > 0 && (
            <div className="absolute top-3 left-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              -{discount}%
            </div>
          )}
        </div>
        <div className="p-6 flex-1 flex flex-col justify-between">
          <div>
            <h3 className="font-bold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-white">
              {product.name}
            </h3>
            <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">by {product.vendor}</p>
            <div className="flex items-center gap-2 mb-4">
              <div className="flex items-center gap-1">
                <Star size={16} className="fill-yellow-400 text-yellow-400" />
                <span className="font-medium dark:text-white">{product.rating}</span>
              </div>
              <span className="text-sm text-gray-500 dark:text-gray-400">({product.reviews} reviews)</span>
            </div>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-gray-900 dark:text-white">
                ${product.price}
              </span>
              {product.originalPrice && (
                <span className="text-lg text-gray-400 line-through">
                  ${product.originalPrice}
                </span>
              )}
            </div>
            <button className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition">
              <Heart size={18} />
              Add to Wishlist
            </button>
          </div>
        </div>
      </div>
    </Link>
  );
}