import React from "react";

const STATUS_STYLES = {
  "Not Started": { dot: "bg-gray-300", text: "text-gray-500" },
  "In Progress": { dot: "bg-blue-400", text: "text-blue-600" },
  "Waiting": { dot: "bg-amber-400", text: "text-amber-600" },
  "Attention Needed": { dot: "bg-red-500", text: "text-red-600" },
  "已完成": { dot: "bg-emerald-500", text: "text-emerald-600" }
};

const SHORT_STATUS = {
  "Not Started": "尚未開始",
  "In Progress": "進行中",
  "Waiting": "等待中",
  "Attention Needed": "需要處理",
  "已完成": "完成"
};

export default function StageProgressCard({ number, name, percentage, completed, total, status, isCurrent, isOpen, onClick }) {
  const styles = STATUS_STYLES[status] || STATUS_STYLES["Not Started"];
  const barColor = percentage === 100
    ? "bg-emerald-500"
    : percentage > 0
      ? "bg-blue-500"
      : "bg-gray-200";

  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={isOpen}
      aria-label={`第 ${number} 階段：${name}，完成 ${percentage}%，狀態 ${SHORT_STATUS[status]}${isCurrent ? "，目前階段" : ""}`}
      className={`w-full text-left p-3 rounded-lg border transition-colors motion-reduce:transition-none text-sm
        ${isCurrent ? "border-blue-400 ring-1 ring-blue-200 bg-blue-50/30" : "border-gray-200 bg-white hover:bg-gray-50"}
        ${isOpen ? "ring-1 ring-gray-300" : ""}
        focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
    >
      {/* Top row: number + status */}
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-1.5 min-w-0">
          <span className={`flex-shrink-0 w-5 h-5 rounded-full text-[10px] font-bold flex items-center justify-center
            ${percentage === 100 ? "bg-emerald-500 text-white" : "bg-gray-900 text-white"}`}>
            {number}
          </span>
          <span className="font-medium text-gray-800 break-words leading-tight text-xs">{name}</span>
        </div>
      </div>

      {/* Status badge */}
      <div className="flex items-center gap-1 mb-2">
        <span className={`w-1.5 h-1.5 rounded-full ${styles.dot}`} />
        <span className={`text-[10px] font-medium ${styles.text}`}>{SHORT_STATUS[status]}</span>
        {isCurrent && (
          <span className="text-[10px] font-medium text-blue-500 ml-1">· 目前階段</span>
        )}
      </div>

      {/* Progress bar */}
      <div
        className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-1"
        role="progressbar"
        aria-valuemin={0}
        aria-valuemax={100}
        aria-valuenow={percentage}
        aria-label={`${name} 完成進度`}
      >
        <div
          className={`h-full rounded-full transition-all duration-300 motion-reduce:transition-none ${barColor}`}
          style={{ width: `${percentage}%` }}
        />
      </div>

      {/* Counts */}
      <p className="text-[10px] text-gray-400 tabular-nums">
        {percentage}% · 已完成 {completed}/{total} 項
      </p>
    </button>
  );
}