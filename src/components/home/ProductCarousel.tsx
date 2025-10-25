"use client";

import { motion } from "framer-motion";
import { ProductCard } from "../shared/ProductCard";
import { TrendingUp, Zap, ArrowRight } from "lucide-react";
import Link from "next/link";

interface ProductCarouselProps {
  title: string;
  subtitle?: string;
}

const sampleProducts = [
  {
    id: 1,
    name: "Wireless Headphones Pro",
    price: 129.99,
    originalPrice: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    vendor: "AudioTech Store",
    rating: 4.5,
    reviews: 234,
  },
  {
    id: 2,
    name: "Smart Watch Series 5",
    price: 299.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    vendor: "TechGear Plus",
    rating: 4.8,
    reviews: 456,
  },
  {
    id: 3,
    name: "Designer Leather Bag",
    price: 89.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=400&fit=crop",
    vendor: "Fashion House",
    rating: 4.6,
    reviews: 189,
  },
  {
    id: 4,
    name: "Premium Coffee Maker",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
    vendor: "HomeEssentials",
    rating: 4.7,
    reviews: 312,
  },
  {
    id: 5,
    name: "Yoga Mat Pro",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    vendor: "FitLife Store",
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    vendor: "FitLife Store",
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 7,
    name: "Yoga Mat Pro",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    vendor: "FitLife Store",
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 6,
    name: "Yoga Mat Pro",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    vendor: "FitLife Store",
    rating: 4.4,
    reviews: 167,
  },
  {
    id: 7,
    name: "Yoga Mat Pro",
    price: 39.99,
    originalPrice: 59.99,
    image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
    vendor: "FitLife Store",
    rating: 4.4,
    reviews: 167,
  },
];

export function ProductCarousel({ title, subtitle }: ProductCarouselProps) {
  return (
    <section className="relative py-20 bg-gradient-to-br from-white via-blue-50/30 to-purple-50/30 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden transition-colors">
      {/* Decorative Background Elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-gradient-to-br from-blue-500/10 to-purple-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-pink-500/10 to-yellow-500/10 rounded-full blur-3xl"></div>
      
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.05),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top_right,_rgba(99,102,241,0.02),_transparent_60%)] pointer-events-none"></div>

      <div className="container relative mx-auto px-4">
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-2 bg-gradient-to-r from-blue-500/10 to-purple-500/10 dark:from-blue-500/20 dark:to-purple-500/20 rounded-full border border-blue-200/50 dark:border-blue-700/50">
            <Zap size={16} className="text-blue-600 dark:text-blue-400" />
            <span className="text-sm font-semibold text-blue-600 dark:text-blue-400">Trending Now</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            {title}
          </h2>
          
          {subtitle && (
            <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>

        {/* Products Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6 mb-12">
          {sampleProducts.map((product, idx) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <ProductCard product={product} />
            </motion.div>
          ))}
        </div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center"
        >
          <div className="inline-flex flex-col sm:flex-row gap-4 items-center">
            <Link href="/products">
              <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="relative group  border-1 border-gray-200 text-white px-10 py-4 rounded-xl font-semibold shadow-lg hover:shadow-2xl transition-all duration-300 flex items-center gap-2 overflow-hidden"
              >
              {/* Shine Effect */}
              <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
              
              <span className="relative z-10">View All Products</span>
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
                className="relative z-10"
              >
                <ArrowRight size={20} />
              </motion.div>
              </motion.button>
            </Link>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="border-2 border-indigo-600 dark:border-indigo-400 text-indigo-600 dark:text-indigo-400 px-10 py-4 rounded-xl font-semibold hover:bg-indigo-600 hover:text-white dark:hover:bg-indigo-400 dark:hover:text-gray-900 transition-all duration-300 flex items-center gap-2"
            >
              <TrendingUp size={20} />
              View Trending
            </motion.button>
          </div>
        </motion.div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: "2K+", label: "Products Listed", gradient: "from-yellow-300 via-yellow-200 to-yellow-300" },
            { value: "98%", label: "Satisfaction Rate", gradient: "from-yellow-300 via-yellow-200 to-yellow-300" },
            { value: "24/7", label: "Customer Support", gradient: "from-yellow-300 via-yellow-200 to-yellow-300" },
            { value: "Fast", label: "Free Shipping", gradient: "from-yellow-300 via-yellow-200 to-yellow-300" },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              whileHover={{ scale: 1.05 }}
              className="bg-white/60 dark:bg-gray-800/60 backdrop-blur-sm rounded-2xl p-6 border border-gray-200/50 dark:border-gray-700/50 shadow-lg text-center transition-transform"
            >
              <div className={`text-3xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r ${stat.gradient} mb-2`}>
                {stat.value}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-600 font-medium">
                {stat.label}
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}