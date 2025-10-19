"use client";

import { useState } from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingBag, ArrowRight, Store, AlertCircle } from "lucide-react";

interface CartItem {
  id: number;
  productId: number;
  name: string;
  price: number;
  quantity: number;
  image: string;
  attributes?: string;
}

interface VendorCart {
  vendorId: number;
  vendorName: string;
  vendorLogo: string;
  items: CartItem[];
  shippingFee: number;
}

export default function CartPage() {
  const [vendorCarts, setVendorCarts] = useState<VendorCart[]>([
    {
      vendorId: 1,
      vendorName: "TechGear Plus",
      vendorLogo: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?w=100&h=100&fit=crop",
      shippingFee: 5.99,
      items: [
        {
          id: 1,
          productId: 101,
          name: "Wireless Headphones Pro",
          price: 129.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
          attributes: "Color: Black",
        },
        {
          id: 2,
          productId: 102,
          name: "USB-C Cable 2M",
          price: 19.99,
          quantity: 2,
          image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=200&h=200&fit=crop",
        },
      ],
    },
    {
      vendorId: 2,
      vendorName: "Fashion House",
      vendorLogo: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=100&h=100&fit=crop",
      shippingFee: 7.99,
      items: [
        {
          id: 3,
          productId: 201,
          name: "Designer Leather Bag",
          price: 89.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=200&h=200&fit=crop",
          attributes: "Size: Medium, Color: Brown",
        },
      ],
    },
    {
      vendorId: 3,
      vendorName: "HomeEssentials",
      vendorLogo: "https://images.unsplash.com/photo-1586023492125-27b2c045efd7?w=100&h=100&fit=crop",
      shippingFee: 4.99,
      items: [
        {
          id: 4,
          productId: 301,
          name: "Premium Coffee Maker",
          price: 159.99,
          quantity: 1,
          image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=200&h=200&fit=crop",
        },
      ],
    },
  ]);

  const updateQuantity = (vendorId: number, itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setVendorCarts((prev) =>
      prev.map((vendor) =>
        vendor.vendorId === vendorId
          ? {
              ...vendor,
              items: vendor.items.map((item) =>
                item.id === itemId ? { ...item, quantity: newQuantity } : item
              ),
            }
          : vendor
      )
    );
  };

  const removeItem = (vendorId: number, itemId: number) => {
    setVendorCarts((prev) =>
      prev
        .map((vendor) =>
          vendor.vendorId === vendorId
            ? {
                ...vendor,
                items: vendor.items.filter((item) => item.id !== itemId),
              }
            : vendor
        )
        .filter((vendor) => vendor.items.length > 0)
    );
  };

  const calculateVendorSubtotal = (items: CartItem[]): number => {
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  };

  const calculateVendorTotal = (vendor: VendorCart): number => {
    return calculateVendorSubtotal(vendor.items) + vendor.shippingFee;
  };

  const calculateGrandTotal = (): number => {
    return vendorCarts.reduce((sum, vendor) => sum + calculateVendorTotal(vendor), 0);
  };

  const getTotalItems = (): number => {
    return vendorCarts.reduce((sum, vendor) => 
      sum + vendor.items.reduce((itemSum, item) => itemSum + item.quantity, 0), 0
    );
  };

  if (vendorCarts.length === 0) {
    return (
      <div className="min-h-screen bg-white dark:bg-gray-950">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-md mx-auto text-center">
            <div className="bg-gray-100 dark:bg-gray-800 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <ShoppingBag size={48} className="text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold mb-4">Your cart is empty</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-8">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Link
              href="/products"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-lg font-semibold transition"
            >
              Start Shopping
              <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Shopping Cart</h1>
          <p className="text-gray-600 dark:text-gray-400">
            {getTotalItems()} {getTotalItems() === 1 ? "item" : "items"} from {vendorCarts.length} {vendorCarts.length === 1 ? "vendor" : "vendors"}
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-6">
            {vendorCarts.map((vendor) => (
              <div
                key={vendor.vendorId}
                className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 overflow-hidden"
              >
                {/* Vendor Header */}
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <img
                        src={vendor.vendorLogo}
                        alt={vendor.vendorName}
                        className="w-10 h-10 rounded-full object-cover border-2 border-gray-200 dark:border-gray-700"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <Store size={16} className="text-gray-500 dark:text-gray-400" />
                          <span className="font-semibold">{vendor.vendorName}</span>
                        </div>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          {vendor.items.length} {vendor.items.length === 1 ? "item" : "items"}
                        </p>
                      </div>
                    </div>
                    <Link
                      href={`/vendors/${vendor.vendorId}`}
                      className="text-sm text-blue-600 dark:text-blue-400 hover:underline"
                    >
                      Visit Store
                    </Link>
                  </div>
                </div>

                {/* Vendor Items */}
                <div className="divide-y divide-gray-200 dark:divide-gray-800">
                  {vendor.items.map((item) => (
                    <div key={item.id} className="p-6">
                      <div className="flex gap-4">
                        {/* Product Image */}
                        <Link
                          href={`/products/${item.productId}`}
                          className="flex-shrink-0"
                        >
                          <img
                            src={item.image}
                            alt={item.name}
                            className="w-24 h-24 object-cover rounded-lg border border-gray-200 dark:border-gray-700"
                          />
                        </Link>

                        {/* Product Details */}
                        <div className="flex-1 min-w-0">
                          <Link
                            href={`/products/${item.productId}`}
                            className="font-semibold hover:text-blue-600 dark:hover:text-blue-400 transition"
                          >
                            {item.name}
                          </Link>
                          {item.attributes && (
                            <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                              {item.attributes}
                            </p>
                          )}

                          <div className="flex items-center justify-between mt-4">
                            {/* Quantity Controls */}
                            <div className="flex items-center gap-3">
                              <button
                                onClick={() => updateQuantity(vendor.vendorId, item.id, item.quantity - 1)}
                                className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                aria-label="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span className="w-12 text-center font-semibold">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => updateQuantity(vendor.vendorId, item.id, item.quantity + 1)}
                                className="w-8 h-8 rounded-md border border-gray-300 dark:border-gray-700 flex items-center justify-center hover:bg-gray-100 dark:hover:bg-gray-800 transition"
                                aria-label="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>

                            {/* Price */}
                            <div className="text-right">
                              <div className="font-bold text-lg">
                                ${(item.price * item.quantity).toFixed(2)}
                              </div>
                              {item.quantity > 1 && (
                                <div className="text-sm text-gray-500 dark:text-gray-400">
                                  ${item.price.toFixed(2)} each
                                </div>
                              )}
                            </div>
                          </div>

                          {/* Remove Button */}
                          <button
                            onClick={() => removeItem(vendor.vendorId, item.id)}
                            className="mt-3 text-sm text-red-600 dark:text-red-400 hover:underline flex items-center gap-1"
                          >
                            <Trash2 size={14} />
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Vendor Summary */}
                <div className="bg-gray-50 dark:bg-gray-800 px-6 py-4 border-t border-gray-200 dark:border-gray-700">
                  <div className="space-y-2 mb-4">
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                      <span className="font-semibold">
                        ${calculateVendorSubtotal(vendor.items).toFixed(2)}
                      </span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-600 dark:text-gray-400">Shipping Fee</span>
                      <span className="font-semibold">${vendor.shippingFee.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-base pt-2 border-t border-gray-200 dark:border-gray-700">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold text-lg">
                        ${calculateVendorTotal(vendor).toFixed(2)}
                      </span>
                    </div>
                  </div>

                  <Link
                    href={`/checkout?vendor=${vendor.vendorId}`}
                    className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2"
                  >
                    Checkout from {vendor.vendorName}
                    <ArrowRight size={20} />
                  </Link>
                </div>
              </div>
            ))}
          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white dark:bg-gray-900 rounded-lg border border-gray-200 dark:border-gray-800 p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Order Summary</h2>

              <div className="space-y-3 mb-6">
                {vendorCarts.map((vendor) => (
                  <div
                    key={vendor.vendorId}
                    className="flex justify-between text-sm pb-3 border-b border-gray-200 dark:border-gray-800 last:border-0"
                  >
                    <span className="text-gray-600 dark:text-gray-400">
                      {vendor.vendorName}
                    </span>
                    <span className="font-semibold">
                      ${calculateVendorTotal(vendor).toFixed(2)}
                    </span>
                  </div>
                ))}
              </div>

              <div className="space-y-3 py-4 border-t border-gray-200 dark:border-gray-800">
                <div className="flex justify-between text-lg font-bold">
                  <span>Grand Total</span>
                  <span className="text-blue-600 dark:text-blue-400">
                    ${calculateGrandTotal().toFixed(2)}
                  </span>
                </div>
              </div>

              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 mb-6">
                <div className="flex gap-2 text-sm text-blue-600 dark:text-blue-400">
                  <AlertCircle size={16} className="flex-shrink-0 mt-0.5" />
                  <p>
                    You can checkout each vendor separately or checkout all at once below.
                  </p>
                </div>
              </div>

              <Link
                href="/checkout/all"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition flex items-center justify-center gap-2 mb-3"
              >
                Checkout All Vendors
                <ArrowRight size={20} />
              </Link>

              <Link
                href="/products"
                className="w-full border border-gray-300 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-800 py-3 rounded-lg font-semibold transition text-center block"
              >
                Continue Shopping
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}