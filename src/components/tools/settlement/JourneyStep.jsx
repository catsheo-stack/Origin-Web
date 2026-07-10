import React from "react";
import {
  CheckCircle2,
  Circle,
  Clock,
  ArrowLeft,
  ArrowRight,
} from "lucide-react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const STATUS_OPTIONS = [
  {
    value: "not_started",
    label: "Not Started",
  },
  {
    value: "in_progress",
    label: "In Progress",
  },
  {
    value: "completed",
    label: "Completed",
  },
];

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
  const status = isCompleted
    ? "completed"
    : inProgress
      ? "in_progress"
      : "not_started";

  if (!isActive) {
    const Icon = isCompleted
      ? CheckCircle2
      : inProgress
        ? Clock
        : Circle;

    const accent = isCompleted || inProgress;

    const iconColor = isCompleted
      ? "text-emerald-600"
      : inProgress
        ? "text-golden"
        : "text-midnight/30";

    return (
      <button
        type="button"
        id={`milestone-${milestone.id}`}
        onClick={() => onActivate(milestone.id)}
        className={`scroll-mt-24 flex w-full items-center gap-3 rounded-xl px-4 py-3.5 text-left transition-colors ${
          accent
            ? "bg-golden/5 hover:bg-golden/10"
            : "bg-parchment/50 hover:bg-parchment"
        }`}
        aria-expanded={false}
      >
        <Icon
          size={20}
          strokeWidth={1.5}
          className={`flex-shrink-0 ${iconColor}`}
        />

        <span
          className={`min-w-0 flex-1 text-sm font-medium ${
            isCompleted
              ? "text-midnight/60"
              : "text-midnight"
          }`}
        >
          {milestone.title}
        </span>

        {isCompleted && (
          <span className="flex-shrink-0 text-[10px] font-medium uppercase tracking-wide text-emerald-600">
            Completed
          </span>
        )}

        {inProgress && (
          <span className="flex-shrink-0 text-[10px] font-medium uppercase tracking-wide text-golden">
            In Progress
          </span>
        )}

        <span className="sr-only">
          {milestone.aiExplanation}
        </span>
      </button>
    );
  }

  const ProgressSelector = () => (
    <Select
      value={status}
      onValueChange={(value) =>
        onSetStatus(milestone.id, value)
      }
    >
      <SelectTrigger className="h-11 w-full rounded-full border-stone bg-white text-sm sm:w-[170px]">
        <SelectValue />
      </SelectTrigger>

      <SelectContent>
        {STATUS_OPTIONS.map((option) => (
          <SelectItem
            key={option.value}
            value={option.value}
          >
            {option.label}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );

  return (
    <div
      id={`milestone-${milestone.id}`}
      className="scroll-mt-24 overflow-hidden rounded-2xl border-2 border-golden/50 bg-white shadow-sm"
      aria-expanded={true}
    >
      <div className="border-b border-stone/50 px-5 py-4 md:px-6">
        <p className="mb-0.5 text-[10px] uppercase tracking-[0.2em] text-golden">
          Step {stepNumber} of {totalSteps}
        </p>

        <h3 className="font-heading text-lg leading-tight text-midnight">
          {milestone.title}
        </h3>
      </div>

      <div className="px-5 py-5 md:px-6">
        <p className="mb-4 text-sm leading-relaxed text-midnight/80">
          {milestone.taskDescription}
        </p>

        <div className="flex items-start gap-3">
          <span className="w-10 flex-shrink-0 text-xs uppercase tracking-wide text-midnight/40">
            💡 Tip
          </span>

          <span className="text-sm leading-relaxed text-midnight/70">
            {milestone.tip}
          </span>
        </div>

        <span className="sr-only">
          {milestone.aiExplanation}
        </span>
      </div>

      {/* Mobile controls */}
      <div className="border-t border-stone/50 bg-parchment/40 px-4 py-4 md:hidden">
        <div className="mb-4">
          <span className="mb-2 block text-xs font-medium text-midnight/50">
            Update Progress
          </span>

          <ProgressSelector />
        </div>

        <div className="grid grid-cols-2 gap-3">
          <button
            type="button"
            onClick={onPrev}
            disabled={!hasPrev}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full border border-midnight/15 bg-white px-3 py-2.5 text-sm font-medium text-midnight/70 transition-colors hover:bg-midnight/5 disabled:cursor-not-allowed disabled:opacity-30"
          >
            <ArrowLeft size={16} />
            Previous
          </button>

          <button
            type="button"
            onClick={onNext}
            disabled={isLast}
            className="inline-flex min-h-11 items-center justify-center gap-1.5 rounded-full bg-midnight px-3 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-accent-navy disabled:cursor-not-allowed disabled:opacity-30"
          >
            Next
            <ArrowRight size={16} />
          </button>
        </div>
      </div>

      {/* Desktop controls */}
      <div className="hidden items-center justify-between gap-3 border-t border-stone/50 bg-parchment/40 px-5 py-4 md:flex md:px-6">
        <button
          type="button"
          onClick={onPrev}
          disabled={!hasPrev}
          className="inline-flex items-center gap-1.5 px-1 py-2 text-sm font-medium text-midnight/60 transition-colors hover:text-midnight disabled:cursor-not-allowed disabled:opacity-30"
        >
          <ArrowLeft size={16} />
          Previous Stage
        </button>

        <div className="flex items-center gap-2">
          <span className="text-xs text-midnight/40">
            Update Progress
          </span>

          <ProgressSelector />
        </div>

        <button
          type="button"
          onClick={onNext}
          disabled={isLast}
          className="inline-flex items-center gap-1.5 rounded-full bg-midnight px-5 py-2.5 text-sm font-medium text-parchment transition-colors hover:bg-accent-navy disabled:cursor-not-allowed disabled:opacity-30"
        >
          Next
          <ArrowRight size={16} />
        </button>
      </div>
    </div>
  );
}