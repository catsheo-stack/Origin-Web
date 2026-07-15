import React from "react";
import ProgressBar from "@/components/tools/ProgressBar";

export default function ProgressDashboardZh({ sections, checkedItems, totalItems, completionLabel }) {
  const done = checkedItems.size;
  const pct = totalItems ? (done / totalItems) * 100 : 0;

  return (
    <div className="rounded-xl border border-stone/60 bg-white p-6 shadow-sm">
      <div className="mb-6 text-center">
        <p className="font-heading text-4xl leading-none text-midnight">
          {Math.round(pct)}<span className="text-xl text-midnight/40">%</span>
        </p>
        <p className="mt-2 text-xs uppercase tracking-widest text-golden">{completionLabel}</p>
        <p className="mt-1 text-xs text-midnight/45">已完成 {done}／{totalItems} 項</p>
      </div>
      <ProgressBar value={pct} className="mb-6 h-2.5" />
      <div className="space-y-4">
        {sections.map((section) => {
          const completed = section.items.filter((item) => checkedItems.has(item.id)).length;
          const sectionPct = section.items.length ? (completed / section.items.length) * 100 : 0;
          return (
            <div key={section.id}>
              <div className="mb-1.5 flex justify-between text-xs text-midnight/60">
                <span>{section.title}</span>
                <span>{completed}/{section.items.length} · {Math.round(sectionPct)}%</span>
              </div>
              <ProgressBar value={sectionPct} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
