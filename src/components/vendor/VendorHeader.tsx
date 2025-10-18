"use client";

import Link from "next/link";
import { Bell, Settings, ChevronDown, LogOut } from "lucide-react";
import { useState } from "react";

export function VendorHeader() {
  const [showDropdown, setShowDropdown] = useState(false);

  return (
    <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-8">
            <Link href="/vendor/dashboard" className="text-xl font-bold text-blue-600">
              MarketHub Vendor
            </Link>
            <nav className="hidden md:flex items-center gap-6 text-sm">
              <Link href="/" className="text-gray-600 hover:text-gray-900">
                View Marketplace
              </Link>
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <button className="relative p-2 hover:bg-gray-100 rounded-lg">
              <Bell size={20} />
              <span className="absolute top-1 right-1 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
            
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-3 p-2 hover:bg-gray-100 rounded-lg"
              >
                <img
                  src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop"
                  alt="Vendor"
                  className="w-8 h-8 rounded-full"
                />
                <div className="hidden md:block text-left">
                  <div className="text-sm font-medium">TechGear Plus</div>
                  <div className="text-xs text-gray-500">Vendor</div>
                </div>
                <ChevronDown size={16} />
              </button>

              {showDropdown && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2">
                  <Link
                    href="/vendor/settings"
                    className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50"
                  >
                    <Settings size={16} />
                    Settings
                  </Link>
                  <button className="flex items-center gap-2 px-4 py-2 hover:bg-gray-50 w-full text-left text-red-600">
                    <LogOut size={16} />
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}