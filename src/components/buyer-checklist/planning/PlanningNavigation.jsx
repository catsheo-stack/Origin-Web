import React from "react";
import { ListChecks, Settings, Home, GitCompare, Calendar, ShieldAlert, Users } from "lucide-react";

const SECTIONS = [
  { id: "checklist", label: "清單", icon: ListChecks },
  { id: "preferences", label: "我的偏好", icon: Settings },
  { id: "properties", label: "我的物業", icon: Home },
  { id: "compare", label: "比較", icon: GitCompare },
  { id: "dates", label: "重要日期", icon: Calendar },
  { id: "risks", label: "風險", icon: ShieldAlert },
  { id: "contacts", label: "聯絡人", icon: Users }
];

export default function PlanningNavigation({ activeSection, onChange, comparisonCount = 0 }) {
  return (
    <div className="mb-4" role="tablist" aria-label="規劃功能分頁">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-1.5 bg-white rounded-lg border p-1.5">
        {SECTIONS.map(section => {
          const Icon = section.icon;
          const isActive = activeSection === section.id;
          return (
            <button
              key={section.id}
              role="tab"
              aria-selected={isActive}
              onClick={() => onChange(section.id)}
              className={`flex items-center gap-1.5 px-3 py-2 rounded-md text-xs font-medium transition-colors motion-reduce:transition-none justify-center min-h-[44px] w-full sm:w-auto
                ${isActive
                  ? "bg-gray-900 text-white"
                  : "text-gray-600 hover:bg-gray-100"
                } focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400`}
            >
              <Icon className="w-3.5 h-3.5" />
              <span>{section.label}{section.id === "compare" && comparisonCount > 0 ? ` (${comparisonCount})` : ""}</span>
            </button>
          );
        })}
      </div>
    </div>
  );
}