import React from "react";
import FAQAccordion from "@/components/origin/FAQAccordion";
import SectionWrapper from "@/components/origin/SectionWrapper";

/**
 * Reusable FAQ section for Origin Tools. Uses the shared FAQAccordion.
 */
export default function ToolFAQ({ title = "Frequently Asked Questions", items }) {
  return (
    <SectionWrapper bg="bg-white">
      <div className="max-w-3xl mx-auto">
        <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-8 text-center">{title}</h2>
        <FAQAccordion items={items} />
      </div>
    </SectionWrapper>
  );
}