import React from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { calculateInvestorMetrics, fmtCurrency, fmtPct } from "@/data/tools/homeBuyingPlanner";

export default function InvestorSummary({ inputs, results }) {
  const m = calculateInvestorMetrics(inputs, results);
  return (
    <CollapsibleSection title="投資物業摘要" summary="根據您輸入的物業資料及預估租金，整理主要投資指標。">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        <div className="bg-parchment rounded-xl p-4">
          <p className="text-xs text-midnight/50 mb-1">預估租金回報率</p>
          <p className="font-heading text-xl text-midnight">{fmtPct(m.grossRentalYield)}</p>
        </div>
        <div className="bg-parchment rounded-xl p-4">
          <p className="text-xs text-midnight/50 mb-1">預估持有成本</p>
          <p className="font-heading text-xl text-midnight">{fmtCurrency(m.estimatedHoldingCosts)}</p>
        </div>
        <div className="bg-parchment rounded-xl p-4">
          <p className="text-xs text-midnight/50 mb-1">預估現金流</p>
          <p className={`font-heading text-xl ${m.preTaxCashflow > 0 ? "text-emerald-600" : "text-amber-600"}`}>{fmtCurrency(m.preTaxCashflow)}</p>
        </div>
      </div>
      <Link to="/zh/tools/investment-yield-calculator" className="inline-flex items-center gap-1.5 text-sm font-medium text-golden hover:text-golden/80 transition">
        開啟投資物業租金回報計算器 <ArrowUpRight size={14} />
      </Link>
    </CollapsibleSection>
  );
}