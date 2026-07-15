import React from "react";
import { ChevronLeft, ChevronRight, Download } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "not_started", en: "Not Started", zh: "尚未開始" },
  { value: "in_progress", en: "In Progress", zh: "進行中" },
  { value: "completed", en: "Completed", zh: "已完成" },
];

export default function StickyStageNav({ pct, activeMilestone, allDone, hasPrev, canGoNext, onPrev, onNext, onSetStatus, onDownload, zh = false }) {
  const status = activeMilestone?.status || "not_started";
  return (
    <div className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-xl border-t border-stone shadow-[0_-4px_20px_rgba(0,0,0,0.06)] print:hidden">
      <div className="max-w-3xl mx-auto px-4 py-2.5">
        <div className="flex items-center justify-between gap-2 mb-2">
          <p className="text-xs font-medium text-midnight truncate flex-1">{allDone ? (zh ? "所有里程碑均已完成" : "All milestones complete") : activeMilestone?.title}</p>
          <p className="text-xs font-heading text-golden flex-shrink-0">{pct}%</p>
        </div>
        <div className="h-1.5 rounded-full bg-stone/60 overflow-hidden mb-2.5"><div className="h-full bg-golden rounded-full transition-all duration-500" style={{ width: `${pct}%` }} /></div>
        {allDone ? (
          <button type="button" onClick={onDownload} className="w-full inline-flex items-center justify-center gap-1.5 border border-midnight/20 text-midnight text-sm font-medium px-4 py-3 rounded-full"><Download size={16} /> {zh ? "下載報告" : "Download Report"}</button>
        ) : (
          <div className="flex items-center gap-2">
            <button type="button" onClick={onPrev} disabled={!hasPrev} className="inline-flex items-center gap-1 text-midnight/70 disabled:opacity-30 disabled:cursor-not-allowed px-2 py-2.5"><ChevronLeft size={20} /></button>
            <Select value={status} onValueChange={(v) => onSetStatus(activeMilestone.id, v)}>
              <SelectTrigger className="flex-1 h-11 rounded-full border-stone bg-white text-sm font-medium"><SelectValue /></SelectTrigger>
              <SelectContent>{STATUS_OPTIONS.map((o) => <SelectItem key={o.value} value={o.value}>{zh ? o.zh : o.en}</SelectItem>)}</SelectContent>
            </Select>
            <button type="button" onClick={onNext} disabled={!canGoNext} className="inline-flex items-center gap-1 bg-golden text-midnight text-sm font-medium px-4 py-2.5 rounded-full disabled:opacity-30 disabled:cursor-not-allowed">{zh ? "下一步" : "Next"} <ChevronRight size={20} /></button>
          </div>
        )}
      </div>
    </div>
  );
}
