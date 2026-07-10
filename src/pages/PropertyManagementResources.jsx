import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80";

const CATEGORY_ORDER = [
  "Getting Started as a Landlord",
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
      seoTitle="Origin Property Concierge | Property Management Knowledge Centre"
      metaDescription="Landlord guides, rental checklists, FAQs and property management resources — curated for Melbourne investors."
      title="Property Management Knowledge Centre"
      subtitle="Landlord guides, rental checklists, FAQs and property management resources — curated for Melbourne investors."
      searchPlaceholder="Search property management topics"
      bannerImage={BANNER_IMAGE}
      overlayClass="bg-gradient-to-br from-midnight/90 to-accent-navy/75"
      service="property-management"
      categoryOrder={CATEGORY_ORDER}
      analyticsPage="property-management-resources"
      cta={{
        title: "Ready to discuss your property?",
        subtitle: "Book a no-obligation conversation with our property management team.",
        buttons: [
          { label: "Get My Property Appraisal", link: "/property-management", variant: "golden", analyticsKey: "pm_resources_appraisal" },
          { label: "Book a Consultation", link: "/book-consultation", variant: "outline", analyticsKey: "pm_resources_consultation" },
        ],
      }}
    />
  );
}