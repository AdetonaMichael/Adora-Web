"use client";

import Link from "next/link";
import { Search, ShoppingCart, User, Menu, Heart, Store } from "lucide-react";
import { useState } from "react";
import { adoralogo } from "@/images";
import Image from "next/image";
import { EcommerceNav } from "../shared/EcommerceNav";
import { formatMonetaryValue } from "@/helper/global";

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b  border-gray-600 dark:bg-gray-900  shadow-sm">
      {/* Top Bar */}
      <div className="bg-gray-900 text-sm border-b border-gray-600">
        <div className="container mx-auto px-4 py-2 flex justify-between items-center">
          <span>Free shipping on orders over {formatMonetaryValue(50000)}</span>
          <div className="hidden md:flex gap-4">
            <Link href="/vendor/register" className="hover:text-gray-300 flex items-center gap-1">
              <Store size={16} />
              Become a Vendor
            </Link>
            <Link href="/help" className="hover:text-gray-300">Help</Link>
            <Link href="/track-order" className="hover:text-gray-300">Track Order</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <div className="container mx-auto px-4 py-4 ">
        <div className="flex items-center justify-between gap-4">
          <div className="md:flex lg:flex md:items-center lg:items-center ">
            <Image
              src={adoralogo}
              alt="Adora Logo"
              height={40}
              width={40}
              />
          <Link href="/" className="text-2xl font-bold text-blue-600 md:ml-4 lg:ml-4">
            Adora MarketHub
          </Link>
          </div>
           

          {/* Search Bar */}
          <div className="hidden md:flex flex-1 max-w-2xl">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search for products, brands, or vendors..."
                className="w-full border-gray-600 px-4 py-2.5 pr-12 border  rounded-lg focus:outline-none focus:ring-1 focus:ring-blue-500 focus:border-transparent"
              />
              <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700">
                <Search size={20} />
              </button>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-4">
            <button className="hidden md:block p-2 hover:bg-gray-100 rounded-lg">
              <Heart size={24} />
            </button>
            <Link href="/cart" className="relative p-2 hover:bg-gray-100 rounded-lg">
              <ShoppingCart size={24} />
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
                3
              </span>
            </Link>
            <Link href="/account" className="hidden md:flex items-center gap-2 p-2 hover:bg-gray-100 rounded-lg">
              <User size={24} />
              <span className="text-sm">Account</span>
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2"
            >
              <Menu size={24} />
            </button>
          </div>
        </div>

        {/* Mobile Search */}
        <div className="md:hidden mt-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full px-4 py-2 pr-12 border border-gray-300 rounded-lg"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-blue-600 text-white p-1.5 rounded-md">
              <Search size={18} />
            </button>
          </div>
        </div>
      </div>

      {/* Navigation */}
      {/* <nav className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-4">
          <ul className="hidden md:flex items-center gap-8 py-3 text-sm">
            <li><Link href="/categories/electronics" className="hover:text-blue-600">Electronics</Link></li>
            <li><Link href="/categories/fashion" className="hover:text-blue-600">Fashion</Link></li>
            <li><Link href="/categories/home" className="hover:text-blue-600">Home & Living</Link></li>
            <li><Link href="/categories/beauty" className="hover:text-blue-600">Beauty</Link></li>
            <li><Link href="/categories/sports" className="hover:text-blue-600">Sports</Link></li>
            <li><Link href="/vendors" className="hover:text-blue-600 font-medium">All Vendors</Link></li>
            <li><Link href="/deals" className="text-red-600 font-medium">Today&apos;s Deals</Link></li>
          </ul>
        </div>
      </nav> */}
      <EcommerceNav/>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <nav className="container mx-auto px-4 py-4">
            <ul className="space-y-3">
              <li><Link href="/categories/electronics" className="block py-2">Electronics</Link></li>
              <li><Link href="/categories/fashion" className="block py-2">Fashion</Link></li>
              <li><Link href="/categories/home" className="block py-2">Home & Living</Link></li>
              <li><Link href="/categories/beauty" className="block py-2">Beauty</Link></li>
              <li><Link href="/vendors" className="block py-2 font-medium">All Vendors</Link></li>
              <li><Link href="/account" className="block py-2">My Account</Link></li>
              <li><Link href="/vendor/register" className="block py-2 text-blue-600">Become a Vendor</Link></li>
            </ul>
          </nav>
        </div>
      )}
    </header>
  );
}