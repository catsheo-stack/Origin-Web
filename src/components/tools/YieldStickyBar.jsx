import React from "react";
import { fmtPct, fmtCurrency, cashflowTone } from "@/data/tools/yieldCalculator";

/**
 * Mobile-only sticky bottom bar showing key live results + calculate button.
 */
export default function YieldStickyBar({ grossYield, weeklyCashflow, onCalculate }) {
  const tone = cashflowTone(weeklyCashflow);
  const toneClass = tone === "positive" ? "text-emerald-400" : tone === "negative" ? "text-red-400" : "text-parchment";

  return (
    <div className="md:hidden sticky bottom-4 z-40 mx-auto mt-8 max-w-md">
      <div className="bg-accent-navy rounded-full shadow-lg flex items-center justify-between gap-4 px-5 py-3">
        <div className="text-parchment">
          <p className="text-xs text-parchment/60">Gross Yield</p>
          <p className="text-sm font-medium leading-tight">{fmtPct(grossYield)}</p>
        </div>
        <div className="text-parchment border-l border-white/10 pl-4">
          <p className="text-xs text-parchment/60">Weekly Cashflow</p>
          <p className={`text-sm font-medium leading-tight ${toneClass}`}>{fmtCurrency(weeklyCashflow)}</p>
        </div>
        <button onClick={onCalculate} className="bg-golden text-midnight text-sm font-medium px-5 py-2.5 rounded-full active:scale-95 transition whitespace-nowrap">
          Calculate
        </button>
      </div>
    </div>
  );
}