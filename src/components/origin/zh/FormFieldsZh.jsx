import React from "react";

export function InputFieldZh({ label, value, onChange, placeholder, type = "text", required = false, autoComplete }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-midnight">{label}</label><input type={type} value={value} onChange={(e)=>onChange(e.target.value)} placeholder={placeholder} required={required} autoComplete={autoComplete} className="w-full rounded-lg border border-stone bg-parchment/50 px-4 py-3 text-sm text-midnight focus:border-accent-navy focus:outline-none"/></div>;
}

export function SelectFieldZh({ label, value, onChange, options, required = false }) {
  return <div><label className="mb-1.5 block text-sm font-medium text-midnight">{label}</label><select value={value} onChange={(e)=>onChange(e.target.value)} required={required} className="w-full appearance-none rounded-lg border border-stone bg-parchment/50 px-4 py-3 text-sm text-midnight focus:border-accent-navy focus:outline-none"><option value="">請選擇</option>{options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>;
}
