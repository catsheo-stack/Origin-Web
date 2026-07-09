import React from "react";
import { Link } from "react-router-dom";
import { Printer, Calendar } from "lucide-react";
import { fmtCurrency, fmtPct, DISCLAIMER } from "@/data/tools/yieldCalculator";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";

function Row({ label, value }) {
  return (
    <div className="flex justify-between gap-4 py-2 border-b border-stone/50 last:border-0">
      <dt className="text-sm text-midnight/50">{label}</dt>
      <dd className="text-sm text-midnight font-medium text-right">{value}</dd>
    </div>
  );
}

export default function YieldPrintableSummary({ inputs, results, summary }) {
  return (
    <div className="printable-summary bg-white rounded-xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-accent-navy px-6 py-5 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-golden mb-1">Investment Yield Summary</p>
        <p className="font-heading text-lg text-parchment">Pre-Tax Cashflow Estimate</p>
      </div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <dl>
            <Row label="Property Value" value={fmtCurrency(inputs.propertyValue)} />
            <Row label="Weekly Rent" value={fmtCurrency(inputs.weeklyRent)} />
            <Row label="Loan Amount" value={fmtCurrency(inputs.loanAmount)} />
            <Row label="Interest Rate" value={fmtPct(inputs.interestRate)} />
          </dl>
          <dl>
            <Row label="Gross Rental Yield" value={fmtPct(results.grossYield)} />
            <Row label="Net Yield (Before Loan)" value={fmtPct(results.netYield)} />
            <Row label="Annual Rent" value={fmtCurrency(results.annualRent)} />
            <Row label="Annual Expenses" value={fmtCurrency(results.totalExpenses)} />
            <Row label="Annual Interest Estimate" value={fmtCurrency(results.annualInterest)} />
          </dl>
        </div>
        <dl>
          <Row label="Pre-Tax Annual Cashflow" value={fmtCurrency(results.annualCashflow)} />
          <Row label="Pre-Tax Monthly Cashflow" value={fmtCurrency(results.monthlyCashflow)} />
          <Row label="Pre-Tax Weekly Cashflow" value={fmtCurrency(results.weeklyCashflow)} />
        </dl>
        <div className="bg-parchment rounded-lg p-4">
          <p className="text-xs uppercase tracking-wide text-golden mb-1">Investor Summary</p>
          <p className="text-sm text-midnight/70 leading-relaxed">{summary}</p>
        </div>
        <p className="text-xs text-midnight/40 leading-relaxed">{DISCLAIMER}</p>
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={() => {
              window.print();
              toast({ title: "Ready to download", description: "Your print or PDF summary is ready in the browser dialog." });
            }}
            className="inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-midnight/5 transition"
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
          <Link to="/book-consultation?service=property-management" onClick={() => base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "yield_summary_review" } })} className="inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition">
            <Calendar size={15} /> Request an Investment Property Review
          </Link>
        </div>
      </div>
    </div>
  );
}