import React from "react";
import { X, Star, FileDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { calculatePropertyMatch } from "@/utils/propertyMatching";

const NOT_ENTERED = "尚未輸入";

const COMPARISON_FIELDS = [
  { key: "advertisedPrice", label: "叫價" },
  { key: "propertyType", label: "物業類型", format: v => v ? v.charAt(0).toUpperCase() + v.slice(1) : "" },
  { key: "bedrooms", label: "睡房" },
  { key: "bathrooms", label: "浴室" },
  { key: "carSpaces", label: "車位" },
  { key: "landSize", label: "土地面積" },
  { key: "inspectionDate", label: "看房日期" },
  { key: "auctionDate", label: "拍賣日期" },
  { key: "status", label: "目前狀態" },
  { key: "buyerRating", label: "買家評分", format: v => v ? `${v}/5` : "" },
  { key: "keyAdvantages", label: "主要優點" },
  { key: "keyConcerns", label: "主要疑慮" }
];

export default function PropertyComparison({ properties, preferences, onRemoveComparison, onDownloadComparison }) {
  if (!properties || properties.length === 0) {
    return (
      <div className="bg-white rounded-lg border p-8 text-center">
        <p className="text-sm text-gray-400">從候選物業中選擇最多三項進行比較。</p>
      </div>
    );
  }

  const canDownload = properties.length >= 2;

  return (
    <div className="space-y-3">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">比較物業</h2>
          <p className="text-sm text-gray-500">比較內容以您輸入的資料為準。</p>
          {properties.length === 1 && (
            <p className="text-xs text-amber-600 mt-1">請至少再選擇一項物業，才能製作比較 PDF。</p>
          )}
        </div>
        {canDownload && onDownloadComparison && (
          <Button variant="outline" size="sm" onClick={onDownloadComparison} className="min-h-[44px] flex-shrink-0 self-start sm:self-auto">
            <FileDown className="w-4 h-4 mr-1.5" />
            下載物業比較 PDF
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
        {properties.map(property => {
          const match = calculatePropertyMatch(property, preferences);
          return (
            <div key={property.id} className="bg-white rounded-lg border p-3 space-y-1.5 break-inside-avoid">
              {/* Header with address, suburb, match, and Remove button */}
              <div className="pb-2 mb-1 border-b">
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-gray-900 break-words">{property.address || "Unnamed property"}</p>
                    <p className="text-xs text-gray-500 break-words">
                      {property.suburb || NOT_ENTERED}
                    </p>
                    {match && (
                      <p className="text-[10px] text-blue-600 font-medium mt-1">
                        {match.matched}／{match.total} 項偏好符合 · {match.label}
                      </p>
                    )}
                  </div>
                  {onRemoveComparison && (
                    <button
                      onClick={() => onRemoveComparison(property.id)}
                      className="flex-shrink-0 text-gray-400 hover:text-red-500 transition-colors min-h-[44px] min-w-[44px] flex items-center justify-center"
                      aria-label="從比較清單移除"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>

              {/* Priority status */}
              <div className="flex justify-between gap-2 py-0.5 border-b border-gray-50">
                <span className="text-xs text-gray-400 flex-shrink-0">優先狀態</span>
                <span className="text-xs font-medium text-gray-700 text-right">
                  {property.isPriority ? (
                    <span className="inline-flex items-center gap-0.5">
                      <Star className="w-3 h-3 text-amber-500 fill-amber-500" />
                      Priority
                    </span>
                  ) : (
                    <span className="text-gray-300 italic">尚未輸入</span>
                  )}
                </span>
              </div>

              {COMPARISON_FIELDS.map(field => {
                const raw = property[field.key];
                const value = field.format ? field.format(raw) : (raw || "");
                const isMissing = !value || value === "";
                return (
                  <div key={field.key} className="flex justify-between gap-2 py-0.5 border-b border-gray-50 last:border-0">
                    <span className="text-xs text-gray-400 flex-shrink-0">{field.label}</span>
                    <span className={`text-xs text-right break-words ${isMissing ? "text-gray-300 italic" : "font-medium text-gray-700"}`}>
                      {isMissing ? NOT_ENTERED : value}
                    </span>
                  </div>
                );
              })}
            </div>
          );
        })}
      </div>
    </div>
  );
}