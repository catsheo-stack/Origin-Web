import React from "react";
import CollapsibleSection from "./CollapsibleSection";
import { fmtCurrency } from "@/data/tools/homeBuyingPlanner";

function CostRow({ label, value }) {
  return (
    <div className="flex justify-between items-center gap-4 py-2.5 border-b border-stone/50 last:border-0">
      <dt className="text-sm text-midnight/60">{label}</dt>
      <dd className="text-sm text-midnight font-medium text-right">{fmtCurrency(value)}</dd>
    </div>
  );
}

export default function CostBreakdown({ buyingCosts }) {
  return (
    <CollapsibleSection title="購屋成本明細" summary={`預估前期成本： ${fmtCurrency(buyingCosts.totalBuyingCosts)}`}>
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
        <dt className="font-heading text-base text-midnight">預估購屋成本總額</dt>
        <dd className="font-heading text-xl text-midnight">{fmtCurrency(buyingCosts.totalBuyingCosts)}</dd>
      </div>
    </CollapsibleSection>
  );
}