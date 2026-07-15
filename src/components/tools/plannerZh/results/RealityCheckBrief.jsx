import React from "react";
import { Check, AlertTriangle } from "lucide-react";

export default function RealityCheckBrief({ realityCheck }) {
  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">實際狀況檢視</h2>
      <p className="text-sm text-midnight/50 mb-6 max-w-2xl leading-relaxed">
        A clear, concise summary of where you stand and what to consider before proceeding with your purchase.
      </p>
      <div className="bg-white rounded-2xl border border-stone/60 p-6">
        <div className="space-y-3.5">
          {realityCheck.checks.map((item, i) => (
            <div key={i} className="flex items-start gap-3">
              {item.type === "positive" ? (
                <Check size={18} className="text-emerald-600 flex-shrink-0 mt-0.5" />
              ) : (
                <AlertTriangle size={18} className="text-amber-600 flex-shrink-0 mt-0.5" />
              )}
              <p className="text-sm text-midnight/70 leading-relaxed">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}