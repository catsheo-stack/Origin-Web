import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ImportantDateCard from "@/en/components/buyer-checklist/planning/ImportantDateCard";
import ImportantDateFormDialog from "@/en/components/buyer-checklist/planning/ImportantDateFormDialog";
import { getImportantDateStatus } from "@/en/utils/checklistProgress";

const GROUPS = ["Overdue", "Due Today", "Next 7 Days", "Later", "Completed", "Cancelled"];

const GROUP_LABELS = {
  "Overdue": "Overdue",
  "Due Today": "Today",
  "Next 7 Days": "Next 7 Days",
  "Later": "Later",
  "Completed": "Completed",
  "Cancelled": "Cancelled"
};

export default function ImportantDatesPanel({ importantDates, properties, today, onAdd, onEdit, onDelete, onComplete, onCancel }) {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingDate, setEditingDate] = useState(null);

  const propertyMap = useMemo(() => {
    const map = {};
    properties.forEach(p => { map[p.id] = p.address || p.suburb || "Unnamed property"; });
    return map;
  }, [properties]);

  const grouped = useMemo(() => {
    const groups = {};
    GROUPS.forEach(g => { groups[g] = []; });
    importantDates.forEach(d => {
      const status = getImportantDateStatus(d, today);
      if (groups[status]) groups[status].push(d);
    });
    return groups;
  }, [importantDates, today]);

  const handleAdd = () => { setEditingDate(null); setDialogOpen(true); };
  const handleEdit = (date) => { setEditingDate(date); setDialogOpen(true); };
  const handleSave = (formData) => {
    if (editingDate) { onEdit(editingDate.id, formData); }
    else { onAdd(formData); }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">My Important Dates</h2>
          <p className="text-sm text-gray-500">Track deadlines and key events throughout your purchase.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="min-h-[40px]">
          <Plus className="w-4 h-4 mr-1" /> Add Date
        </Button>
      </div>

      {importantDates.length === 0 ? (
        <div className="bg-white rounded-lg border p-8 text-center">
          <p className="text-sm text-gray-400">No important dates added.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {GROUPS.map(group => {
            const items = grouped[group];
            if (!items || items.length === 0) return null;
            return (
              <div key={group}>
                <h3 className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-2">{GROUP_LABELS[group]}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {items.map(d => (
                    <ImportantDateCard
                      key={d.id}
                      dateRecord={d}
                      today={today}
                      propertyName={propertyMap[d.propertyId]}
                      onEdit={handleEdit}
                      onComplete={onComplete}
                      onCancel={onCancel}
                      onDelete={onDelete}
                    />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}

      <ImportantDateFormDialog
        open={dialogOpen}
        dateRecord={editingDate}
        properties={properties}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}