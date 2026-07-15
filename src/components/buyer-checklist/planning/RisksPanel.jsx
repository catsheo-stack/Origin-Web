import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import RiskCard from "@/components/buyer-checklist/planning/RiskCard";
import RiskFormDialog from "@/components/buyer-checklist/planning/RiskFormDialog";

const FILTERS = [
  { id: "all", label: "全部" },
  { id: "open", label: "未處理" },
  { id: "waiting", label: "等待中" },
  { id: "under_review", label: "審閱中" },
  { id: "resolved", label: "已解決" },
  { id: "dealbreaker", label: "不可接受風險" }
];

export default function RisksPanel({ risks, properties, checklistData, onAdd, onEdit, onDelete, onResolve, onReopen }) {
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingRisk, setEditingRisk] = useState(null);

  const propertyMap = useMemo(() => {
    const map = {};
    properties.forEach(p => { map[p.id] = p.address || p.suburb || "Unnamed property"; });
    return map;
  }, [properties]);

  const stageMap = useMemo(() => {
    const map = {};
    checklistData.forEach(s => { map[s.id] = `Stage ${s.number}: ${s.name}`; });
    return map;
  }, [checklistData]);

  const filtered = useMemo(() => {
    if (filter === "all") return risks;
    if (filter === "open") return risks.filter(r => r.status === "Open");
    if (filter === "waiting") return risks.filter(r => r.status === "Waiting");
    if (filter === "under_review") return risks.filter(r => r.status === "Under Review");
    if (filter === "resolved") return risks.filter(r => r.status === "Resolved" || r.status === "Accepted");
    if (filter === "dealbreaker") return risks.filter(r => r.riskLevel === "Deal Breaker");
    return risks;
  }, [risks, filter]);

  const handleAdd = () => { setEditingRisk(null); setDialogOpen(true); };
  const handleEdit = (risk) => { setEditingRisk(risk); setDialogOpen(true); };
  const handleSave = (formData) => {
    if (editingRisk) { onEdit(editingRisk.id, formData); }
    else { onAdd(formData); }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">我的風險與問題</h2>
          <p className="text-sm text-gray-500">記錄疑慮與問題，以便向合適的專業人士查詢。</p>
          <p className="text-xs text-amber-600 mt-1">記錄問題並轉交合適的專業人士處理。</p>
          <p className="text-xs text-amber-600">此記錄只協助整理您的問題，並不構成專業意見。</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="min-h-[40px]">
          <Plus className="w-4 h-4 mr-1" /> Add Risk
        </Button>
      </div>

      <div className="flex gap-1.5 flex-wrap">
        {FILTERS.map(f => (
          <button
            key={f.id}
            onClick={() => setFilter(f.id)}
            className={`px-3 py-1.5 rounded-md text-xs font-medium transition-colors min-h-[36px]
              ${filter === f.id ? "bg-gray-900 text-white" : "bg-white border text-gray-600 hover:bg-gray-50"}`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-sm text-gray-400">{risks.length === 0 ? "No risks recorded." : "No risks in this category."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filtered.map(risk => (
            <RiskCard
              key={risk.id}
              risk={risk}
              propertyName={propertyMap[risk.propertyId]}
              stageName={stageMap[risk.relatedStageId]}
              onEdit={handleEdit}
              onResolve={onResolve}
              onReopen={onReopen}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <RiskFormDialog
        open={dialogOpen}
        risk={editingRisk}
        properties={properties}
        stages={checklistData}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}