import React, { useState, useEffect, useRef, useMemo } from "react";
import { Download, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import SectionWrapper from "@/components/origin/SectionWrapper";
import CTABanner from "@/components/origin/CTABanner";
import ToolHero from "@/components/tools/ToolHero";
import PropertyDetailsForm from "@/components/tools/settlement/PropertyDetailsForm";
import SettlementProgress from "@/components/tools/settlement/SettlementProgress";
import JourneyStep from "@/components/tools/settlement/JourneyStep";
import StickyStageNav from "@/components/tools/settlement/StickyStageNav";
import { generateSettlementPdf } from "@/components/tools/settlement/generateSettlementPdf";
import { SETTLEMENT_MILESTONES } from "@/data/tools/settlementTracker";

const EMPTY_STATUS = SETTLEMENT_MILESTONES.reduce((acc, m) => {
  acc[m.id] = { status: "not_started", date: "" };
  return acc;
}, {});

const STORAGE_KEYS = { property: "bst_property", status: "bst_status", started: "bst_started" };
const loadJSON = (key, fallback) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export default function BuyerSettlementTracker() {
  const [property, setProperty] = useState(() => loadJSON(STORAGE_KEYS.property, {}));
  const [statusMap, setStatusMap] = useState(() => {
    const stored = loadJSON(STORAGE_KEYS.status, {});
    const merged = { ...EMPTY_STATUS };
    Object.keys(merged).forEach((key) => {
      if (stored[key] && typeof stored[key] === "object" && "status" in stored[key]) {
        merged[key] = { ...merged[key], ...stored[key] };
      }
    });
    return merged;
  });
  const [started, setStarted] = useState(() => loadJSON(STORAGE_KEYS.started, false));
  const [activeId, setActiveId] = useState(SETTLEMENT_MILESTONES[0].id);
  const [resetDialog, setResetDialog] = useState({ open: false, mode: "restart" });
  const trackerRef = useRef(null);

  useEffect(() => {
    document.title = "Buyer Settlement Tracker | Origin Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Track your property settlement journey from contract signing to key collection with Origin Concierge's interactive Buyer Settlement Tracker.");
    setMeta('meta[property="og:title"]', "content", "Buyer Settlement Tracker | Origin Concierge");
    setMeta('meta[property="og:description"]', "content", "Track your property settlement journey from contract signing to key collection with Origin Concierge's interactive Buyer Settlement Tracker.");

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://originpropertyconcierge.com.au/" },
          { "@type": "ListItem", position: 2, name: "Tools", item: "https://originpropertyconcierge.com.au/tools" },
          { "@type": "ListItem", position: 3, name: "Buyer Settlement Tracker", item: "https://originpropertyconcierge.com.au/tools/buyer-settlement-tracker" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "Buyer Settlement Tracker",
        description: "Track your property settlement journey from contract signing to key collection.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      },
    ];
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "settlement-schema";
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);

    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tool_buyer_settlement_tracker" } });

    return () => { const el = document.getElementById("settlement-schema"); if (el) el.remove(); };
  }, []);

  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEYS.property, JSON.stringify(property)); } catch {} }, [property]);
  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEYS.status, JSON.stringify(statusMap)); } catch {} }, [statusMap]);
  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEYS.started, JSON.stringify(started)); } catch {} }, [started]);

  const milestones = useMemo(
    () => SETTLEMENT_MILESTONES.map((m) => {
      const entry = statusMap[m.id] || { status: "not_started", date: "" };
      return { ...m, status: entry.status || "not_started", date: entry.date || "" };
    }),
    [statusMap]
  );

  const completedCount = milestones.filter((m) => m.status === "completed").length;
  const pct = Math.round((completedCount / milestones.length) * 100);
  const currentStage = milestones.find((m) => m.status !== "completed");
  const nextAction = currentStage;

  const scrollToMilestone = (id) => {
    setTimeout(() => document.getElementById(`milestone-${id}`)?.scrollIntoView({ behavior: "smooth", block: "center" }), 80);
  };

  const handleSetStatus = (id, status) => {
    setStatusMap((prev) => ({ ...prev, [id]: { ...prev[id], status } }));
    base44.analytics.track({ eventName: "settlement_status_updated", properties: { milestone: id, status } });
  };

  const handleStart = () => {
    setStarted(true);
    setActiveId(currentStage?.id || SETTLEMENT_MILESTONES[0].id);
    setTimeout(() => trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    base44.analytics.track({ eventName: "settlement_journey_started", properties: { buyer_type: property.buyerType } });
  };

  const handleActivate = (id) => {
    setActiveId(id);
    scrollToMilestone(id);
  };

  const activeIndex = milestones.findIndex((m) => m.id === activeId);
  const hasPrev = activeIndex > 0;
  const isLast = activeIndex === milestones.length - 1;
  const activeMilestone = milestones[activeIndex] || milestones[0];
  const activeNextStage = activeIndex >= 0 && activeIndex < milestones.length - 1 ? milestones[activeIndex + 1] : null;
  const canGoNext = !isLast;

  const handlePrev = () => {
    if (!hasPrev) return;
    const prevId = milestones[activeIndex - 1].id;
    setActiveId(prevId);
    scrollToMilestone(prevId);
  };

  const handleNext = () => {
    if (!canGoNext) return;
    const nextId = milestones[activeIndex + 1].id;
    setActiveId(nextId);
    scrollToMilestone(nextId);
  };

  const handleRestart = () => {
    setStatusMap({ ...EMPTY_STATUS });
    setActiveId(SETTLEMENT_MILESTONES[0].id);
    base44.analytics.track({ eventName: "settlement_journey_restarted" });
    setResetDialog({ open: false, mode: "restart" });
  };

  const handleClearAll = () => {
    setProperty({});
    setStatusMap({ ...EMPTY_STATUS });
    setStarted(false);
    setActiveId(SETTLEMENT_MILESTONES[0].id);
    base44.analytics.track({ eventName: "settlement_journey_cleared" });
    setResetDialog({ open: false, mode: "clear" });
  };

  const confirmReset = resetDialog.mode === "clear" ? handleClearAll : handleRestart;

  const handleDownload = () => {
    generateSettlementPdf({
      property,
      milestones,
      currentStage: currentStage?.title,
      nextAction,
      generatedDate: new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" }),
    });
    base44.analytics.track({ eventName: "settlement_pdf_downloaded" });
    toast({ title: "Report downloaded", description: "Your Buyer Settlement Tracker PDF has been saved." });
  };

  return (
    <>
      <ToolHero
        eyebrow="Origin Tools"
        title="Buyer Settlement Tracker"
        subtitle="Track every important milestone from contract signing to settlement in one simple journey."
        primaryCta={{ label: "Start Tracking", href: "#details", analyticsKey: "settlement_start" }}
      />

      <SectionWrapper id="details" className="!pt-12 !pb-8 scroll-mt-24">
        <PropertyDetailsForm values={property} onChange={setProperty} onSubmit={handleStart} started={started} onRestart={() => setResetDialog({ open: true, mode: "restart" })} />
      </SectionWrapper>

      {started && (
        <>
          <SectionWrapper className="!pt-4 !pb-8">
            <div ref={trackerRef} className="max-w-3xl mx-auto space-y-4 scroll-mt-24">
              <SettlementProgress
                completed={completedCount}
                total={milestones.length}
                pct={pct}
                currentStage={activeMilestone?.title}
                nextStage={activeNextStage?.title}
                focusText={activeMilestone?.taskDescription}
                onRestart={() => setResetDialog({ open: true, mode: "restart" })}
                onClearAll={() => setResetDialog({ open: true, mode: "clear" })}
              />
              <h2 className="font-heading text-xl md:text-2xl text-midnight pt-2">Your Settlement Journey</h2>
              <div className="space-y-2">
                {milestones.map((m, idx) => (
                  <JourneyStep
                    key={m.id}
                    milestone={m}
                    stepNumber={idx + 1}
                    totalSteps={milestones.length}
                    isActive={m.id === activeId}
                    isCompleted={m.status === "completed"}
                    inProgress={m.status === "in_progress"}
                    hasPrev={idx > 0}
                    isLast={idx === milestones.length - 1}
                    onActivate={handleActivate}
                    onSetStatus={handleSetStatus}
                    onPrev={handlePrev}
                    onNext={handleNext}
                  />
                ))}
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper className="!pt-4 !pb-12">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8 text-center">
                <h2 className="font-heading text-xl md:text-2xl text-midnight mb-2">Download My Settlement Report</h2>
                <p className="text-sm text-midnight/50 mb-6 max-w-md mx-auto leading-relaxed">
                  Save a printable PDF of your property details, settlement timeline, completed and outstanding tasks, and next recommended action.
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-midnight/5 transition"
                  >
                    <Download size={16} /> Download My Settlement Report
                  </button>
                  <button
                    onClick={() => setResetDialog({ open: true, mode: "restart" })}
                    className="inline-flex items-center justify-center gap-2 text-midnight/60 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-midnight/5 transition"
                  >
                    <RotateCcw size={16} /> Restart Journey
                  </button>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <CTABanner
            title="Need assistance with your settlement?"
            subtitle="If you'd like professional guidance through your property settlement, we're here to help."
            ctaText="Book Conveyancing Consultation"
            ctaLink="/book-consultation?service=conveyancing"
          />

          <div className="h-24 print:hidden md:hidden" aria-hidden="true" />

          <StickyStageNav
            pct={pct}
            activeMilestone={activeMilestone}
            allDone={completedCount === milestones.length}
            hasPrev={hasPrev}
            canGoNext={canGoNext}
            onPrev={handlePrev}
            onNext={handleNext}
            onSetStatus={handleSetStatus}
            onDownload={handleDownload}
          />
        </>
      )}

      <AlertDialog open={resetDialog.open} onOpenChange={(open) => setResetDialog((prev) => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {resetDialog.mode === "clear" ? "Clear all details?" : "Restart your settlement journey?"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {resetDialog.mode === "clear"
                ? "This will permanently clear your property details, progress and all milestone statuses."
                : "Your current progress will be cleared. Your property details will be kept."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>
              {resetDialog.mode === "clear" ? "Clear All" : "Restart"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}