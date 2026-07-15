import React from "react";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";
import Snapshot from "./results/Snapshot";
import BuyingPosition from "./results/BuyingPosition";
import RealityCheckBrief from "./results/RealityCheckBrief";
import FirstHomeBuyerSummary from "./results/FirstHomeBuyerSummary";
import InvestorSummary from "./results/InvestorSummary";
import CostBreakdown from "./results/CostBreakdown";
import NextSteps from "./results/NextSteps";
import PlannerPrintableSummary from "./PlannerPrintableSummary";
import { translateScore, translateRealityCheck } from "./translateOutput";

export default function ResultsOverview({ inputs, results, score, realityCheck, onEdit, onReset }) {
  const displayScore = translateScore(score);
  const displayRealityCheck = translateRealityCheck(realityCheck);
  const isFHB = inputs.buyerType === "First Home Buyer";
  const isInvestor = inputs.buyerType === "Investor";

  const handlePrint = () => {
    window.print();
    toast({ title: "可下載報告", description: "您的 Origin 購屋規劃報告已可在瀏覽器列印視窗中下載。" });
    base44.analytics.track({ eventName: "planner_printed", properties: { score: score.totalScore } });
  };

  return (
    <div className="space-y-12 md:space-y-16">
      <Snapshot results={results} />
      <BuyingPosition score={displayScore} />
      <RealityCheckBrief realityCheck={displayRealityCheck} />
      {isFHB && <FirstHomeBuyerSummary inputs={inputs} />}
      {isInvestor && <InvestorSummary inputs={inputs} results={results} />}
      <CostBreakdown buyingCosts={results.buyingCosts} />
      <NextSteps onPrint={handlePrint} onEdit={onEdit} onReset={onReset} />
      <div className="hidden print:block">
        <PlannerPrintableSummary inputs={inputs} results={results} score={displayScore} realityCheck={displayRealityCheck} />
      </div>
    </div>
  );
}