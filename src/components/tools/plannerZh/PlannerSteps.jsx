import React from "react";
import { BUYER_TYPES, PROPERTY_TYPES, STATES, TIMELINES, num, fmtCurrency } from "@/data/tools/homeBuyingPlanner";

/* ---------- Shared form helpers ---------- */

export function CurrencyInput({ label, value, onChange, placeholder, note }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{label}</span>
      <div className="relative">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-midnight/40 text-sm pointer-events-none">$</span>
        <input
          type="number"
          inputMode="decimal"
          className="w-full rounded-lg border border-stone bg-white py-3 pl-8 pr-4 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
      </div>
      {note && <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">{note}</span>}
    </label>
  );
}

export function PercentInput({ label, value, onChange, placeholder, note }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{label}</span>
      <div className="relative">
        <input
          type="number"
          inputMode="decimal"
          step="0.1"
          className="w-full rounded-lg border border-stone bg-white py-3 pl-4 pr-10 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          placeholder={placeholder}
        />
        <span className="absolute right-3 top-1/2 -translate-y-1/2 text-midnight/40 text-sm pointer-events-none">%</span>
      </div>
      {note && <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">{note}</span>}
    </label>
  );
}

export function TextInput({ label, value, onChange, placeholder, note }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{label}</span>
      <input
        type="text"
        className="w-full rounded-lg border border-stone bg-white py-3 px-4 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
      />
      {note && <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">{note}</span>}
    </label>
  );
}

export function SelectInput({ label, value, onChange, options, placeholder = "Select an option", note }) {
  return (
    <label className="block">
      <span className="block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5">{label}</span>
      <select
        className="w-full rounded-lg border border-stone bg-white py-3 px-4 text-sm text-midnight focus:outline-none focus:ring-2 focus:ring-golden/40 focus:border-golden/50 transition appearance-none"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">{placeholder}</option>
        {options.map((opt) => {
          const val = typeof opt === "string" ? opt : opt.value;
          const lbl = typeof opt === "string" ? opt : (opt.label || opt.value);
          return <option key={val} value={val}>{lbl}</option>;
        })}
      </select>
      {note && <span className="block text-xs text-midnight/40 mt-1 leading-relaxed">{note}</span>}
    </label>
  );
}

export function SummaryBanner({ label, value, tone = "default" }) {
  const toneClass = tone === "positive" ? "text-emerald-600" : tone === "negative" ? "text-red-500" : "text-midnight";
  return (
    <div className="bg-parchment rounded-xl p-4 flex items-center justify-between border border-stone/60">
      <span className="text-xs font-medium tracking-wide uppercase text-midnight/50">{label}</span>
      <span className={`font-heading text-xl ${toneClass}`}>{value}</span>
    </div>
  );
}

/* ---------- Step 1: Buyer Profile ---------- */

export function StepBuyerProfile({ inputs, onChange }) {
  return (
    <div className="space-y-5">
      <SelectInput label="哪一項最符合您的情況？" value={inputs.buyerType} onChange={(v) => onChange("buyerType", v)} options={BUYER_TYPES.map((o) => ({ ...o, label: ({"First Home Buyer":"首次置業者","Owner Occupier":"自住買家","Investor":"投資者","Upgrader":"換購較大住宅","Downsizer":"換購較小住宅"})[o.value] }))} placeholder="請選擇買家類型" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <SelectInput label="預計購買時間" value={inputs.timeframe} onChange={(v) => onChange("timeframe", v)} options={TIMELINES.map((v) => ({ value: v, label: ({"Just researching":"正在了解階段","Within 3 months":"3 個月內","3–6 months":"3 至 6 個月","6–12 months":"6 至 12 個月","Over 12 months":"12 個月以上"})[v] }))} placeholder="選填" />
        <SelectInput label="偏好州份" value={inputs.state} onChange={(v) => onChange("state", v)} options={STATES.map((o) => ({ ...o, label: ({VIC:"維多利亞州",NSW:"新南威爾士州",QLD:"昆士蘭州",SA:"南澳州",WA:"西澳州",ACT:"澳洲首都領地",TAS:"塔斯馬尼亞州",NT:"北領地"})[o.value] }))} />
        <TextInput label="偏好地區" value={inputs.suburb} onChange={(v) => onChange("suburb", v)} placeholder="選填" />
      </div>
    </div>
  );
}

/* ---------- Step 2: Financial Position (consolidated) ---------- */

export function StepFinancialPosition({ inputs, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">收入</p>
        <StepIncome inputs={inputs} onChange={onChange} />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">首期資金</p>
        <StepDeposit inputs={inputs} onChange={onChange} />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">每月固定支出</p>
        <StepCommitments inputs={inputs} onChange={onChange} />
      </div>
    </div>
  );
}

/* ---------- Step 2: 收入 ---------- */

