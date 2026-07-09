import React from "react";

const PROPERTY_TYPES = ["House", "Apartment", "Townhouse", "Unit", "Other"];
const TENANTED_OPTIONS = ["Yes", "No", "Vacating soon"];

function Field({ label, children }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{label}</span>
      {children}
    </label>
  );
}

const inputClass =
  "w-full rounded-lg border border-stone bg-white px-4 py-3 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition";

export default function OwnerPropertyForm({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="Owner Name">
        <input className={inputClass} value={values.ownerName || ""} onChange={set("ownerName")} placeholder="Your name" autoComplete="name" />
      </Field>
      <Field label="Email">
        <input type="email" className={inputClass} value={values.email || ""} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
      </Field>
      <Field label="Phone">
        <input className={inputClass} value={values.phone || ""} onChange={set("phone")} placeholder="04xx xxx xxx" autoComplete="tel" />
      </Field>
      <Field label="Property Address">
        <input className={inputClass} value={values.address || ""} onChange={set("address")} placeholder="Property street address" />
      </Field>
      <Field label="Property Type">
        <select className={inputClass} value={values.propertyType || ""} onChange={set("propertyType")}>
          <option value="">Select type</option>
          {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Currently Tenanted?">
        <select className={inputClass} value={values.tenanted || ""} onChange={set("tenanted")}>
          <option value="">Select</option>
          {TENANTED_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="Expected Available Date">
        <input type="date" className={inputClass} value={values.availableDate || ""} onChange={set("availableDate")} />
      </Field>
      <div className="md:col-span-2">
        <Field label="Notes (optional)">
          <textarea rows={3} className={inputClass} value={values.notes || ""} onChange={set("notes")} placeholder="Anything else we should know about the property" />
        </Field>
      </div>
    </div>
  );
}