import React from "react";
import { MapPin, ArrowRight } from "lucide-react";

export default function ProgressSummary({ overall, currentStage, nextAction, lastSaved }) {
  const barColor = overall.percentage === 100
    ? "bg-emerald-500"
    : overall.percentage > 0
      ? "bg-blue-500"
      : "bg-gray-200";

  return (
    <div className="bg-white rounded-xl border p-4 sm:p-5 mb-6 shadow-sm">
      {/* Top row: percentage + counts */}
      <div className="flex items-center gap-4 mb-3">
        <div className="flex-shrink-0 text-center">
          <span className="text-3xl sm:text-4xl font-bold text-gray-900 tabular-nums">
            {overall.percentage}%
          </span>
          <span className="block text-[10px] uppercase tracking-wider text-gray-400 mt-0.5">完成</span>
        </div>
        <div className="flex-1 min-w-0">
          <div
            className="h-2.5 bg-gray-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={overall.percentage}
            aria-label="整體清單進度"
          >
            <div
              className={`h-full rounded-full transition-all duration-500 motion-reduce:transition-none ${barColor}`}
              style={{ width: `${overall.percentage}%` }}
            />
          </div>
          <p className="text-xs text-gray-500 mt-1.5">
            <span className="font-medium text-gray-700">{overall.completed}</span> 已完成
            {" · "}
            <span className="font-medium text-gray-700">{overall.remaining}</span> 未完成
            {" · "}
            <span className="text-gray-400">總項目 {overall.total}</span>
          </p>
        </div>
      </div>

      {/* Info row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pt-3 border-t">
        {/* Current stage */}
        <div className="flex items-start gap-2">
          <MapPin className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">目前階段</p>
            {currentStage ? (
              <p className="text-sm font-medium text-gray-800 truncate">
                {currentStage.number}. {currentStage.name}
              </p>
            ) : (
              <p className="text-sm font-medium text-emerald-600">旅程已完成</p>
            )}
          </div>
        </div>

        {/* Next action */}
        <div className="flex items-start gap-2">
          <ArrowRight className="w-4 h-4 text-blue-500 flex-shrink-0 mt-0.5" />
          <div className="min-w-0">
            <p className="text-[10px] uppercase tracking-wider text-gray-400">下一步行動</p>
            {nextAction ? (
              <div className="min-w-0">
                <p className="text-sm font-medium text-gray-800 truncate">{nextAction.title}</p>
                {nextAction.responsible && (
                  <p className="text-xs text-gray-500 truncate">{nextAction.responsible}</p>
                )}
              </div>
            ) : (
              <p className="text-sm font-medium text-emerald-600">所有任務已完成</p>
            )}
          </div>
        </div>
      </div>

      {/* Last saved */}
      {lastSaved && (
        <p className="text-[10px] text-gray-400 mt-3 pt-2 border-t">
          最後儲存：{new Date(lastSaved).toLocaleString(undefined, { dateStyle: "short", timeStyle: "short" })}
        </p>
      )}
    </div>
  );
}