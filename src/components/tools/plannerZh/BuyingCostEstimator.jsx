import React from "react";
import { fmtCurrency } from "@/data/tools/homeBuyingPlanner";

function CostRow({ label, value, highlighted }) {
  return (
    <div className={`flex justify-between items-center gap-4 py-2.5 border-b border-stone/50 last:border-0 ${highlighted ? "bg-golden/5 -mx-4 px-4 rounded" : ""}`}>
      <dt className="text-sm text-midnight/60">{label}</dt>
      <dd className="text-sm text-midnight font-medium text-right">{fmtCurrency(value)}</dd>
    </div>
  );
}

/**
 * Buying Cost Estimator — itemised breakdown of all estimated upfront costs
 * associated with purchasing a property, including stamp duty, inspections,
 * government fees, loan establishment and 貸款機構按揭保險.
 */
export default function BuyingCostEstimator({ buyingCosts }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-parchment px-6 py-4 border-b border-stone/60">
        <p className="text-xs tracking-widest uppercase text-golden font-medium mb-0.5">Buying Cost Estimator</p>
        <p className="text-sm text-midnight/60">Estimated upfront costs associated with your purchase.</p>
      </div>
      <div className="p-6">
        <dl>
          <CostRow label="印花稅" value={buyingCosts.stampDuty} />
          <CostRow label="產權過戶服務費" value={buyingCosts.conveyancingFee} />
          <CostRow label="建築驗屋費" value={buyingCosts.buildingInspection} />
          <CostRow label="蟲害檢查費" value={buyingCosts.pestInspection} />
          <CostRow label="政府登記費" value={buyingCosts.governmentRegistrationFees} />
          <CostRow label="產權轉讓費" value={buyingCosts.transferFees} />
          <CostRow label="按揭登記費" value={buyingCosts.mortgageRegistration} />
          <CostRow label="貸款設立費" value={buyingCosts.loanEstablishmentCosts} />
          {buyingCosts.lmi > 0 && <CostRow label="貸款機構按揭保險" value={buyingCosts.lmi} />}
        </dl>
        <div className="mt-4 pt-4 border-t-2 border-golden/30 flex justify-between items-center">
          <dt className="font-heading text-base text-midnight">Total 預估購屋成本</dt>
          <dd className="font-heading text-xl text-midnight">{fmtCurrency(buyingCosts.totalBuyingCosts)}</dd>
        </div>
        <p className="text-xs text-midnight/40 leading-relaxed mt-4">
          These are indicative estimates only and may vary depending on your state, lender and transaction.
        </p>
      </div>
    </div>
  );
}