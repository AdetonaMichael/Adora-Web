import React, { useCallback } from 'react';
import {
  CheckCircle,
  AlertTriangle,
  Eye,
  EyeOff,
  CreditCard,
  Smartphone,
  Building2,
  Wallet,
  DollarSign,
  Bitcoin,
  Zap
} from 'lucide-react';

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

interface PaymentProviderCardProps {
  provider: PaymentProvider;
  isSelected: boolean;
  onSelect: (provider: PaymentProvider) => void;
  amount?: number;
  currency?: string;
  showFees?: boolean;
  disabled?: boolean;
  isAdmin?: boolean;
  onToggle?: (providerId: string, enabled: boolean) => void;
}

// Constants
const PROVIDER_LOGOS: Record<string, string> = {
  paystack: 'https://cdn.brandfetch.io/idM5mrwtDs/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667559828449',
  flutterwave: 'https://cdn.brandfetch.io/iddYbQIdlK/theme/dark/logo.svg?c=1bxid64Mup7aczewSAYMX&t=1667570802126',
  stripe: 'https://images.ctfassets.net/fzn2n1nzq965/HTTOloNPhisV9P4hlMPNA/cacf1bb88b9fc492dfad34378d844280/Stripe_icon_-_square.svg',
  paypal: 'https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-100px.png',
  bank_transfer: 'https://cdn-icons-png.flaticon.com/512/2830/2830284.png',
  opay: 'https://opayweb.com/assets/images/logo.png',
  moniepoint: 'https://monnify.com/assets/img/logo.svg',
  ussd: 'https://cdn-icons-png.flaticon.com/512/1041/1041916.png',
  crypto: 'https://cryptologos.cc/logos/bitcoin-btc-logo.png',
  wise: 'https://wise.com/public-resources/assets/logos/wise/brand_logo.svg',
  remita: 'https://www.remita.net/assets/img/logo.png'
};

const PROVIDER_ICONS: Record<string, React.ComponentType<{ className?: string }>> = {
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

// Utility function
const calculateFee = (provider: PaymentProvider, amount?: number): string => {
  if (!provider.fees || !amount) return 'Free';

  let fee = 0;
  if (provider.fees.percentage) {
    fee += (amount * provider.fees.percentage) / 100;
  }
  if (provider.fees.fixed) {
    fee += provider.fees.fixed;
  }

  return fee > 0 ? `₦${fee.toFixed(0)} fee` : 'Free';
};

// Main Component
export const PaymentProviderCard: React.FC<PaymentProviderCardProps> = ({
  provider,
  isSelected,
  onSelect,
  amount,
  currency = 'NGN',
  showFees = true,
  disabled = false,
  isAdmin = false,
  onToggle
}) => {
  const IconComponent = PROVIDER_ICONS[provider.id] || PROVIDER_ICONS.default;
  const feeText = showFees ? calculateFee(provider, amount) : '';
  const isDisabled = disabled || provider.disabled || provider.maintenanceMode;
  const logoUrl = PROVIDER_LOGOS[provider.id] || provider.logo;

  const handleClick = useCallback(() => {
    if (!isDisabled) {
      onSelect(provider);
    }
  }, [isDisabled, onSelect, provider]);

  const handleToggle = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
    if (onToggle) {
      onToggle(provider.id, !provider.disabled);
    }
  }, [onToggle, provider.id, provider.disabled]);

  const handleKeyDown = useCallback((e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      handleClick();
    }
  }, [handleClick]);

  return (
    <div
      role="radio"
      aria-checked={isSelected}
      tabIndex={isDisabled ? -1 : 0}
      className={`
        relative border-2 rounded-xl transition-all duration-200 cursor-pointer p-4 w-72 flex-shrink-0
        ${isSelected && !isDisabled
          ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/30 ring-2 ring-blue-200 dark:ring-blue-800'
          : isDisabled
          ? 'border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-950/20'
          : 'border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 hover:border-gray-300 dark:hover:border-gray-600'
        }
        ${isDisabled ? 'opacity-70 cursor-not-allowed' : 'hover:shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500'}
      `}
      onClick={handleClick}
      onKeyDown={handleKeyDown}
    >
      {/* Status Badges */}
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

      {/* Selection Indicator */}
      {isSelected && !isDisabled && (
        <div className="absolute top-3 right-3">
          <CheckCircle className="h-5 w-5 text-blue-600 dark:text-blue-400" />
        </div>
      )}

      {/* Admin Toggle */}
      {isAdmin && onToggle && (
        <div className="absolute top-3 right-3">
          <button
            onClick={handleToggle}
            className={`p-1 rounded-md transition-colors ${
              provider.disabled
                ? 'bg-red-100 hover:bg-red-200 text-red-600'
                : 'bg-green-100 hover:bg-green-200 text-green-600'
            }`}
            title={provider.disabled ? 'Enable Provider' : 'Disable Provider'}
          >
            {provider.disabled ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
          </button>
        </div>
      )}

      {/* Provider Content */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Logo/Icon */}
          <div className="flex items-center justify-center w-12 h-12 rounded-lg bg-gray-50 dark:bg-gray-700 relative">
            {logoUrl && (
              <img
                src={logoUrl}
                alt={provider.displayName}
                className="w-8 h-8 object-contain"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const parent = target.parentElement;
                  if (parent) {
                    const fallbackIcon = parent.querySelector('.fallback-icon');
                    if (fallbackIcon) {
                      (fallbackIcon as HTMLElement).style.display = 'block';
                    }
                  }
                }}
              />
            )}
            <IconComponent
              className={`w-6 h-6 text-gray-600 dark:text-gray-400 fallback-icon ${logoUrl ? 'hidden' : 'block'}`}
            />
          </div>

          {/* Provider Info */}
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

        {/* Fee and Processing Time */}
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
              {provider.maintenanceMode ? 'Under Maintenance' : 'Unavailable'}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Demo Component to show usage
