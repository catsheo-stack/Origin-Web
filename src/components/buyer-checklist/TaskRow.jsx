import React, { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const STATUSES = ["Not Started", "In Progress", "Waiting", "已完成", "不適用"];
const STATUS_LABELS = { "Not Started": "尚未開始", "In Progress": "進行中", "Waiting": "等待中", "已完成": "已完成", "不適用": "不適用" };
const RISK_LEVELS = ["Low", "Medium", "High"];
const RISK_LABELS = { Low: "低", Medium: "中", High: "高" };

const statusColors = {
  "Not Started": "bg-gray-100 text-gray-700",
  "In Progress": "bg-blue-100 text-blue-700",
  "Waiting": "bg-amber-100 text-amber-700",
  "已完成": "bg-emerald-100 text-emerald-700",
  "不適用": "bg-gray-50 text-gray-400"
};

const riskColors = {
  "Low": "bg-green-50 text-green-700 border-green-200",
  "Medium": "bg-amber-50 text-amber-700 border-amber-200",
  "High": "bg-red-50 text-red-700 border-red-200"
};

export default function TaskRow({ task, state, onUpdate, properties, contacts }) {
  const [showMore, setShowMore] = useState(false);

  const isNA = state.status === "不適用";

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
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">狀態</label>
              <Select value={state.status} onValueChange={v => onUpdate(task.id, "status", v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {STATUSES.map(s => (
                    <SelectItem key={s} value={s}>
                      <span className={`inline-block px-1.5 py-0.5 rounded text-xs ${statusColors[s]}`}>{STATUS_LABELS[s]}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Responsible */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">負責人</label>
              <Input
                className="h-8 text-xs"
                value={state.responsible}
                onChange={e => onUpdate(task.id, "responsible", e.target.value)}
                placeholder="負責人"
              />
            </div>

            {/* Due Date */}
            <div>
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">到期日</label>
              <Input
                type="date"
                className="h-8 text-xs"
                value={state.dueDate}
                onChange={e => onUpdate(task.id, "dueDate", e.target.value)}
              />
            </div>

            {/* Risk */}
            <div className="hidden sm:block">
              <label className="text-[10px] uppercase tracking-wider text-gray-400 mb-1 block">風險</label>
              <Select value={state.riskLevel} onValueChange={v => onUpdate(task.id, "riskLevel", v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {RISK_LEVELS.map(r => (
                    <SelectItem key={r} value={r}>
                      <Badge variant="outline" className={`text-[10px] ${riskColors[r]}`}>{RISK_LABELS[r]}</Badge>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Mobile risk row */}
          <div className="flex items-center gap-2 sm:hidden">
            <label className="text-[10px] uppercase tracking-wider text-gray-400">風險</label>
            <Select value={state.riskLevel} onValueChange={v => onUpdate(task.id, "riskLevel", v)}>
              <SelectTrigger className="h-7 text-xs w-24">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {RISK_LEVELS.map(r => (
                  <SelectItem key={r} value={r}>
                    <Badge variant="outline" className={`text-[10px] ${riskColors[r]}`}>{RISK_LABELS[r]}</Badge>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Notes — desktop only (mobile shows in More section) */}
          <Textarea
            className="text-xs min-h-[32px] h-8 resize-none hidden sm:block"
            placeholder="備註..."
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
            {showMore ? "收起" : "更多選項"}
          </Button>
        </div>
      </div>

      {/* Expanded detail */}
      {showMore && (
        <div className="px-3 sm:px-4 pb-3 sm:pb-4 border-t bg-gray-50/50">
          <div className="grid gap-3 pt-3 text-xs text-gray-600">
            {task.what && (
              <div>
                <p className="font-semibold text-gray-800 mb-0.5">需要做甚麼</p>
                <p>{task.what}</p>
              </div>
            )}
            <div className="sm:hidden">
              <p className="font-semibold text-gray-800 mb-0.5">備註</p>
              <Textarea
                className="text-xs min-h-[32px] h-8 resize-none"
                placeholder="備註..."
                value={state.notes}
                onChange={e => onUpdate(task.id, "notes", e.target.value)}
                rows={2}
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-0.5">相關物業</p>
              <Select value={state.propertyId || "none"} onValueChange={v => onUpdate(task.id, "propertyId", v === "none" ? "" : v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">沒有物業</SelectItem>
                  {(properties || []).filter(p => p.status !== "已淘汰").map(p => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.address || p.suburb || "未命名物業"}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <p className="font-semibold text-gray-800 mb-0.5">聯絡人</p>
              <Select value={state.contactId || "none"} onValueChange={v => onUpdate(task.id, "contactId", v === "none" ? "" : v)}>
                <SelectTrigger className="h-8 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">沒有聯絡人</SelectItem>
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