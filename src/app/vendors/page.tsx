"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { 
  Search, 
  Star, 
  Store, 
  MapPin, 
  Package, 
  Users,
  ChevronDown,
  Shield,
  TrendingUp
} from "lucide-react";

interface Vendor {
  id: number;
  name: string;
  logo: string;
  banner: string;
  description: string;
  products: number;
  rating: number;
  reviews: number;
  followers: string;
  verified: boolean;
  location: string;
  categories: string[];
  joinedDate: string;
}

const vendors: Vendor[] = [
  {
    id: 1,
    name: "TechGear Plus",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1550745165-9bc0b252726f?w=800&h=300&fit=crop",
    description: "Your trusted source for cutting-edge electronics and gadgets. We offer premium tech products with excellent customer service.",
    products: 1240,
    rating: 4.8,
    reviews: 2543,
    followers: "50K",
    verified: true,
    location: "San Francisco, CA",
    categories: ["Electronics", "Gadgets", "Accessories"],
    joinedDate: "2020"
  },
  {
    id: 2,
    name: "Fashion House",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=800&h=300&fit=crop",
    description: "Curated fashion for the modern trendsetter. Discover unique styles and timeless pieces that define your personal style.",
    products: 856,
    rating: 4.7,
    reviews: 1876,
    followers: "35K",
    verified: true,
    location: "New York, NY",
    categories: ["Fashion", "Accessories", "Shoes"],
    joinedDate: "2019"
  },
  {
    id: 3,
    name: "HomeEssentials",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1556912173-46c336c7fd55?w=800&h=300&fit=crop",
    description: "Transform your living space with our carefully selected home decor and essentials. Quality products for every room.",
    products: 2100,
    rating: 4.9,
    reviews: 3421,
    followers: "68K",
    verified: true,
    location: "Los Angeles, CA",
    categories: ["Home", "Decor", "Furniture"],
    joinedDate: "2018"
  },
  {
    id: 4,
    name: "AudioTech Store",
    logo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=300&fit=crop",
    description: "Premium audio equipment for audiophiles and music enthusiasts. Experience sound like never before.",
    products: 432,
    rating: 4.6,
    reviews: 987,
    followers: "28K",
    verified: true,
    location: "Austin, TX",
    categories: ["Audio", "Electronics", "Accessories"],
    joinedDate: "2021"
  },
  {
    id: 5,
    name: "FitLife Store",
    logo: "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&h=300&fit=crop",
    description: "Your fitness journey starts here. Quality workout gear and equipment to help you achieve your goals.",
    products: 678,
    rating: 4.5,
    reviews: 1432,
    followers: "42K",
    verified: true,
    location: "Miami, FL",
    categories: ["Sports", "Fitness", "Wellness"],
    joinedDate: "2020"
  },
  {
    id: 6,
    name: "BeautyBliss",
    logo: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
    banner: "https://images.unsplash.com/photo-1522335789203-aabd1fc54bc9?w=800&h=300&fit=crop",
    description: "Premium beauty and skincare products from top brands. Look and feel your best every day.",
    products: 945,
    rating: 4.8,
    reviews: 2156,
    followers: "55K",
    verified: true,
    location: "Seattle, WA",
    categories: ["Beauty", "Skincare", "Cosmetics"],
    joinedDate: "2019"
  }
];

