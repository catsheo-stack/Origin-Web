import React from "react";
import { Badge } from "@/components/ui/badge";
import { getImportantDateStatus } from "@/en/utils/checklistProgress";

const statusColors = {
  "Not Started": "bg-gray-100 text-gray-600",
  "In Progress": "bg-blue-100 text-blue-700",
  "Waiting": "bg-amber-100 text-amber-700",
  "Completed": "bg-emerald-100 text-emerald-700",
  "Not Applicable": "bg-gray-50 text-gray-400"
};

const riskColors = {
  "Low": "bg-green-50 text-green-700",
  "Medium": "bg-amber-50 text-amber-700",
  "High": "bg-red-50 text-red-700",
  "Deal Breaker": "bg-red-100 text-red-800"
};

const riskStatusColors = {
  "Open": "bg-blue-100 text-blue-700",
  "Waiting": "bg-amber-100 text-amber-700",
  "Under Review": "bg-purple-100 text-purple-700",
  "Resolved": "bg-emerald-100 text-emerald-700",
  "Accepted": "bg-gray-100 text-gray-600"
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString();
}

function TaskItem({ item }) {
  return (
    <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50 border border-gray-100">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 leading-snug">{item.task.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${statusColors[item.state.status] || ""}`}>
            {item.state.status}
          </Badge>
          {item.state.responsible && <span className="text-[10px] text-gray-500">{item.state.responsible}</span>}
          {item.state.dueDate && <span className="text-[10px] text-gray-400">Due {formatDate(item.state.dueDate)}</span>}
          {item.state.riskLevel === "High" && <span className="text-[10px] text-red-500 font-medium">High risk</span>}
        </div>
      </div>
      <span className="text-[10px] text-gray-300 flex-shrink-0">Stage {item.stageNumber}</span>
    </div>
  );
}

function DateItem({ item }) {
  const d = item.date;
  const status = getImportantDateStatus(d, null);
  return (
    <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50 border border-gray-100">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 leading-snug">{formatDate(d.date)}{d.time ? ` ${d.time}` : ""}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant="outline" className="text-[9px] px-1.5 py-0">{d.dateType}</Badge>
          <span className="text-[10px] text-gray-500">{status}</span>
          {d.note && <span className="text-[10px] text-gray-400 truncate max-w-[120px]">{d.note}</span>}
        </div>
      </div>
    </div>
  );
}

function RiskItem({ item }) {
  return (
    <div className="flex items-start gap-2 p-2 rounded-md bg-gray-50 border border-gray-100">
      <div className="flex-1 min-w-0">
        <p className="text-xs font-medium text-gray-800 leading-snug">{item.title}</p>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${riskColors[item.riskLevel] || ""}`}>{item.riskLevel}</Badge>
          <Badge variant="outline" className={`text-[9px] px-1.5 py-0 ${riskStatusColors[item.status] || ""}`}>{item.status}</Badge>
          {item.responsible && <span className="text-[10px] text-gray-500">{item.responsible}</span>}
          {item.dueDate && <span className="text-[10px] text-gray-400">Due {formatDate(item.dueDate)}</span>}
        </div>
      </div>
    </div>
  );
}

export default function DashboardTaskPanel({ data }) {
  const { tasks = [], dates = [], risks = [] } = data || {};
  const hasAny = tasks.length > 0 || dates.length > 0 || risks.length > 0;

  if (!hasAny) {
    return <div className="p-3 text-xs text-gray-400 italic">No items in this category.</div>;
  }

  return (
    <div className="p-2 sm:p-3 space-y-3 max-h-64 overflow-y-auto">
      {tasks.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Checklist Tasks</p>
          <div className="space-y-1.5">
            {tasks.map((item, idx) => <TaskItem key={idx} item={item} />)}
          </div>
        </div>
      )}
      {dates.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Important Dates</p>
          <div className="space-y-1.5">
            {dates.map((item, idx) => <DateItem key={idx} item={item} />)}
          </div>
        </div>
      )}
      {risks.length > 0 && (
        <div>
          <p className="text-[10px] font-semibold uppercase tracking-wider text-gray-400 mb-1.5">Recorded Risks</p>
          <div className="space-y-1.5">
            {risks.map((item, idx) => <RiskItem key={idx} item={item} />)}
          </div>
        </div>
      )}
    </div>
  );
}