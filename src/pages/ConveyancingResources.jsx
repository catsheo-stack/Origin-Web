import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80";

export default function ConveyancingResources() {
  return (
    <ResourceHub
      seoTitle="Origin Property Concierge | Conveyancing Knowledge Centre"
      metaDescription="Practical conveyancing guides, Section 32 explainers, settlement checklists and property transaction resources for Melbourne buyers and sellers."
      title="Conveyancing Knowledge Centre"
      subtitle="Practical guides, legal explanations, settlement checklists and property transaction resources for Melbourne buyers and sellers."
      searchPlaceholder="Search conveyancing topics"
      bannerImage={BANNER_IMAGE}
      overlayClass="bg-gradient-to-br from-stone-900/85 to-amber-950/70"
      service="conveyancing"
      categoryOrder={["Conveyancing"]}
      cta={{
        title: "Need help with your property transaction?",
        subtitle:
          "Book a consultation and we'll guide you through contract review, Section 32 checks and settlement.",
        buttons: [
          {
            label: "Book a Consultation",
            link: "/book-consultation?service=conveyancing",
            variant: "golden",
          },
          {
            label: "Contact Us",
            link: "/contact?service=conveyancing",
            variant: "outline",
          },
        ],
      }}
    />
  );
}
