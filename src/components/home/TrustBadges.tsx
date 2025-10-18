import { ShieldCheck, Truck, CreditCard, Headphones } from "lucide-react";

const badges = [
  {
    icon: ShieldCheck,
    title: "Secure Payment",
    description: "100% secure transactions with SSL encryption",
  },
  {
    icon: Truck,
    title: "Free Shipping",
    description: "Free delivery on orders over $50",
  },
  {
    icon: CreditCard,
    title: "Money Back",
    description: "30-day money back guarantee",
  },
  {
    icon: Headphones,
    title: "24/7 Support",
    description: "Dedicated customer support team",
  },
];

export function TrustBadges() {
  return (
    <section className="py-16 bg-white dark:bg-gray-950 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {badges.map((badge, index) => (
            <div key={index} className="flex items-start gap-4">
              <div className="bg-blue-100 dark:bg-blue-900/30 p-3 rounded-lg flex-shrink-0">
                <badge.icon size={28} className="text-blue-600 dark:text-blue-400" />
              </div>
              <div>
                <h3 className="font-semibold text-lg mb-1">{badge.title}</h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm">{badge.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}