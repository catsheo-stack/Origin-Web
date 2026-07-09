import React from "react";

/**
 * Reusable labelled input for Origin Tools calculators.
 * Supports currency (prefix) and percentage (suffix) display.
 */
export default function CalculatorField({ label, value, onChange, prefix, suffix, placeholder, note }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{label}</span>
      <div className="relative">
        {prefix && <span className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight/40 text-sm pointer-events-none">{prefix}</span>}
        <input
          type="number"
          inputMode="decimal"
          className={`w-full rounded-lg border border-stone bg-white py-3 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition ${prefix ? "pl-8" : "pl-4"} ${suffix ? "pr-10" : "pr-4"}`}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        {suffix && <span className="absolute right-3 top-1/2 -translate-y-1/2 text-midnight/40 text-sm pointer-events-none">{suffix}</span>}
      </div>
      {note && <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">{note}</span>}
    </label>
  );
}