import { useState, useCallback } from "react";
import { Helmet } from "react-helmet-async";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import ClientLogos from "@/components/ClientLogos";
import KPISection from "@/components/KPISection";
import ServicesSection from "@/components/ServicesSection";
import CaseStudiesSection from "@/components/CaseStudiesSection";
import ProcessSection from "@/components/ProcessSection";
import TestimonialsSection from "@/components/TestimonialsSection";
import FAQSection from "@/components/FAQSection";
import ContactSection from "@/components/ContactSection";
import Footer from "@/components/Footer";
import CountdownBanner from "@/components/CountdownBanner";
import StickyMobileCTA from "@/components/StickyMobileCTA";
import JsonLd from "@/components/JsonLd";

// Stable module-level constant — prevents CountdownBanner's useEffect/setInterval
// from re-firing on every parent render due to a new Date object being created each time.
const OFFER_END_DATE = new Date(Date.now() + 7 * 86400000);

const Index = () => {
  const [bannerHeight, setBannerHeight] = useState(0);

  const handleBannerHeightChange = useCallback((height: number) => {
    setBannerHeight(height);
  }, []);

  return (
    <main className="bg-background min-h-screen">
      <Helmet>
        <title>AGORA Media | Growth Engine for Ambitious Brands in Egypt &amp; MENA</title>
        <meta name="description" content="Strategy, creative & performance marketing for brands that demand results across Egypt, KSA & MENA. Get your free brand audit today." />
      </Helmet>
      <JsonLd type="home" />
      <CountdownBanner
        targetDate={OFFER_END_DATE}
        title="🚀 New: Performance Marketing Packages — Limited Spots"
        onHeightChange={handleBannerHeightChange}
      />
      <Navbar topOffset={bannerHeight} />
      <HeroSection />
      <ClientLogos />
      <KPISection />
      <ServicesSection />
      <CaseStudiesSection />
      <ProcessSection />
      <TestimonialsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
      <StickyMobileCTA />
    </main>
  );
};

export default Index;
