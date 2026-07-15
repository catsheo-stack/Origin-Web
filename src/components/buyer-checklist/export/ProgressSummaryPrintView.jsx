import React, { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";

function Section({ title, children }) {
  return (
    <div className="mb-6 break-inside-avoid">
      <h2 className="text-base font-bold border-b border-gray-300 pb-1 mb-2">{title}</h2>
      {children}
    </div>
  );
}

export default function ProgressSummaryPrintView({ summary, autoPrint, onClose }) {
  useEffect(() => {
    if (autoPrint) {
      const timer = setTimeout(() => window.print(), 400);
      return () => clearTimeout(timer);
    }
  }, [autoPrint]);

  const hasProperties = summary.properties.length > 0;
  const hasDates = Object.values(summary.dateGroups).some(g => g.length > 0);
  const hasRisks = summary.risks.length > 0;
  const hasContacts = summary.contacts.length > 0;
  const hasTasks = Object.values(summary.taskGroups).some(g => g.length > 0);

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="no-print sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between z-10">
        <h2 className="text-sm font-medium text-gray-700">進度摘要預覽</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => window.print()} className="min-h-[40px]">
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button size="sm" variant="outline" onClick={onClose} className="min-h-[40px]">
            <X className="w-4 h-4 mr-1" /> Close
          </Button>
        </div>
      </div>

      <div className="print-view p-8 max-w-[800px] mx-auto text-black">
        <div className="text-center mb-6">
          <h1 className="text-xl font-bold">我的置業進度摘要</h1>
          <p className="text-xs text-gray-600 mt-1">產生時間： {summary.generatedAt}</p>
        </div>

        <Section title="摘要">
          <table className="w-full text-sm">
            <tbody>
              <tr><td className="py-0.5 pr-4 font-medium">物業類型：</td><td>{summary.propertyTypeLabel}</td></tr>
              <tr><td className="py-0.5 pr-4 font-medium">整體完成度：</td><td>{summary.overall.percentage}%</td></tr>
              <tr><td className="py-0.5 pr-4 font-medium">已完成項目：</td><td>{summary.overall.completed}／{summary.overall.total}</td></tr>
              <tr><td className="py-0.5 pr-4 font-medium">未完成：</td><td>{summary.overall.remaining}</td></tr>
              {summary.currentStage && (
                <tr><td className="py-0.5 pr-4 font-medium">目前階段：</td><td>{summary.currentStage.number}. {summary.currentStage.name}</td></tr>
              )}
              {summary.nextAction && (
                <tr><td className="py-0.5 pr-4 font-medium">下一步行動：</td><td>{summary.nextAction.title} ({summary.nextAction.responsible})</td></tr>
              )}
            </tbody>
          </table>
        </Section>

        <Section title="階段進度">
          <table className="w-full text-xs border-collapse">
            <thead>
              <tr className="border-b border-gray-400">
                <th className="text-left py-1 pr-2">#</th>
                <th className="text-left py-1 px-2">姓名</th>
                <th className="text-right py-1 px-2">%</th>
                <th className="text-right py-1 px-2">完成</th>
                <th className="text-right py-1 px-2">總數</th>
                <th className="text-left py-1 pl-2">狀態</th>
              </tr>
            </thead>
            <tbody>
              {summary.stages.map(s => (
                <tr key={s.number} className="border-b border-gray-200">
                  <td className="py-0.5 pr-2">{s.number}</td>
                  <td className="py-0.5 px-2">{s.name}</td>
                  <td className="text-right py-0.5 px-2">{s.percentage}%</td>
                  <td className="text-right py-0.5 px-2">{s.completed}</td>
                  <td className="text-right py-0.5 px-2">{s.total}</td>
                  <td className="py-0.5 pl-2">{s.status}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Section>

        {summary.preferences.length > 0 && (
          <Section title="買家偏好">
            <table className="w-full text-xs">
              <tbody>
                {summary.preferences.map((p, i) => (
                  <tr key={i}>
                    <td className="py-0.5 pr-4 font-medium align-top">{p.label}:</td>
                    <td className="py-0.5">{p.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {hasProperties && (
          <Section title="物業候選清單">
            {summary.properties.map((p, i) => (
              <div key={i} className="mb-3 text-xs break-inside-avoid">
                <p className="font-bold">{p.address}</p>
                <table className="w-full">
                  <tbody>
                    {p.advertisedPrice && <tr><td className="pr-2 text-gray-500">價格：</td><td>{p.advertisedPrice}</td></tr>}
                    {p.propertyType && <tr><td className="pr-2 text-gray-500">類型：</td><td>{p.propertyType}</td></tr>}
                    <tr>
                      <td className="pr-2 text-gray-500">睡房／浴室／車位：</td>
                      <td>{p.bedrooms || "–"} / {p.bathrooms || "–"} / {p.carSpaces || "–"}</td>
                    </tr>
                    {p.status && <tr><td className="pr-2 text-gray-500">狀態：</td><td>{p.status}{p.isPriority ? "（優先）" : ""}</td></tr>}
                    {p.buyerRating && <tr><td className="pr-2 text-gray-500">評分：</td><td>{p.buyerRating}/5</td></tr>}
                    {p.keyAdvantages && <tr><td className="pr-2 text-gray-500 align-top">優點：</td><td>{p.keyAdvantages}</td></tr>}
                    {p.keyConcerns && <tr><td className="pr-2 text-gray-500 align-top">疑慮：</td><td>{p.keyConcerns}</td></tr>}
                  </tbody>
                </table>
              </div>
            ))}
          </Section>
        )}

        {hasDates && (
          <Section title="重要日期">
            {Object.entries(summary.dateGroups).map(([group, items]) =>
              items.length > 0 ? (
                <div key={group} className="mb-2">
                  <p className="font-bold text-xs">{group}</p>
                  <table className="w-full text-xs">
                    <tbody>
                      {items.map((d, i) => (
                        <tr key={i}>
                          <td className="py-0.5 pr-2">{d.date}</td>
                          <td className="py-0.5 pr-2">{d.dateType}</td>
                          {d.propertyName && <td className="py-0.5 pr-2">{d.propertyName}</td>}
                          {d.note && <td className="py-0.5 text-gray-500">{d.note}</td>}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null
            )}
          </Section>
        )}

        {hasRisks && (
          <Section title="風險與問題">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="text-left py-1 pr-2">風險</th>
                  <th className="text-left py-1 px-2">等級</th>
                  <th className="text-left py-1 px-2">狀態</th>
                  <th className="text-left py-1 px-2">物業</th>
                  <th className="text-left py-1 px-2">負責人</th>
                  <th className="text-left py-1 pl-2">下一步行動</th>
                </tr>
              </thead>
              <tbody>
                {summary.risks.map((r, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-0.5 pr-2">{r.title}</td>
                    <td className="py-0.5 px-2">{r.riskLevel}</td>
                    <td className="py-0.5 px-2">{r.status}</td>
                    <td className="py-0.5 px-2">{r.propertyName}</td>
                    <td className="py-0.5 px-2">{r.responsible}</td>
                    <td className="py-0.5 pl-2">{r.nextAction || r.question || ""}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {hasContacts && (
          <Section title="專業聯絡人">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="text-left py-1 pr-2">姓名</th>
                  <th className="text-left py-1 px-2">職務</th>
                  <th className="text-left py-1 px-2">公司</th>
                  <th className="text-left py-1 px-2">電話</th>
                  <th className="text-left py-1 pl-2">電郵</th>
                </tr>
              </thead>
              <tbody>
                {summary.contacts.map((c, i) => (
                  <tr key={i} className="border-b border-gray-200">
                    <td className="py-0.5 pr-2">{c.name}</td>
                    <td className="py-0.5 px-2">{c.role}</td>
                    <td className="py-0.5 px-2">{c.company}</td>
                    <td className="py-0.5 px-2">{c.phone}</td>
                    <td className="py-0.5 pl-2">{c.email}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {hasTasks && (
          <Section title="清單任務">
            {Object.entries(summary.taskGroups).map(([group, items]) =>
              items.length > 0 ? (
                <div key={group} className="mb-3 break-inside-avoid">
                  <p className="font-bold text-xs underline">{group} ({items.length})</p>
                  <table className="w-full text-xs border-collapse">
                    <thead>
                      <tr className="border-b border-gray-300">
                        <th className="text-left py-0.5 pr-2">階段</th>
                        <th className="text-left py-0.5 px-2">任務</th>
                        <th className="text-left py-0.5 px-2">負責人</th>
                        <th className="text-left py-0.5 px-2">到期</th>
                        <th className="text-left py-0.5 pl-2">物業</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((t, i) => (
                        <tr key={i} className="border-b border-gray-100">
                          <td className="py-0.5 pr-2">{t.stage}</td>
                          <td className="py-0.5 px-2">{t.task}</td>
                          <td className="py-0.5 px-2">{t.responsible}</td>
                          <td className="py-0.5 px-2">{t.dueDate}</td>
                          <td className="py-0.5 pl-2">{t.linkedProperty}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              ) : null
            )}
          </Section>
        )}

        <div className="mt-8 pt-4 border-t border-gray-300">
          <p className="text-[10px] text-gray-500 leading-relaxed">
            This checklist and progress summary are general planning records based on information entered by the user. They do not constitute legal, financial, taxation, lending, valuation, engineering, building or other professional advice.
          </p>
          <p className="text-[10px] text-gray-500 leading-relaxed mt-1">
            Property details, risks and dates should be independently verified with the relevant qualified professionals.
          </p>
        </div>
      </div>
    </div>
  );
}