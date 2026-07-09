import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1920&q=80";

const CATEGORY_ORDER = [
  "First Home Buyers",
  "Home Loan Basics",
  "Borrowing Power",
  "Pre-Approval",
  "Interest Rates",
  "Refinancing",
  "Investment Loans",
  "Government Grants & Schemes",
  "Frequently Asked Questions",
];

export default function MortgageResources() {
  return (
    <ResourceHub
      seoTitle="Origin Property Concierge | Mortgage & Finance Knowledge Centre"
      metaDescription="Home loan guides, borrowing strategies, refinancing advice and finance education for property buyers."
      title="Mortgage & Finance Knowledge Centre"
      subtitle="Home loan guides, borrowing strategies, refinancing advice and finance education — helping Melbourne buyers make informed borrowing decisions."
      searchPlaceholder="Search mortgage and finance topics"
      bannerImage={BANNER_IMAGE}
      overlayClass="bg-gradient-to-br from-midnight/90 to-accent-navy/75"
      service="mortgage-finance"
      categoryOrder={CATEGORY_ORDER}
      analyticsPage="mortgage-finance-resources"
      cta={{
        title: "Need help with your home loan?",
        subtitle: "Book a consultation and we'll connect you with finance guidance tailored to your situation.",
        buttons: [
          { label: "Book a Consultation", link: "/book-consultation?service=mortgage-finance", variant: "golden", analyticsKey: "mortgage_resources_consultation" },
          { label: "Contact Us", link: "/contact?service=mortgage-finance", variant: "outline", analyticsKey: "mortgage_resources_contact" },
        ],
      }}
    />
  );
}