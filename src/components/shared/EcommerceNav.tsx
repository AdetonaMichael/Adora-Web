"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Tag, Percent, Gift, TrendingUp, Flame } from "lucide-react";


interface NavCategory {
  name: string;
  href: string;
  icon?: React.ComponentType<{ size?: number; className?: string }>;
  badge?: string;
  subcategories?: {
    name: string;
    href: string;
  }[];
}

const navCategories: NavCategory[] = [
  {
    name: "Hot Deals",
    href: "/deals",
    icon: Flame,
    badge: "Hot",
    subcategories: [
      { name: "Flash Sales", href: "/deals/flash-sales" },
      { name: "Clearance", href: "/deals/clearance" },
      { name: "Bundle Offers", href: "/deals/bundles" },
    ],
  },
  {
    name: "New Arrivals",
    href: "/new-arrivals",
    icon: TrendingUp,
    subcategories: [
      { name: "This Week", href: "/new-arrivals/this-week" },
      { name: "Coming Soon", href: "/new-arrivals/coming-soon" },
    ],
  },
  {
    name: "Electronics",
    href: "/categories/electronics",
    subcategories: [
      { name: "Smartphones", href: "/categories/electronics/smartphones" },
      { name: "Laptops", href: "/categories/electronics/laptops" },
      { name: "Audio", href: "/categories/electronics/audio" },
      { name: "Cameras", href: "/categories/electronics/cameras" },
      { name: "Gaming", href: "/categories/electronics/gaming" },
    ],
  },
  {
    name: "Fashion",
    href: "/categories/fashion",
    subcategories: [
      { name: "Men's Clothing", href: "/categories/fashion/mens" },
      { name: "Women's Clothing", href: "/categories/fashion/womens" },
      { name: "Shoes", href: "/categories/fashion/shoes" },
      { name: "Accessories", href: "/categories/fashion/accessories" },
      { name: "Jewelry", href: "/categories/fashion/jewelry" },
    ],
  },
  {
    name: "Home & Living",
    href: "/categories/home",
    subcategories: [
      { name: "Furniture", href: "/categories/home/furniture" },
      { name: "Kitchen", href: "/categories/home/kitchen" },
      { name: "Decor", href: "/categories/home/decor" },
      { name: "Bedding", href: "/categories/home/bedding" },
    ],
  },
  {
    name: "Beauty & Health",
    href: "/categories/beauty",
    subcategories: [
      { name: "Skincare", href: "/categories/beauty/skincare" },
      { name: "Makeup", href: "/categories/beauty/makeup" },
      { name: "Hair Care", href: "/categories/beauty/haircare" },
      { name: "Wellness", href: "/categories/beauty/wellness" },
    ],
  },
  {
    name: "Sports & Outdoors",
    href: "/categories/sports",
    subcategories: [
      { name: "Fitness Equipment", href: "/categories/sports/fitness" },
      { name: "Outdoor Gear", href: "/categories/sports/outdoor" },
      { name: "Sportswear", href: "/categories/sports/wear" },
    ],
  },
  {
    name: "Gift Ideas",
    href: "/gifts",
    icon: Gift,
    subcategories: [
      { name: "For Him", href: "/gifts/him" },
      { name: "For Her", href: "/gifts/her" },
      { name: "For Kids", href: "/gifts/kids" },
      { name: "Corporate Gifts", href: "/gifts/corporate" },
    ],
  },
];

export function EcommerceNav() {
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);

  return (
    <nav className=" dark:bg-gray-900 border-t dark:border-gray-800 sticky top-[0px] z-40 shadow-sm">
      <div className="container-fluid mx-auto px-4">
        <div className="flex items-center justify-between py-3">
          {/* Main Navigation */}
          <ul className="hidden lg:flex items-center gap-1 flex-1">
            {navCategories.map((category) => (
              <li
                key={category.name}
                className="relative"
                onMouseEnter={() => setOpenDropdown(category.name)}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href={category.href}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors group"
                >
                  {category.icon && (
                    <category.icon
                      size={18}
                      className="text-gray-600 dark:text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    />
                  )}
                  <span className="text-sm font-medium whitespace-nowrap">
                    {category.name}
                  </span>
                  {category.badge && (
                    <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full font-semibold animate-pulse">
                      {category.badge}
                    </span>
                  )}
                  {category.subcategories && (
                    <ChevronDown
                      size={16}
                      className="text-gray-400 group-hover:text-blue-600 dark:group-hover:text-blue-400"
                    />
                  )}
                </Link>

                {/* Dropdown Menu */}
                {category.subcategories && openDropdown === category.name && (
                  <div className="absolute top-full left-0 mt-1 bg-white dark:bg-gray-800 border  dark:border-gray-700 rounded-lg shadow-xl min-w-[220px] py-2 z-50">
                    {category.subcategories.map((sub) => (
                      <Link
                        key={sub.name}
                        href={sub.href}
                        className="block px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
                      >
                        {sub.name}
                      </Link>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>

          {/* Quick Actions */}
          <div className="hidden lg:flex items-center gap-4">
            <Link
              href="/coupons"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors group"
            >
              <Tag size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Coupons
              </span>
            </Link>
            <Link
              href="/offers"
              className="flex items-center gap-2 px-4 py-2 rounded-lg hover:bg-purple-50 dark:hover:bg-purple-900/20 transition-colors group"
            >
              <Percent size={18} className="text-blue-600 dark:text-blue-400" />
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Special Offers
              </span>
            </Link>
        
          </div>

          {/* Mobile: Show all categories button */}
          <div className="lg:hidden w-full">
            <Link
              href="/categories"
              className="flex items-center justify-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors"
            >
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">
                Browse All Categories
              </span>
              <ChevronDown size={16} className="text-blue-600 dark:text-blue-400" />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
}