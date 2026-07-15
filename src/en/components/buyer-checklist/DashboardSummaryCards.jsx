import React, { useState } from "react";
import { CalendarClock, AlertTriangle, Clock, ShieldAlert, Users, ChevronDown, ChevronUp } from "lucide-react";
import DashboardTaskPanel from "@/en/components/buyer-checklist/DashboardTaskPanel";

export default function DashboardSummaryCards({ counts }) {
  const [expanded, setExpanded] = useState(null);

  const cards = [
    { key: "dueSoon", label: "Due Soon", icon: CalendarClock, color: "text-blue-500", bg: "bg-blue-50 border-blue-100", data: counts.dueSoon },
    { key: "overdue", label: "Overdue", icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50 border-red-100", data: counts.overdue },
    { key: "waiting", label: "Waiting", icon: Clock, color: "text-amber-500", bg: "bg-amber-50 border-amber-100", data: counts.waiting },
    { key: "highRisk", label: "High Risk", icon: ShieldAlert, color: "text-red-500", bg: "bg-red-50 border-red-100", data: counts.highRisk },
    { key: "professionalReview", label: "Pro Review", icon: Users, color: "text-indigo-500", bg: "bg-indigo-50 border-indigo-100", data: counts.professionalReview }
  ];

  const toggle = (key) => setExpanded(prev => prev === key ? null : key);

  return (
    <div className="mb-6">
      <h2 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2.5">Needs Attention</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
        {cards.map(card => {
          const Icon = card.icon;
          const isExpanded = expanded === card.key;
          const hasTasks = card.data.count > 0;
          return (
            <div key={card.key} className={`rounded-lg border ${hasTasks ? card.bg : "bg-gray-50 border-gray-100"} ${isExpanded ? "ring-1 ring-gray-300" : ""}`}>
              <button
                type="button"
                onClick={() => hasTasks && toggle(card.key)}
                disabled={!hasTasks}
                className="w-full flex items-center gap-2 p-2.5 text-left disabled:cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-lg motion-reduce:transition-none"
                aria-expanded={isExpanded}
                aria-label={`${card.label}: ${card.data.count} ${card.data.count === 1 ? "task" : "tasks"}${hasTasks ? ", click to expand" : ""}`}
              >
                <Icon className={`w-4 h-4 flex-shrink-0 ${hasTasks ? card.color : "text-gray-300"}`} />
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] uppercase tracking-wider text-gray-500 truncate">{card.label}</p>
                  <p className={`text-lg font-bold tabular-nums ${hasTasks ? "text-gray-900" : "text-gray-300"}`}>
                    {card.data.count}
                  </p>
                  {card.key === "highRisk" && card.data.hasDealBreaker && (
                    <span className="text-[9px] text-red-600 font-medium">
                      {card.data.dealBreakerCount} Deal Breaker{card.data.dealBreakerCount > 1 ? "s" : ""}
                    </span>
                  )}
                </div>
                {hasTasks && (
                  isExpanded
                    ? <ChevronUp className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                    : <ChevronDown className="w-3.5 h-3.5 text-gray-400 flex-shrink-0" />
                )}
              </button>
            </div>
          );
        })}
      </div>

      {/* Expanded panel */}
      {expanded && (
        <div className="mt-2 bg-white rounded-lg border shadow-sm">
          {cards.filter(c => c.key === expanded).map(card => (
            <DashboardTaskPanel key={card.key} data={card.data} />
          ))}
        </div>
      )}
    </div>
  );
}