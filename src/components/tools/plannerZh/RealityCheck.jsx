import React from "react";
import { Check, AlertTriangle, ArrowRight } from "lucide-react";

function CheckItem({ item }) {
  const isPositive = item.type === "positive";
  return (
    <div className="flex items-start gap-3 py-2.5 border-b border-stone/40 last:border-0">
      {isPositive ? (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
          <Check size={12} className="text-emerald-600" />
        </span>
      ) : (
        <span className="flex-shrink-0 w-5 h-5 rounded-full bg-amber-100 flex items-center justify-center mt-0.5">
          <AlertTriangle size={12} className="text-amber-600" />
        </span>
      )}
      <p className="text-sm text-midnight/70 leading-relaxed">{item.text}</p>
    </div>
  );
}

/**
 * 實際狀況檢視 — an easy-to-read summary of the buyer's position, with
 * positive confirmations, warnings, and a tailored recommendation for
 * improving financial flexibility.
 */
export default function RealityCheck({ realityCheck }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-parchment px-6 py-4 border-b border-stone/60">
        <p className="text-xs tracking-widest uppercase text-golden font-medium mb-0.5">實際狀況檢視</p>
        <p className="text-sm text-midnight/60">清楚整理您目前的狀況及需要留意的事項。</p>
      </div>
      <div className="p-6">
        <div>
          {realityCheck.checks.map((item, i) => (
            <CheckItem key={i} item={item} />
          ))}
        </div>
        <div className="mt-4 bg-accent-navy rounded-xl p-5 flex items-start gap-3">
          <ArrowRight size={18} className="text-golden flex-shrink-0 mt-0.5" />
          <p className="text-sm text-parchment/80 leading-relaxed">{realityCheck.recommendation}</p>
        </div>
      </div>
    </div>
  );
}