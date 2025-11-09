import Navigation from "@/components/navigation";
import HeroSection from "@/components/sections/hero";
import FeaturesSection from "@/components/sections/features";
import DemoSection from "@/components/sections/demo";
import TestimonialsSection from "@/components/sections/testimonials";
import PricingSection from "@/components/sections/pricing";
import Footer from "@/components/sections/footer";
import VideoModal from "@/components/video-modal";

export default function Home() {
  return (
    <div className="min-h-screen bg-vscode-dark">
      <Navigation />
      <HeroSection />
      <FeaturesSection />
      <DemoSection />
      <TestimonialsSection />
      <PricingSection />
      <Footer />
      <VideoModal />
    </div>
  );
}