export default function VendorsListingPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState("featured");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", "Electronics", "Fashion", "Home", "Sports", "Beauty"];

  const filteredVendors = vendors.filter(vendor => {
    const matchesSearch = vendor.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         vendor.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "All" || 
                           vendor.categories.some(cat => cat === selectedCategory);
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-black text-white py-20 overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.15),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(255,255,255,0.05),_transparent_60%)]"></div>
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-pink-500/20 rounded-full blur-3xl"></div>
        
        <div className="container mx-auto px-4 relative">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center max-w-3xl mx-auto"
          >
            <div className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/20">
              <Shield size={20} />
              <span className="text-sm font-semibold">All Vendors Verified</span>
            </div>
            
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">
              Discover Trusted{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
                Vendors
              </span>
            </h1>
            <p className="text-lg text-blue-100 dark:text-gray-300 mb-8">
              Shop from verified sellers offering quality products and excellent service
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search vendors by name or category..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full px-6 py-4 pr-14 rounded-xl text-gray-900 dark:text-gray-100 bg-white dark:bg-gray-800 border-2 border-transparent focus:border-blue-400 focus:outline-none shadow-lg"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container-fluid mx-auto px-4 py-8">
        {/* Stats Bar */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {[
            { label: "Total Vendors", value: "10,000+", icon: Store },
            { label: "Products Listed", value: "500K+", icon: Package },
            { label: "Happy Customers", value: "1M+", icon: Users },
            { label: "Avg Rating", value: "4.8", icon: Star }
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-white dark:bg-gray-800 rounded-xl p-4 border border-gray-200 dark:border-gray-700 text-center"
            >
              <stat.icon className="mx-auto mb-2 text-blue-600 dark:text-blue-400" size={24} />
              <div className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</div>
              <div className="text-sm text-gray-600 dark:text-gray-400">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Toolbar */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 shadow-sm border border-gray-200 dark:border-gray-700">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            {/* Category Filter */}
            <div className="flex items-center gap-3 overflow-x-auto pb-2 sm:pb-0 w-full sm:w-auto">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-lg font-medium whitespace-nowrap transition ${
                    selectedCategory === category
                      ? "bg-blue-600 text-white"
                      : "bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-600"
                  }`}
                >
                  {category}
                </button>
              ))}
            </div>

            {/* Sort */}
            <div className="flex items-center gap-3">
              <span className="text-sm text-gray-600 dark:text-gray-400">
                <strong className="text-gray-900 dark:text-white">{filteredVendors.length}</strong> vendors
              </span>
              <div className="relative">
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="appearance-none bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 pr-10 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="featured">Featured</option>
                  <option value="rating">Highest Rated</option>
                  <option value="products">Most Products</option>
                  <option value="followers">Most Followers</option>
                  <option value="newest">Newest</option>
                </select>
                <ChevronDown size={16} className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-gray-500" />
              </div>
            </div>
          </div>
        </div>

        {/* Vendors Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {filteredVendors.map((vendor, idx) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
            >
              <VendorCard vendor={vendor} />
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
      </div>
    </div>
  );
}

function VendorCard({ vendor }: { vendor: Vendor }) {
  return (
    <Link href={`/vendors/${vendor.id}`} className="group block">
      <div className="bg-white dark:bg-gray-800 rounded-xl overflow-hidden border border-gray-200 dark:border-gray-700 hover:shadow-xl transition-all">
        {/* Banner */}
        <div className="relative h-32 bg-gradient-to-r from-blue-500 to-purple-500 overflow-hidden">
          <Image
            src={vendor.banner}
            alt={vendor.name}
            fill
            className="object-cover opacity-80 group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* Logo */}
        <div className="relative px-6 -mt-12">
          <div className="relative w-24 h-24 rounded-xl overflow-hidden border-4 border-white dark:border-gray-800 shadow-lg">
            <Image
              src={vendor.logo}
              alt={vendor.name}
              fill
              className="object-cover"
            />
            {vendor.verified && (
              <div className="absolute bottom-1 right-1 bg-blue-600 text-white p-1 rounded-full">
                <Shield size={12} />
              </div>
            )}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 pt-4">
          <div className="flex items-start justify-between mb-3">
            <div className="flex-1">
              <h3 className="font-bold text-lg mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 dark:text-white">
                {vendor.name}
              </h3>
              <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400 mb-2">
                <MapPin size={14} />
                <span>{vendor.location}</span>
              </div>
            </div>
            <div className="flex items-center gap-1 bg-yellow-50 dark:bg-yellow-900/20 px-2 py-1 rounded-lg">
              <Star size={14} className="fill-yellow-400 text-yellow-400" />
              <span className="font-bold text-sm dark:text-white">{vendor.rating}</span>
            </div>
          </div>

          <p className="text-sm text-gray-600 dark:text-gray-400 mb-4 line-clamp-2">
            {vendor.description}
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-2 mb-4">
            {vendor.categories.slice(0, 3).map((category) => (
              <span
                key={category}
                className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-xs rounded-lg text-gray-700 dark:text-gray-300"
              >
                {category}
              </span>
            ))}
          </div>

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-4 pt-4 border-t border-gray-200 dark:border-gray-700">
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{vendor.products}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Products</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{vendor.followers}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Followers</div>
            </div>
            <div className="text-center">
              <div className="font-bold text-gray-900 dark:text-white">{vendor.reviews}</div>
              <div className="text-xs text-gray-500 dark:text-gray-400">Reviews</div>
            </div>
          </div>

          {/* CTA Button */}
          <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold">
            Visit Store
          </button>
        </div>
      </div>
    </Link>
  );
}