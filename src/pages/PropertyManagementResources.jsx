import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";

const BANNER_IMAGE =
  "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";

const CATEGORY_ORDER = [
  "Getting Started as a Landlord",
  "Property Management",
  "Rental Appraisal",
  "Choosing a Property Manager",
  "Leasing Process",
  "Compliance",
  "Maintenance & Inspections",
  "End of Lease",
];

export default function PropertyManagementResources() {
  return (
    <ResourceHub
      seoTitle="Origin Property Concierge | Property Owner Knowledge Centre"
      metaDescription="Selling, leasing, rental appraisal and property-management guidance for owners and investors."
      title="Property Owner Knowledge Centre"
      subtitle="Selling, leasing, rental appraisal and property-management resources for Melbourne owners and investors."
      searchPlaceholder="Search property owner topics"
      bannerImage={BANNER_IMAGE}
      overlayClass="bg-gradient-to-br from-midnight/90 to-accent-navy/75"
      service="property-management"
      categoryOrder={CATEGORY_ORDER}
      cta={{
        title: "Ready to discuss your property?",
        subtitle: "Whether you are selling, leasing or comparing both, we can help you identify the best next step.",
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
