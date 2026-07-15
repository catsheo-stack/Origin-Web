import React, { useState, useMemo } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import ContactCard from "@/en/components/buyer-checklist/planning/ContactCard";
import ContactFormDialog from "@/en/components/buyer-checklist/planning/ContactFormDialog";

const FILTERS = [
  { id: "all", label: "All" },
  { id: "legal", label: "Legal" },
  { id: "finance", label: "Finance" },
  { id: "property", label: "Property" },
  { id: "inspection", label: "Inspection" },
  { id: "other", label: "Other" }
];

const CATEGORY_MAP = {
  legal: ["Conveyancer", "Solicitor"],
  finance: ["Mortgage Broker", "Lender", "Accountant"],
  property: ["Selling Agent", "Property Manager", "Owners Corporation Manager", "Building Manager"],
  inspection: ["Building Inspector", "Pest Inspector"],
  other: ["Other"]
};

export default function ContactsPanel({ contacts, properties, onAdd, onEdit, onDelete }) {
  const [filter, setFilter] = useState("all");
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState(null);

  const propertyMap = useMemo(() => {
    const map = {};
    properties.forEach(p => { map[p.id] = p.address || p.suburb || "Unnamed property"; });
    return map;
  }, [properties]);

  const filtered = useMemo(() => {
    if (filter === "all") return contacts;
    const roles = CATEGORY_MAP[filter] || [];
    return contacts.filter(c => roles.includes(c.role));
  }, [contacts, filter]);

  const handleAdd = () => { setEditingContact(null); setDialogOpen(true); };
  const handleEdit = (contact) => { setEditingContact(contact); setDialogOpen(true); };
  const handleSave = (formData) => {
    if (editingContact) { onEdit(editingContact.id, formData); }
    else { onAdd(formData); }
    setDialogOpen(false);
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between flex-wrap gap-2">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">My Professional Contacts</h2>
          <p className="text-sm text-gray-500">Keep basic contact details for the people supporting your purchase.</p>
          <p className="text-xs text-amber-600 mt-1">Only enter basic business contact details.</p>
        </div>
        <Button size="sm" onClick={handleAdd} className="min-h-[40px]">
          <Plus className="w-4 h-4 mr-1" /> Add Contact
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
          <p className="text-sm text-gray-400">{contacts.length === 0 ? "No professional contacts added." : "No contacts in this category."}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {filtered.map(contact => (
            <ContactCard
              key={contact.id}
              contact={contact}
              propertyName={propertyMap[contact.propertyId]}
              onEdit={handleEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      )}

      <ContactFormDialog
        open={dialogOpen}
        contact={editingContact}
        properties={properties}
        onClose={() => setDialogOpen(false)}
        onSave={handleSave}
      />
    </div>
  );
}