import React from "react";
import { RotateCcw } from "lucide-react";

const BUYER_TYPES = ["First Home Buyer", "Owner Occupier", "Investor"];

export default function PropertyDetailsForm({ values, onChange, onSubmit, started, onRestart }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value });
  const canSubmit = values.address && values.contractDate && values.settlementDate && values.buyerType;

  const inputClass =
    "w-full rounded-xl border border-stone bg-parchment/40 px-4 py-3 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:border-golden/50 focus:ring-2 focus:ring-golden/10 transition";
  const labelClass = "block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8">
      <p className="text-xs tracking-widest uppercase text-golden mb-1">Step 1</p>
      <h2 className="font-heading text-xl md:text-2xl text-midnight mb-1">Property Details</h2>
      <p className="text-sm text-midnight/50 mb-6">A few details to personalise your settlement journey.</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>Property Address</label>
          <input type="text" value={values.address || ""} onChange={set("address")} placeholder="e.g. 12 Smith Street, Richmond VIC 3121" className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Contract Date</label>
          <input type="date" value={values.contractDate || ""} onChange={set("contractDate")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Settlement Date</label>
          <input type="date" value={values.settlementDate || ""} onChange={set("settlementDate")} className={inputClass} />
        </div>
        <div className="md:col-span-2">
          <label className={labelClass}>Buyer Type</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {BUYER_TYPES.map((t) => (
              <button
                key={t}
                type="button"
                onClick={() => onChange({ ...values, buyerType: t })}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${values.buyerType === t ? "border-golden bg-golden/10 text-midnight" : "border-stone bg-parchment/40 text-midnight/60 hover:border-golden/40"}`}
              >
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          Start My Journey
        </button>
        {started && (
          <button
            onClick={onRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-midnight/60 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-midnight/5 transition"
          >
            <RotateCcw size={16} /> Restart Journey
          </button>
        )}
      </div>
    </div>
  );
}