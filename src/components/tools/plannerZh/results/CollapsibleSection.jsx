import React, { useState } from "react";
import { ChevronDown } from "lucide-react";

export default function CollapsibleSection({ title, summary, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  return (
    <div className="bg-white rounded-2xl border border-stone/60 overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between gap-4 px-6 py-5 text-left hover:bg-parchment/30 transition-colors"
      >
        <div>
          <h3 className="font-heading text-lg text-midnight">{title}</h3>
          {summary && <p className="text-sm text-midnight/50 mt-0.5">{summary}</p>}
        </div>
        <ChevronDown size={20} className={`text-midnight/40 flex-shrink-0 transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <div className="px-6 pb-6 border-t border-stone/40 pt-5">{children}</div>}
    </div>
  );
}