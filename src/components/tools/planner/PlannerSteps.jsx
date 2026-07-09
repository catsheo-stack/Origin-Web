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
      <SelectInput label="Which best describes you?" value={inputs.buyerType} onChange={(v) => onChange("buyerType", v)} options={BUYER_TYPES} placeholder="Select buyer type" />
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
        <SelectInput label="Buying timeframe" value={inputs.timeframe} onChange={(v) => onChange("timeframe", v)} options={TIMELINES} placeholder="Optional" />
        <SelectInput label="Preferred state" value={inputs.state} onChange={(v) => onChange("state", v)} options={STATES} />
        <TextInput label="Preferred suburb" value={inputs.suburb} onChange={(v) => onChange("suburb", v)} placeholder="Optional" />
      </div>
    </div>
  );
}

/* ---------- Step 2: Financial Position (consolidated) ---------- */

export function StepFinancialPosition({ inputs, onChange }) {
  return (
    <div className="space-y-8">
      <div>
        <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">Income</p>
        <StepIncome inputs={inputs} onChange={onChange} />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">Deposit</p>
        <StepDeposit inputs={inputs} onChange={onChange} />
      </div>
      <div>
        <p className="text-xs font-medium tracking-wide uppercase text-golden mb-3">Monthly Commitments</p>
        <StepCommitments inputs={inputs} onChange={onChange} />
      </div>
    </div>
  );
}

/* ---------- Step 2: Income ---------- */

export function StepIncome({ inputs, onChange }) {
  const total = num(inputs.annualIncome) + num(inputs.partnerIncome) + num(inputs.rentalIncome) + num(inputs.otherIncome);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="Your annual income" value={inputs.annualIncome} onChange={(v) => onChange("annualIncome", v)} placeholder="85000" note="Before tax" />
        <CurrencyInput label="Partner income" value={inputs.partnerIncome} onChange={(v) => onChange("partnerIncome", v)} placeholder="0" note="Before tax, if applicable" />
        <CurrencyInput label="Rental income" value={inputs.rentalIncome} onChange={(v) => onChange("rentalIncome", v)} placeholder="0" note="Annual, if applicable" />
        <CurrencyInput label="Other income" value={inputs.otherIncome} onChange={(v) => onChange("otherIncome", v)} placeholder="0" note="Annual, before tax" />
      </div>
      <SummaryBanner label="Total household income" value={fmtCurrency(total)} />
    </div>
  );
}

/* ---------- Step 3: Deposit ---------- */

export function StepDeposit({ inputs, onChange }) {
  const total = num(inputs.savings) + num(inputs.familyGift) + num(inputs.fhssAmount) + num(inputs.equityFromProperty) + num(inputs.otherFunds);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="Savings" value={inputs.savings} onChange={(v) => onChange("savings", v)} placeholder="0" />
        <CurrencyInput label="Gift from family" value={inputs.familyGift} onChange={(v) => onChange("familyGift", v)} placeholder="0" />
        <CurrencyInput label="FHSS amount" value={inputs.fhssAmount} onChange={(v) => onChange("fhssAmount", v)} placeholder="0" note="First Home Super Saver Scheme" />
        <CurrencyInput label="Equity from another property" value={inputs.equityFromProperty} onChange={(v) => onChange("equityFromProperty", v)} placeholder="0" />
        <CurrencyInput label="Other available funds" value={inputs.otherFunds} onChange={(v) => onChange("otherFunds", v)} placeholder="0" />
      </div>
      <SummaryBanner label="Total available deposit" value={fmtCurrency(total)} tone={total > 0 ? "positive" : "default"} />
    </div>
  );
}

/* ---------- Step 4: Monthly Commitments ---------- */

export function StepCommitments({ inputs, onChange }) {
  const total = num(inputs.livingExpenses) + num(inputs.carLoan) + num(inputs.creditCardRepayments) + num(inputs.hecs) + num(inputs.childcare) + num(inputs.schoolFees) + num(inputs.otherLoans);
  return (
    <div className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="Living expenses" value={inputs.livingExpenses} onChange={(v) => onChange("livingExpenses", v)} placeholder="0" note="Monthly household" />
        <CurrencyInput label="Car loan" value={inputs.carLoan} onChange={(v) => onChange("carLoan", v)} placeholder="0" note="Monthly repayment" />
        <CurrencyInput label="Credit card repayments" value={inputs.creditCardRepayments} onChange={(v) => onChange("creditCardRepayments", v)} placeholder="0" note="Monthly" />
        <CurrencyInput label="HECS / HELP" value={inputs.hecs} onChange={(v) => onChange("hecs", v)} placeholder="0" note="Monthly" />
        <CurrencyInput label="Childcare" value={inputs.childcare} onChange={(v) => onChange("childcare", v)} placeholder="0" note="Monthly" />
        <CurrencyInput label="School fees" value={inputs.schoolFees} onChange={(v) => onChange("schoolFees", v)} placeholder="0" note="Monthly" />
        <CurrencyInput label="Other loans" value={inputs.otherLoans} onChange={(v) => onChange("otherLoans", v)} placeholder="0" note="Monthly" />
      </div>
      <SummaryBanner label="Estimated monthly commitments" value={fmtCurrency(total)} />
    </div>
  );
}

/* ---------- Step 5: Property Preference ---------- */

export function StepProperty({ inputs, onChange }) {
  const isInvestor = inputs.buyerType === "Investor";
  return (
    <div className="space-y-5">
      <SelectInput label="Property type" value={inputs.propertyType} onChange={(v) => onChange("propertyType", v)} options={PROPERTY_TYPES} placeholder="Select a type" />
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <CurrencyInput label="Desired purchase price" value={inputs.purchasePrice} onChange={(v) => onChange("purchasePrice", v)} placeholder="750000" />
        <PercentInput label="Deposit percentage" value={inputs.depositPercentage} onChange={(v) => onChange("depositPercentage", v)} placeholder="20" note="Of the purchase price" />
        <PercentInput label="Interest rate" value={inputs.interestRate} onChange={(v) => onChange("interestRate", v)} placeholder="6.5" />
        <SelectInput label="Loan term" value={inputs.loanTerm} onChange={(v) => onChange("loanTerm", v)} options={["25", "30"]} placeholder="Select term" note="Years" />
      </div>
      {isInvestor && (
        <CurrencyInput label="Estimated weekly rent" value={inputs.weeklyRent} onChange={(v) => onChange("weeklyRent", v)} placeholder="550" note="Weekly rental income" />
      )}
    </div>
  );
}