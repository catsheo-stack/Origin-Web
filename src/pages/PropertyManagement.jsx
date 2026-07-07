import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import LeadForm from "@/components/origin/LeadForm";

export default function PropertyManagement() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "property-management" } });
  }, []);

  return (
    <section className="bg-white pt-28 md:pt-32 pb-16 md:pb-24 min-h-screen">
      <div className="max-w-2xl mx-auto px-6 lg:px-10">
        <LeadForm sourcePage="property-management" />
      </div>
    </section>
  );
}