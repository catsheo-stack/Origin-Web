import React, { useState, useMemo, useRef, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import ToolHero from "@/components/tools/ToolHero";
import WizardShell from "@/components/tools/plannerZh/WizardShell";
import { StepBuyerProfile, StepFinancialPosition, StepProperty } from "@/components/tools/plannerZh/PlannerSteps";
import ResultsOverview from "@/components/tools/plannerZh/ResultsOverview";
import { DEFAULT_INPUTS, STEPS, num, calculateResults, calculateBudgetHealthScore, generateRealityCheck } from "@/data/tools/homeBuyingPlanner";

const STORAGE_KEY = "planner_inputs_v1";
const TOTAL_STEPS = STEPS.length;

export default function OriginHomeBuyingPlannerZh() {
  const [step, setStep] = useState(1);
  const [inputs, setInputs] = useState(() => {
    try {
      const saved = sessionStorage.getItem(STORAGE_KEY);
      return saved ? { ...DEFAULT_INPUTS, ...JSON.parse(saved) } : { ...DEFAULT_INPUTS };
    } catch {
      return { ...DEFAULT_INPUTS };
    }
  });
  const [showResults, setShowResults] = useState(false);
  const resultsRef = useRef(null);
  const wizardRef = useRef(null);

  useEffect(() => {
    document.title = "Origin 買房規劃工具｜購屋預算、成本及貸款規劃";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "使用 Origin 買房規劃工具，估算購屋成本、還款、首期資金需求、財務舒適度及投資準備程度。");
    setMeta('meta[property="og:title"]', "content", "Origin 買房規劃工具｜購屋預算、成本及貸款規劃");
    setMeta('meta[property="og:description"]', "content", "使用 Origin 買房規劃工具，估算購屋成本、還款、首期資金需求、財務舒適度及投資準備程度。");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tool_home_buying_planner" } });

    // Structured data for AI visibility
    const inject = (id, schema) => {
      let s = document.getElementById(id);
      if (!s) { s = document.createElement("script"); s.id = id; s.type = "application/ld+json"; document.head.appendChild(s); }
      s.textContent = JSON.stringify(schema);
    };
    inject("planner-webapp-schema", { "@context": "https://schema.org", "@type": "WebApplication", name: "Origin 買房規劃工具", description: "Plan your home buying budget with Origin Concierge. Estimate buying costs, repayments, deposit requirements, comfort score and investment readiness.", url: window.location.href, applicationCategory: "FinanceApplication", operatingSystem: "Web", offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" } });
    inject("planner-breadcrumb-schema", { "@context": "https://schema.org", "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "首頁", item: window.location.origin + "/" }, { "@type": "ListItem", position: 2, name: "實用工具", item: window.location.origin + "/zh/tools/origin-home-buying-planner" }, { "@type": "ListItem", position: 3, name: "買房規劃工具" }] });

    return () => { ["planner-webapp-schema", "planner-breadcrumb-schema"].forEach(id => { const el = document.getElementById(id); if (el) el.remove(); }); };
  }, []);

  useEffect(() => {
    try { sessionStorage.setItem(STORAGE_KEY, JSON.stringify(inputs)); } catch { /* ignore */ }
  }, [inputs]);

  const update = (field, value) => setInputs((prev) => ({ ...prev, [field]: value }));

  const results = useMemo(() => calculateResults(inputs), [inputs]);
  const score = useMemo(() => calculateBudgetHealthScore(inputs, results), [inputs, results]);
  const realityCheck = useMemo(() => generateRealityCheck(inputs, results, score), [inputs, results, score]);

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  const handleNext = () => { if (step < TOTAL_STEPS) { setStep(step + 1); scrollToTop(); } };
  const handleBack = () => { if (step > 1) { setStep(step - 1); scrollToTop(); } };
  const handleSeeResults = () => {
    setShowResults(true);
    base44.analytics.track({ eventName: "planner_results_generated", properties: { score: score.totalScore, buyer_type: inputs.buyerType } });
    setTimeout(() => resultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };
  const handleEditInputs = () => { setShowResults(false); setStep(TOTAL_STEPS); scrollToTop(); };
  const handleReset = () => {
    setInputs({ ...DEFAULT_INPUTS });
    setStep(1);
    setShowResults(false);
    try { sessionStorage.removeItem(STORAGE_KEY); } catch { /* ignore */ }
    scrollToTop();
  };

  const canProceed = step === 1 ? inputs.buyerType !== "" : step === TOTAL_STEPS ? num(inputs.purchasePrice) > 0 : true;
  const currentStep = [{ title: "買家資料", subtitle: "您的購屋情況、收入、首期資金及固定支出" }, { title: "物業偏好", subtitle: "您正在考慮的物業及貸款假設" }][step - 1];

  const renderStep = () => {
    switch (step) {
      case 1: return (<><StepBuyerProfile inputs={inputs} onChange={update} /><div className="mt-10"><StepFinancialPosition inputs={inputs} onChange={update} /></div></>);
      case 2: return <StepProperty inputs={inputs} onChange={update} />;
      default: return null;
    }
  };

  return (
    <>
      <ToolHero
        eyebrow="Origin 實用工具"
        title="Origin 買房規劃工具"
        subtitle="有信心地規劃您的購屋預算。"
        intro="了解自己可負擔的樓價，估算實際購屋成本，並在作出下一個物業決定前做好財務準備。"
        primaryCta={{ label: "開始規劃", href: "#planner", analyticsKey: "planner_start" }}
        secondaryCta={{ label: "預約買方策略諮詢", href: "/zh/book-consultation?service=buyer-advisory", analyticsKey: "planner_hero_session" }}
      />

      {!showResults && (
        <SectionWrapper id="planner" className="!pt-12 !pb-28 md:!pb-16 scroll-mt-24">
          <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-6">購屋預算規劃</h2>
          <div ref={wizardRef}>
            <WizardShell
              step={step}
              totalSteps={TOTAL_STEPS}
              stepTitle={currentStep.title}
              stepSubtitle={currentStep.subtitle}
              onBack={handleBack}
              onNext={handleNext}
              canProceed={canProceed}
              isLastStep={step === TOTAL_STEPS}
              onSeeResults={handleSeeResults}
            >
              {renderStep()}
            </WizardShell>
          </div>
        </SectionWrapper>
      )}

      {showResults && (
        <SectionWrapper className="!pt-12 !pb-16">
          <div ref={resultsRef} className="scroll-mt-24">
            <ResultsOverview
              inputs={inputs}
              results={results}
              score={score}
              realityCheck={realityCheck}
              onEdit={handleEditInputs}
              onReset={handleReset}
            />
          </div>
        </SectionWrapper>
      )}

    </>
  );
}