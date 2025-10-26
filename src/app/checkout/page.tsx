"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import {
  CreditCard,
  Truck,
  MapPin,
  Lock,
  ChevronRight,
  Check,
  Store,
  Edit,
  Plus,
  Info
} from "lucide-react";
import { formatMonetaryValue } from "@/helper/global";
import { PaymentProviderSelector } from "@/components/Payment/PaymentMethod";
import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";

interface CartItem {
  id: number;
  name: string;
  image: string;
  price: number;
  quantity: number;
  vendor: string;
}

interface ShippingAddress {
  fullName: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
}

type DeliveryMethod = "delivery" | "pickup";
type PaymentMethod = "card" | "paypal" | "bank" | "wallet" | "cod";

export default function CheckoutPage() {
  const [currentStep,] = useState(1);
  const [deliveryMethod, setDeliveryMethod] = useState<DeliveryMethod>("delivery");
  const [paymentMethod,] = useState<PaymentMethod>("card");
  const [isProcessing, setIsProcessing] = useState(false);
  const [paymentError, setPaymentError] = useState<string | null>(null);

  

  const providers = [
    {
      id: 'paystack',
      name: 'paystack',
      displayName: 'Paystack',
      description: 'Pay with cards, bank transfer or USSD',
      fees: { percentage: 0 },
      processingTime: 'Instant',
      popular: true
    },
    {
      id: 'flutterwave',
      name: 'flutterwave',
      displayName: 'Flutterwave',
      description: 'Cards, bank transfer & mobile money',
      fees: { percentage: 0 },
      processingTime: 'Instant',
      popular: true
    },
    {
      id: 'stripe',
      name: 'stripe',
      displayName: 'Stripe',
      description: 'Global card payments',
      fees: { percentage: 0, fixed: 0 },
      processingTime: 'Instant'
    },
    {
      id: 'paypal',
      name: 'paypal',
      displayName: 'PayPal',
      description: 'Pay with your PayPal account',
      fees: { percentage: 0, fixed: 0 },
      processingTime: 'Instant'
    },
    {
      id: 'bank_transfer',
      name: 'bank_transfer',
      displayName: 'Bank Transfer',
      description: 'Direct bank transfer',
      fees: { fixed: 0 },
      processingTime: '1-2 hours'
    }
  ];

   const handleProceedToPayment = async (): Promise<void> => {
    // if (!selectedPackage) {
    //   setPaymentError('Please select a package');
    //   return;
    // }

    // if (!selectedProvider) {
    //   setPaymentError('Please select a payment method');
    //   return;
    // }

    setIsProcessing(true);
    setPaymentError(null);

    try {

      const response = await fetch('/initiatePayStackPayment', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
          'X-Requested-With': 'XMLHttpRequest'
        },
        credentials: 'same-origin', // Include cookies for session
        // body: JSON.stringify({
        //   amount: selectedPackage.price,
        //   provider: selectedProvider.id,
        //   package_id: selectedPackage.id,
        //   credits: selectedPackage.credits
        // })
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();

      if (data.success && data.authorization_url) {
        // Store transaction info in sessionStorage for callback handling
        // sessionStorage.setItem('pending_transaction', JSON.stringify({
        //   reference: data.reference,
        //   package: selectedPackage,
        //   provider: selectedProvider
        // }));

        // Redirect to payment gateway immediately
        window.location.href = data.authorization_url;
      } else {
        setPaymentError(data.message || 'Payment initialization failed');
        setIsProcessing(false);
      }
    } catch (error) {
      console.error('Payment error:', error);
      if (error instanceof Error && (error.message.includes('419') || error.message.includes('CSRF'))) {
        setPaymentError('Security token expired. Please refresh the page and try again.');
      } else {
        setPaymentError('An error occurred during payment processing. Please try again.');
      }
      setIsProcessing(false);
    }
  };

  // TODO: Implement address editing
  const [shippingAddress] = useState<ShippingAddress>({
    fullName: "John Doe",
    phone: "+1 (555) 123-4567",
    address: "123 Main Street, Apt 4B",
    city: "New York",
    state: "NY",
    zipCode: "10001",
    country: "United States"
  });

  // Card details will be handled by payment provider
  const cartItems: CartItem[] = [
    {
      id: 1,
      name: "Wireless Headphones Pro",
      image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
      price: 129.99,
      quantity: 1,
      vendor: "AudioTech Store"
    },
    {
      id: 2,
      name: "Smart Watch Series 5",
      image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
      price: 299.99,
      quantity: 1,
      vendor: "TechGear Plus"
    }
  ];

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shippingCost = deliveryMethod === "delivery" ? 15.00 : 0;
  const tax = subtotal * 0.08;
  const total = subtotal + shippingCost + tax;

  // Payment options now handled by PaymentProviderSelector component

  const handlePlaceOrder = () => {
    setIsProcessing(true);
    setTimeout(() => {
      setIsProcessing(false);
      console.log("Order placed:", {
        items: cartItems,
        deliveryMethod,
        paymentMethod,
        shippingAddress,
        total
      });
    }, 2000);
  };

  return (
    <>
    <Header/>
    <div className="min-h-screen bg-gray-50 dark:bg-gray-950 py-8">
      <div className="container mx-auto px-4">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400 mb-8">
          <Link href="/" className="hover:text-blue-600 dark:hover:text-blue-400">Home</Link>
          <ChevronRight size={16} />
          <Link href="/cart" className="hover:text-blue-600 dark:hover:text-blue-400">Cart</Link>
          <ChevronRight size={16} />
          <span className="text-gray-900 dark:text-white font-medium">Checkout</span>
        </div>

        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-center gap-4 max-w-2xl mx-auto">
            {[
              { num: 1, label: "Shipping" },
              { num: 2, label: "Payment" },
              { num: 3, label: "Review" }
            ].map((step, idx) => (
              <div key={step.num} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold transition ${
                    currentStep >= step.num
                      ? "bg-blue-600 text-white"
                      : "bg-gray-200 dark:bg-gray-700 text-gray-600 dark:text-gray-400"
                  }`}>
                    {currentStep > step.num ? <Check size={20} /> : step.num}
                  </div>
                  <span className="text-xs mt-2 font-medium dark:text-gray-300">{step.label}</span>
                </div>
                {idx < 2 && (
                  <div className={`w-16 md:w-24 h-1 mx-2 transition ${
                    currentStep > step.num
                      ? "bg-blue-600"
                      : "bg-gray-200 dark:bg-gray-700"
                  }`}></div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Method */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                  <Truck className="text-blue-600 dark:text-blue-400" size={20} />
                </div>
                <h2 className="text-xl font-bold dark:text-white">Delivery Method</h2>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <button
                  onClick={() => setDeliveryMethod("delivery")}
                  className={`relative p-4 rounded-xl border-2 transition ${
                    deliveryMethod === "delivery"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {deliveryMethod === "delivery" && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  <Truck size={32} className={deliveryMethod === "delivery" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"} />
                  <h3 className="font-bold mt-3 dark:text-white">Home Delivery</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Delivered to your address</p>
                  <p className="text-sm font-semibold text-blue-600 dark:text-blue-400 mt-2">{formatMonetaryValue(15.00)}</p>
                </button>

                <button
                  onClick={() => setDeliveryMethod("pickup")}
                  className={`relative p-4 rounded-xl border-2 transition ${
                    deliveryMethod === "pickup"
                      ? "border-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
                  }`}
                >
                  {deliveryMethod === "pickup" && (
                    <div className="absolute top-3 right-3 w-6 h-6 bg-blue-600 rounded-full flex items-center justify-center">
                      <Check size={16} className="text-white" />
                    </div>
                  )}
                  <Store size={32} className={deliveryMethod === "pickup" ? "text-blue-600 dark:text-blue-400" : "text-gray-400"} />
                  <h3 className="font-bold mt-3 dark:text-white">Store Pickup</h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Pick up from vendor</p>
                  <p className="text-sm font-semibold text-green-600 dark:text-green-400 mt-2">FREE</p>
                </button>
              </div>
            </motion.div>

            {/* Shipping Address */}
            {deliveryMethod === "delivery" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center justify-between mb-6">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                      <MapPin className="text-blue-600 dark:text-blue-400" size={20} />
                    </div>
                    <h2 className="text-xl font-bold dark:text-white">Shipping Address</h2>
                  </div>
                  <button className="text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1 text-sm font-medium">
                    <Edit size={16} />
                    Edit
                  </button>
                </div>

                <div className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4">
                  <h3 className="font-bold dark:text-white mb-2">{shippingAddress.fullName}</h3>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">{shippingAddress.address}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-1">
                    {shippingAddress.city}, {shippingAddress.state} {shippingAddress.zipCode}
                  </p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm mb-2">{shippingAddress.country}</p>
                  <p className="text-gray-600 dark:text-gray-400 text-sm">📞 {shippingAddress.phone}</p>
                </div>

                <button className="mt-4 text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-2 text-sm font-medium">
                  <Plus size={16} />
                  Add New Address
                </button>
              </motion.div>
            )}

            {/* Pickup Location */}
            {deliveryMethod === "pickup" && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-10 h-10 bg-blue-100 dark:bg-blue-900/30 rounded-full flex items-center justify-center">
                    <Store className="text-blue-600 dark:text-blue-400" size={20} />
                  </div>
                  <h2 className="text-xl font-bold dark:text-white">Pickup Locations</h2>
                </div>

                <div className="space-y-3">
                  {cartItems.map((item) => (
                    <div key={item.id} className="border border-gray-200 dark:border-gray-700 rounded-xl p-4">
                      <div className="flex items-start gap-3">
                        <Store size={20} className="text-blue-600 dark:text-blue-400 mt-1" />
                        <div className="flex-1">
                          <h3 className="font-bold dark:text-white">{item.vendor}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            123 Vendor Street, City, State 12345
                          </p>
                          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                            📞 +1 (555) 987-6543
                          </p>
                          <p className="text-xs text-green-600 dark:text-green-400 mt-2 font-medium">
                            Available for pickup in 2-3 hours
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Payment Method */}
            {/* Payment Section */}
          {/* {selectedPackage && ( */}
            <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg border border-gray-200 dark:border-gray-700 p-4 sm:p-6 mb-8">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
                Payment Summary
              </h3>

              <div className="space-y-3 mb-6 text-sm">
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Package:</span>
                  {/* <span className="font-medium">{selectedPackage.name}</span> */}
                </div>
                <div className="flex justify-between text-gray-700 dark:text-gray-300">
                  <span>Credits:</span>
                  {/* <span className="font-medium">{selectedPackage.credits.toLocaleString()}</span> */}
                </div>
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="flex justify-between font-semibold text-lg text-gray-900 dark:text-white">
                    <span>Total:</span>
                    {/* <span>₦{selectedPackage.price}</span> */}
                  </div>
                </div>
              </div>

              <PaymentProviderSelector
                providers={providers.map(provider => ({
                  ...provider,
                  disabled: !['paystack', 'bank_transfer'].includes(provider.id)
                }))}
                isAdmin={false}
                showDisabledProviders={true}
                disabled={isProcessing}
              />

              {/* Payment error display */}
              {paymentError && (
                <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border border-red-200 dark:border-red-800 rounded-lg">
                  <p className="text-red-700 dark:text-red-300 text-sm">{paymentError}</p>
                </div>
              )}

              <button
                onClick={handleProceedToPayment}
                disabled={isProcessing }
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-semibold disabled:opacity-50 disabled:cursor-not-allowed transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Processing...</span>
                  </>
                ) : (
                  <>
                    <CreditCard className="h-5 w-5" />
                    <span>Pay {formatMonetaryValue(200)}</span>
                  </>
                )}
              </button>
            </div>
          {/* )} */}

          </div>

          {/* Order Summary Sidebar */}
          <div className="lg:col-span-1">
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm border border-gray-200 dark:border-gray-700 p-6"
              >
                <h2 className="text-xl font-bold dark:text-white mb-6">Order Summary</h2>

                {/* Cart Items */}
                <div className="space-y-4 mb-6 max-h-64 overflow-y-auto">
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3">
                      <div className="relative w-16 h-16 rounded-lg overflow-hidden flex-shrink-0 bg-gray-100 dark:bg-gray-700">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-sm dark:text-white line-clamp-1">{item.name}</h3>
                        <p className="text-xs text-gray-500 dark:text-gray-400">{item.vendor}</p>
                        <p className="text-sm font-semibold dark:text-white mt-1">
                          {formatMonetaryValue(item.price)} × {item.quantity}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Price Breakdown */}
                <div className="border-t border-gray-200 dark:border-gray-700 pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                    <span className="font-medium dark:text-white">{formatMonetaryValue(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Shipping</span>
                    <span className="font-medium dark:text-white">
                      {shippingCost === 0 ? "FREE" : `${formatMonetaryValue(shippingCost)}`}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">Tax (8%)</span>
                    <span className="font-medium dark:text-white">{formatMonetaryValue(tax)}</span>
                  </div>
                  <div className="border-t border-gray-200 dark:border-gray-700 pt-3 flex justify-between">
                    <span className="font-bold text-lg dark:text-white">Total</span>
                    <span className="font-bold text-lg text-blue-600 dark:text-blue-400">{formatMonetaryValue(total)}</span>
                  </div>
                </div>

                {/* Place Order Button */}
                <button
                  onClick={handlePlaceOrder}
                  disabled={isProcessing}
                  className="w-full mt-6 bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 text-white py-4 rounded-xl font-bold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
                >
                  {isProcessing ? (
                    <>
                      <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Processing...
                    </>
                  ) : (
                    <>
                      <Lock size={20} />
                      Place Order
                    </>
                  )}
                </button>

                {/* Security Badge */}
                <div className="mt-4 flex items-center justify-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                  <Lock size={16} />
                  <span>Secure checkout - SSL encrypted</span>
                </div>

                {/* Info Box */}
                <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-xl p-4">
                  <div className="flex gap-2">
                    <Info size={16} className="text-blue-600 dark:text-blue-400 flex-shrink-0 mt-0.5" />
                    <p className="text-xs text-gray-700 dark:text-gray-300">
                      Your payment information is encrypted and secure. We never store your card details.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <Footer/>
    </>
  );
}