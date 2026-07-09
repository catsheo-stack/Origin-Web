import React from "react";
import { fmtCurrency, fmtPct, DISCLAIMER, calculateStampDuty, calculateInvestorMetrics, num } from "@/data/tools/homeBuyingPlanner";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-stone/50 last:border-0">
      <dt className="text-sm text-midnight/50">{label}</dt>
      <dd className="text-sm text-midnight font-medium text-right">{value}</dd>
    </div>
  );
}

function SectionTitle({ children }) {
  return <p className="text-xs uppercase tracking-wide text-golden mb-2">{children}</p>;
}

/**
 * Planner Printable Summary — the comprehensive PDF report.
 * Contains all detailed financial information. Hidden on screen;
 * only visible when the user prints / saves as PDF.
 */
export default function PlannerPrintableSummary({ inputs, results, score, realityCheck }) {
  const isFHB = inputs.buyerType === "First Home Buyer";
  const isInvestor = inputs.buyerType === "Investor";

  const execSummary = `Based on the financial information provided, your estimated purchase budget is ${fmtCurrency(results.estimatedPurchaseBudget)}, with an estimated deposit required of ${fmtCurrency(results.estimatedDepositRequired)} and estimated buying costs of ${fmtCurrency(results.buyingCosts.totalBuyingCosts)}. Your estimated loan is ${fmtCurrency(results.loanAmount)} with monthly repayments of ${fmtCurrency(results.monthlyRepayment)}, resulting in approximately ${fmtCurrency(results.cashRemaining)} cash remaining after settlement.${isFHB ? " As a first home buyer, you may be eligible for government incentives and stamp duty concessions." : ""}${isInvestor ? " As an investor, your estimated gross rental yield and cashflow position are summarised below." : ""}`;

  let fhbSavings = 0;
  if (isFHB) {
    const price = num(inputs.purchasePrice);
    fhbSavings = Math.max(0, calculateStampDuty(price, inputs.state, false) - calculateStampDuty(price, inputs.state, true));
  }

  const investorMetrics = isInvestor ? calculateInvestorMetrics(inputs, results) : null;

  return (
    <div className="printable-summary bg-white rounded-2xl border border-stone/60 overflow-hidden">
      <div className="bg-accent-navy px-6 py-5 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-golden mb-1">Origin Home Buying Planner</p>
        <p className="font-heading text-lg text-parchment">Your Origin Home Buying Report</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        {/* Executive Summary */}
        <div>
          <SectionTitle>Executive Summary</SectionTitle>
          <p className="text-sm text-midnight/70 leading-relaxed">{execSummary}</p>
        </div>

        {/* Buyer Details */}
        <div>
          <SectionTitle>Buyer Details</SectionTitle>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Row label="Buyer type" value={inputs.buyerType || "—"} />
            <Row label="State" value={inputs.state} />
            <Row label="Total household income" value={fmtCurrency(results.totalIncome)} />
            <Row label="Total available deposit" value={fmtCurrency(results.totalDeposit)} />
            <Row label="Monthly commitments" value={fmtCurrency(results.monthlyCommitments)} />
            <Row label="Purchase price" value={fmtCurrency(inputs.purchasePrice)} />
            <Row label="Deposit percentage" value={fmtPct(inputs.depositPercentage)} />
            <Row label="Interest rate" value={fmtPct(inputs.interestRate)} />
            <Row label="Loan term" value={`${inputs.loanTerm} years`} />
            <Row label="Preferred suburb" value={inputs.suburb || "—"} />
          </dl>
        </div>

        {/* Budget Summary */}
        <div>
          <SectionTitle>Budget Summary</SectionTitle>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Row label="Estimated Purchase Budget" value={fmtCurrency(results.estimatedPurchaseBudget)} />
            <Row label="Estimated Loan" value={fmtCurrency(results.loanAmount)} />
            <Row label="Monthly Repayment" value={fmtCurrency(results.monthlyRepayment)} />
            <Row label="Weekly Repayment" value={fmtCurrency(results.weeklyRepayment)} />
            <Row label="Loan-to-Value Ratio" value={fmtPct(results.lvr)} />
            <Row label="Repayment to Income Ratio" value={fmtPct(results.repaymentToIncomeRatio)} />
            <Row label="Debt to Income Ratio" value={fmtPct(results.debtToIncomeRatio)} />
            <Row label="Cash Remaining After Settlement" value={fmtCurrency(results.cashRemaining)} />
            <Row label="Emergency Buffer" value={`${results.emergencyBuffer} months`} />
          </dl>
        </div>

        {/* Buying Cost Breakdown */}
        <div>
          <SectionTitle>Buying Cost Breakdown</SectionTitle>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Row label="Stamp Duty" value={fmtCurrency(results.buyingCosts.stampDuty)} />
            <Row label="Conveyancing Fee" value={fmtCurrency(results.buyingCosts.conveyancingFee)} />
            <Row label="Building Inspection" value={fmtCurrency(results.buyingCosts.buildingInspection)} />
            <Row label="Pest Inspection" value={fmtCurrency(results.buyingCosts.pestInspection)} />
            <Row label="Government Registration Fees" value={fmtCurrency(results.buyingCosts.governmentRegistrationFees)} />
            <Row label="Transfer Fees" value={fmtCurrency(results.buyingCosts.transferFees)} />
            <Row label="Mortgage Registration" value={fmtCurrency(results.buyingCosts.mortgageRegistration)} />
            <Row label="Loan Establishment" value={fmtCurrency(results.buyingCosts.loanEstablishmentCosts)} />
            {results.buyingCosts.lmi > 0 && <Row label="Lenders Mortgage Insurance" value={fmtCurrency(results.buyingCosts.lmi)} />}
            <Row label="Total Buying Costs" value={fmtCurrency(results.buyingCosts.totalBuyingCosts)} />
          </dl>
        </div>

        {/* Deposit Analysis */}
        <div>
          <SectionTitle>Deposit Analysis</SectionTitle>
          <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
            <Row label="Total Available Deposit" value={fmtCurrency(results.totalDeposit)} />
            <Row label="Deposit Required (20% + Costs)" value={fmtCurrency(results.estimatedDepositRequired)} />
            <Row label="Deposit Used" value={fmtCurrency(results.depositUsed)} />
            <Row label="Loan-to-Value Ratio" value={fmtPct(results.lvr)} />
            <Row label="Cash Remaining After Settlement" value={fmtCurrency(results.cashRemaining)} />
            <Row label="Emergency Buffer (months)" value={`${results.emergencyBuffer} months`} />
          </dl>
        </div>

        {/* Financial Comfort Score */}
        <div>
          <SectionTitle>Financial Comfort Score</SectionTitle>
          <p className="font-heading text-2xl text-midnight mb-1">{score.totalScore} / 100 — {score.grade}</p>
          <div className="space-y-1 mt-2">
            {score.components.map((c) => (
              <div key={c.name} className="py-2 border-b border-stone/50 last:border-0">
                <div className="flex justify-between mb-1">
                  <dt className="text-sm text-midnight/60">{c.name} ({c.weight}%)</dt>
                  <dd className="text-sm text-midnight font-medium">{c.score}/100</dd>
                </div>
                <p className="text-xs text-midnight/50 leading-relaxed">{c.explanation}</p>
              </div>
            ))}
          </div>
        </div>

        {/* First Home Buyer Benefits */}
        {isFHB && (
          <div>
            <SectionTitle>First Home Buyer Benefits</SectionTitle>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6 mb-3">
              <Row label="Estimated Stamp Duty Savings" value={fmtCurrency(fhbSavings)} />
              <Row label="State" value={inputs.state} />
            </dl>
            <ul className="space-y-1.5">
              <li className="text-sm text-midnight/70 leading-relaxed">&bull; First Home Owner Grant (FHOG) — may be available for new homes.</li>
              <li className="text-sm text-midnight/70 leading-relaxed">&bull; First Home Guarantee — may allow a 5% deposit without LMI.</li>
              <li className="text-sm text-midnight/70 leading-relaxed">&bull; First Home Super Saver (FHSS) — withdraw voluntary super contributions toward deposit.</li>
              <li className="text-sm text-midnight/70 leading-relaxed">&bull; Stamp duty concessions or exemptions may apply.</li>
            </ul>
            <p className="text-xs text-midnight/40 leading-relaxed mt-2">Eligibility depends on government criteria. Check current criteria with your state revenue office.</p>
          </div>
        )}

        {/* Investor Analysis */}
        {isInvestor && investorMetrics && (
          <div>
            <SectionTitle>Investor Analysis</SectionTitle>
            <dl className="grid grid-cols-1 md:grid-cols-2 gap-x-6">
              <Row label="Gross Rental Yield" value={fmtPct(investorMetrics.grossRentalYield)} />
              <Row label="Annual Rent" value={fmtCurrency(investorMetrics.annualRent)} />
              <Row label="Estimated Holding Costs" value={fmtCurrency(investorMetrics.estimatedHoldingCosts)} />
              <Row label="Pre-Tax Cashflow" value={fmtCurrency(investorMetrics.preTaxCashflow)} />
              <Row label="Cashflow Status" value={investorMetrics.cashflowStatus} />
            </dl>
          </div>
        )}

        {/* Reality Check */}
        <div>
          <SectionTitle>Reality Check</SectionTitle>
          <ul className="space-y-1.5">
            {realityCheck.checks.map((item, i) => (
              <li key={i} className="text-sm text-midnight/70 leading-relaxed">
                {item.type === "positive" ? "\u2714 " : "\u26A0 "}{item.text}
              </li>
            ))}
          </ul>
        </div>

        {/* Recommendations */}
        <div>
          <SectionTitle>Recommendations</SectionTitle>
          <div className="bg-parchment rounded-lg p-4">
            <p className="text-sm text-midnight/70 leading-relaxed">{realityCheck.recommendation}</p>
          </div>
        </div>

        <p className="text-xs text-midnight/40 leading-relaxed">{DISCLAIMER}</p>
      </div>
    </div>
  );
}