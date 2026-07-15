import React from "react";
import { ChevronRight, ChevronDown } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { getStageProgress } from "@/en/utils/checklistProgress";
import CategorySection from "@/en/components/buyer-checklist/CategorySection";

export default function StageAccordion({ stage, taskStates, onUpdateTask, propertyType, isOpen, onToggle, properties, contacts }) {
  const progress = getStageProgress(stage, taskStates, propertyType);

  const barColor = progress.percentage === 100
    ? "bg-emerald-500"
    : progress.percentage > 0
      ? "bg-blue-500"
      : "bg-gray-200";

  return (
    <div id={`stage-${stage.id}`} className="border rounded-xl overflow-hidden shadow-sm scroll-mt-4">
      <button
        type="button"
        className="w-full flex items-center gap-3 px-4 sm:px-5 py-4 bg-white hover:bg-gray-50 transition-colors motion-reduce:transition-none text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400"
        onClick={() => onToggle(stage.id)}
        aria-expanded={isOpen}
        aria-label={`Stage ${stage.number}: ${stage.name}, ${progress.percentage}% complete`}
      >
        {/* Stage number */}
        <div className="flex-shrink-0 w-8 h-8 rounded-full bg-gray-900 text-white flex items-center justify-center text-sm font-bold">
          {stage.number}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm sm:text-base font-semibold text-gray-900">{stage.name}</span>
            <Badge variant="outline" className="text-[10px]">
              {progress.percentage}%
            </Badge>
          </div>
          <p className="text-xs text-gray-500 mt-0.5 truncate">{stage.description}</p>
          {/* Progress bar */}
          <div
            className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden"
            role="progressbar"
            aria-valuemin={0}
            aria-valuemax={100}
            aria-valuenow={progress.percentage}
            aria-label={`${stage.name} completion`}
          >
            <div
              className={`h-full rounded-full transition-all duration-300 motion-reduce:transition-none ${barColor}`}
              style={{ width: `${progress.percentage}%` }}
            />
          </div>
        </div>

        <div className="flex-shrink-0">
          {isOpen
            ? <ChevronDown className="w-5 h-5 text-gray-400" />
            : <ChevronRight className="w-5 h-5 text-gray-400" />}
        </div>
      </button>

      {isOpen && (
        <div className="px-3 sm:px-5 pb-4 space-y-3 bg-white">
          {stage.categories.map(cat => (
            <CategorySection
              key={cat.id}
              category={cat}
              taskStates={taskStates}
              onUpdateTask={onUpdateTask}
              propertyType={propertyType}
              properties={properties}
              contacts={contacts}
            />
          ))}
        </div>
      )}
    </div>
  );
}