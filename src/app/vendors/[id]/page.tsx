"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Star,
  MapPin,
  Store,
  Package,
  Users,
  Shield,
  Clock,
  MessageCircle,
  Heart,
  Search,
  SlidersHorizontal,
  ChevronDown,
  Award,
  TrendingUp,
  ThumbsUp
} from "lucide-react";

const vendor = {
  id: 1,
  name: "TechGear Plus",
  logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
  banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=1200&h=400&fit=crop",
  description: "Your trusted source for cutting-edge electronics and gadgets. We offer premium tech products with excellent customer service and fast shipping worldwide.",
  rating: 4.8,
  reviews: 2543,
  products: 1240,
  followers: "50K",
  orders: "125K+",
  responseTime: "< 2 hours",
  verified: true,
  joinedDate: "January 2020",
  location: "San Francisco, CA",
  categories: ["Electronics", "Gadgets", "Accessories", "Audio"],
  badges: ["Top Rated", "Fast Shipping", "Verified"],
  stats: {
    totalSales: "125K+",
    satisfactionRate: "98%",
    repeatCustomers: "75%",
    responseRate: "99%"
  }
};

const products = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 234,
    sales: "2.5K"
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.9,
    reviews: 456,
    sales: "3.2K"
  },
  {
    id: 3,
    name: "4K Action Camera",
    price: 249.99,
    originalPrice: 349.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 523,
    sales: "1.8K"
  },
  {
    id: 4,
    name: "Wireless Earbuds",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1590658165737-15a047b7ac52?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 312,
    sales: "4.1K"
  },
  {
    id: 5,
    name: "Portable Speaker",
    price: 79.99,
    originalPrice: 119.99,
    image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 189,
    sales: "1.5K"
  },
  {
    id: 6,
    name: "Gaming Keyboard",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 421,
    sales: "2.2K"
  }
];

const reviews = [
  {
    id: 1,
    user: "Sarah M.",
    rating: 5,
    date: "1 week ago",
    comment: "Excellent vendor! Fast shipping and great customer service. The product quality is outstanding.",
    helpful: 42
  },
  {
    id: 2,
    user: "John D.",
    rating: 5,
    date: "2 weeks ago",
    comment: "Very professional seller. Product arrived well-packaged and exactly as described. Will definitely shop again!",
    helpful: 35
  },
  {
    id: 3,
    user: "Mike R.",
    rating: 4,
    date: "3 weeks ago",
    comment: "Good experience overall. Product quality is great, shipping took a bit longer than expected but worth the wait.",
    helpful: 28
  },
  {
    id: 4,
    user: "Emily L.",
    rating: 5,
    date: "1 month ago",
    comment: "Best vendor on the platform! Always reliable, fast responses, and top-quality products.",
    helpful: 51
  }
];

