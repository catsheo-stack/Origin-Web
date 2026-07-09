import React from "react";

/**
 * Reusable progress bar for Origin Tools.
 * `value` is a 0–100 percentage.
 */
export default function ProgressBar({ value = 0, className = "", barClassName = "" }) {
  const pct = Math.max(0, Math.min(100, Math.round(value)));
  return (
    <div className={`w-full h-2 bg-stone rounded-full overflow-hidden ${className}`}>
      <div
        className={`h-full bg-golden rounded-full transition-all duration-500 ease-out ${barClassName}`}
        style={{ width: `${pct}%` }}
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
      />
    </div>
  );
}