const PaymentProviderCardDemo: React.FC = () => {
  const [selectedProvider, setSelectedProvider] = React.useState<PaymentProvider | null>(null);
  const [isAdmin, setIsAdmin] = React.useState(false);

  const sampleProviders: PaymentProvider[] = [
    {
      id: 'paystack',
      name: 'paystack',
      displayName: 'Paystack',
      description: 'Pay with cards, bank transfer or USSD',
      fees: { percentage: 1.5 },
      processingTime: 'Instant',
      popular: true,
      disabled: false
    },
    {
      id: 'flutterwave',
      name: 'flutterwave',
      displayName: 'Flutterwave',
      description: 'Cards, bank transfer & mobile money',
      fees: { percentage: 1.4 },
      processingTime: 'Instant',
      disabled: false
    },
    {
      id: 'stripe',
      name: 'stripe',
      displayName: 'Stripe',
      description: 'Global card payments',
      fees: { percentage: 2.9, fixed: 30 },
      processingTime: 'Instant',
      disabled: true,
      disabledReason: 'Currently under maintenance'
    },
    {
      id: 'paypal',
      name: 'paypal',
      displayName: 'PayPal',
      description: 'Pay with your PayPal account',
      fees: { percentage: 2.9, fixed: 30 },
      processingTime: 'Instant',
      maintenanceMode: true
    }
  ];

  const handleProviderToggle = (providerId: string, enabled: boolean) => {
    console.log(`Toggle provider ${providerId} to ${enabled ? 'enabled' : 'disabled'}`);
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-6">
      <div className="bg-gray-100 dark:bg-gray-800 rounded-xl p-4">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-white mb-4">
          Payment Provider Cards Demo
        </h2>
        <button
          onClick={() => setIsAdmin(!isAdmin)}
          className={`px-4 py-2 rounded-lg font-medium transition-colors ${
            isAdmin
              ? 'bg-blue-600 text-white'
              : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300'
          }`}
        >
          {isAdmin ? 'Exit Admin Mode' : 'Admin Mode'}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
        {sampleProviders.map(provider => (
          <PaymentProviderCard
            key={provider.id}
            provider={provider}
            isSelected={selectedProvider?.id === provider.id}
            onSelect={setSelectedProvider}
            amount={5000}
            showFees={true}
            isAdmin={isAdmin}
            onToggle={handleProviderToggle}
          />
        ))}
      </div>

      {selectedProvider && (
        <div className="mt-6 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <h3 className="font-medium text-blue-800 dark:text-blue-200">
            Selected: {selectedProvider.displayName}
          </h3>
          <p className="text-sm text-blue-600 dark:text-blue-300 mt-1">
            {selectedProvider.description}
          </p>
        </div>
      )}
    </div>
  );
};

// Export types for use in other components
export type { PaymentProvider, FeeStructure, PaymentProviderCardProps };

export default PaymentProviderCardDemo;
