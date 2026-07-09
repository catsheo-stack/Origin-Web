import React, { useState, useMemo, useRef, useEffect } from "react";
import { ArrowRight, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import ToolHero from "@/components/tools/ToolHero";
import YieldInputForm from "@/components/tools/YieldInputForm";
import YieldResultsDashboard from "@/components/tools/YieldResultsDashboard";
import YieldStickyBar from "@/components/tools/YieldStickyBar";
import YieldPrintableSummary from "@/components/tools/YieldPrintableSummary";
import { DEFAULT_INPUTS, calculateYield, getInvestorSummary, DISCLAIMER } from "@/data/tools/yieldCalculator";

export default function InvestmentYieldCalculator() {
  const [inputs, setInputs] = useState({ ...DEFAULT_INPUTS });
  const [expanded, setExpanded] = useState("property");
  const [calculated, setCalculated] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    document.title = "Investment Yield Calculator | Rental Yield & Cashflow Estimator";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Estimate rental yield, annual holding costs, and pre-tax investment property cashflow with the Origin Concierge Investment Yield Calculator.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tool_investment_yield_calculator" } });
  }, []);

  const results = useMemo(() => calculateYield(inputs), [inputs]);
  const summary = getInvestorSummary(results.annualCashflow);
  const hasInputs = (parseFloat(inputs.propertyValue) || 0) > 0 && (parseFloat(inputs.weeklyRent) || 0) > 0;

  const handleCalculate = () => {
    setCalculated(true);
    base44.analytics.track({ eventName: "yield_calculated", properties: { gross_yield: Number(results.grossYield).toFixed(2) } });
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS });
    setCalculated(false);
  };

  return (
    <>
      <ToolHero
        eyebrow="Origin Tools"
        title="Investment Yield Calculator"
        subtitle="Estimate rental yield, holding costs, and pre-tax cashflow before making a property decision."
        intro="Use this calculator to understand the estimated income, expenses, and cashflow position of an investment property before you buy, lease, or review your portfolio."
        primaryCta={{ label: "Start Calculation", href: "#calculator", analyticsKey: "yield_start" }}
        secondaryCta={{ label: "Request an Investment Property Review", href: "/book-consultation?service=property-management", analyticsKey: "yield_hero_review" }}
      />

      <SectionWrapper id="calculator" className="!pt-12 !pb-8 scroll-mt-24">
        <div className="mb-6">
          <h2 className="font-heading text-2xl text-midnight mb-1">Rental Yield Calculator</h2>
          <p className="text-sm text-midnight/50">Enter your property, loan and holding cost details to estimate yield and cashflow.</p>
        </div>
        <YieldInputForm inputs={inputs} onChange={setInputs} expanded={expanded} onExpand={setExpanded} />

        <div className="hidden md:flex justify-center gap-3 mt-8">
          <button onClick={handleCalculate} className="inline-flex items-center gap-2 bg-golden text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-golden/90 transition">
            Calculate Yield <ArrowRight size={15} />
          </button>
          <button onClick={handleReset} className="inline-flex items-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-midnight/5 transition">
            <RotateCcw size={15} /> Reset
          </button>
        </div>

        {hasInputs && <YieldStickyBar grossYield={results.grossYield} weeklyCashflow={results.weeklyCashflow} onCalculate={handleCalculate} />}
      </SectionWrapper>

      {calculated && (
        <SectionWrapper className="!pt-0 !pb-16">
          <div ref={resultsRef} className="scroll-mt-24">
            <h2 className="font-heading text-2xl text-midnight mb-6">Pre-Tax Cashflow Estimate</h2>
            <YieldResultsDashboard results={results} summary={summary} />
            <p className="text-xs text-midnight/40 leading-relaxed mt-6 max-w-3xl">{DISCLAIMER}</p>
            <div className="mt-8">
              <YieldPrintableSummary inputs={inputs} results={results} summary={summary} />
            </div>
          </div>
        </SectionWrapper>
      )}

    </>
  );
}