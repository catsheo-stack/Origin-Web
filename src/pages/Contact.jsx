import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import LeadForm from "@/components/origin/LeadForm";

export default function Contact() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "contact" } });
  }, []);

  return (
    <SectionWrapper className="pt-32 md:pt-40">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-8">
          <p className="text-xs font-medium tracking-widest uppercase text-golden">Contact</p>
        </div>
        <LeadForm sourcePage="contact" />
      </div>
    </SectionWrapper>
  );
}