export function StepIncome({ inputs, onChange }) {
  const total = num(inputs.annualIncome) + num(inputs.partnerIncome) + num(inputs.rentalIncome) + num(inputs.otherIncome);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="您的年收入" value={inputs.annualIncome} onChange={(v) => onChange("annualIncome", v)} placeholder="85000" note="稅前" />
        <CurrencyInput label="伴侶年收入" value={inputs.partnerIncome} onChange={(v) => onChange("partnerIncome", v)} placeholder="0" note="稅前（如適用）" />
        <CurrencyInput label="租金收入" value={inputs.rentalIncome} onChange={(v) => onChange("rentalIncome", v)} placeholder="0" note="每年，如適用" />
        <CurrencyInput label="其他收入" value={inputs.otherIncome} onChange={(v) => onChange("otherIncome", v)} placeholder="0" note="每年稅前" />
      </div>
      <SummaryBanner label="家庭總收入" value={fmtCurrency(total)} />
    </div>
  );
}

/* ---------- Step 3: 首期資金 ---------- */

export function StepDeposit({ inputs, onChange }) {
  const total = num(inputs.savings) + num(inputs.familyGift) + num(inputs.fhssAmount) + num(inputs.equityFromProperty) + num(inputs.otherFunds);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="儲蓄" value={inputs.savings} onChange={(v) => onChange("savings", v)} placeholder="0" />
        <CurrencyInput label="家人贈款" value={inputs.familyGift} onChange={(v) => onChange("familyGift", v)} placeholder="0" />
        <CurrencyInput label="FHSS 可提取金額" value={inputs.fhssAmount} onChange={(v) => onChange("fhssAmount", v)} placeholder="0" note="首次置業退休金儲蓄計畫" />
        <CurrencyInput label="其他物業可動用權益" value={inputs.equityFromProperty} onChange={(v) => onChange("equityFromProperty", v)} placeholder="0" />
        <CurrencyInput label="其他可用資金" value={inputs.otherFunds} onChange={(v) => onChange("otherFunds", v)} placeholder="0" />
      </div>
      <SummaryBanner label="首期可用資金總額" value={fmtCurrency(total)} tone={total > 0 ? "positive" : "default"} />
    </div>
  );
}

/* ---------- Step 4: 每月固定支出 ---------- */

export function StepCommitments({ inputs, onChange }) {
  const total = num(inputs.livingExpenses) + num(inputs.carLoan) + num(inputs.creditCardRepayments) + num(inputs.hecs) + num(inputs.childcare) + num(inputs.schoolFees) + num(inputs.otherLoans);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="生活開支" value={inputs.livingExpenses} onChange={(v) => onChange("livingExpenses", v)} placeholder="0" note="每月家庭開支" />
        <CurrencyInput label="汽車貸款" value={inputs.carLoan} onChange={(v) => onChange("carLoan", v)} placeholder="0" note="每月還款" />
        <CurrencyInput label="信用卡還款" value={inputs.creditCardRepayments} onChange={(v) => onChange("creditCardRepayments", v)} placeholder="0" note="每月" />
        <CurrencyInput label="HECS／HELP 學貸" value={inputs.hecs} onChange={(v) => onChange("hecs", v)} placeholder="0" note="每月" />
        <CurrencyInput label="托兒費" value={inputs.childcare} onChange={(v) => onChange("childcare", v)} placeholder="0" note="每月" />
        <CurrencyInput label="學費" value={inputs.schoolFees} onChange={(v) => onChange("schoolFees", v)} placeholder="0" note="每月" />
        <CurrencyInput label="其他貸款" value={inputs.otherLoans} onChange={(v) => onChange("otherLoans", v)} placeholder="0" note="每月" />
      </div>
      <SummaryBanner label="預估每月固定支出" value={fmtCurrency(total)} />
    </div>
  );
}

/* ---------- Step 5: Property Preference ---------- */

export function StepProperty({ inputs, onChange }) {
  const isInvestor = inputs.buyerType === "Investor";
  return (
    <div className="space-y-5">
      <SelectInput label="物業類型" value={inputs.propertyType} onChange={(v) => onChange("propertyType", v)} options={PROPERTY_TYPES.map((v) => ({ value: v, label: ({House:"獨立屋",Apartment:"公寓",Townhouse:"聯排別墅",Land:"土地","Investment Property":"投資物業"})[v] }))} placeholder="請選擇物業類型" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="目標購買價格" value={inputs.purchasePrice} onChange={(v) => onChange("purchasePrice", v)} placeholder="750000" />
        <PercentInput label="首期比例" value={inputs.depositPercentage} onChange={(v) => onChange("depositPercentage", v)} placeholder="20" note="佔樓價比例" />
        <PercentInput label="利率" value={inputs.interestRate} onChange={(v) => onChange("interestRate", v)} placeholder="6.5" />
        <SelectInput label="貸款年期" value={inputs.loanTerm} onChange={(v) => onChange("loanTerm", v)} options={["25", "30"]} placeholder="請選擇年期" note="年" />
      </div>
      {isInvestor && (
        <CurrencyInput label="預估每週租金" value={inputs.weeklyRent} onChange={(v) => onChange("weeklyRent", v)} placeholder="550" note="每週租金收入" />
      )}
    </div>
  );
}