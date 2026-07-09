import React from "react";
import { Check } from "lucide-react";

const STRENGTH_LABELS = {
  "Deposit Strength": "Deposit appears healthy.",
  "Buying Cost Buffer": "Buying costs have been considered.",
  "Emergency Savings After Settlement": "Emergency savings buffer looks healthy.",
  "Repayment-to-Income Ratio": "Estimated repayments appear manageable.",
  "Existing Debt Commitments": "Existing debts are manageable.",
  "Loan-to-Value Ratio": "Loan-to-value ratio is within a good range.",
};

const AREA_LABELS = {
  "Deposit Strength": "Consider increasing your deposit.",
  "Buying Cost Buffer": "Ensure buying costs are fully covered.",
  "Emergency Savings After Settlement": "Build a larger emergency buffer.",
  "Repayment-to-Income Ratio": "Consider a slightly lower purchase budget to improve flexibility.",
  "Existing Debt Commitments": "Reduce existing debts where possible.",
  "Loan-to-Value Ratio": "Aim for a higher deposit to improve your LVR.",
};

export default function BuyingPosition({ score }) {
  const total = score.totalScore;
  const status = total >= 80
    ? { label: "Ready to Start Searching", color: "text-emerald-600", dot: "bg-emerald-500" }
    : total >= 60
    ? { label: "Nearly Ready", color: "text-amber-600", dot: "bg-amber-500" }
    : { label: "Planning Your Next Step", color: "text-accent-navy", dot: "bg-blue-500" };

  const strengths = score.components.filter((c) => c.score >= 60).map((c) => STRENGTH_LABELS[c.name] || c.name);
  const areas = score.components.filter((c) => c.score < 60).map((c) => AREA_LABELS[c.name] || c.name);

  return (
    <div>
      <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">Your Buying Position</h2>
      <p className="text-sm text-midnight/50 mb-6 max-w-2xl leading-relaxed">
        This assessment summarises your current buying position based on the financial information you entered. It is intended to help you understand your preparedness before purchasing property.
      </p>
      <div className="bg-white rounded-2xl border border-stone/60 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-8">
          <span className={`w-3 h-3 rounded-full ${status.dot} flex-shrink-0`} />
          <p className={`font-heading text-xl md:text-2xl ${status.color}`}>{status.label}</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">Your Strengths</p>
            <ul className="space-y-2.5">
              {strengths.length > 0 ? strengths.map((s, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <Check size={16} className="text-emerald-600 flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-midnight/70 leading-relaxed">{s}</span>
                </li>
              )) : <li className="text-sm text-midnight/40">Continue building your position.</li>}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">Areas to Strengthen</p>
            <ul className="space-y-2.5">
              {areas.length > 0 ? areas.map((a, i) => (
                <li key={i} className="flex items-start gap-2.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-golden flex-shrink-0 mt-2" />
                  <span className="text-sm text-midnight/70 leading-relaxed">{a}</span>
                </li>
              )) : <li className="text-sm text-midnight/40">Your position looks well-balanced.</li>}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}