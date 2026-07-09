import React from "react";
import { fmtCurrency, fmtPct, cashflowTone } from "@/data/tools/yieldCalculator";

function ResultCard({ label, value, sublabel }) {
  const tone = cashflowTone(parseFloat(String(value).replace(/[^0-9.-]/g, "")));
  const toneClass = label.includes("Cashflow")
    ? tone === "positive" ? "text-emerald-600" : tone === "negative" ? "text-red-500" : "text-midnight"
    : "text-midnight";
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 p-5">
      <p className="text-xs font-medium tracking-wide uppercase text-midnight/40 mb-2">{label}</p>
      <p className={`font-heading text-2xl ${toneClass}`}>{value}</p>
      {sublabel && <p className="text-xs text-midnight/40 mt-1">{sublabel}</p>}
    </div>
  );
}

export default function YieldResultsDashboard({ results, summary }) {
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard label="Gross Rental Yield" value={fmtPct(results.grossYield)} />
        <ResultCard label="Net Rental Yield (Before Loan)" value={fmtPct(results.netYield)} />
        <ResultCard label="Annual Rent" value={fmtCurrency(results.annualRent)} />
        <ResultCard label="Total Annual Expenses" value={fmtCurrency(results.totalExpenses)} />
        <ResultCard label="Annual Interest Estimate" value={fmtCurrency(results.annualInterest)} />
        <ResultCard label="Pre-Tax Annual Cashflow" value={fmtCurrency(results.annualCashflow)} />
        <ResultCard label="Pre-Tax Monthly Cashflow" value={fmtCurrency(results.monthlyCashflow)} />
        <ResultCard label="Pre-Tax Weekly Cashflow" value={fmtCurrency(results.weeklyCashflow)} />
      </div>

      <div className="mt-6 bg-accent-navy rounded-xl p-6 text-center">
        <p className="text-sm text-parchment/80 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}