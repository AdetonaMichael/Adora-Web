import Image from "next/image";
import Link from "next/link";
import { Star, Store } from "lucide-react";

const vendors = [
  {
    id: 1,
    name: "TechGear Plus",
    logo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=200&h=200&fit=crop",
    products: 1240,
    rating: 4.8,
    followers: "50K",
    verified: true,
  },
  {
    id: 2,
    name: "Fashion House",
    logo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=200&h=200&fit=crop",
    products: 856,
    rating: 4.7,
    followers: "35K",
    verified: true,
  },
  {
    id: 3,
    name: "HomeEssentials",
    logo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=200&h=200&fit=crop",
    products: 2100,
    rating: 4.9,
    followers: "68K",
    verified: true,
  },
  {
    id: 4,
    name: "AudioTech Store",
    logo: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=200&h=200&fit=crop",
    products: 432,
    rating: 4.6,
    followers: "28K",
    verified: true,
  },
];

export function FeaturedVendors() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-3">Featured Vendors</h2>
          <p className="text-gray-600 dark:text-gray-400">Shop from our top-rated and trusted sellers</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {vendors.map((vendor) => (
            <Link
              key={vendor.id}
              href={`/vendors/${vendor.id}`}
              className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-6 hover:shadow-lg transition-all group"
            >
              <div className="flex flex-col items-center text-center">
                <div className="relative mb-4">
                  <Image
                    src={vendor.logo}
                    alt={vendor.name}
                    className="w-20 h-20 rounded-full object-cover border-4 border-gray-100 dark:border-gray-700"
                    width={80}
                    height={80}
                    unoptimized
                  />
                  {vendor.verified && (
                    <div className="absolute -bottom-1 -right-1 bg-blue-600 text-white p-1 rounded-full">
                      <Store size={14} />
                    </div>
                  )}
                </div>
                <h3 className="font-semibold text-lg mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                  {vendor.name}
                </h3>
                <div className="flex items-center gap-1 mb-3">
                  <Star size={16} className="fill-yellow-400 text-yellow-400" />
                  <span className="text-sm font-medium">{vendor.rating}</span>
                </div>
                <div className="flex items-center justify-between w-full text-sm text-gray-600 dark:text-gray-400 mb-4">
                  <span>{vendor.products} Products</span>
                  <span>{vendor.followers} Followers</span>
                </div>
                <button className="w-full bg-blue-50 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 py-2 rounded-lg hover:bg-blue-600 hover:text-white transition font-medium">
                  Visit Store
                </button>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-10">
          <Link
            href="/vendors"
            className="inline-block border-2 border-blue-600 dark:border-blue-500 text-blue-600 dark:text-blue-400 px-8 py-3 rounded-lg hover:bg-blue-600 hover:text-white transition font-semibold"
          >
            View All Vendors
          </Link>
        </div>
      </div>
    </section>
  );
}