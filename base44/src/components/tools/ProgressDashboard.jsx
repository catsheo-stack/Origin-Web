import React from "react";
import ProgressBar from "@/components/tools/ProgressBar";

/**
 * Reusable live progress dashboard: overall % + per-section bars.
 */
export default function ProgressDashboard({ sections, checkedItems, totalItems, completionLabel }) {
  const done = checkedItems.size;
  const pct = totalItems ? (done / totalItems) * 100 : 0;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 p-6">
      <div className="text-center mb-6">
        <p className="font-heading text-4xl text-midnight leading-none">
          {Math.round(pct)}<span className="text-xl text-midnight/40">%</span>
        </p>
        <p className="text-xs tracking-widest uppercase text-golden mt-2">{completionLabel}</p>
      </div>
      <ProgressBar value={pct} className="h-2.5 mb-6" />
      <div className="space-y-4">
        {sections.map((s) => {
          const d = s.items.filter((i) => checkedItems.has(i.id)).length;
          const p = s.items.length ? (d / s.items.length) * 100 : 0;
          return (
            <div key={s.id}>
              <div className="flex justify-between text-xs text-midnight/60 mb-1.5">
                <span>{s.title}</span>
                <span>{Math.round(p)}%</span>
              </div>
              <ProgressBar value={p} />
            </div>
          );
        })}
      </div>
    </div>
  );
}