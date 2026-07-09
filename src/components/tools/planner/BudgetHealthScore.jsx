import React from "react";

function ScoreRing({ score, color }) {
  const colorClass = color === "green" ? "#16a34a" : color === "amber" ? "#d97706" : "#dc2626";
  const radius = 52;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (score / 100) * circumference;
  return (
    <div className="relative w-32 h-32 flex items-center justify-center">
      <svg className="absolute inset-0 -rotate-90" width="128" height="128" viewBox="0 0 128 128">
        <circle cx="64" cy="64" r={radius} fill="none" stroke="#E2DFD8" strokeWidth="8" />
        <circle cx="64" cy="64" r={radius} fill="none" stroke={colorClass} strokeWidth="8" strokeLinecap="round" strokeDasharray={circumference} strokeDashoffset={offset} style={{ transition: "stroke-dashoffset 0.8s ease-out" }} />
      </svg>
      <div className="text-center">
        <p className="font-heading text-3xl text-midnight leading-none">{score}</p>
        <p className="text-[10px] text-midnight/40 mt-1">out of 100</p>
      </div>
    </div>
  );
}

function ScoreBar({ component }) {
  const color = component.score >= 60 ? "bg-emerald-500" : component.score >= 40 ? "bg-amber-500" : "bg-red-500";
  return (
    <div className="py-3 border-b border-stone/50 last:border-0">
      <div className="flex items-center justify-between mb-1.5">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-midnight">{component.name}</span>
          <span className="text-[10px] text-midnight/40 bg-stone/50 rounded-full px-2 py-0.5">{component.weight}% weight</span>
        </div>
        <span className="text-sm font-medium text-midnight">{component.score}/100</span>
      </div>
      <div className="w-full h-1.5 bg-stone rounded-full overflow-hidden mb-2">
        <div className={`h-full ${color} rounded-full transition-all duration-700`} style={{ width: `${component.score}%` }} />
      </div>
      <p className="text-xs text-midnight/50 leading-relaxed">{component.explanation}</p>
    </div>
  );
}

/**
 * Budget Health Score — a weighted score out of 100 assessing the buyer's
 * overall financial readiness across six factors: deposit strength, buying
 * cost buffer, emergency savings, repayment-to-income ratio, existing debt
 * commitments, and loan-to-value ratio.
 */
export default function BudgetHealthScore({ score }) {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-parchment px-6 py-4 border-b border-stone/60">
        <p className="text-xs tracking-widest uppercase text-golden font-medium mb-0.5">Financial Comfort Score</p>
        <p className="text-sm text-midnight/60">Your overall buying readiness, assessed across six key factors.</p>
      </div>
      <div className="p-6 md:p-8">
        <div className="flex flex-col md:flex-row items-center gap-8 mb-6">
          <ScoreRing score={score.totalScore} color={score.gradeColor} />
          <div className="text-center md:text-left">
            <p className="font-heading text-2xl text-midnight">{score.grade}</p>
            <p className="text-sm text-midnight/50 mt-1 max-w-md leading-relaxed">
              Your comfort score reflects deposit strength, buying cost coverage, emergency savings, repayment affordability, existing debt and loan-to-value ratio. A score above 60 indicates a reasonably comfortable position; above 80 suggests strong financial readiness.
            </p>
          </div>
        </div>
        <div>
          {score.components.map((c) => (
            <ScoreBar key={c.name} component={c} />
          ))}
        </div>
      </div>
    </div>
  );
}