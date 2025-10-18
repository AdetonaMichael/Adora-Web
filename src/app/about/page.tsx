import { Users, Target, Award, Globe, TrendingUp, Shield } from "lucide-react";

const stats = [
  { label: "Active Vendors", value: "10,000+", icon: Users },
  { label: "Products Listed", value: "500,000+", icon: Target },
  { label: "Happy Customers", value: "1M+", icon: Award },
  { label: "Countries", value: "50+", icon: Globe },
];

const values = [
  {
    icon: Shield,
    title: "Trust & Security",
    description: "We verify every vendor and ensure secure transactions to protect our community.",
  },
  {
    icon: TrendingUp,
    title: "Vendor Success",
    description: "We empower small businesses and entrepreneurs to reach global audiences.",
  },
  {
    icon: Users,
    title: "Customer First",
    description: "Your satisfaction is our priority with 24/7 support and buyer protection.",
  },
  {
    icon: Globe,
    title: "Global Marketplace",
    description: "Connecting buyers and sellers from around the world in one platform.",
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Founder",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400&h=400&fit=crop",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400&h=400&fit=crop",
  },
  {
    name: "Emily Rodriguez",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400&h=400&fit=crop",
  },
  {
    name: "David Kim",
    role: "Head of Marketing",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400&h=400&fit=crop",
  },
];

export default function AboutPage() {
  return (
    <div className="bg-white dark:bg-gray-950">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-5xl font-bold mb-6">About MarketHub</h1>
            <p className="text-xl text-blue-100 dark:text-blue-200">
              We&apos;re building the world&apos;s most trusted multi-vendor marketplace, 
              connecting passionate sellers with eager buyers across the globe.
            </p>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 border-b border-gray-200 dark:border-gray-800">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 dark:bg-blue-900/30 rounded-full mb-4">
                  <stat.icon className="text-blue-600 dark:text-blue-400" size={32} />
                </div>
                <div className="text-3xl font-bold mb-2">{stat.value}</div>
                <div className="text-gray-600 dark:text-gray-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Story Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold mb-6">Our Story</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                Founded in 2020, MarketHub was born from a simple idea: what if we could create 
                a platform where anyone, anywhere could start selling and buying products with ease?
              </p>
              <p className="text-gray-600 dark:text-gray-400 mb-4 leading-relaxed">
                We noticed that many talented artisans, creators, and entrepreneurs struggled to 
                reach their audience. Traditional marketplaces were either too complex or took 
                too much commission. We wanted to change that.
              </p>
              <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                Today, we&apos;re proud to serve over 10,000 vendors and 1 million customers worldwide, 
                facilitating millions in transactions while keeping our fees fair and our platform simple.
              </p>
            </div>
            <div className="relative">
              <img
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=800&h=600&fit=crop"
                alt="Team collaboration"
                className="rounded-lg shadow-xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-blue-600 text-white p-6 rounded-lg shadow-lg">
                <div className="text-3xl font-bold">5 Years</div>
                <div className="text-blue-100">Of Excellence</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Our Values</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              These core principles guide everything we do and help us build a better marketplace for everyone.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <div key={index} className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-sm hover:shadow-lg transition-shadow">
                <div className="bg-blue-100 dark:bg-blue-900/30 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                  <value.icon className="text-blue-600 dark:text-blue-400" size={28} />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-gray-600 dark:text-gray-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4">Meet Our Team</h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
              We&apos;re a diverse team of dreamers, builders, and problem-solvers passionate about 
              creating the best marketplace experience.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <div key={index} className="text-center group">
                <div className="relative mb-4 overflow-hidden rounded-xl">
                  <img
                    src={member.image}
                    alt={member.name}
                    className="w-full aspect-square object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-800 dark:to-blue-950 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Join Our Growing Community</h2>
          <p className="text-xl text-blue-100 dark:text-blue-200 mb-8 max-w-2xl mx-auto">
            Whether you&apos;re a buyer looking for unique products or a seller ready to grow your business, 
            MarketHub is here for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/vendor/register"
              className="bg-white text-blue-600 px-8 py-4 rounded-lg font-semibold hover:bg-gray-100 transition"
            >
              Become a Vendor
            </a>
            <a
              href="/products"
              className="border-2 border-white px-8 py-4 rounded-lg font-semibold hover:bg-white hover:text-blue-600 transition"
            >
              Start Shopping
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}