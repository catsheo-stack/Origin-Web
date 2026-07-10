import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";

export default function PropertyManagementResources() {
  return (
    <ResourceHub
      seoTitle="Origin Property Concierge | Property Owner Knowledge Centre"
      metaDescription="Practical guidance for owners considering selling, leasing, rental appraisal and property management."
      title="Property Owner Knowledge Centre"
      subtitle="Selling, leasing, rental appraisal and property management guidance for Melbourne owners and investors."
      searchPlaceholder="Search property owner topics"
      bannerImage={BANNER_IMAGE}
      overlayClass="bg-gradient-to-br from-midnight/90 to-accent-navy/75"
      service="property-management"
      categoryOrder={["Property Management"]}
      cta={{
        title: "Ready to maximise your property's potential?",
        subtitle:
          "Whether you're considering selling, leasing or comparing both options, we'll help you determine the best next step.",
        buttons: [
          {
            label: "Get My Property Appraisal",
            link: "/property-management",
            variant: "golden",
          },
          {
            label: "Book a Consultation",
            link: "/book-consultation",
            variant: "outline",
          },
        ],
      }}
    />
  );
}
