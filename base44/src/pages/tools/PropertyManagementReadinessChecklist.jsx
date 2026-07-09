import React, { useState, useRef, useEffect } from "react";
import { ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import ToolHero from "@/components/tools/ToolHero";
import OwnerPropertyForm from "@/components/tools/OwnerPropertyForm";
import ChecklistAccordion from "@/components/tools/ChecklistAccordion";
import ProgressDashboard from "@/components/tools/ProgressDashboard";
import StickyActionBar from "@/components/tools/StickyActionBar";
import ReadinessSummary from "@/components/tools/ReadinessSummary";
import { CHECKLIST_SECTIONS, TOTAL_ITEMS } from "@/data/tools/readinessChecklist";

function completionLabel(pct) {
  if (pct >= 80) return "Ready for Leasing";
  if (pct >= 50) return "Nearly Ready";
  return "Getting Started";
}

export default function PropertyManagementReadinessChecklist() {
  const [owner, setOwner] = useState({});
  const [checked, setChecked] = useState(() => new Set());
  const [expanded, setExpanded] = useState(CHECKLIST_SECTIONS[0].id);
  const [showSummary, setShowSummary] = useState(false);
  const summaryRef = useRef(null);

  useEffect(() => {
    document.title = "Property Management Readiness Checklist | Origin Property Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Prepare your rental property with confidence using this free interactive landlord readiness checklist. Track compliance, leasing and document preparation before going to market.");
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
        eyebrow="Origin Tools"
        title="Property Management Readiness Checklist"
        subtitle="Prepare your rental property with confidence using this interactive landlord checklist."
        intro="Whether you're leasing your first investment property or changing property managers, this checklist helps ensure your property is ready before going to market."
        primaryCta={{ label: "Start Checklist", href: "#checklist", analyticsKey: "readiness_start" }}
        secondaryCta={{ label: "Book a Property Management Review", href: "/book-consultation?service=property-management", analyticsKey: "readiness_hero_review" }}
      />

      <SectionWrapper className="!pt-12 !pb-8">
        <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8">
          <div className="mb-6">
            <p className="text-xs tracking-widest uppercase text-golden mb-1">Step 1</p>
            <h2 className="font-heading text-2xl text-midnight">Owner &amp; Property Details</h2>
            <p className="text-sm text-midnight/50 mt-1">Optional — include your details to personalise your readiness summary.</p>
          </div>
          <OwnerPropertyForm values={owner} onChange={setOwner} />
        </div>
      </SectionWrapper>

      <SectionWrapper id="checklist" className="!pt-8 !pb-16 scroll-mt-24">
        <div className="mb-8">
          <p className="text-xs tracking-widest uppercase text-golden mb-1">Step 2</p>
          <h2 className="font-heading text-2xl text-midnight">Your Readiness Checklist</h2>
          <p className="text-sm text-midnight/50 mt-1">Tick off each item to track your progress. Your summary updates live.</p>
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2 space-y-4">
            {CHECKLIST_SECTIONS.map((s) => (
              <ChecklistAccordion
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
              <ProgressDashboard sections={CHECKLIST_SECTIONS} checkedItems={checked} totalItems={TOTAL_ITEMS} completionLabel={completionLabel(pct)} />
              <button
                onClick={generateSummary}
                className="hidden md:inline-flex w-full items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition"
              >
                Generate Summary <ArrowRight size={15} />
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