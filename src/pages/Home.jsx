import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import HeroSection from "@/components/origin/HeroSection";

const HERO_IMG = "https://media.base44.com/images/public/6a4b6a4d876af717f7025909/b83fb0775_generated_500ee129.png";

export default function Home() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "home" } });
  }, []);

  return (
    <HeroSection
      label="Melbourne Property Concierge"
      title={<>Need Help Leasing or <span className="text-golden">Managing Your</span> Property?</>}
      subtitle="Get matched with the right property management support for your investment property."
      ctaText="Get My Rental Appraisal"
      ctaLink="/contact"
      imageUrl={HERO_IMG}
    />
  );
}