export default function VendorDetailsPage() {
  const [activeTab, setActiveTab] = useState("products");
  const [sortBy, setSortBy] = useState("featured");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredProducts = products.filter(product =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Banner Section */}
      <div className="relative h-64 md:h-80 bg-gradient-to-r from-blue-600 to-purple-700 overflow-hidden">
        <Image
          src={vendor.banner}
          alt={vendor.name}
          fill
          className="object-cover opacity-40"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
      </div>

      {/* Vendor Info Card */}
      <div className="container mx-auto px-4">
        <div className="relative -mt-20 mb-8">
          <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl border border-gray-200 dark:border-gray-700 p-6 md:p-8">
            <div className="flex flex-col md:flex-row gap-6">
              {/* Logo */}
              <div className="relative w-32 h-32 md:w-40 md:h-40 rounded-2xl overflow-hidden border-4 border-white dark:border-gray-700 shadow-lg flex-shrink-0 mx-auto md:mx-0">
                <Image
                  src={vendor.logo}
                  alt={vendor.name}
                  fill
                  className="object-cover"
                />
                {vendor.verified && (
                  <div className="absolute bottom-2 right-2 bg-blue-600 text-white p-2 rounded-full">
                    <Shield size={16} />
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="flex-1">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div>
                    <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2">
                      {vendor.name}
                    </h1>
                    <div className="flex flex-wrap items-center gap-3 mb-3">
                      <div className="flex items-center gap-1">
                        <Star size={20} className="fill-yellow-400 text-yellow-400" />
                        <span className="text-xl font-bold dark:text-white">{vendor.rating}</span>
                        <span className="text-gray-600 dark:text-gray-400">({vendor.reviews} reviews)</span>
                      </div>
                      <div className="flex items-center gap-1 text-gray-600 dark:text-gray-400">
                        <MapPin size={16} />
                        <span>{vendor.location}</span>
                      </div>
                    </div>
                    
                    {/* Badges */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {vendor.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 text-sm font-semibold rounded-full"
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col gap-3 min-w-[200px]">
                    <button className="flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition font-semibold">
                      <Heart size={20} />
                      Follow
                    </button>
                    <button className="flex items-center justify-center gap-2 border-2 border-gray-300 dark:border-gray-600 px-6 py-3 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-semibold">
                      <MessageCircle size={20} />
                      Contact
                    </button>
                  </div>
                </div>

                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                  {vendor.description}
                </p>

                {/* Stats */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Package size={18} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.products}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Products</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Users size={18} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.followers}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Followers</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <TrendingUp size={18} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.orders}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Total Orders</div>
                  </div>
                  <div className="text-center md:text-left">
                    <div className="flex items-center gap-2 mb-1">
                      <Clock size={18} className="text-blue-600 dark:text-blue-400" />
                      <span className="text-2xl font-bold text-gray-900 dark:text-white">{vendor.responseTime}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Response Time</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Performance Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {Object.entries(vendor.stats).map(([key, value], idx) => (
            <motion.div
              key={key}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-200 dark:border-gray-700 text-center"
            >
              <div className="text-3xl font-bold text-blue-600 dark:text-blue-400 mb-2">
                {value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-400 capitalize">
                {key.replace(/([A-Z])/g, ' $1').trim()}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Tabs */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          <div className="border-b border-gray-200 dark:border-gray-700">
            <div className="flex overflow-x-auto">
              {["products", "about", "reviews"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`flex-1 min-w-[120px] px-6 py-4 font-semibold capitalize whitespace-nowrap ${
                    activeTab === tab
                      ? "border-b-2 border-blue-600 text-blue-600 dark:text-blue-400"
                      : "text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                  }`}
                >
                  {tab} {tab === "products" && `(${vendor.products})`}
                </button>
              ))}
            </div>
          </div>

          <div className="p-6 md:p-8">
            {activeTab === "products" && (
              <div>
                {/* Search & Filter */}
                <div className="flex flex-col md:flex-row gap-4 mb-6">
                  <div className="relative flex-1">
                    <input
                      type="text"
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full px-4 py-3 pr-12 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <Search className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                  </div>
                  <div className="flex gap-3">
                    <button className="flex items-center gap-2 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-700">
                      <SlidersHorizontal size={20} />
                      <span className="hidden md:inline">Filters</span>
                    </button>
                    <div className="relative">
                      <select
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                        className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        <option value="featured">Featured</option>
                        <option value="price-low">Price: Low to High</option>
                        <option value="price-high">Price: High to Low</option>
                        <option value="rating">Highest Rated</option>
                        <option value="sales">Best Selling</option>
                      </select>
                      <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
                    </div>
                  </div>
                </div>

                {/* Products Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                  {filteredProducts.map((product, idx) => (
                    <motion.div
                      key={product.id}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.05 }}
                    >
                      <ProductCard product={product} />
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === "about" && (
              <div>
                <h2 className="text-2xl font-bold mb-6 dark:text-white">About {vendor.name}</h2>
                
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Our Story</h3>
                    <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                      {vendor.description} Since joining in {vendor.joinedDate}, we've built a reputation for quality products, 
                      excellent customer service, and fast shipping. Our commitment to customer satisfaction has made us one of 
                      the top-rated vendors on the platform.
                    </p>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Categories</h3>
                    <div className="flex flex-wrap gap-2">
                      {vendor.categories.map((category) => (
                        <span
                          key={category}
                          className="px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg font-medium"
                        >
                          {category}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-4 dark:text-white">Achievements</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="flex items-center gap-3 p-4 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Award className="text-blue-600 dark:text-blue-400" size={24} />
                        <div>
                          <div className="font-semibold dark:text-white">Top Rated Seller</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">2024</div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-green-50 dark:bg-green-900/20 rounded-lg">
                        <ThumbsUp className="text-green-600 dark:text-green-400" size={24} />
                        <div>
                          <div className="font-semibold dark:text-white">98% Satisfaction</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">From customers</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold mb-3 dark:text-white">Policies</h3>
                    <div className="space-y-3">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">Returns & Refunds</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">30-day return policy on all products</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">Shipping</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">Free shipping on orders over $50</div>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="text-blue-600 dark:text-blue-400 text-sm font-bold">✓</span>
                        </div>
                        <div>
                          <div className="font-medium dark:text-white">Warranty</div>
                          <div className="text-sm text-gray-600 dark:text-gray-400">1-2 year warranty on electronics</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "reviews" && (
              <div>
                <div className="flex items-center justify-between mb-8">
                  <div>
                    <h2 className="text-2xl font-bold dark:text-white">Customer Reviews</h2>
                    <p className="text-gray-600 dark:text-gray-400">{vendor.reviews} total reviews</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-2 mb-1">
                      <Star size={24} className="fill-yellow-400 text-yellow-400" />
                      <span className="text-3xl font-bold dark:text-white">{vendor.rating}</span>
                    </div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">Average Rating</div>
                  </div>
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
                        👍 Helpful ({review.helpful})
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function ProductCard({ product }: { product: typeof products[0] }) {
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
            <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
              -{discount}%
            </div>
          )}
          <button className="absolute top-2 right-2 bg-white dark:bg-gray-800 p-2 rounded-full shadow-md hover:bg-red-50 dark:hover:bg-red-900/20 transition opacity-0 group-hover:opacity-100">
            <Heart size={16} className="text-gray-600 dark:text-gray-300" />
          </button>
        </div>
        <div className="p-4">
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-white">
            {product.name}
          </h3>
          <div className="flex items-center gap-1 mb-2">
            <Star size={14} className="fill-yellow-400 text-yellow-400" />
            <span className="text-sm font-medium dark:text-white">{product.rating}</span>
            <span className="text-xs text-gray-500 dark:text-gray-400">({product.reviews})</span>
            <span className="text-xs text-gray-400 dark:text-gray-500 ml-auto">{product.sales} sold</span>
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