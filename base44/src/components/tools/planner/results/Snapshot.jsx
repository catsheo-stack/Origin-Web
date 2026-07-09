import React from "react";
import { fmtCurrency } from "@/data/tools/homeBuyingPlanner";

export default function Snapshot({ results }) {
  const cards = [
    { label: "Estimated Purchase Budget", value: fmtCurrency(results.estimatedPurchaseBudget), sub: "Indicative maximum based on income & deposit." },
    { label: "Estimated Deposit Required", value: fmtCurrency(results.estimatedDepositRequired), sub: "20% of price plus buying costs." },
    { label: "Estimated Buying Costs", value: fmtCurrency(results.buyingCosts.totalBuyingCosts), sub: "Stamp duty, legal & fees." },
    { label: "Estimated Monthly Repayment", value: fmtCurrency(results.monthlyRepayment), sub: "Principal & interest over loan term." },
    { label: "Estimated Loan", value: fmtCurrency(results.loanAmount), sub: "Purchase price less deposit." },
    { label: "Cash Remaining After Settlement", value: fmtCurrency(results.cashRemaining), sub: "After deposit & costs.", positive: results.cashRemaining >= 0 },
  ];
  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">Your Home Buying Snapshot</h2>
      <p className="text-sm text-midnight/50 mb-6 max-w-2xl leading-relaxed">
        A concise overview of your estimated purchase budget, deposit, buying costs, loan and cash position based on the details you entered.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards.map((c) => (
          <div key={c.label} className="bg-white rounded-2xl border border-stone/60 p-6">
            <p className="text-xs font-medium tracking-wide uppercase text-midnight/40 mb-2">{c.label}</p>
            <p className={`font-heading text-2xl ${c.positive ? "text-emerald-600" : "text-midnight"}`}>{c.value}</p>
            <p className="text-xs text-midnight/40 mt-1.5 leading-relaxed">{c.sub}</p>
          </div>
        ))}
      </div>
    </div>
  );
}