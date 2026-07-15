import React from "react";

const PROPERTY_TYPES = ["獨立屋", "公寓", "聯排別墅", "單位", "其他"];
const TENANTED_OPTIONS = ["是", "否", "即將遷出"];

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

export default function OwnerPropertyFormZh({ values, onChange }) {
  const set = (key) => (e) => onChange({ ...values, [key]: e.target.value });
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <Field label="業主姓名">
        <input className={inputClass} value={values.ownerName || ""} onChange={set("ownerName")} placeholder="您的姓名" autoComplete="name" />
      </Field>
      <Field label="電郵">
        <input type="email" className={inputClass} value={values.email || ""} onChange={set("email")} placeholder="you@example.com" autoComplete="email" />
      </Field>
      <Field label="電話">
        <input className={inputClass} value={values.phone || ""} onChange={set("phone")} placeholder="04xx xxx xxx" autoComplete="tel" />
      </Field>
      <Field label="物業地址">
        <input className={inputClass} value={values.address || ""} onChange={set("address")} placeholder="物業街道地址" />
      </Field>
      <Field label="物業類型">
        <select className={inputClass} value={values.propertyType || ""} onChange={set("propertyType")}>
          <option value="">請選擇類型</option>
          {PROPERTY_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="目前是否有租客？">
        <select className={inputClass} value={values.tenanted || ""} onChange={set("tenanted")}>
          <option value="">請選擇</option>
          {TENANTED_OPTIONS.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </Field>
      <Field label="預計可出租日期">
        <input type="date" className={inputClass} value={values.availableDate || ""} onChange={set("availableDate")} />
      </Field>
      <div className="md:col-span-2">
        <Field label="備註（可選）">
          <textarea rows={3} className={inputClass} value={values.notes || ""} onChange={set("notes")} placeholder="其他需要我們了解的物業資料" />
        </Field>
      </div>
    </div>
  );
}