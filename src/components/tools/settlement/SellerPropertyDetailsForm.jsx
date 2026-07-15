import React from "react";
import { RotateCcw } from "lucide-react";
import LegalConsent from "@/components/origin/LegalConsent";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const SELLER_TYPES = [
  { value: "Owner Occupier", en: "Owner Occupier", zh: "自住業主" },
  { value: "Investor", en: "Investor", zh: "投資者" },
];
const PROPERTY_TYPES = [
  { value: "House", en: "House", zh: "獨立屋" },
  { value: "Apartment", en: "Apartment", zh: "公寓" },
  { value: "Townhouse", en: "Townhouse", zh: "聯排別墅" },
  { value: "Unit", en: "Unit", zh: "單位" },
  { value: "Other", en: "Other", zh: "其他" },
];

export default function SellerPropertyDetailsForm({ values, onChange, onSubmit, started, onRestart, zh = false }) {
  const set = (field) => (e) => onChange({ ...values, [field]: e.target.value });
  const canSubmit = values.legalConsent && values.address && values.contractDate && values.settlementDate && values.propertyType && values.sellerType;

  const inputClass =
    "w-full rounded-xl border border-stone bg-parchment/40 px-4 py-3 text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:border-golden/50 focus:ring-2 focus:ring-golden/10 transition";
  const labelClass = "block text-xs font-medium tracking-wide uppercase text-midnight/50 mb-1.5";

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 p-6 md:p-8">
      <p className="text-xs tracking-widest uppercase text-golden mb-1">{zh ? "步驟 1" : "Step 1"}</p>
      <h2 className="font-heading text-xl md:text-2xl text-midnight mb-1">{zh ? "物業資料" : "Property Details"}</h2>
      <p className="text-sm text-midnight/50 mb-6">{zh ? "請提供一些資料，以便為您個人化交割流程。" : "A few details to personalise your settlement journey."}</p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <div className="md:col-span-2">
          <label className={labelClass}>{zh ? "物業地址" : "Property Address"}</label>
          <input type="text" value={values.address || ""} onChange={set("address")} placeholder={zh ? "例如：12 Smith Street, Richmond VIC 3121" : "e.g. 12 Smith Street, Richmond VIC 3121"} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{zh ? "合約日期" : "Contract Date"}</label>
          <input type="date" value={values.contractDate || ""} onChange={set("contractDate")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{zh ? "交割日期" : "Settlement Date"}</label>
          <input type="date" value={values.settlementDate || ""} onChange={set("settlementDate")} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>{zh ? "物業類型" : "Property Type"}</label>
          <Select value={values.propertyType || ""} onValueChange={(v) => onChange({ ...values, propertyType: v })}>
            <SelectTrigger className="w-full h-[46px] rounded-xl border-stone bg-parchment/40 text-sm text-midnight">
              <SelectValue placeholder={zh ? "選擇物業類型" : "Select property type"} />
            </SelectTrigger>
            <SelectContent>
              {PROPERTY_TYPES.map((t) => (
                <SelectItem key={t.value} value={t.value}>{zh ? t.zh : t.en}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div>
          <label className={labelClass}>{zh ? "賣家類型" : "Seller Type"}</label>
          <div className="grid grid-cols-2 gap-2">
            {SELLER_TYPES.map((t) => (
              <button
                key={t.value}
                type="button"
                onClick={() => onChange({ ...values, sellerType: t.value })}
                className={`rounded-xl border px-4 py-3 text-sm font-medium transition ${values.sellerType === t.value ? "border-golden bg-golden/10 text-midnight" : "border-stone bg-parchment/40 text-midnight/60 hover:border-golden/40"}`}
              >
                {zh ? t.zh : t.en}
              </button>
            ))}
          </div>
        </div>
      </div>

      <LegalConsent
        zh={zh}
        id="seller-tracker-legal-consent"
        checked={Boolean(values.legalConsent)}
        onChange={(checked) =>
          onChange({
            ...values,
            legalConsent: checked,
            legalConsentAt: checked ? new Date().toISOString() : null,
          })
        }
        marketingChecked={Boolean(values.marketingConsent)}
        onMarketingChange={(checked) =>
          onChange({
            ...values,
            marketingConsent: checked,
            marketingConsentAt: checked ? new Date().toISOString() : null,
          })
        }
      />

      <div className="mt-6 flex flex-col sm:flex-row items-center gap-3">
        <button
          onClick={onSubmit}
          disabled={!canSubmit}
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition disabled:opacity-40 disabled:cursor-not-allowed"
        >
          {zh ? "開始我的交割流程" : "Start My Journey"}
        </button>
        {started && (
          <button
            onClick={onRestart}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 text-midnight/60 text-sm font-medium px-6 py-3.5 rounded-full hover:bg-midnight/5 transition"
          >
            <RotateCcw size={16} /> {zh ? "重新開始流程" : "Restart Journey"}
          </button>
        )}
      </div>
    </div>
  );
}
