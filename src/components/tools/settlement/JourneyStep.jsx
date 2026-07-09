import React from "react";
import { CheckCircle2, Circle, Clock, ArrowLeft, ArrowRight } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const STATUS_OPTIONS = [
  { value: "not_started", label: "Not Started" },
  { value: "in_progress", label: "In Progress" },
  { value: "completed", label: "Completed" },
];

/**
 * Reusable guided-journey step.
 * One step is expanded at a time. Collapsed steps show a single compact line
 * (title + status). The entire collapsed card is clickable.
 * Active step shows: task description + tip, an "Update Progress" dropdown,
 * and Previous / Next navigation (Next is disabled until the step is completed).
 */
export default function JourneyStep({
  milestone,
  stepNumber,
  totalSteps,
  isActive,
  isCompleted,
  inProgress,
  hasPrev,
  isLast,
  onActivate,
  onSetStatus,
  onPrev,
  onNext,
}) {
  const status = isCompleted ? "completed" : inProgress ? "in_progress" : "not_started";

  // Collapsed — single compact line, full card clickable
  if (!isActive) {
    const Icon = isCompleted ? CheckCircle2 : inProgress ? Clock : Circle;
    const accent = isCompleted || inProgress;
    const iconColor = isCompleted ? "text-emerald-600" : inProgress ? "text-golden" : "text-midnight/30";
    return (
      <button
        type="button"
        id={`milestone-${milestone.id}`}
        onClick={() => onActivate(milestone.id)}
        className={`scroll-mt-24 w-full text-left flex items-center gap-3 px-4 py-3.5 rounded-xl transition-colors ${accent ? "bg-golden/5 hover:bg-golden/10" : "bg-parchment/50 hover:bg-parchment"}`}
        aria-expanded={false}
      >
        <Icon size={20} className={`flex-shrink-0 ${iconColor}`} strokeWidth={1.5} />
        <span className={`text-sm font-medium ${isCompleted ? "text-midnight/60" : "text-midnight"}`}>{milestone.title}</span>
        {isCompleted && <span className="text-[10px] uppercase tracking-wide text-emerald-600 font-medium">Completed</span>}
        {inProgress && <span className="text-[10px] uppercase tracking-wide text-golden font-medium">In Progress</span>}
        <span className="sr-only">{milestone.aiExplanation}</span>
      </button>
    );
  }

  // Active — expanded single stage
  return (
    <div id={`milestone-${milestone.id}`} className="scroll-mt-24 bg-white rounded-2xl border-2 border-golden/50 shadow-sm overflow-hidden" aria-expanded={true}>
      <div className="px-5 md:px-6 py-4 border-b border-stone/50">
        <p className="text-[10px] uppercase tracking-[0.2em] text-golden mb-0.5">Step {stepNumber} of {totalSteps}</p>
        <h3 className="font-heading text-lg text-midnight leading-tight">{milestone.title}</h3>
      </div>

      <div className="px-5 md:px-6 py-5">
        <p className="text-sm text-midnight/80 leading-relaxed mb-4">{milestone.taskDescription}</p>
        <div className="flex items-start gap-3">
          <span className="text-xs uppercase tracking-wide text-midnight/40 w-10 flex-shrink-0">💡 Tip</span>
          <span className="text-sm text-midnight/70 leading-relaxed">{milestone.tip}</span>
        </div>
        <span className="sr-only">{milestone.aiExplanation}</span>
      </div>

      <div className="hidden md:flex px-5 md:px-6 py-4 bg-parchment/40 border-t border-stone/50 items-center justify-between gap-3">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-midnight/60 disabled:opacity-30 disabled:cursor-not-allowed hover:text-midnight transition-colors px-1 py-2"
        >
          <ArrowLeft size={16} /> Previous Stage
        </button>
        <div className="flex items-center gap-2">
          <span className="text-xs text-midnight/40">Update Progress</span>
          <Select value={status} onValueChange={(v) => onSetStatus(milestone.id, v)}>
            <SelectTrigger className="w-[150px] h-9 rounded-full border-stone bg-white text-sm">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {STATUS_OPTIONS.map((o) => (
                <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className="inline-flex items-center gap-1.5 bg-midnight text-parchment text-sm font-medium px-5 py-2.5 rounded-full disabled:opacity-30 disabled:cursor-not-allowed hover:bg-accent-navy transition-colors"
        >
          Next <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}