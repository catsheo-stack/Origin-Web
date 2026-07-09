import React from "react";
import { fmtCurrency, fmtPct } from "@/data/tools/homeBuyingPlanner";

function ResultCard({ label, value, sublabel, tone }) {
  const toneClass = tone === "positive" ? "text-emerald-600" : tone === "negative" ? "text-red-500" : tone === "highlight" ? "text-golden" : "text-midnight";
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 p-5">
      <p className="text-xs font-medium tracking-wide uppercase text-midnight/40 mb-2">{label}</p>
      <p className={`font-heading text-2xl ${toneClass}`}>{value}</p>
      {sublabel && <p className="text-xs text-midnight/40 mt-1 leading-relaxed">{sublabel}</p>}
    </div>
  );
}

/**
 * Results Dashboard — elegant card grid displaying the buyer's estimated
 * purchase budget, deposit requirements, loan details, repayments, and
 * cash position after settlement.
 */
export default function ResultsDashboard({ results }) {
  return (
    <div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        <ResultCard label="Estimated Purchase Budget" value={fmtCurrency(results.estimatedPurchaseBudget)} sublabel="Indicative maximum based on your income and deposit." tone="highlight" />
        <ResultCard label="Estimated Deposit Required" value={fmtCurrency(results.estimatedDepositRequired)} sublabel="20% of purchase price plus buying costs." />
        <ResultCard label="Estimated Buying Costs" value={fmtCurrency(results.buyingCosts.totalBuyingCosts)} sublabel="Stamp duty, legal, inspections and fees." />
        <ResultCard label="Estimated Loan" value={fmtCurrency(results.loanAmount)} sublabel="Purchase price less deposit." />
        <ResultCard label="Estimated Monthly Repayment" value={fmtCurrency(results.monthlyRepayment)} sublabel="Principal & interest over loan term." />
        <ResultCard label="Estimated Weekly Repayment" value={fmtCurrency(results.weeklyRepayment)} sublabel="For budgeting purposes." />
        <ResultCard label="Cash Remaining After Settlement" value={fmtCurrency(results.cashRemaining)} sublabel="Available deposit minus deposit used and buying costs." tone={results.cashRemaining > 0 ? "positive" : "negative"} />
        <ResultCard label="Emergency Buffer" value={`${results.emergencyBuffer} months`} sublabel="Months of expenses covered by cash remaining." tone={results.emergencyBuffer >= 3 ? "positive" : results.emergencyBuffer >= 1 ? "default" : "negative"} />
        <ResultCard label="Repayment to Income Ratio" value={fmtPct(results.repaymentToIncomeRatio)} sublabel="Mortgage repayments as a percentage of household income." tone={results.repaymentToIncomeRatio <= 30 ? "positive" : results.repaymentToIncomeRatio <= 40 ? "default" : "negative"} />
      </div>
      <p className="text-xs text-midnight/40 leading-relaxed mt-4">
        Your estimated purchase budget is an indicative maximum based on your income, commitments and deposit. Buying costs, stamp duty and Lenders Mortgage Insurance will reduce your effective budget. Lenders assess borrowing capacity using their own criteria, which may differ from these estimates.
      </p>
    </div>
  );
}