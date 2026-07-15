import React from "react";
import { FileText } from "lucide-react";

/**
 * Reusable mobile-only floating action bar.
 * Sticks to the bottom of the viewport while its section is in view.
 */
export default function StickyActionBarZh({ done, total, onGenerate }) {
  const pct = total ? Math.round((done / total) * 100) : 0;
  return (
    <div className="md:hidden sticky bottom-4 z-40 mx-auto mt-8 max-w-md">
      <div className="bg-accent-navy rounded-full shadow-lg flex items-center justify-between gap-4 px-5 py-3">
        <div className="text-parchment">
          <p className="text-sm font-medium leading-tight">{done} / {total} 已完成</p>
          <p className="text-xs text-parchment/60">{pct}% 已準備</p>
        </div>
        <button
          onClick={onGenerate}
          className="inline-flex items-center gap-2 bg-golden text-midnight text-sm font-medium px-5 py-2.5 rounded-full active:scale-95 transition"
        >
          <FileText size={15} />
          生成摘要
        </button>
      </div>
    </div>
  );
}