import React from "react";
import { RotateCcw, Trash2 } from "lucide-react";

export default function SettlementProgress({ completed, total, pct, currentStage, nextStage, focusText, onRestart, onClearAll, zh = false }) {
  const allDone = completed === total;
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xs uppercase tracking-wide text-midnight/40">{zh ? "交割進度" : "Settlement Progress"}</h2>
        <div className="flex items-center gap-3">
          <button type="button" onClick={onRestart} className="inline-flex items-center gap-1 text-xs text-midnight/50 hover:text-midnight transition-colors">
            <RotateCcw size={13} /> {zh ? "重新開始" : "Restart"}
          </button>
          <button type="button" onClick={onClearAll} className="inline-flex items-center gap-1 text-xs text-destructive/60 hover:text-destructive transition-colors">
            <Trash2 size={13} /> {zh ? "清除全部" : "Clear All"}
          </button>
        </div>
      </div>
      <p className="font-heading text-2xl md:text-3xl text-midnight mb-3">{pct}%</p>
      <div className="h-3 rounded-full bg-stone/60 overflow-hidden mb-6">
        <div className="h-full bg-golden rounded-full transition-all duration-500" style={{ width: `${pct}%` }} />
      </div>
      {!allDone ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-1">{zh ? "目前階段" : "Current Stage"}</p>
            <p className="font-medium text-midnight">{currentStage}</p>
          </div>
          <div>
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-1">{zh ? "下一階段" : "Next Stage"}</p>
            <p className="font-medium text-midnight">{nextStage || (zh ? "最後一步" : "Final step")}</p>
          </div>
          <div className="sm:col-span-2">
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-1">{zh ? "今日重點" : "Today's Focus"}</p>
            <p className="text-sm text-midnight/70 leading-relaxed">{focusText}</p>
          </div>
        </div>
      ) : (
        <div className="text-center py-2">
          <p className="font-heading text-lg text-golden">{zh ? "所有里程碑均已完成" : "All milestones complete"}</p>
          <p className="text-sm text-midnight/50 mt-1">{zh ? "請在交割前與您的過戶師確認最終細節。" : "Confirm final details with your conveyancer ahead of settlement."}</p>
        </div>
      )}
    </div>
  );
}
