"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ChevronRight, ShoppingBag, Star } from "lucide-react";

export function HeroSection() {
  return (
    <section className="relative overflow-hidden bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white dark:from-gray-900 dark:via-gray-800 dark:to-black transition-colors">
      {/* Animated Gradient Overlay */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.15),_transparent_50%)] dark:bg-[radial-gradient(circle_at_top_left,_rgba(255,255,255,0.05),_transparent_60%)] pointer-events-none"></div>

      <div className="container relative mx-auto px-4 py-20 md:py-28">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* LEFT: Text & CTA */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Your One-Stop Marketplace for <br className="hidden md:block" />
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 to-pink-400">
                Authentic Products
              </span>
            </h1>
            <p className="text-lg md:text-xl mb-8 text-blue-100 dark:text-gray-300 max-w-lg">
              Join thousands of shoppers and verified vendors trading securely on the most trusted marketplace platform.
            </p>

            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/products"
                className="bg-white text-blue-700 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 dark:hover:bg-gray-200 transition text-center flex items-center justify-center gap-2 shadow-lg"
              >
                <ShoppingBag size={20} />
                Start Shopping
              </Link>

              <Link
                href="/vendor/register"
                className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-700 transition text-center flex items-center justify-center gap-2"
              >
                Become a Vendor
                <ChevronRight size={20} />
              </Link>
            </div>

            <div className="mt-12 flex flex-wrap gap-8">
              {[
                { value: "10K+", label: "Active Vendors" },
                { value: "500K+", label: "Products" },
                { value: "1M+", label: "Happy Customers" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.1 }}
                  className="transition-transform"
                >
                  <div className="text-3xl font-bold">{item.value}</div>
                  <div className="text-blue-200 dark:text-gray-400">{item.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: Visual */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="hidden md:block"
          >
            <div className="relative bg-white/10 dark:bg-white/5 backdrop-blur-md rounded-2xl p-8 border border-white/20 shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=800&q=80"
                alt="Marketplace Shopping"
                className="rounded-xl w-full object-cover"
                loading="lazy"
                onError={(e) => {
                  e.currentTarget.src = "https://placehold.co/800x600/6366f1/ffffff?text=Marketplace";
                }}
              />
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3 }}
                className="absolute -top-6 -right-6 bg-yellow-400 text-gray-900 font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
              >
                <Star size={16} /> Top Rated
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Decorative gradient circles */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>
      <div className="absolute top-0 right-0 w-80 h-80 bg-pink-500/20 rounded-full blur-3xl"></div>
    </section>
  );
}
