import { HeroSection } from "@/components/home/HeroSection";
import { CategoryGrid } from "@/components/home/CategoryGrid";
import { FeaturedVendors } from "@/components/home/FeaturedVendors";
import { ProductCarousel } from "@/components/home/ProductCarousel";
import { TrustBadges } from "@/components/home/TrustBadges";
import { PromoBanner } from "@/components/home/PromoBanner";
import { PartnershipSection } from "@/components/home/ParnerShipSection";
import { EcommerceNav } from "@/components/shared/EcommerceNav";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";

export default function HomePage() {
  return (
    <>
      <Header/>
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
      <PartnershipSection />
      <Footer/>
    </>
  );
}