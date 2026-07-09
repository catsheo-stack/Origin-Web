import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import PremiumHero from "@/components/origin/PremiumHero";

export default function Home() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "home" } });
    document.title = "Origin Property Concierge | Your Goal, Our Priority.";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute("content", "Connecting you with trusted professionals for every stage of your property journey — buying, selling, investing, leasing and settling through one connected property ecosystem.");
    }
  }, []);

  return <PremiumHero />;
}