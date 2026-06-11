import Hero from "./components/sections/Hero";
import FeaturesSection from "./components/sections/FeaturesSection";
import HealthAreasSection from "./components/sections/HealthAreasSection";
import HowItWorksSection from "./components/sections/HowItWorksSection";
import TickerSection from "./components/sections/TickerSection";
import AgeSection from "./components/sections/AgeSection";
import SpecialistsSection from "./components/sections/SpecialistsSection";
import TestimonialsSection from "./components/sections/TestimonialsSection";
import CTASection from "./components/sections/CTASection";
import Footer from "./components/sections/Footer";

export default function Home() {
  return (
    <main>
      <Hero />
      <FeaturesSection />
      <HealthAreasSection />
      <HowItWorksSection />
      <TickerSection />
      <AgeSection />
      <SpecialistsSection />
      <TestimonialsSection />
      <CTASection />
      <Footer />
    </main>
  );
}
