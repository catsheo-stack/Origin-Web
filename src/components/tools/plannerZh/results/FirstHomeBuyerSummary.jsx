import React from "react";
import { Check } from "lucide-react";
import CollapsibleSection from "./CollapsibleSection";
import { calculateStampDuty, fmtCurrency, num } from "@/data/tools/homeBuyingPlanner";

const BENEFITS = [
  "印花稅優惠",
  "首次置業補助",
  "首次置業擔保計畫",
  "首次置業退休金儲蓄計畫",
];

export default function FirstHomeBuyerSummary({ inputs }) {
  const price = num(inputs.purchasePrice);
  const savings = Math.max(0, calculateStampDuty(price, inputs.state, false) - calculateStampDuty(price, inputs.state, true));

  return (
    <CollapsibleSection title="首次置業者優惠" summary="可能適用於您購屋計畫的政府補助及優惠。">
      <p className="text-sm text-midnight/60 mb-4">您可能符合以下優惠資格：</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
        {BENEFITS.map((b) => (
          <div key={b} className="flex items-center gap-2.5">
            <span className="flex-shrink-0 w-5 h-5 rounded-full bg-emerald-100 flex items-center justify-center">
              <Check size={12} className="text-emerald-600" />
            </span>
            <span className="text-sm text-midnight/70">{b}</span>
          </div>
        ))}
      </div>
      {savings > 0 && (
        <div className="bg-parchment rounded-xl p-4 mb-4">
          <p className="text-xs text-midnight/50">預估印花稅節省</p>
          <p className="font-heading text-xl text-emerald-600">{fmtCurrency(savings)}</p>
          <p className="text-xs text-midnight/40 mt-1">根據首次置業者優惠估算，地區： {inputs.state}. 實際節省金額視乎您的資格而定。</p>
        </div>
      )}
      <p className="text-xs text-midnight/40 leading-relaxed">
        資格取決於政府當時的收入門檻、物業價值上限、過往置業紀錄及居留身分等規定。請向相關州稅務機構查閱最新條件。
      </p>
    </CollapsibleSection>
  );
}