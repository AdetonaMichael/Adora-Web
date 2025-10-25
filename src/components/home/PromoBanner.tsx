"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Zap, Clock, TrendingUp, Sparkles } from "lucide-react";

export function PromoBanner() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56,
  });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return prev;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <section className="relative py-20 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-black overflow-hidden">
      {/* Animated Background Pattern */}
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_20%_50%,_rgba(255,255,255,0.3),_transparent_50%)]"></div>
        <div className="absolute bottom-0 right-0 w-full h-full bg-[radial-gradient(circle_at_80%_50%,_rgba(255,255,255,0.2),_transparent_50%)]"></div>
      </div>

      {/* Floating Sparkle Elements */}
      <motion.div
        animate={{
          y: [0, -20, 0],
          rotate: [0, 180, 360],
        }}
        transition={{
          duration: 4,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute top-10 left-20 text-yellow-300 opacity-60"
      >
        <Sparkles size={32} />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 20, 0],
          rotate: [360, 180, 0],
        }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-10 right-20 text-yellow-300 opacity-60"
      >
        <Sparkles size={40} />
      </motion.div>

      {/* Decorative Gradient Circles */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-yellow-400/30 to-transparent rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-tr from-purple-400/30 to-transparent rounded-full blur-3xl"></div>

      <div className="container relative mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          {/* LEFT: Content */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="text-white flex-1"
          >
            {/* Badge */}
            <motion.div
              animate={{ scale: [1, 1.05, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="inline-flex items-center gap-2 mb-6 px-4 py-2 bg-yellow-400 text-blue-900 rounded-full font-bold shadow-lg"
            >
              <Zap size={20} fill="currentColor" />
              <span>LIMITED TIME OFFER</span>
            </motion.div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-6 leading-tight">
              Flash Sale:{" "}
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-yellow-300 via-yellow-200 to-white">
                Up to 70% Off!
              </span>
            </h2>

            <p className="text-xl md:text-2xl mb-8 text-blue-100 dark:text-gray-300 max-w-2xl">
              Limited time offer on thousands of products. Don&apos;t miss out on these incredible deals!
            </p>

            {/* Countdown Timer */}
            <div className="flex items-center gap-2 mb-8">
              <Clock size={24} className="text-yellow-300" />
              <span className="text-lg font-semibold text-yellow-300">
                Offer ends in:
              </span>
            </div>

            <div className="flex gap-4 mb-8">
              {[
                { value: timeLeft.hours, label: "Hours" },
                { value: timeLeft.minutes, label: "Minutes" },
                { value: timeLeft.seconds, label: "Seconds" },
              ].map((item, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05 }}
                  className="bg-white/20 backdrop-blur-md px-6 py-4 rounded-2xl border  border-white/30 shadow-2xl min-w-[100px] text-center"
                >
                  <motion.div
                    key={item.value}
                    initial={{ scale: 1.2, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 0.3 }}
                    className="text-4xl md:text-5xl font-extrabold"
                  >
                    {String(item.value).padStart(2, "0")}
                  </motion.div>
                  <div className="text-sm font-semibold text-blue-100 mt-1">
                    {item.label}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Stats */}
            <div className="flex flex-wrap gap-6 items-center">
              {[
                { icon: TrendingUp, text: "5000+ Items on Sale" },
                { icon: Zap, text: "Free Shipping" },
              ].map((stat, idx) => (
                <div key={idx} className="flex items-center gap-2 text-blue-100">
                  <stat.icon size={20} />
                  <span className="font-medium">{stat.text}</span>
                </div>
              ))}
            </div>
          </motion.div>

          {/* RIGHT: CTA */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex flex-col gap-4"
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/deals"
                className="group relative bg-white text-blue-700 dark:text-indigo-800 px-10 py-5 rounded-2xl font-bold hover:bg-gray-50 transition-all shadow-2xl flex items-center gap-3 text-lg overflow-hidden"
              >
                {/* Shine Effect */}
                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-1000 bg-gradient-to-r from-transparent via-blue-200/50 to-transparent skew-x-12"></div>

                <span className="relative z-10">Shop Flash Sale</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ repeat: Infinity, duration: 1.5 }}
                  className="relative z-10"
                >
                  <ArrowRight size={24} />
                </motion.div>
              </Link>
            </motion.div>

            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Link
                href="/trending"
                className="border border-gray-600 px-10 py-5 rounded-2xl font-bold hover:bg-white hover:text-blue-700 transition-all text-center flex items-center justify-center gap-2 text-lg text-white"
              >
                View Trending Deals
              </Link>
            </motion.div>

            {/* Trust Badge */}
            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-xl px-6 py-4 text-center">
              <div className="text-2xl font-bold text-yellow-300 mb-1">
                50,000+
              </div>
              <div className="text-sm text-blue-100">
                Products Sold Today
              </div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Bottom Wave Effect */}
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-black/10 to-transparent"></div>
    </section>
  );
}