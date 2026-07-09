import React from "react";
import { Link } from "react-router-dom";
import { Gift, Shield, PiggyBank, TrendingUp, ArrowUpRight } from "lucide-react";
import { calculateStampDuty, calculateInvestorMetrics, fmtCurrency, fmtPct, num } from "@/data/tools/homeBuyingPlanner";

function ModeCard({ icon: Icon, title, children }) {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-stone/60 p-5">
      <div className="flex items-center gap-2 mb-2">
        <Icon size={16} className="text-golden" />
        <h3 className="font-heading text-sm text-midnight">{title}</h3>
      </div>
      {children}
    </div>
  );
}

/**
 * Buyer Mode Panel — dynamically renders First Home Buyer or Investor
 * content based on the selected buyer type, showing relevant incentives,
 * estimates and links.
 */
export default function BuyerModePanel({ inputs, results }) {
  const isFHB = inputs.buyerType === "First Home Buyer";
  const isInvestor = inputs.buyerType === "Investor";

  if (isFHB) {
    const price = num(inputs.purchasePrice);
    const generalDuty = calculateStampDuty(price, inputs.state, false);
    const fhbDuty = calculateStampDuty(price, inputs.state, true);
    const savings = Math.max(0, generalDuty - fhbDuty);

    return (
      <div>
        <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">First Home Buyer Guide</h2>
        <p className="text-sm text-midnight/50 mb-6">Government incentives and concessions that may apply to your purchase.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <ModeCard icon={Gift} title="Estimated Stamp Duty Savings">
            <p className="font-heading text-2xl text-emerald-600 mb-1">{fmtCurrency(savings)}</p>
            <p className="text-xs text-midnight/50">Based on first home buyer concessions in {inputs.state}. Actual savings depend on eligibility and property value thresholds.</p>
          </ModeCard>
          <ModeCard icon={Shield} title="First Home Owner Grant">
            <p className="text-sm text-midnight/70 leading-relaxed">You may be eligible for the First Home Owner Grant (FHOG) when purchasing a new home. In Victoria, the grant is $10,000 for new homes valued up to $750,000.</p>
          </ModeCard>
          <ModeCard icon={Shield} title="First Home Guarantee">
            <p className="text-sm text-midnight/70 leading-relaxed">The First Home Guarantee may allow you to buy with a 5% deposit without paying Lenders Mortgage Insurance, subject to eligibility criteria and availability.</p>
          </ModeCard>
          <ModeCard icon={PiggyBank} title="First Home Super Saver">
            <p className="text-sm text-midnight/70 leading-relaxed">If you've made voluntary super contributions, you may be able to withdraw them under the First Home Super Saver (FHSS) scheme toward your deposit.</p>
          </ModeCard>
          <div className="bg-parchment rounded-xl border border-stone/60 p-5 sm:col-span-2 lg:col-span-2">
            <p className="text-xs text-midnight/50 leading-relaxed">
              Eligibility for all first home buyer incentives depends on government criteria including income thresholds, property value limits, prior property ownership and residency status. Check current criteria with your state revenue office or the Australian Taxation Office before relying on these estimates.
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (isInvestor) {
    const m = calculateInvestorMetrics(inputs, results);
    return (
      <div>
        <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-2">Investment Property Planning</h2>
        <p className="text-sm text-midnight/50 mb-6">Key investment metrics based on your property details and estimated weekly rent.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <ModeCard icon={TrendingUp} title="Estimated Gross Rental Yield">
            <p className="font-heading text-2xl text-midnight mb-1">{fmtPct(m.grossRentalYield)}</p>
            <p className="text-xs text-midnight/50">Annual rent divided by property value, before expenses.</p>
          </ModeCard>
          <ModeCard icon={TrendingUp} title="Estimated Annual Rent">
            <p className="font-heading text-2xl text-midnight mb-1">{fmtCurrency(m.annualRent)}</p>
            <p className="text-xs text-midnight/50">Weekly rent multiplied by 52 weeks.</p>
          </ModeCard>
          <ModeCard icon={TrendingUp} title="Estimated Holding Costs">
            <p className="font-heading text-2xl text-midnight mb-1">{fmtCurrency(m.estimatedHoldingCosts)}</p>
            <p className="text-xs text-midnight/50">Loan interest plus rates, insurance and maintenance estimate.</p>
          </ModeCard>
          <ModeCard icon={TrendingUp} title="Estimated Pre-Tax Cashflow">
            <p className={`font-heading text-2xl mb-1 ${m.preTaxCashflow > 0 ? "text-emerald-600" : "text-red-500"}`}>{fmtCurrency(m.preTaxCashflow)}</p>
            <p className="text-xs text-midnight/50">{m.cashflowStatus} pre-tax cashflow position.</p>
          </ModeCard>
        </div>
        <div className="mt-4 bg-parchment rounded-xl border border-stone/60 p-5">
          <p className="text-sm text-midnight/60 leading-relaxed">
            For a detailed breakdown of rental yield, holding costs and cashflow — including vacancy allowances, property management fees and individual expense items — use the Investment Yield Calculator.
          </p>
          <Link to="/tools/investment-yield-calculator" className="inline-flex items-center gap-1 text-sm font-medium text-golden mt-3 hover:text-golden/80 transition">
            Open Investment Yield Calculator <ArrowUpRight size={14} />
          </Link>
        </div>
      </div>
    );
  }

  return null;
}