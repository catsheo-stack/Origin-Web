import React, { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import PropertyCard from "@/en/components/buyer-checklist/planning/PropertyCard";
import PropertyFormDialog from "@/en/components/buyer-checklist/planning/PropertyFormDialog";
import { calculatePropertyMatch } from "@/en/utils/propertyMatching";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "active", label: "Active" },
  { id: "rejected", label: "Rejected" },
  { id: "purchased", label: "Purchased" }
];

export default function PropertyShortlistPanel({ properties, preferences, selectedPropertyIds, onAdd, onEdit, onDelete, onTogglePriority, onToggleComparison, onToggleReject }) {
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingProperty, setEditingProperty] = useState(null);
  const [comparisonWarning, setComparisonWarning] = useState(false);

  const handleToggleComparison = (id) => {
    const isSelected = selectedPropertyIds.includes(id);
    if (!isSelected && selectedPropertyIds.length >= 3) {
      setComparisonWarning(true);
      setTimeout(() => setComparisonWarning(false), 3000);
      return;
    }
    onToggleComparison(id);
  };

  const filtered = properties.filter(p => {
    if (filter === "all") return true;
    if (filter === "active") return p.status !== "Rejected" && p.status !== "Purchased";
    if (filter === "rejected") return p.status === "Rejected";
    if (filter === "purchased") return p.status === "Purchased";
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (a.isPriority && !b.isPriority) return -1;
    if (!a.isPriority && b.isPriority) return 1;
    return 0;
  });

  const handleAdd = () => {
    setEditingProperty(null);
    setDialogOpen(true);
  };

  const handleEdit = (property) => {
    setEditingProperty(property);
    setDialogOpen(true);
  };

  const handleSave = (formData) => {
    if (editingProperty) {
      onEdit(editingProperty.id, formData);
    } else {
      onAdd(formData);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">My Property Shortlist</h2>
          <p className="text-sm text-gray-500">Click "+ Compare" on up to 3 properties, then open the Compare tab to view them side by side.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="min-h-[40px]">
          <Plus className="w-4 h-4 mr-1" />
          Add Property
        </Button>
      </div>

      {/* Comparison limit warning */}
      {comparisonWarning && (
        <div className="bg-amber-50 border border-amber-200 rounded-lg p-3 text-sm text-amber-700">
          You can compare up to three properties.
        </div>
      )}

      {/* Filters */}
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

      {/* Properties */}
      {sorted.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-sm text-gray-400">No properties saved yet.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {sorted.map(property => (
            <PropertyCard
              key={property.id}
              property={property}
              isSelected={selectedPropertyIds.includes(property.id)}
              onEdit={handleEdit}
              onDelete={onDelete}
              onTogglePriority={onTogglePriority}
              onToggleComparison={handleToggleComparison}
              onToggleReject={onToggleReject}
              matchResult={calculatePropertyMatch(property, preferences)}
            />
          ))}
        </div>
      )}

      <PropertyFormDialog
        open={dialogOpen}
        property={editingProperty}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}