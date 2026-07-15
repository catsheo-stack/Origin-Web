import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import ToolHero from "@/components/tools/ToolHero";
import OwnerPropertyForm from "@/components/tools/zh/OwnerPropertyFormZh";
import ChecklistAccordionZh from "@/components/tools/zh/ChecklistAccordionZh";
import ProgressDashboardZh from "@/components/tools/zh/ProgressDashboardZh";
import StickyActionBar from "@/components/tools/zh/StickyActionBarZh";
import ReadinessSummary from "@/components/tools/zh/ReadinessSummaryZh";
import { CHECKLIST_SECTIONS_ZH as CHECKLIST_SECTIONS, TOTAL_ITEMS_ZH as TOTAL_ITEMS } from "@/data/tools/readinessChecklistZh";

function completionLabel(pct) {
  if (pct >= 80) return "已準備出租";
  if (pct >= 50) return "接近完成";
  return "開始準備";
}

export default function PropertyManagementReadinessChecklistZh() {
  const [owner, setOwner] = useState({});
  const [checked, setChecked] = useState(() => new Set());
  const [expanded, setExpanded] = useState(CHECKLIST_SECTIONS[0].id);
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);

  useEffect(() => {
    document.title = "物業管理準備清單 | Origin Property Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "使用免費互動業主準備清單，安心準備出租物業，並在推出市場前追蹤合規、出租及文件準備進度。");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tool_pm_readiness_checklist" } });
  }, []);

  const toggleItem = (id) => {
    setChecked((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const generateSummary = () => {
    setShowSummary(true);
    base44.analytics.track({ eventName: "readiness_summary_generated", properties: { completion: Math.round((checked.size / TOTAL_ITEMS) * 100) } });
    setTimeout(() => summaryRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 120);
  };

  const pct = Math.round((checked.size / TOTAL_ITEMS) * 100);

  return (
    <>
      <ToolHero
        eyebrow="Origin 實用工具"
        title="物業管理準備清單"
        subtitle="使用這份互動業主清單，安心準備您的出租物業。"
        intro="無論您首次出租投資物業，或正更換物業管理公司，這份清單都能協助您在推出市場前做好準備。"
        primaryCta={{ label: "開始清單", href: "#checklist", analyticsKey: "readiness_start" }}
        secondaryCta={{ label: "預約物業管理檢視", href: "/zh/book-consultation?service=property-management", analyticsKey: "readiness_hero_review" }}
      />

      <SectionWrapper className="!pt-12 !pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-golden mb-1">步驟 1</p>
            <h2 className="font-heading text-2xl text-midnight">業主與物業資料</h2>
            <p className="text-sm text-midnight/50 mt-1">可選填 — 提供資料可讓準備摘要更貼合您的情況。</p>
          </div>
          <OwnerPropertyForm values={owner} onChange={setOwner} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="checklist" className="!pt-8 !pb-16 scroll-mt-24">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-golden mb-1">步驟 2</p>
          <h2 className="font-heading text-2xl text-midnight">您的準備清單</h2>
          <p className="text-sm text-midnight/50 mt-1">勾選每個項目以追蹤進度，摘要會即時更新。</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {CHECKLIST_SECTIONS.map((s) => (
              <ChecklistAccordionZh
                key={s.id}
                section={s}
                checkedItems={checked}
                onToggle={toggleItem}
                expanded={expanded === s.id}
                onExpand={() => setExpanded(expanded === s.id ? "" : s.id)}
              />
            ))}
          </div>
          <div className="lg:col-span-1">
            <div className="lg:sticky lg:top-24 space-y-4">
              <ProgressDashboardZh sections={CHECKLIST_SECTIONS} checkedItems={checked} totalItems={TOTAL_ITEMS} completionLabel={completionLabel(pct)} />
              <button
                onClick={generateSummary}
                className="hidden md:inline-flex w-full items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition"
              >
                生成摘要 <ArrowRight size={15} />
              </button>
            </div>
          </div>
        </div>
        <StickyActionBar done={checked.size} total={TOTAL_ITEMS} onGenerate={generateSummary} />
      </SectionWrapper>

      {showSummary && (
        <SectionWrapper className="!pt-0 !pb-16">
          <div ref={summaryRef} className="scroll-mt-24">
            <ReadinessSummary owner={owner} sections={CHECKLIST_SECTIONS} checkedItems={checked} totalItems={TOTAL_ITEMS} />
          </div>
        </SectionWrapper>
      )}

    </>
  );
}