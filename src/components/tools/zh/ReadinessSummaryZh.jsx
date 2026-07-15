import React from "react";
import { Link } from "react-router-dom";
import { Printer, Calendar, Home, User, Check } from "lucide-react";
import ProgressBar from "@/components/tools/ProgressBar";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";

function getRecommendation(pct) {
  if (pct >= 80) {
    return {
      label: "非常好 — 已準備出租",
      text: "您的物業看來已準備出租。建議安排專業攝影並預約物業管理諮詢，以完成上市出租計劃。",
      steps: [
        "安排專業市場推廣攝影",
        "預約物業管理檢視",
        "確認理想租約開始日期",
      ],
    };
  }
  if (pct >= 50) {
    return {
      label: "進度良好 — 接近完成",
      text: "刊登出租廣告前，請完成餘下項目，以減少延誤及合規風險。",
      steps: [
        "完成尚未處理的合規及文件項目",
        "安排尚未完成的安全檢查",
        "預約物業管理檢視，補足尚未完成的準備事項",
      ],
    };
  }
  return {
    label: "建議進一步準備",
    text: "出租前建議作進一步準備。可預約物業管理檢視，及早識別潛在問題。",
    steps: [
      "預約物業管理檢視",
      "優先處理合規及安全項目",
      "整理物業及租務文件",
    ],
  };
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-midnight/50">{label}</dt>
      <dd className="text-right text-midnight/80">{value || "—"}</dd>
    </div>
  );
}

export default function ReadinessSummaryZh({ owner, sections, checkedItems, totalItems }) {
  const done = checkedItems.size;
  const pct = totalItems ? Math.round((done / totalItems) * 100) : 0;
  const rec = getRecommendation(pct);

  const completedItems = [];
  const missingItems = [];
  sections.forEach((s) => {
    s.items.forEach((i) => {
      if (checkedItems.has(i.id)) completedItems.push(i.label);
      else missingItems.push(i.label);
    });
  });

  return (
    <div className="printable-summary bg-white rounded-xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-accent-navy px-6 py-6 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-golden mb-1">業主準備摘要</p>
        <p className="font-heading text-xl text-parchment">物業管理準備報告</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        <div className="text-center">
          <p className="font-heading text-5xl text-midnight leading-none">{pct}%</p>
          <p className="text-sm text-golden font-medium mt-2">{rec.label}</p>
          <div className="max-w-md mx-auto mt-3"><ProgressBar value={pct} className="h-2.5" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-parchment rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-2 flex items-center gap-1.5"><User size={12} /> 業主資料</p>
            <dl className="space-y-1">
              <DetailRow label="姓名" value={owner.ownerName} />
              <DetailRow label="電郵" value={owner.email} />
              <DetailRow label="電話" value={owner.phone} />
            </dl>
          </div>
          <div className="bg-parchment rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-2 flex items-center gap-1.5"><Home size={12} /> 物業資料</p>
            <dl className="space-y-1">
              <DetailRow label="地址" value={owner.address} />
              <DetailRow label="類型" value={owner.propertyType} />
              <DetailRow label="租客狀況" value={owner.tenanted} />
              <DetailRow label="可出租日期" value={owner.availableDate} />
            </dl>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-midnight mb-2">已完成項目 ({completedItems.length})</p>
            <ul className="space-y-1.5 text-sm text-midnight/70">
              {completedItems.length ? completedItems.map((i, idx) => (
                <li key={idx} className="flex gap-2"><Check size={14} className="text-golden mt-0.5 flex-shrink-0" /> {i}</li>
              )) : <li className="text-midnight/40">尚未完成任何項目</li>}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-midnight mb-2">未完成項目 ({missingItems.length})</p>
            <ul className="space-y-1.5 text-sm text-midnight/70">
              {missingItems.length ? missingItems.map((i, idx) => (
                <li key={idx} className="flex gap-2"><span className="w-3.5 h-3.5 rounded-sm border border-stone mt-0.5 flex-shrink-0" /> {i}</li>
              )) : <li className="text-midnight/40">全部完成</li>}
            </ul>
          </div>
        </div>

        <div className="border border-stone rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-golden mb-1.5">建議下一步</p>
          <p className="text-sm text-midnight/70 mb-3 leading-relaxed">{rec.text}</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-midnight/80">
            {rec.steps.map((s, idx) => <li key={idx}>{s}</li>)}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={() => {
              window.print();
              toast({ title: "可供下載", description: "您的列印或 PDF 摘要已在瀏覽器對話框中準備好。" });
            }}
            className="inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-midnight/5 transition"
          >
            <Printer size={15} /> 列印／儲存為 PDF
          </button>
          <Link
            to="/zh/book-consultation?service=property-management"
            onClick={() => base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "readiness_summary_review" } })}
            className="inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition"
          >
            <Calendar size={15} /> 預約物業管理檢視
          </Link>
        </div>
      </div>
    </div>
  );
}