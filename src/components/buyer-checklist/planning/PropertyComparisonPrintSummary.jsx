import React, { useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Printer, X } from "lucide-react";
import { calculatePropertyMatch } from "@/utils/propertyMatching";
import { printPropertyComparison } from "@/utils/comparisonPrint";

const PROPERTY_TYPE_LABELS = {
  house: "獨立屋",
  apartment: "公寓",
  townhouse: "聯排別墅",
  other: "Other"
};

const OPEN_RISK_STATUSES = ["Open", "Waiting", "Under Review"];

const RELEVANT_DATE_TYPES = [
  "看房", "拍賣", "Offer Expiry", "Cooling-Off Expiry",
  "Finance Deadline", "Building and Pest Deadline", "Deposit Due",
  "Settlement", "Final Inspection", "Key Collection"
];

const DISCLAIMER =
  "This property comparison summary is based on information entered by the user and is provided as a general planning tool. " +
  "It does not constitute legal, financial, taxation, lending, valuation, building or property advice. " +
  "Property details should be independently verified and professional advice obtained before making a purchase decision.";

const PROPERTY_DETAIL_FIELDS = [
  { key: "advertisedPrice", label: "叫價" },
  { key: "propertyType", label: "物業類型", format: v => (v ? PROPERTY_TYPE_LABELS[v] || v : "") },
  { key: "bedrooms", label: "睡房" },
  { key: "bathrooms", label: "浴室" },
  { key: "carSpaces", label: "車位" },
  { key: "landSize", label: "土地面積" },
  { key: "inspectionDate", label: "看房日期" },
  { key: "auctionDate", label: "拍賣日期" },
  { key: "status", label: "目前狀態" },
  { key: "buyerRating", label: "買家評分", format: v => (v ? `${v}/5` : "") },
  { key: "keyAdvantages", label: "主要優點" },
  { key: "keyConcerns", label: "主要疑慮" }
];

function formatGeneratedDate() {
  return new Date().toLocaleDateString("en-AU", { day: "numeric", month: "long", year: "numeric" });
}

function buildPreferenceEntries(preferences) {
  const entries = [];

  if (preferences.purchasePurpose) {
    entries.push({ label: "置業目的", value: preferences.purchasePurpose });
  }
  if (preferences.targetSuburbs) {
    entries.push({ label: "目標地區", value: preferences.targetSuburbs });
  }
  if (preferences.minBudget || preferences.maxBudget) {
    const range = [preferences.minBudget, preferences.maxBudget].filter(Boolean).join(" – ");
    entries.push({ label: "預算範圍", value: range });
  }
  if (preferences.minBedrooms) {
    entries.push({ label: "最少睡房", value: preferences.minBedrooms });
  }
  if (preferences.minBathrooms) {
    entries.push({ label: "最少浴室", value: preferences.minBathrooms });
  }
  if (preferences.minCarSpaces) {
    entries.push({ label: "最少車位", value: preferences.minCarSpaces });
  }
  if (preferences.preferredLandSize) {
    entries.push({ label: "偏好土地面積", value: preferences.preferredLandSize });
  }

  const pl = preferences.priorityLists || {};
  const priorityEntries = [
    { key: "mustHave", label: "必要條件" },
    { key: "niceToHave", label: "加分條件" },
    { key: "nonNegotiable", label: "不可妥協條件" },
    { key: "dealBreaker", label: "不可接受風險" }
  ];
  priorityEntries.forEach(({ key, label }) => {
    const items = pl[key];
    if (Array.isArray(items) && items.length > 0) {
      entries.push({ label, value: items.join(", ") });
    }
  });

  return entries;
}

function Section({ title, children }) {
  return (
    <div className="mb-6 break-inside-avoid">
      <h2 className="text-sm font-bold border-b border-gray-400 pb-1 mb-2">{title}</h2>
      {children}
    </div>
  );
}

function DetailRow({ label, value }) {
  if (!value || value === "") return null;
  return (
    <div className="flex justify-between gap-2 py-0.5 border-b border-gray-100 last:border-0">
      <span className="text-xs text-gray-500 flex-shrink-0">{label}</span>
      <span className="text-xs font-medium text-gray-800 text-right break-words whitespace-pre-wrap">{value}</span>
    </div>
  );
}

