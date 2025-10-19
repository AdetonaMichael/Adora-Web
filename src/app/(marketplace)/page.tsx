import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { PromoBanner } from "@/components/home/PromoBanner";
import { PartnershipSection } from "@/components/home/ParnerShipSection";
import { EcommerceNav } from "@/components/shared/EcommerceNav";

export default function HomePage() {
  return (
    <>
      <EcommerceNav/>
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
      <PartnershipSection />
      <TrustBadges />
    </>
  );
}