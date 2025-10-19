"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Mail,
  CheckCircle,
  XCircle,
  RefreshCw,
  Loader
} from "lucide-react";

type VerificationStatus = "verifying" | "success" | "error" | "resend";

export default function VerifyEmailPage() {
  const [status, setStatus] = useState<VerificationStatus>("verifying");
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    // Simulate verification process
    const timer = setTimeout(() => {
      // Randomly set success or error for demo
      setStatus(Math.random() > 0.3 ? "success" : "error");
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (status === "resend" && countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0) {
      setCanResend(true);
    }
  }, [countdown, status]);

  const handleResend = () => {
    setStatus("verifying");
    setCountdown(60);
    setCanResend(false);
    
    setTimeout(() => {
      setStatus("resend");
      console.log("Verification email resent");
    }, 2000);
  };

  const renderContent = () => {
    switch (status) {
      case "verifying":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Loader size={40} className="text-blue-600 dark:text-blue-400 animate-spin" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Verifying Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please wait while we verify your email address...
            </p>
            <div className="flex items-center justify-center gap-2">
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
              <div className="w-2 h-2 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
            </div>
          </motion.div>
        );

      case "success":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-green-100 dark:bg-green-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle size={40} className="text-green-600 dark:text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Email Verified!
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Your email has been successfully verified. You can now access all features of your account.
            </p>
            <Link
              href="/auth/login"
              className="inline-block w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all"
            >
              Continue to Sign In
            </Link>
            <Link
              href="/"
              className="inline-block w-full mt-3 border-2 border-gray-300 dark:border-gray-600 py-4 rounded-xl font-semibold hover:bg-gray-50 dark:hover:bg-gray-700 transition"
            >
              Go to Homepage
            </Link>
          </motion.div>
        );

      case "error":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <XCircle size={40} className="text-red-600 dark:text-red-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Verification Failed
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              We couldn&apos;t verify your email. The link may have expired or is invalid.
            </p>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300">
                Common reasons for verification failure:
              </p>
              <ul className="text-sm text-gray-600 dark:text-gray-400 mt-2 space-y-1 text-left">
                <li>• The verification link has expired (24 hours)</li>
                <li>• The link has already been used</li>
                <li>• The link was copied incorrectly</li>
              </ul>
            </div>

            <button
              onClick={handleResend}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              Resend Verification Email
            </button>
            <Link
              href="/auth/login"
              className="inline-block w-full mt-3 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Back to Sign In
            </Link>
          </motion.div>
        );

      case "resend":
        return (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="text-center"
          >
            <div className="w-20 h-20 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center mx-auto mb-6">
              <Mail size={40} className="text-blue-600 dark:text-blue-400" />
            </div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              We&apos;ve sent a new verification link to your email address.
            </p>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4 mb-6">
              <p className="text-sm text-gray-700 dark:text-gray-300 mb-2">
                Didn&apos;t receive the email?
              </p>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Check your spam folder or wait {countdown} seconds to resend
              </p>
            </div>

            <button
              onClick={handleResend}
              disabled={!canResend}
              className="w-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-700 text-white py-4 rounded-xl font-bold hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
            >
              <RefreshCw size={20} />
              {canResend ? "Resend Email" : `Resend in ${countdown}s`}
            </button>
            <Link
              href="/auth/login"
              className="inline-block w-full mt-3 text-blue-600 dark:text-blue-400 hover:underline font-medium"
            >
              Back to Sign In
            </Link>
          </motion.div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 flex items-center justify-center py-12 px-4">
      <div className="absolute top-0 left-0 w-96 h-96 bg-blue-500/10 dark:bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-500/10 dark:bg-indigo-500/5 rounded-full blur-3xl"></div>

      <div className="w-full max-w-md relative">
        <div className="bg-white dark:bg-gray-800 rounded-3xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8 md:p-12">
          {renderContent()}
        </div>

        {/* MarketHub Logo */}
        <div className="text-center mt-8">
          <Link href="/" className="text-2xl font-extrabold text-gray-900 dark:text-white hover:text-blue-600 dark:hover:text-blue-400 transition">
            MarketHub
          </Link>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
            Your trusted marketplace
          </p>
        </div>
      </div>
    </div>
  );
}