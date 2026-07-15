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
        <ResultCard label="預估購屋預算" value={fmtCurrency(results.estimatedPurchaseBudget)} sublabel="根據收入及首期資金估算的參考上限。" tone="highlight" />
        <ResultCard label="預估所需首期資金" value={fmtCurrency(results.estimatedDepositRequired)} sublabel="樓價的 20% 加上購屋成本。" />
        <ResultCard label="預估購屋成本" value={fmtCurrency(results.buyingCosts.totalBuyingCosts)} sublabel="包括印花稅、法律、驗屋及其他費用。" />
        <ResultCard label="預估貸款金額" value={fmtCurrency(results.loanAmount)} sublabel="樓價扣除首期資金。" />
        <ResultCard label="預估每月還款" value={fmtCurrency(results.monthlyRepayment)} sublabel="按貸款年期計算的本金及利息。" />
        <ResultCard label="預估每週還款" value={fmtCurrency(results.weeklyRepayment)} sublabel="供預算規劃參考。" />
        <ResultCard label="交割後剩餘現金" value={fmtCurrency(results.cashRemaining)} sublabel="可用資金扣除首期及購屋成本。" tone={results.cashRemaining > 0 ? "positive" : "negative"} />
        <ResultCard label="緊急備用金" value={`${results.emergencyBuffer} 個月`} sublabel="剩餘現金可支付生活開支的月數。" tone={results.emergencyBuffer >= 3 ? "positive" : results.emergencyBuffer >= 1 ? "default" : "negative"} />
        <ResultCard label="還款佔收入比例" value={fmtPct(results.repaymentToIncomeRatio)} sublabel="房貸還款佔家庭收入的比例。" tone={results.repaymentToIncomeRatio <= 30 ? "positive" : results.repaymentToIncomeRatio <= 40 ? "default" : "negative"} />
      </div>
      <p className="text-xs text-midnight/40 leading-relaxed mt-4">
        Your estimated purchase budget is an indicative maximum based on your income, commitments and deposit. Buying costs, stamp duty and 貸款機構按揭保險 will reduce your effective budget. Lenders assess borrowing capacity using their own criteria, which may differ from these estimates.
      </p>
    </div>
  );
}