import React, { useState, useMemo, useCallback } from "react";
import {
  CreditCard,
  Shield,
  CheckCircle,
  Smartphone,
  Building2,
  Wallet,
  ArrowRight,
  DollarSign,
  Bitcoin,
  Zap,
  AlertTriangle,
  Eye,
  EyeOff
} from "lucide-react";
import Image from "next/image";

// Types
interface FeeStructure {
  percentage?: number;
  fixed?: number;
  currency?: string;
}

interface PaymentProvider {
  id: string;
  name: string;
  displayName: string;
  description: string;
  logo?: string;
  fees?: FeeStructure;
  processingTime?: string;
  popular?: boolean;
  disabled?: boolean;
  disabledReason?: string;
  maintenanceMode?: boolean;
  availableForRegions?: string[];
}

interface PaymentProviderSelectorProps {
  providers: PaymentProvider[];
  selectedProvider?: PaymentProvider | null;
  onProviderSelect?: (provider: PaymentProvider) => void;
  amount?: number;
  currency?: string;
  showFees?: boolean;
  className?: string;
  disabled?: boolean;
  showDisabledProviders?: boolean;
  onProviderToggle?: (providerId: string, enabled: boolean) => void;
  isAdmin?: boolean;
}

const providerLogos: Record<string, string> = {
  paystack: "https://cdn.brandfetch.io/idM5mrwtDs/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667559828449",
  flutterwave: "https://cdn.brandfetch.io/iddYbQIdlK/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667570802126",
  stripe: "https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg",
  paypal: "https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png",
  bank_transfer: "https://cdn-icons-png.flaticon.com/512/2830/2830284.png",
  opay: "https://opayweb.com/assets/images/logo.png",
  moniepoint: "https://monnify.com/assets/img/logo.svg",
  ussd: "https://cdn-icons-png.flaticon.com/512/1041/1041916.png",
  crypto: "https://cryptologos.cc/logos/bitcoin-btc-logo.png",
  wise: "https://wise.com/public-resources/assets/logos/wise/brand_logo.svg",
  remita: "https://www.remita.net/assets/img/logo.png"
};

const providerIcons: Record<string, React.ComponentType<{ className?: string }>> = {
  paystack: CreditCard,
  flutterwave: Smartphone,
  opay: Wallet,
  moniepoint: DollarSign,
  bank_transfer: Building2,
  ussd: Zap,
  crypto: Bitcoin,
  stripe: CreditCard,
  paypal: CreditCard,
  wise: DollarSign,
  remita: DollarSign,
  default: CreditCard
};

const getProviderIcon = (providerId: string) => {
  return providerIcons[providerId] || providerIcons.default;
};

