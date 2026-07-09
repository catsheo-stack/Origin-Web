import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { calculateInvestorMetrics, fmtCurrency, fmtPct } from "@/data/tools/homeBuyingPlanner";

export default function InvestorSummary({ inputs, results }) {
  const m = calculateInvestorMetrics(inputs, results);
  return (
    <CollapsibleSection title="Investor Summary" summary="Key investment metrics based on your property details and estimated rent.">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="bg-parchment rounded-xl p-4">
          <p className="text-xs text-midnight/50 mb-1">Estimated Rental Yield</p>
          <p className="font-heading text-xl text-midnight">{fmtPct(m.grossRentalYield)}</p>
        </div>
        <div className="bg-parchment rounded-xl p-4">
          <p className="text-xs text-midnight/50 mb-1">Estimated Holding Costs</p>
          <p className="font-heading text-xl text-midnight">{fmtCurrency(m.estimatedHoldingCosts)}</p>
        </div>
        <div className="bg-parchment rounded-xl p-4">
          <p className="text-xs text-midnight/50 mb-1">Estimated Cashflow</p>
          <p className={`font-heading text-xl ${m.preTaxCashflow > 0 ? "text-emerald-600" : "text-amber-600"}`}>{fmtCurrency(m.preTaxCashflow)}</p>
        </div>
      </div>
      <Link to="/tools/investment-yield-calculator" className="inline-flex items-center gap-1.5 text-sm font-medium text-golden hover:text-golden/80 transition">
        Open Investment Yield Calculator <ArrowUpRight size={14} />
      </Link>
    </CollapsibleSection>
  );
}