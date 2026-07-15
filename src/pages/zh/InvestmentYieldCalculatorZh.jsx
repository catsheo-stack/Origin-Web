import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, ArrowRight, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import CTABanner from "@/components/origin/CTABanner";
import ToolHero from "@/components/tools/ToolHero";
import ToolFAQ from "@/components/tools/ToolFAQ";
import RelatedResources from "@/components/tools/RelatedResources";
import YieldInputForm from "@/components/tools/YieldInputForm";
import YieldResultsDashboard from "@/components/tools/YieldResultsDashboard";
import YieldStickyBar from "@/components/tools/YieldStickyBar";
import YieldPrintableSummary from "@/components/tools/YieldPrintableSummary";
import { DEFAULT_INPUTS, calculateYield } from "@/data/tools/yieldCalculator";
import { getInvestorSummaryZh, DISCLAIMER_ZH, FAQS_ZH, RESOURCES_ZH } from "@/data/tools/yieldCalculatorZh";

export default function InvestmentYieldCalculatorZh() {
  const [inputs, setInputs] = useState({ ...DEFAULT_INPUTS });
  const [expanded, setExpanded] = useState("property");
  const [calculated, setCalculated] = useState(false);
  const resultsRef = useRef(null);

  useEffect(() => {
    document.title = "投資物業租金回報計算器｜Origin Property Concierge";
    const setMeta = (selector, attribute, content) => {
      let element = document.head.querySelector(selector);
      if (!element) { element = document.createElement("meta"); document.head.appendChild(element); }
      element.setAttribute(attribute, content);
    };
    setMeta('meta[name="description"]', "content", "估算墨爾本投資物業的租金毛回報率、淨回報率、全年持有成本及稅前現金流。所有結果只供一般參考。");
    setMeta('meta[property="og:title"]', "content", "投資物業租金回報計算器｜Origin Property Concierge");
    setMeta('meta[property="og:description"]', "content", "輸入物業價值、租金、貸款及持有成本，快速了解估算租金回報與稅前現金流。");
    try { base44.analytics.track({ eventName: "page_viewed", properties: { page: "tool_investment_yield_calculator", language: "zh-Hant" } }); } catch {}
  }, []);

  const results = useMemo(() => calculateYield(inputs), [inputs]);
  const summary = useMemo(() => getInvestorSummaryZh(results.annualCashflow), [results.annualCashflow]);
  const hasInputs = (Number.parseFloat(inputs.propertyValue) || 0) > 0 && (Number.parseFloat(inputs.weeklyRent) || 0) > 0;
  const handleCalculate = () => {
    setCalculated(true);
    try { base44.analytics.track({ eventName: "yield_calculated", properties: { gross_yield: Number(results.grossYield).toFixed(2), language: "zh-Hant" } }); } catch {}
    window.setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };
  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS }); setExpanded("property"); setCalculated(false);
    window.setTimeout(() => document.getElementById("calculator")?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  };

  return <>
    <ToolHero eyebrow="Origin 房產工具" title="投資物業租金回報計算器" subtitle="在作出房產決定前，估算租金回報、持有成本及稅前現金流。" intro="輸入物業價值、租金、貸款及日常持有成本，初步了解投資物業的預計收入、支出及現金流狀況。" primaryCta={{ label: "開始計算", href: "#calculator", analyticsKey: "yield_start_zh" }} secondaryCta={{ label: "申請投資物業評估", href: "/zh/book-consultation?service=property-management", analyticsKey: "yield_hero_review_zh" }} />
    <SectionWrapper id="calculator" className="!pb-8 !pt-8 scroll-mt-24">
      <Link to="/zh/tools" className="mb-7 inline-flex items-center gap-2 rounded-full border border-midnight/15 bg-white px-4 py-2 text-sm font-medium text-midnight transition-colors hover:border-golden/60 hover:text-golden"><ArrowLeft size={15} />返回房產工具</Link>
      <div className="mb-6"><h2 className="font-heading mb-1 text-2xl text-midnight">租金回報計算</h2><p className="text-sm text-midnight/50">輸入物業、貸款及持有成本資料，估算租金回報率與現金流。</p><p className="mt-2 text-xs leading-relaxed text-midnight/40">部分欄位已填入可編輯的起始假設。請按您的預期空置率、利率及管理費作出調整。</p></div>
      <YieldInputForm inputs={inputs} onChange={setInputs} expanded={expanded} onExpand={setExpanded} zh />
      <div className="mt-8 hidden justify-center gap-3 md:flex"><button type="button" onClick={handleCalculate} disabled={!hasInputs} className="inline-flex items-center gap-2 rounded-full bg-golden px-7 py-3 text-sm font-medium text-midnight transition hover:bg-golden/90 disabled:cursor-not-allowed disabled:opacity-40">計算租金回報<ArrowRight size={15} /></button><button type="button" onClick={handleReset} className="inline-flex items-center gap-2 rounded-full border border-midnight/20 px-7 py-3 text-sm font-medium text-midnight transition hover:bg-midnight/5"><RotateCcw size={15} />重新設定</button></div>
      {hasInputs && <YieldStickyBar grossYield={results.grossYield} weeklyCashflow={results.weeklyCashflow} onCalculate={handleCalculate} zh />}
    </SectionWrapper>
    {calculated && <SectionWrapper className="!pb-16 !pt-0"><div ref={resultsRef} className="scroll-mt-24"><h2 className="font-heading mb-6 text-2xl text-midnight">稅前現金流估算</h2><YieldResultsDashboard results={results} summary={summary} zh /><p className="mt-6 max-w-3xl text-xs leading-relaxed text-midnight/40">{DISCLAIMER_ZH}</p><div className="mt-8"><YieldPrintableSummary inputs={inputs} results={results} summary={summary} zh /></div></div></SectionWrapper>}
    <ToolFAQ title="常見問題" items={FAQS_ZH} />
    <RelatedResources title="相關服務與實用資源" resources={RESOURCES_ZH} />
    <CTABanner title="希望進一步評估投資物業？" subtitle="預約諮詢，讓我們根據您的目標、物業及融資情況，協助您釐清下一步。" ctaText="預約諮詢" ctaLink="/zh/book-consultation?service=property-management" />
  </>;
}