export default function PropertyComparisonPrintSummary({
  properties,
  preferences,
  risks,
  importantDates,
  propertyType,
  onClose
}) {
  useEffect(() => {
    const timer = setTimeout(() => printPropertyComparison(), 400);
    return () => clearTimeout(timer);
  }, []);

  const generatedDate = useMemo(() => formatGeneratedDate(), []);
  const preferenceEntries = useMemo(() => buildPreferenceEntries(preferences || {}), [preferences]);
  const propertyTypeLabel = PROPERTY_TYPE_LABELS[propertyType] || propertyType || "Not specified";

  const propertyRisks = useMemo(() => {
    const selectedIds = new Set(properties.map(p => p.id));
    return (risks || [])
      .filter(r => selectedIds.has(r.propertyId) && OPEN_RISK_STATUSES.includes(r.status))
      .map(r => {
        const prop = properties.find(p => p.id === r.propertyId);
        return { ...r, propertyName: prop?.address || prop?.suburb || "Unnamed property" };
      });
  }, [risks, properties]);

  const propertyDates = useMemo(() => {
    const selectedIds = new Set(properties.map(p => p.id));
    return (importantDates || [])
      .filter(d => selectedIds.has(d.propertyId) && d.status !== "Cancelled" && RELEVANT_DATE_TYPES.includes(d.dateType))
      .map(d => {
        const prop = properties.find(p => p.id === d.propertyId);
        return { ...d, propertyName: prop?.address || prop?.suburb || "Unnamed property" };
      })
      .sort((a, b) => {
        if (!a.date) return 1;
        if (!b.date) return -1;
        return a.date.localeCompare(b.date);
      });
  }, [importantDates, properties]);

  const propertiesWithNotes = useMemo(() => properties.filter(p => p.notes), [properties]);
  const gridCols = properties.length === 3 ? "print:grid-cols-3" : "print:grid-cols-2";

  return (
    <div className="fixed inset-0 z-[100] bg-white overflow-y-auto">
      <div className="no-print sticky top-0 bg-white border-b border-gray-200 px-4 py-2 flex items-center justify-between z-10">
        <h2 className="text-sm font-medium text-gray-700">物業比較摘要預覽</h2>
        <div className="flex gap-2">
          <Button size="sm" variant="outline" onClick={() => printPropertyComparison()} className="min-h-[40px]">
            <Printer className="w-4 h-4 mr-1" /> Print
          </Button>
          <Button size="sm" variant="outline" onClick={onClose} className="min-h-[40px]">
            <X className="w-4 h-4 mr-1" /> Close
          </Button>
        </div>
      </div>

      <div className="print-view p-8 max-w-[800px] mx-auto text-black">
        {/* Header */}
        <div className="text-center mb-6 break-inside-avoid">
          <h1 className="text-xl font-bold">物業比較摘要</h1>
          <p className="text-xs text-gray-600 mt-1">根據您儲存的候選物業產生。</p>
          <p className="text-xs text-gray-500 mt-0.5">Generated: {generatedDate}</p>
        </div>

        {/* Report Details */}
        <Section title="Report Details">
          <table className="w-full text-xs">
            <tbody>
              <tr><td className="py-0.5 pr-4 font-medium">產生日期：</td><td>{generatedDate}</td></tr>
              <tr><td className="py-0.5 pr-4 font-medium">比較物業數目：</td><td>{properties.length}</td></tr>
              <tr><td className="py-0.5 pr-4 font-medium">物業類型：</td><td>{propertyTypeLabel}</td></tr>
            </tbody>
          </table>
        </Section>

        {/* Buyer Preferences Summary */}
        {preferenceEntries.length > 0 && (
          <Section title="Buyer Preferences Summary">
            <table className="w-full text-xs">
              <tbody>
                {preferenceEntries.map((entry, i) => (
                  <tr key={i}>
                    <td className="py-0.5 pr-4 font-medium align-top">{entry.label}:</td>
                    <td className="py-0.5 break-words">{entry.value}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {/* Property Comparison */}
        <Section title="物業比較">
          <div className={`grid grid-cols-1 ${gridCols} gap-3`}>
            {properties.map(property => {
              const match = calculatePropertyMatch(property, preferences);
              const statePostcode = [property.state, property.postcode].filter(Boolean).join(" ");
              return (
                <div key={property.id} className="border border-gray-300 rounded p-2 break-inside-avoid">
                  <div className="pb-2 mb-1.5 border-b border-gray-300">
                    <p className="text-xs font-bold break-words">{property.address || "Unnamed property"}</p>
                    {property.suburb && <p className="text-[10px] text-gray-600 break-words">{property.suburb}</p>}
                    {statePostcode && <p className="text-[10px] text-gray-600 break-words">{statePostcode}</p>}
                    {match && (
                      <p className="text-[10px] font-medium text-gray-700 mt-0.5">
                        {match.matched} of {match.total} preferences matched · {match.label}
                      </p>
                    )}
                  </div>
                  <DetailRow label="優先狀態" value={property.isPriority ? "優先" : "Not priority"} />
                  {PROPERTY_DETAIL_FIELDS.map(field => {
                    const raw = property[field.key];
                    const value = field.format ? field.format(raw) : raw || "";
                    return <DetailRow key={field.key} label={field.label} value={value} />;
                  })}
                </div>
              );
            })}
          </div>
        </Section>

        {/* 相關未解決風險 */}
        {propertyRisks.length > 0 && (
          <Section title="相關未解決風險">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="text-left py-1 pr-2">風險</th>
                  <th className="text-left py-1 px-2">等級</th>
                  <th className="text-left py-1 px-2">狀態</th>
                  <th className="text-left py-1 px-2">負責人</th>
                  <th className="text-left py-1 px-2">到期</th>
                  <th className="text-left py-1 pl-2">問題</th>
                </tr>
              </thead>
              <tbody>
                {propertyRisks.map((r, i) => (
                  <tr key={i} className="border-b border-gray-200 break-inside-avoid">
                    <td className="py-0.5 pr-2 align-top break-words">{r.title}</td>
                    <td className="py-0.5 px-2 align-top">{r.riskLevel}</td>
                    <td className="py-0.5 px-2 align-top">{r.status}</td>
                    <td className="py-0.5 px-2 align-top">{r.responsible}</td>
                    <td className="py-0.5 px-2 align-top">{r.dueDate || "—"}</td>
                    <td className="py-0.5 pl-2 align-top break-words">{r.question || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {/* Important Dates */}
        {propertyDates.length > 0 && (
          <Section title="重要日期">
            <table className="w-full text-xs border-collapse">
              <thead>
                <tr className="border-b border-gray-400">
                  <th className="text-left py-1 pr-2">日期</th>
                  <th className="text-left py-1 px-2">類型</th>
                  <th className="text-left py-1 px-2">物業</th>
                  <th className="text-left py-1 pl-2">備註</th>
                </tr>
              </thead>
              <tbody>
                {propertyDates.map((d, i) => (
                  <tr key={i} className="border-b border-gray-200 break-inside-avoid">
                    <td className="py-0.5 pr-2 align-top">{d.date}</td>
                    <td className="py-0.5 px-2 align-top">{d.dateType}</td>
                    <td className="py-0.5 px-2 align-top break-words">{d.propertyName}</td>
                    <td className="py-0.5 pl-2 align-top break-words">{d.note || "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Section>
        )}

        {/* 買家備註 */}
        {propertiesWithNotes.length > 0 && (
          <Section title="買家備註">
            {propertiesWithNotes.map(property => (
              <div key={property.id} className="mb-3 break-inside-avoid">
                <p className="text-xs font-bold break-words">{property.address || "Unnamed property"}</p>
                <p className="text-xs text-gray-700 whitespace-pre-wrap break-words mt-0.5">{property.notes}</p>
              </div>
            ))}
          </Section>
        )}

        {/* Disclaimer */}
        <div className="mt-8 pt-4 border-t border-gray-400 break-inside-avoid">
          <p className="text-[10px] text-gray-500 leading-relaxed">{DISCLAIMER}</p>
        </div>
      </div>
    </div>
  );
}