import React from "react";
import { ChevronDown, Check } from "lucide-react";
import ProgressBar from "@/components/tools/ProgressBar";

export default function ChecklistAccordionZh({ section, checkedItems, onToggle, expanded, onExpand }) {
  const total = section.items.length;
  const done = section.items.filter((item) => checkedItems.has(item.id)).length;
  const pct = total ? (done / total) * 100 : 0;

  return (
    <div className="overflow-hidden rounded-xl border border-stone/60 bg-white shadow-sm">
      <button
        type="button"
        onClick={onExpand}
        className="flex w-full items-center justify-between gap-4 p-5 text-left"
        aria-expanded={expanded}
      >
        <div className="min-w-0 flex-1">
          <h2 className="mb-2 font-heading text-lg text-midnight">{section.title}</h2>
          <div className="flex items-center gap-3">
            <ProgressBar value={pct} className="max-w-[180px]" />
            <span className="whitespace-nowrap text-xs text-midnight/50">
              已完成 {done}/{total} · {Math.round(pct)}%
            </span>
          </div>
        </div>
        <ChevronDown
          size={20}
          className={`flex-shrink-0 text-midnight/40 transition-transform ${expanded ? "rotate-180" : ""}`}
        />
      </button>

      {expanded && (
        <div className="space-y-1 px-5 pb-5 pt-1">
          {section.items.map((item) => {
            const isChecked = checkedItems.has(item.id);
            return (
              <button
                type="button"
                key={item.id}
                onClick={() => onToggle(item.id)}
                className="group flex w-full items-start gap-3 py-3 text-left"
                aria-pressed={isChecked}
              >
                <span
                  className={`mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-md border-2 transition-colors ${
                    isChecked
                      ? "border-golden bg-golden"
                      : "border-stone bg-white group-hover:border-golden/60"
                  }`}
                >
                  {isChecked && <Check size={14} className="text-midnight" strokeWidth={3} />}
                </span>
                <span
                  className={`text-sm leading-relaxed ${
                    isChecked ? "text-midnight/40 line-through" : "text-midnight/80"
                  }`}
                >
                  {item.label}
                </span>
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
