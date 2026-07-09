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
    <CollapsibleSection title="Buying Cost Breakdown" summary={`Estimated upfront costs: ${fmtCurrency(buyingCosts.totalBuyingCosts)}`}>
      <dl>
        <CostRow label="Stamp Duty" value={buyingCosts.stampDuty} />
        <CostRow label="Conveyancing Fee" value={buyingCosts.conveyancingFee} />
        <CostRow label="Building Inspection" value={buyingCosts.buildingInspection} />
        <CostRow label="Pest Inspection" value={buyingCosts.pestInspection} />
        <CostRow label="Government Registration Fees" value={buyingCosts.governmentRegistrationFees} />
        <CostRow label="Transfer Fees" value={buyingCosts.transferFees} />
        <CostRow label="Mortgage Registration" value={buyingCosts.mortgageRegistration} />
        <CostRow label="Loan Establishment Costs" value={buyingCosts.loanEstablishmentCosts} />
        {buyingCosts.lmi > 0 && <CostRow label="Lenders Mortgage Insurance" value={buyingCosts.lmi} />}
      </dl>
      <div className="mt-4 pt-4 border-t-2 border-golden/30 flex justify-between items-center">
        <dt className="font-heading text-base text-midnight">Total Estimated Buying Costs</dt>
        <dd className="font-heading text-xl text-midnight">{fmtCurrency(buyingCosts.totalBuyingCosts)}</dd>
      </div>
    </CollapsibleSection>
  );
}