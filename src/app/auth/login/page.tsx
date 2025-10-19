"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  AlertCircle,
  Chrome,
  Github,
  Facebook,
  ShoppingBag
} from "lucide-react";

export default function LoginPage() {
  const [formData, setFormData] = useState({
    email: "",
    password: ""
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = "Please enter a valid email";
    }
    if (!formData.password) {
      newErrors.password = "Password is required";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;

    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      console.log("Login:", formData);
    }, 2000);
  };

  const handleOAuthLogin = (provider: string) => {
    console.log(`OAuth login with ${provider}`);
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-6xl relative">
        <div className="grid lg:grid-cols-2 gap-8 items-center">
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
            className="hidden lg:block"
          >
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-3xl blur-xl opacity-20"></div>
              <div className="relative bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 dark:from-gray-900 dark:via-gray-800 dark:to-black rounded-3xl p-12 text-white">
                <Link href="/" className="inline-block mb-8">
                  <h1 className="text-4xl font-extrabold">MarketHub</h1>
                </Link>
                <h2 className="text-3xl font-bold mb-6">Welcome Back!</h2>
                <p className="text-blue-100 dark:text-gray-300 text-lg mb-8">
                  Sign in to continue shopping and access your account.
                </p>
                
                <div className="space-y-6 mb-12">
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Track Your Orders</h3>
                      <p className="text-blue-100 text-sm">Monitor your purchases in real-time</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Saved Items</h3>
                      <p className="text-blue-100 text-sm">Access your wishlist and favorites</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-4">
                    <div className="bg-blue-500/20 p-3 rounded-xl">
                      <ShoppingBag size={24} />
                    </div>
                    <div>
                      <h3 className="font-bold text-lg mb-1">Exclusive Deals</h3>
                      <p className="text-blue-100 text-sm">Get access to member-only offers</p>
                    </div>
                  </div>
                </div>

                <div className="relative h-48">
                  <Image
                    src="https://images.unsplash.com/photo-1472851294608-062f824d29cc?w=600&h=400&fit=crop"
                    alt="Shopping"
                    fill
                    className="object-cover rounded-2xl opacity-30"
                  />
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
                  Sign In
                </h2>
                <p className="text-gray-600 dark:text-gray-400">
                  New to MarketHub?{" "}
                  <Link href="/auth/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                    Create an account
                  </Link>
                </p>
              </div>

              <div className="space-y-3 mb-8">
                <button
                  onClick={() => handleOAuthLogin("google")}
                  className="w-full flex items-center justify-center gap-3 px-6 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                >
                  <Chrome size={20} className="text-red-500" />
                  Continue with Google
                </button>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    onClick={() => handleOAuthLogin("github")}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                  >
                    <Github size={20} />
                    GitHub
                  </button>
                  <button
                    onClick={() => handleOAuthLogin("facebook")}
                    className="flex items-center justify-center gap-2 px-4 py-3 border-2 border-gray-300 dark:border-gray-600 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700 transition font-medium"
                  >
                    <Facebook size={20} className="text-blue-600" />
                    Facebook
                  </button>
                </div>
              </div>

              <div className="relative mb-8">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300 dark:border-gray-600"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-400">
                    Or sign in with email
                  </span>
                </div>
              </div>

              <div className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-4 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition ${
                        errors.email 
                          ? "border-red-500 dark:border-red-500" 
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      placeholder="john.doe@example.com"
                    />
                  </div>
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
                    <input
                      type={showPassword ? "text" : "password"}
                      name="password"
                      value={formData.password}
                      onChange={handleChange}
                      className={`w-full pl-11 pr-12 py-3 border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white transition ${
                        errors.password 
                          ? "border-red-500 dark:border-red-500" 
                          : "border-gray-300 dark:border-gray-600"
                      }`}
                      placeholder="••••••••"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                    >
                      {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                    </button>
                  </div>
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-500 flex items-center gap-1">
                      <AlertCircle size={14} />
                      {errors.password}
                    </p>
                  )}
                </div>

                <div className="flex items-center justify-between">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <span className="text-sm text-gray-600 dark:text-gray-400">
                      Remember me
                    </span>
                  </label>
                  <Link
                    href="/auth/forgot-password"
                    className="text-sm text-blue-600 dark:text-blue-400 hover:underline font-medium"
                  >
                    Forgot password?
                  </Link>
                </div>

                <button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? (
                    <span className="flex items-center justify-center gap-2">
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Signing In...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </button>

                <div className="text-center pt-4">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Looking to sell?{" "}
                    <Link href="/vendor/register" className="text-blue-600 dark:text-blue-400 font-semibold hover:underline">
                      Become a vendor
                    </Link>
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}