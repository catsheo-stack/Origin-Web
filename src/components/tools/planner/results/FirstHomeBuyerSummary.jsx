import React from "react";
import { Check } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { calculateStampDuty, fmtCurrency, num } from "@/data/tools/homeBuyingPlanner";

const BENEFITS = [
  "Stamp Duty Concession",
  "First Home Owner Grant",
  "First Home Guarantee",
  "First Home Super Saver Scheme",
];

export default function FirstHomeBuyerSummary({ inputs }) {
  const price = num(inputs.purchasePrice);
  const savings = Math.max(0, calculateStampDuty(price, inputs.state, false) - calculateStampDuty(price, inputs.state, true));

  return (
    <CollapsibleSection title="First Home Buyer Benefits" summary="Government incentives and concessions that may apply to your purchase.">
      <p className="text-sm text-midnight/60 mb-4">You may be eligible for:</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {BENEFITS.map((b) => (
          <div key={b} className="flex items-center gap-2.5">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check size={12} className="text-emerald-600" />
            </span>
            <span className="text-sm text-midnight/70">{b}</span>
          </div>
        ))}
      </div>
      {savings > 0 && (
        <div className="bg-parchment rounded-xl p-4 mb-4">
          <p className="text-xs text-midnight/50">Estimated Stamp Duty Savings</p>
          <p className="font-heading text-xl text-emerald-600">{fmtCurrency(savings)}</p>
          <p className="text-xs text-midnight/40 mt-1">Based on first home buyer concessions in {inputs.state}. Actual savings depend on eligibility.</p>
        </div>
      )}
      <p className="text-xs text-midnight/40 leading-relaxed">
        Eligibility depends on government criteria including income thresholds, property value limits, prior property ownership and residency status. Check current criteria with your state revenue office.
      </p>
    </CollapsibleSection>
  );
}