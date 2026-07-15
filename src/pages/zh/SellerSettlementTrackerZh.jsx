import React, { useState, useEffect, useRef, useMemo } from "react";
import { Download, RotateCcw } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from "@/components/ui/alert-dialog";
import SectionWrapper from "@/components/origin/SectionWrapper";
import CTABanner from "@/components/origin/CTABanner";
import ToolHero from "@/components/tools/ToolHero";
import SellerPropertyDetailsForm from "@/components/tools/settlement/SellerPropertyDetailsForm";
import SettlementProgress from "@/components/tools/settlement/SettlementProgress";
import JourneyStep from "@/components/tools/settlement/JourneyStep";
import StickyStageNav from "@/components/tools/settlement/StickyStageNav";
import { generateSellerSettlementPdf } from "@/components/tools/settlement/generateSellerSettlementPdf";
import { SELLER_SETTLEMENT_MILESTONES_ZH as SELLER_SETTLEMENT_MILESTONES } from "@/data/tools/sellerSettlementTrackerZh";

const EMPTY_STATUS = SELLER_SETTLEMENT_MILESTONES.reduce((acc, m) => {
  acc[m.id] = { status: "not_started", date: "" };
  return acc;
}, {});

const STORAGE_KEYS = { property: "sst_property", status: "sst_status", started: "sst_started" };
const loadJSON = (key, fallback) => {
  try {
    const raw = sessionStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
};

export default function SellerSettlementTrackerZh() {
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
  const [activeId, setActiveId] = useState(SELLER_SETTLEMENT_MILESTONES[0].id);
  const [resetDialog, setResetDialog] = useState({ open: false, mode: "restart" });
  const trackerRef = useRef(null);

  useEffect(() => {
    document.title = "賣方交割進度追蹤器 | Origin Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Track every important step of your property sale from contract signing to settlement and receiving your sale proceeds with Origin Concierge.");
    setMeta('meta[property="og:title"]', "content", "賣方交割進度追蹤器 | Origin Concierge");
    setMeta('meta[property="og:description"]', "content", "Track every important step of your property sale from contract signing to settlement and receiving your sale proceeds with Origin Concierge.");

    const schema = [
      {
        "@context": "https://schema.org",
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: "https://originpropertyconcierge.com.au/" },
          { "@type": "ListItem", position: 2, name: "Tools", item: "https://originpropertyconcierge.com.au/tools" },
          { "@type": "ListItem", position: 3, name: "賣方交割進度追蹤器", item: "https://originpropertyconcierge.com.au/tools/seller-settlement-tracker" },
        ],
      },
      {
        "@context": "https://schema.org",
        "@type": "WebApplication",
        name: "賣方交割進度追蹤器",
        description: "Track every important step of your property sale from contract signing to settlement and receiving your sale proceeds.",
        applicationCategory: "BusinessApplication",
        operatingSystem: "Web",
        offers: { "@type": "Offer", price: "0", priceCurrency: "AUD" },
      },
    ];
    const s = document.createElement("script");
    s.type = "application/ld+json";
    s.id = "seller-settlement-schema";
    s.textContent = JSON.stringify(schema);
    document.head.appendChild(s);

    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tool_seller_settlement_tracker" } });

    return () => { const el = document.getElementById("seller-settlement-schema"); if (el) el.remove(); };
  }, []);

  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEYS.property, JSON.stringify(property)); } catch {} }, [property]);
  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEYS.status, JSON.stringify(statusMap)); } catch {} }, [statusMap]);
  useEffect(() => { try { sessionStorage.setItem(STORAGE_KEYS.started, JSON.stringify(started)); } catch {} }, [started]);

  const milestones = useMemo(
    () => SELLER_SETTLEMENT_MILESTONES.map((m) => {
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
    base44.analytics.track({ eventName: "seller_settlement_status_updated", properties: { milestone: id, status } });
  };

  const handleStart = () => {
    setStarted(true);
    setActiveId(currentStage?.id || SELLER_SETTLEMENT_MILESTONES[0].id);
    setTimeout(() => trackerRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
    base44.analytics.track({ eventName: "seller_settlement_journey_started", properties: { seller_type: property.sellerType } });
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
    setActiveId(SELLER_SETTLEMENT_MILESTONES[0].id);
    base44.analytics.track({ eventName: "seller_settlement_journey_restarted" });
    setResetDialog({ open: false, mode: "restart" });
  };

  const handleClearAll = () => {
    setProperty({});
    setStatusMap({ ...EMPTY_STATUS });
    setStarted(false);
    setActiveId(SELLER_SETTLEMENT_MILESTONES[0].id);
    base44.analytics.track({ eventName: "seller_settlement_journey_cleared" });
    setResetDialog({ open: false, mode: "clear" });
  };

  const confirmReset = resetDialog.mode === "clear" ? handleClearAll : handleRestart;

  const handleDownload = () => {
    generateSellerSettlementPdf({
      property,
      milestones,
      currentStage: currentStage?.title,
      nextAction,
      generatedDate: new Date().toLocaleDateString("zh-HK", { day: "numeric", month: "long", year: "numeric" }),
    });
    base44.analytics.track({ eventName: "seller_settlement_pdf_downloaded" });
    toast({ title: "報告已下載", description: "Your 賣方交割進度追蹤器 PDF has been saved." });
  };

  return (
    <>
      <ToolHero
        eyebrow="Origin 實用工具"
        title="賣方交割進度追蹤器"
        subtitle="追蹤從接受出價、完成交割到收到售樓款項的每個重要里程碑。"
        primaryCta={{ label: "開始追蹤", href: "#details", analyticsKey: "seller_settlement_start" }}
      />

      <SectionWrapper id="details" className="!pt-12 !pb-8 scroll-mt-24">
        <SellerPropertyDetailsForm values={property} onChange={setProperty} onSubmit={handleStart} started={started} onRestart={() => setResetDialog({ open: true, mode: "restart" })} zh />
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
                zh
              />
              <h2 className="font-heading text-xl md:text-2xl text-midnight pt-2">您的交割流程</h2>
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
                    zh
                  />
                ))}
              </div>
            </div>
          </SectionWrapper>

          <SectionWrapper className="!pt-4 !pb-12">
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8 text-center">
                <h2 className="font-heading text-xl md:text-2xl text-midnight mb-2">下載我的交割報告</h2>
                <p className="text-sm text-midnight/50 mb-6 max-w-md mx-auto leading-relaxed">
                  儲存可列印 PDF，內容包括物業資料、交割時間線、已完成及未完成事項，以及建議下一步。
                </p>
                <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
                  <button
                    onClick={handleDownload}
                    className="inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-midnight/5 transition"
                  >
                    <Download size={16} /> 下載我的交割報告
                  </button>
                  <button
                    onClick={() => setResetDialog({ open: true, mode: "restart" })}
                    className="inline-flex items-center justify-center gap-2 text-midnight/60 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-midnight/5 transition"
                  >
                    <RotateCcw size={16} /> 重新開始流程
                  </button>
                </div>
              </div>
            </div>
          </SectionWrapper>

          <CTABanner
            title="交割過程需要協助？"
            subtitle="無論您出售自住住宅或投資物業，我們都可在交割每個階段為您提供指引。"
            ctaText="預約過戶諮詢"
            ctaLink="/zh/book-consultation?service=conveyancing"
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
            zh
          />
        </>
      )}

      <AlertDialog open={resetDialog.open} onOpenChange={(open) => setResetDialog((prev) => ({ ...prev, open }))}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>
              {resetDialog.mode === "clear" ? "清除所有資料？" : "重新開始交割流程？"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {resetDialog.mode === "clear"
                ? "這將永久清除您的物業資料、進度及所有里程碑狀態。"
                : "目前進度將被清除，但物業資料會保留。"}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>取消</AlertDialogCancel>
            <AlertDialogAction onClick={confirmReset}>
              {resetDialog.mode === "clear" ? "全部清除" : "重新開始"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}