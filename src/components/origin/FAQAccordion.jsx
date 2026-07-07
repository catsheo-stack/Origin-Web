import React from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export default function FAQAccordion({ items }) {
  return (
    <Accordion type="single" collapsible className="w-full">
      {items.map((item, i) => (
        <AccordionItem
          key={i}
          value={`faq-${i}`}
          className="border-b border-stone/60 last:border-none"
        >
          <AccordionTrigger className="py-5 text-left font-heading text-base font-medium text-midnight hover:text-accent-navy hover:no-underline transition-colors">
            {item.question}
          </AccordionTrigger>
          <AccordionContent className="pb-5 text-sm text-midnight/60 leading-relaxed font-body">
            {item.answer}
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}