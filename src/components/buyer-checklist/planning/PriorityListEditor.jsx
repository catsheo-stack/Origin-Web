import React, { useState } from "react";
import { Plus, X, Pencil, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { PRIORITY_LIST_LABELS } from "@/utils/buyerJourneyValidation";

const MAX_ITEMS = 20;
const MAX_CHARS = 100;

export default function PriorityListEditor({ listKey, items, onChange }) {
  const [input, setInput] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editValue, setEditValue] = useState("");

  const handleAdd = () => {
    const trimmed = input.trim();
    if (!trimmed || items.length >= MAX_ITEMS) return;
    onChange([...items, trimmed.slice(0, MAX_CHARS)]);
    setInput("");
  };

  const handleRemove = (index) => {
    onChange(items.filter((_, i) => i !== index));
  };

  const startEdit = (index) => {
    setEditingIndex(index);
    setEditValue(items[index]);
  };

  const saveEdit = () => {
    const trimmed = editValue.trim().slice(0, MAX_CHARS);
    if (trimmed) {
      onChange(items.map((item, i) => i === editingIndex ? trimmed : item));
    }
    setEditingIndex(null);
    setEditValue("");
  };

  const label = PRIORITY_LIST_LABELS[listKey] || listKey;

  return (
    <div>
      <div className="flex items-center justify-between mb-1.5">
        <p className="text-xs font-medium text-gray-700">{label}</p>
        <span className="text-[10px] text-gray-400">{items.length}/{MAX_ITEMS}</span>
      </div>

      <div className="flex gap-1.5 mb-2">
        <Input
          className="h-8 text-xs"
          placeholder={`Add ${label.toLowerCase()}...`}
          value={input}
          maxLength={MAX_CHARS}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => { if (e.key === "Enter") { e.preventDefault(); handleAdd(); } }}
        />
        <Button
          type="button"
          size="sm"
          variant="outline"
          className="h-8 px-2 flex-shrink-0"
          onClick={handleAdd}
          disabled={!input.trim() || items.length >= MAX_ITEMS}
        >
          <Plus className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="flex flex-wrap gap-1.5">
        {items.map((item, index) => (
          <div
            key={index}
            className="flex items-center gap-1 bg-gray-100 rounded-full pl-2.5 pr-1 py-0.5 text-xs text-gray-700"
          >
            {editingIndex === index ? (
              <>
                <Input
                  className="h-6 text-xs w-32 px-1"
                  value={editValue}
                  maxLength={MAX_CHARS}
                  onChange={e => setEditValue(e.target.value)}
                  onKeyDown={e => { if (e.key === "Enter") saveEdit(); if (e.key === "Escape") setEditingIndex(null); }}
                  autoFocus
                />
                <button onClick={saveEdit} className="p-0.5 hover:text-emerald-600" aria-label="儲存編輯">
                  <Check className="w-3 h-3" />
                </button>
                <button onClick={() => setEditingIndex(null)} className="p-0.5 hover:text-gray-500" aria-label="取消編輯">
                  <X className="w-3 h-3" />
                </button>
              </>
            ) : (
              <>
                <span>{item}</span>
                <button onClick={() => startEdit(index)} className="p-0.5 hover:text-blue-600" aria-label={`Edit ${item}`}>
                  <Pencil className="w-2.5 h-2.5" />
                </button>
                <button onClick={() => handleRemove(index)} className="p-0.5 hover:text-red-500" aria-label={`Remove ${item}`}>
                  <X className="w-3 h-3" />
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}