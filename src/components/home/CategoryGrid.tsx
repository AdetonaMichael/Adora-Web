"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Laptop, Shirt, Home, Sparkles, Dumbbell, Palette, Book, Gift } from "lucide-react";

const categories = [
  { name: "Electronics", icon: Laptop, href: "/categories/electronics", gradient: "from-yellow-500 to-amber-500" },
  { name: "Fashion", icon: Shirt, href: "/categories/fashion", gradient: "from-yellow-500 to-amber-500" },
  { name: "Home & Living", icon: Home, href: "/categories/home", gradient: "from-yellow-500 to-amber-500" },
  { name: "Beauty", icon: Sparkles, href: "/categories/beauty", gradient: "from-yellow-500 to-amber-500" },
  { name: "Sports", icon: Dumbbell, href: "/categories/sports", gradient: "from-yellow-500 to-amber-500" },
  { name: "Art & Crafts", icon: Palette, href: "/categories/art", gradient: "from-yellow-500 to-orange-400" },
  { name: "Books", icon: Book, href: "/categories/books", gradient: "from-yellow-500 to-amber-500" },
  { name: "Gifts", icon: Gift, href: "/categories/gifts", gradient: "from-yellow-500 to-amber-500" },
];

export function CategoryGrid() {
  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-black overflow-hidden transition-colors">
      {/* Decorative Elements */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"></div>
      
      <div className="container relative mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-12"
        >
          <h2 className="text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 dark:from-blue-400 dark:via-indigo-400 dark:to-purple-400">
            Shop by Category
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Explore our curated collections across every category you love
          </p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-4 gap-6">
          {categories.map((category, idx) => (
            <motion.div
              key={category.name}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: idx * 0.1 }}
            >
              <Link
                href={category.href}
                className="group relative block"
              >
                <div className="relative bg-white dark:bg-gray-800 rounded-2xl p-8 border border-gray-200 dark:border-gray-700 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                  {/* Gradient Overlay on Hover */}
                  <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-10 transition-opacity duration-300`}></div>
                  
                  {/* Icon Container */}
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    transition={{ type: "spring", stiffness: 300 }}
                    className="relative"
                  >
                    <div className={`bg-gradient-to-br ${category.gradient} p-5 rounded-2xl mb-4 shadow-md mx-auto w-fit`}>
                      <category.icon size={32} className="text-white" />
                    </div>
                  </motion.div>

                  {/* Category Name */}
                  <h3 className="text-lg font-bold text-center text-gray-900 dark:text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-600 group-hover:to-purple-600 transition-all duration-300">
                    {category.name}
                  </h3>

                  {/* Shine Effect */}
                  <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent skew-x-12"></div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="text-center mt-12"
        >
          <Link
            href="/categories"
            className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white font-semibold rounded-lg hover:shadow-xl hover:scale-105 transition-all duration-300"
          >
            View All Categories
            <motion.span
              animate={{ x: [0, 5, 0] }}
              transition={{ repeat: Infinity, duration: 1.5 }}
            >
              →
            </motion.span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}