import React from "react";
import { ChevronDown, Check } from "lucide-react";
import ProgressBar from "@/components/tools/ProgressBar";

/**
 * Reusable single-open accordion checklist section.
 */
export default function ChecklistAccordion({ section, checkedItems, onToggle, expanded, onExpand }) {
  const total = section.items.length;
  const done = section.items.filter((i) => checkedItems.has(i.id)).length;
  const pct = total ? (done / total) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 overflow-hidden">
      <button
        onClick={onExpand}
        className="w-full flex items-center justify-between gap-4 p-5 text-left"
        aria-expanded={expanded}
      >
        <div className="flex-1 min-w-0">
          <h2 className="font-heading text-lg text-midnight mb-2">{section.title}</h2>
          <div className="flex items-center gap-3">
            <ProgressBar value={pct} className="max-w-[180px]" />
            <span className="text-xs text-midnight/50 whitespace-nowrap">{done}/{total} · {Math.round(pct)}%</span>
          </div>
        </div>
        <ChevronDown size={20} className={`text-midnight/40 transition-transform flex-shrink-0 ${expanded ? "rotate-180" : ""}`} />
      </button>
      {expanded && (
        <div className="px-5 pb-5 pt-1 space-y-1">
          {section.items.map((item) => {
            const checked = checkedItems.has(item.id);
            return (
              <button
                key={item.id}
                onClick={() => onToggle(item.id)}
                className="w-full flex items-start gap-3 py-3 text-left group"
              >
                <span className={`mt-0.5 flex-shrink-0 w-6 h-6 rounded-md border-2 flex items-center justify-center transition-colors ${checked ? "bg-golden border-golden" : "border-stone bg-white group-hover:border-golden/60"}`}>
                  {checked && <Check size={14} className="text-midnight" strokeWidth={3} />}
                </span>
                <span className={`text-sm leading-relaxed ${checked ? "text-midnight/40 line-through" : "text-midnight/80"}`}>{item.label}</span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}