const PaymentProviderSelector: React.FC<PaymentProviderSelectorProps> = ({
  providers,
  selectedProvider,
  onProviderSelect,
  amount,
  // currency = "NGN",
  showFees = true,
  className = "",
  disabled = false,
  showDisabledProviders = true,
  onProviderToggle,
  isAdmin = false
}) => {
  const calculateFee = useCallback((provider: PaymentProvider, amount?: number): string => {
    if (!provider.fees || !amount) return "Free";

    let fee = 0;
    if (provider.fees.percentage) {
      fee += (amount * provider.fees.percentage) / 100;
    }
    if (provider.fees.fixed) {
      fee += provider.fees.fixed;
    }

    return fee > 0 ? `₦${fee.toFixed(0)} fee` : "Free";
  }, []);

  const handleProviderClick = useCallback((provider: PaymentProvider) => {
    if (!disabled && !provider.disabled && !provider.maintenanceMode) {
      onProviderSelect(provider);
    }
  }, [disabled, onProviderSelect]);

  const handleProviderToggle = useCallback((providerId: string, currentlyEnabled: boolean) => {
    if (onProviderToggle) {
      onProviderToggle(providerId, !currentlyEnabled);
    }
  }, [onProviderToggle]);

  const displayProviders = useMemo(() => {
    if (showDisabledProviders) {
      return providers;
    }
    return providers.filter(provider => !provider.disabled && !provider.maintenanceMode);
  }, [providers, showDisabledProviders]);

  const { enabledProviders, disabledProviders } = useMemo(() => {
    const enabled = displayProviders.filter(p => !p.disabled && !p.maintenanceMode);
    const disabled = displayProviders.filter(p => p.disabled || p.maintenanceMode);
    return { enabledProviders: enabled, disabledProviders: disabled };
  }, [displayProviders]);

  const renderProvider = (provider: PaymentProvider) => {
    const IconComponent = getProviderIcon(provider.id);
    const isSelected = selectedProvider?.id === provider.id;
    const feeText = showFees ? calculateFee(provider, amount) : "";
    const isDisabled = disabled || provider.disabled || provider.maintenanceMode;
    const logoUrl = providerLogos[provider.id] || provider.logo;

    return (
      <div
        key={provider.id}
        role="radio"
        aria-checked={isSelected}
        tabIndex={isDisabled ? -1 : 0}
        className={`
          relative border-2 rounded-xl transition-all duration-200 cursor-pointer p-4 w-72 flex-shrink-0
          ${isSelected && !isDisabled
            ? "border-blue-500 bg-blue-50 dark:bg-blue-950/30 ring-2 ring-blue-200 dark:ring-blue-800"
            : isDisabled
            ? "border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20"
            : "border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600"
          }
          ${isDisabled ? "opacity-70 cursor-not-allowed" : "hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"}
        `}
        onClick={() => handleProviderClick(provider)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleProviderClick(provider);
          }
        }}
      >
        {provider.popular && !isDisabled && (
          <div className="absolute -top-2 left-4">
            <span className="bg-orange-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              Popular
            </span>
          </div>
        )}

        {provider.maintenanceMode && (
          <div className="absolute -top-2 left-4">
            <span className="bg-yellow-500 text-white px-2 py-0.5 rounded-full text-xs font-medium flex items-center">
              <AlertTriangle className="h-3 w-3 mr-1" />
              Maintenance
            </span>
          </div>
        )}

        {provider.disabled && (
          <div className="absolute -top-2 left-4">
            <span className="bg-red-500 text-white px-2 py-0.5 rounded-full text-xs font-medium">
              Disabled
            </span>
          </div>
        )}

        {isSelected && !isDisabled && (
          <div className="absolute top-3 right-3">
            <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </div>
        )}

        {isAdmin && onProviderToggle && (
          <div className="absolute top-3 right-3 flex space-x-1">
            <button
              onClick={(e) => {
                e.stopPropagation();
                handleProviderToggle(provider.id, !provider.disabled);
              }}
              className={`p-1 rounded-md transition-colors ${
                provider.disabled
                  ? "bg-red-100 hover:bg-red-200 text-red-600"
                  : "bg-green-100 hover:bg-green-200 text-green-600"
              }`}
              title={provider.disabled ? "Enable Provider" : "Disable Provider"}
            >
              {provider.disabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
            </button>
          </div>
        )}

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 relative">
              {logoUrl && (
                <Image
                  src={logoUrl}
                  alt={provider.displayName}
                  className="w-8 h-8 object-contain"
                  onError={(e) => {
                    const target = e.target as HTMLImageElement;
                    target.style.display = "none";
                    const parent = target.parentElement;
                    if (parent) {
                      const fallbackIcon = parent.querySelector(".fallback-icon");
                      if (fallbackIcon) {
                        (fallbackIcon as HTMLElement).style.display = "block";
                      }
                    }
                  }}
                />
              )}
              <IconComponent
                className={`w-6 h-6 text-gray-600 dark:text-gray-400 fallback-icon ${logoUrl ? "hidden" : "block"}`}
              />
            </div>

            <div className="flex-1 min-w-0">
              <h3 className="font-semibold text-gray-900 dark:text-white text-sm sm:text-base truncate">
                {provider.displayName}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-xs sm:text-sm line-clamp-2">
                {isDisabled && provider.disabledReason
                  ? provider.disabledReason
                  : provider.description
                }
              </p>
            </div>
          </div>

          <div className="text-right ml-2">
            {showFees && !isDisabled && (
              <div className="text-sm font-medium text-gray-900 dark:text-white whitespace-nowrap">
                {feeText}
              </div>
            )}
            {provider.processingTime && !isDisabled && (
              <div className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                {provider.processingTime}
              </div>
            )}
            {isDisabled && (
              <div className="text-xs text-red-500 dark:text-red-400 font-medium whitespace-nowrap">
                {provider.maintenanceMode ? "Under Maintenance" : "Unavailable"}
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className={`w-full ${className}`}>
      {enabledProviders.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
            Available Payment Methods
          </h3>
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {enabledProviders.map(renderProvider)}
            </div>
          </div>
        </div>
      )}

      {showDisabledProviders && disabledProviders.length > 0 && (
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-3">
            Currently Unavailable
          </h3>
          <div className="overflow-x-auto pb-4 hide-scrollbar">
            <div className="flex space-x-4" style={{ width: "max-content" }}>
              {disabledProviders.map(renderProvider)}
            </div>
          </div>
        </div>
      )}

      {enabledProviders.length === 0 && (
        <div className="text-center py-8">
          <AlertTriangle className="h-12 w-12 text-yellow-500 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
            No Payment Methods Available
          </h3>
          <p className="text-gray-500 dark:text-gray-400">
            All payment methods are currently unavailable. Please try again later.
          </p>
        </div>
      )}

      <div className="flex items-center justify-center mt-6 text-xs text-gray-500 dark:text-gray-400">
        <Shield className="h-4 w-4 mr-2 flex-shrink-0" />
        <span>All payments are secured with industry-standard encryption</span>
      </div>

      <style>
        {`
          .hide-scrollbar {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
          .hide-scrollbar::-webkit-scrollbar {
            display: none;
          }
        `}
      </style>
    </div>
  );
};

// Enhanced Example Usage Component
const PaymentProviderExample: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = useState<PaymentProvider | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showDisabledProviders, setShowDisabledProviders] = useState(true);
  const [amount] = useState(5000); // Fixed: Define amount state

  const [providers, setProviders] = useState<PaymentProvider[]>([
    {
      id: "paystack",
      name: "paystack",
      displayName: "Paystack",
      description: "Pay with cards, bank transfer or USSD",
      fees: { percentage: 1.5 },
      processingTime: "Instant",
      popular: true,
      disabled: false
    },
    {
      id: "flutterwave",
      name: "flutterwave",
      displayName: "Flutterwave",
      description: "Cards, bank transfer & mobile money",
      fees: { percentage: 1.4 },
      processingTime: "Instant",
      popular: true,
      disabled: false
    },
    {
      id: "stripe",
      name: "stripe",
      displayName: "Stripe",
      description: "Global card payments",
      fees: { percentage: 2.9, fixed: 30 },
      processingTime: "Instant",
      disabled: true,
      disabledReason: "Currently under maintenance"
    },
    {
      id: "paypal",
      name: "paypal",
      displayName: "PayPal",
      description: "Pay with your PayPal account",
      fees: { percentage: 2.9, fixed: 30 },
      processingTime: "Instant",
      maintenanceMode: true
    },
    {
      id: "bank_transfer",
      name: "bank_transfer",
      displayName: "Bank Transfer",
      description: "Direct bank transfer",
      fees: { fixed: 0 },
      processingTime: "1-2 hours",
      disabled: false
    }
  ]);

  const handleProviderToggle = useCallback((providerId: string, enabled: boolean) => {
    setProviders(prev =>
      prev.map(provider =>
        provider.id === providerId
          ? { ...provider, disabled: !enabled }
          : provider
      )
    );
  }, []);

  // Fixed: Proper async handling and error handling
  const handlePayment = useCallback(async () => {
    if (!selectedProvider || !amount) return;

    setIsProcessing(true);

    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 2000));

      // Note: In a real implementation, you would use a proper HTTP client
      // const response = await fetch("/initiatePayStackPayment", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ amount })
      // });

      alert(`Payment initiated with ${selectedProvider.displayName}! Amount: ₦${amount}`);
    } catch (error) {
      console.error("Payment failed:", error);
      alert("Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [selectedProvider, amount]); // Fixed: Added amount to dependencies

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
            Demo Controls
          </h3>
        </div>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              isAdmin
                ? "bg-blue-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {isAdmin ? "Exit Admin Mode" : "Admin Mode"}
          </button>
          <button
            onClick={() => setShowDisabledProviders(!showDisabledProviders)}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              showDisabledProviders
                ? "bg-green-600 text-white"
                : "bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300"
            }`}
          >
            {showDisabledProviders ? "Hide Disabled" : "Show Disabled"}
          </button>
        </div>
      </div>

      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-md p-6">
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Select Payment Method
        </h2>
        <p className="text-gray-600 dark:text-gray-400 text-sm mb-6">
          Choose how you"d like to pay ₦{amount.toLocaleString()}
        </p>

        <PaymentProviderSelector
          providers={providers}
          selectedProvider={selectedProvider}
          onProviderSelect={setSelectedProvider}
          amount={amount}
          showDisabledProviders={showDisabledProviders}
          isAdmin={isAdmin}
          onProviderToggle={isAdmin ? handleProviderToggle : undefined}
        />

        <button
          onClick={handlePayment}
          disabled={!selectedProvider || isProcessing}
          className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-xl font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center justify-center space-x-2 mt-6"
        >
          {isProcessing ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              <span>Processing...</span>
            </>
          ) : (
            <>
              <span>Pay ₦{amount.toLocaleString()}</span>
              <ArrowRight className="h-4 w-4" />
            </>
          )}
        </button>

        {selectedProvider && (
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <h3 className="font-medium text-blue-800 dark:text-blue-200">
              Selected: {selectedProvider.displayName}
            </h3>
            <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
              {selectedProvider.description}
            </p>
            <p className="text-sm text-blue-600 dark:text-blue-300">
              Processing time: {selectedProvider.processingTime}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export { PaymentProviderSelector, type PaymentProvider };
export default PaymentProviderExample;
