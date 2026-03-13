import { Navbar, HeroSection } from "@/features/landing/ui/HeroSection";
import { FeaturesSection } from "@/features/landing/ui/FeaturesSection";
import { ArunaSection } from "@/features/landing/ui/ArunaSection";
import { PricingSection } from "@/features/landing/ui/PricingSection";
import { Footer } from "@/features/landing/ui/Footer";

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background text-foreground overflow-x-hidden">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ArunaSection />
      <PricingSection />
      <Footer />
    </div>
  );
}
