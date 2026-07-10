import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1920&q=80";

export default function BuyerResources() {
  return (
    <ResourceHub
      seoTitle="Origin Property Concierge | Buyer Advisory Knowledge Centre"
      metaDescription="Buyer guides, suburb insights, auction strategies, due diligence checklists and property education for Melbourne home buyers and investors."
      title="Buyer Advisory Knowledge Centre"
      subtitle="Buying guides, suburb insights, auction strategies, due diligence checklists and property education — curated for Melbourne buyers and investors."
      searchPlaceholder="Search buyer advisory topics"
      bannerImage={BANNER_IMAGE}
      overlayClass="bg-gradient-to-br from-blue-950/85 to-blue-900/70"
      service="buyer-advisory"
      categoryOrder={["Buyer Advisory"]}
      cta={{
        title: "Need help choosing the right property?",
        subtitle:
          "Book a consultation and we'll help you understand your buying goals, risks and next steps.",
        buttons: [
          {
            label: "Start My Buyer Journey",
            link: "/buyer-advisory",
            variant: "golden",
          },
          {
            label: "Book a Consultation",
            link: "/book-consultation?service=buyer-advisory",
            variant: "outline",
          },
        ],
      }}
    />
  );
}
