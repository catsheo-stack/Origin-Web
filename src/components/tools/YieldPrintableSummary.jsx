import React from "react";
import { Link } from "react-router-dom";
import { Printer, Calendar } from "lucide-react";
import { fmtCurrency, fmtPct, DISCLAIMER } from "@/data/tools/yieldCalculator";
import { DISCLAIMER_ZH } from "@/data/tools/yieldCalculatorZh";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";

function Row({ label, value }) {
  return <div className="flex justify-between gap-4 py-2 border-b border-stone/50 last:border-0"><dt className="text-sm text-midnight/50">{label}</dt><dd className="text-sm text-midnight font-medium text-right">{value}</dd></div>;
}

export default function YieldPrintableSummary({ inputs, results, summary, zh = false }) {
  const t = zh ? {
    eyebrow: "投資物業租金回報摘要", title: "稅前現金流估算", value: "物業價值", rent: "每週租金", loan: "貸款金額", rate: "利率",
    gross: "租金毛回報率", net: "租金淨回報率（貸款前）", annualRent: "全年租金收入", expenses: "全年支出", interest: "全年利息估算",
    annual: "稅前年現金流", monthly: "稅前月現金流", weekly: "稅前週現金流", summary: "投資概況",
    print: "列印／另存為 PDF", review: "申請投資物業評估", toastTitle: "摘要已準備", toastDescription: "請在瀏覽器列印視窗中列印或另存為 PDF。",
    link: "/zh/book-consultation?service=property-management", disclaimer: DISCLAIMER_ZH,
  } : {
    eyebrow: "Investment Yield Summary", title: "Pre-Tax Cashflow Estimate", value: "Property Value", rent: "Weekly Rent", loan: "Loan Amount", rate: "Interest Rate",
    gross: "Gross Rental Yield", net: "Net Yield (Before Loan)", annualRent: "Annual Rent", expenses: "Annual Expenses", interest: "Annual Interest Estimate",
    annual: "Pre-Tax Annual Cashflow", monthly: "Pre-Tax Monthly Cashflow", weekly: "Pre-Tax Weekly Cashflow", summary: "Investor Summary",
    print: "Print / Save as PDF", review: "Request an Investment Property Review", toastTitle: "Ready to download", toastDescription: "Your print or PDF summary is ready in the browser dialog.",
    link: "/book-consultation?service=property-management", disclaimer: DISCLAIMER,
  };
  return (
    <div className="printable-summary bg-white rounded-xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-accent-navy px-6 py-5 text-center"><p className="text-xs tracking-[0.2em] uppercase text-golden mb-1">{t.eyebrow}</p><p className="font-heading text-lg text-parchment">{t.title}</p></div>
      <div className="p-6 md:p-8 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <dl><Row label={t.value} value={fmtCurrency(inputs.propertyValue)} /><Row label={t.rent} value={fmtCurrency(inputs.weeklyRent)} /><Row label={t.loan} value={fmtCurrency(inputs.loanAmount)} /><Row label={t.rate} value={fmtPct(inputs.interestRate)} /></dl>
          <dl><Row label={t.gross} value={fmtPct(results.grossYield)} /><Row label={t.net} value={fmtPct(results.netYield)} /><Row label={t.annualRent} value={fmtCurrency(results.annualRent)} /><Row label={t.expenses} value={fmtCurrency(results.totalExpenses)} /><Row label={t.interest} value={fmtCurrency(results.annualInterest)} /></dl>
        </div>
        <dl><Row label={t.annual} value={fmtCurrency(results.annualCashflow)} /><Row label={t.monthly} value={fmtCurrency(results.monthlyCashflow)} /><Row label={t.weekly} value={fmtCurrency(results.weeklyCashflow)} /></dl>
        <div className="bg-parchment rounded-lg p-4"><p className="text-xs uppercase tracking-wide text-golden mb-1">{t.summary}</p><p className="text-sm text-midnight/70 leading-relaxed">{summary}</p></div>
        <p className="text-xs text-midnight/40 leading-relaxed">{t.disclaimer}</p>
        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button onClick={() => { window.print(); toast({ title: t.toastTitle, description: t.toastDescription }); }} className="inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-midnight/5 transition"><Printer size={15} /> {t.print}</button>
          <Link to={t.link} onClick={() => base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "yield_summary_review", language: zh ? "zh-Hant" : "en" } })} className="inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition"><Calendar size={15} /> {t.review}</Link>
        </div>
      </div>
    </div>
  );
}
