import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUSES = ["Not Started", "In Progress", "Waiting", "Completed", "Not Applicable"];
const RISK_LEVELS = ["Low", "Medium", "High"];

const statusColors = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Waiting": "bg-amber-100 text-amber-700",
  "Completed": "bg-emerald-100 text-emerald-700",
  "Not Applicable": "bg-gray-50 text-gray-400"
};

const riskColors = {
  "Low": "bg-green-50 text-green-700 border-green-200",
  "Medium": "bg-amber-50 text-amber-700 border-amber-200",
  "High": "bg-red-50 text-red-700 border-red-200"
};

export default function TaskRow({ task, state, onUpdate, properties, contacts }) {
  const [showMore, setShowMore] = useState(false);

  const isNA = state.status === "Not Applicable";

  return (
    <div className={`border rounded-lg transition-colors ${isNA ? "opacity-50 bg-gray-50/50" : "bg-white"}`}>
      {/* Main row */}
      <div className="p-3 sm:p-4">
        <div className="flex flex-col gap-3">
          {/* Title */}
          <p className={`text-sm font-medium leading-snug ${isNA ? "line-through text-gray-400" : "text-gray-900"}`}>
            {task.title}
          </p>

          {/* Controls grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
            {/* Status */}
            <div className="col-span-2 sm:col-span-1">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">Status</label>
              <Select value={state.status} onValueChange={v => onUpdate(task.id, "status", v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => (
                    <SelectItem key={s} value={s}>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${statusColors[s]}`}>{s}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Responsible */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">Responsible</label>
              <Input
                className="h-8 text-xs"
                value={state.responsible}
                onChange={e => onUpdate(task.id, "responsible", e.target.value)}
                placeholder="Who?"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">Due Date</label>
              <Input
                type="date"
                className="h-8 text-xs"
                value={state.dueDate}
                onChange={e => onUpdate(task.id, "dueDate", e.target.value)}
              />
            </div>

            {/* Risk */}
            <div className="hidden sm:block">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">Risk</label>
              <Select value={state.riskLevel} onValueChange={v => onUpdate(task.id, "riskLevel", v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RISK_LEVELS.map(r => (
                    <SelectItem key={r} value={r}>
                      <Badge variant="outline" className={`text-[10px] ${riskColors[r]}`}>{r}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile risk row */}
          <div className="flex items-center gap-2 sm:hidden">
            <label className="text-[10px] uppercase tracking-wider text-gray-400">Risk</label>
            <Select value={state.riskLevel} onValueChange={v => onUpdate(task.id, "riskLevel", v)}>
              <SelectTrigger className="h-7 text-xs w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RISK_LEVELS.map(r => (
                  <SelectItem key={r} value={r}>
                    <Badge variant="outline" className={`text-[10px] ${riskColors[r]}`}>{r}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes — desktop only (mobile shows in More section) */}
          <Textarea
            className="text-xs min-h-[32px] h-8 resize-none hidden sm:block"
            placeholder="Notes..."
            value={state.notes}
            onChange={e => onUpdate(task.id, "notes", e.target.value)}
            rows={1}
          />

          {/* Toggle more info */}
          <Button
            variant="ghost"
            size="sm"
            className="self-start h-7 text-xs text-gray-500 hover:text-gray-700 px-2"
            onClick={() => setShowMore(!showMore)}
          >
            {showMore ? <ChevronUp className="w-3 h-3 mr-1" /> : <ChevronDown className="w-3 h-3 mr-1" />}
            {showMore ? "Less" : "More"}
          </Button>
        </div>
      </div>

      {/* Expanded detail */}
      {showMore && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t bg-gray-50/50">
          <div className="grid gap-3 pt-3 text-xs text-gray-600">
            {task.what && (
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">What to do</p>
                <p>{task.what}</p>
              </div>
            )}
            <div className="sm:hidden">
              <p className="font-semibold text-gray-800 mb-0.5">Notes</p>
              <Textarea
                className="text-xs min-h-[32px] h-8 resize-none"
                placeholder="Notes..."
                value={state.notes}
                onChange={e => onUpdate(task.id, "notes", e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-0.5">Linked Property</p>
              <Select value={state.propertyId || "none"} onValueChange={v => onUpdate(task.id, "propertyId", v === "none" ? "" : v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Property</SelectItem>
                  {(properties || []).filter(p => p.status !== "Rejected").map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.address || p.suburb || "Unnamed property"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-0.5">Contact</p>
              <Select value={state.contactId || "none"} onValueChange={v => onUpdate(task.id, "contactId", v === "none" ? "" : v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Contact</SelectItem>
                  {(contacts || []).map(c => (
                    <SelectItem key={c.id} value={c.id}>
                      {c.name}{c.role ? ` (${c.role})` : ""}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}