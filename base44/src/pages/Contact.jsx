import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import ContactEnquiryForm from "@/components/origin/ContactEnquiryForm";

const serviceIntentMap = {
  "buyer-advisory": {
    service_required: "Buyer Agent / Buyer Advisory",
    service_type: "buyer-advisory",
    lead_source: "buyer-advisory-page",
  },
};

export default function Contact() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "contact" } });
  }, []);

  const params = new URLSearchParams(window.location.search);
  const intent = serviceIntentMap[params.get("service")] || {};

  return (
    <SectionWrapper className="!pt-32 md:!pt-40 !pb-20 md:!pb-28">
      <div className="max-w-3xl mx-auto">
        <ContactEnquiryForm intent={intent} />
      </div>
    </SectionWrapper>
  );
}