import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { PromoBanner } from "@/components/home/PromoBanner";

export default function HomePage() {
  return (
    <>
      <HeroSection />
      <CategoryGrid />
      <ProductCarousel 
        title="Trending Products" 
        subtitle="Discover what's popular right now"
      />
      <PromoBanner />
      <FeaturedVendors />
      <ProductCarousel 
        title="New Arrivals" 
        subtitle="Fresh products from our vendors"
      />
      <TrustBadges />
    </>
  );
}