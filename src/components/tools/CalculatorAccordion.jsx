import React from "react";
import { ChevronDown } from "lucide-react";

/**
 * Reusable accordion section for calculator inputs.
 * Mobile: single-open accordion. Desktop (md+): always expanded card.
 * Title is an h3 for proper heading hierarchy under a section h2.
 */
export default function CalculatorAccordion({ title, step, note, expanded, onExpand, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 overflow-hidden">
      <button
        onClick={onExpand}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          {step && <p className="text-xs tracking-widest uppercase text-golden mb-1">{step}</p>}
          <h3 className="font-heading text-lg text-midnight">{title}</h3>
          {note && <p className="text-xs text-midnight/40 mt-1 leading-relaxed">{note}</p>}
        </div>
        <ChevronDown size={20} className={`text-midnight/40 transition-transform flex-shrink-0 md:hidden ${expanded ? "rotate-180" : ""}`} />
      </button>
      <div className={`px-5 pb-5 pt-1 ${expanded ? "block" : "hidden"} md:block`}>{children}</div>
    </div>
  );
}