import React from "react";
import { fmtCurrency, fmtPct, cashflowTone } from "@/data/tools/yieldCalculator";

function ResultCard({ label, value, sublabel, isCashflow = false }) {
  const tone = cashflowTone(parseFloat(String(value).replace(/[^0-9.-]/g, "")));
  const toneClass = isCashflow
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

export default function YieldResultsDashboard({ results, summary, zh = false }) {
  const labels = zh ? {
    gross: "租金毛回報率", net: "租金淨回報率（貸款前）", rent: "全年租金收入", expenses: "全年總支出",
    interest: "全年利息估算", annual: "稅前年現金流", monthly: "稅前月現金流", weekly: "稅前週現金流",
  } : {
    gross: "Gross Rental Yield", net: "Net Rental Yield (Before Loan)", rent: "Annual Rent", expenses: "Total Annual Expenses",
    interest: "Annual Interest Estimate", annual: "Pre-Tax Annual Cashflow", monthly: "Pre-Tax Monthly Cashflow", weekly: "Pre-Tax Weekly Cashflow",
  };
  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <ResultCard label={labels.gross} value={fmtPct(results.grossYield)} />
        <ResultCard label={labels.net} value={fmtPct(results.netYield)} />
        <ResultCard label={labels.rent} value={fmtCurrency(results.annualRent)} />
        <ResultCard label={labels.expenses} value={fmtCurrency(results.totalExpenses)} />
        <ResultCard label={labels.interest} value={fmtCurrency(results.annualInterest)} />
        <ResultCard label={labels.annual} value={fmtCurrency(results.annualCashflow)} isCashflow />
        <ResultCard label={labels.monthly} value={fmtCurrency(results.monthlyCashflow)} isCashflow />
        <ResultCard label={labels.weekly} value={fmtCurrency(results.weeklyCashflow)} isCashflow />
      </div>
      <div className="mt-6 bg-accent-navy rounded-xl p-6 text-center">
        <p className="text-sm text-parchment/80 leading-relaxed">{summary}</p>
      </div>
    </div>
  );
}
