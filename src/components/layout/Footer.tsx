import Link from "next/link";
import { Facebook, Twitter, Instagram, Youtube, Mail } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-gray-900 dark:bg-gray-950 text-gray-300 dark:text-gray-400 mt-12">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Company Info */}
          <div className="lg:col-span-2">
            <h3 className="text-white text-xl font-bold mb-4">MarketHub</h3>
            <p className="text-sm mb-4">
              Your trusted multi-vendor marketplace connecting buyers with quality vendors worldwide.
            </p>
            <div className="flex gap-3">
              <a href="#" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-blue-600 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-blue-400 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-pink-600 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="bg-gray-800 dark:bg-gray-900 p-2 rounded-full hover:bg-red-600 transition">
                <Youtube size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/about" className="hover:text-white">About Us</Link></li>
              <li><Link href="/vendors" className="hover:text-white">Our Vendors</Link></li>
              <li><Link href="/how-it-works" className="hover:text-white">How It Works</Link></li>
              <li><Link href="/careers" className="hover:text-white">Careers</Link></li>
              <li><Link href="/blog" className="hover:text-white">Blog</Link></li>
            </ul>
          </div>

          {/* Customer Service */}
          <div>
            <h4 className="text-white font-semibold mb-4">Customer Service</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/help" className="hover:text-white">Help Center</Link></li>
              <li><Link href="/track-order" className="hover:text-white">Track Order</Link></li>
              <li><Link href="/returns" className="hover:text-white">Returns</Link></li>
              <li><Link href="/shipping" className="hover:text-white">Shipping Info</Link></li>
              <li><Link href="/contact" className="hover:text-white">Contact Us</Link></li>
            </ul>
          </div>

          {/* For Vendors */}
          <div>
            <h4 className="text-white font-semibold mb-4">For Vendors</h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/vendor/register" className="hover:text-white">Become a Vendor</Link></li>
              <li><Link href="/vendor/login" className="hover:text-white">Vendor Login</Link></li>
              <li><Link href="/vendor/guide" className="hover:text-white">Seller Guide</Link></li>
              <li><Link href="/vendor/fees" className="hover:text-white">Fees & Pricing</Link></li>
              <li><Link href="/vendor/resources" className="hover:text-white">Resources</Link></li>
            </ul>
          </div>
        </div>

        {/* Newsletter */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-900">
          <div className="max-w-md">
            <h4 className="text-white font-semibold mb-3">Subscribe to our newsletter</h4>
            <p className="text-sm mb-4">Get the latest updates on new products and upcoming deals</p>
            <div className="flex gap-2">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg bg-gray-800 dark:bg-gray-900 border border-gray-700 dark:border-gray-800 focus:outline-none focus:border-blue-500 text-white"
              />
              <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg flex items-center gap-2">
                <Mail size={18} />
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-gray-800 dark:border-gray-900 flex flex-col md:flex-row justify-between items-center gap-4 text-sm">
          <p>&copy; 2025 MarketHub. All rights reserved.</p>
          <div className="flex gap-6">
            <Link href="/privacy" className="hover:text-white">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-white">Terms of Service</Link>
            <Link href="/cookies" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}