import React, { useState } from "react";
import { Pencil, Check, Trash2, ChevronDown, ChevronUp, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";

const RISK_COLORS = {
  "Low": "bg-green-50 text-green-700 border-green-200",
  "Medium": "bg-amber-50 text-amber-700 border-amber-200",
  "High": "bg-red-50 text-red-700 border-red-200",
  "Deal Breaker": "bg-red-100 text-red-800 border-red-300"
};

const STATUS_COLORS = {
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

export default function RiskCard({ risk, propertyName, stageName, onEdit, onResolve, onReopen, onDelete }) {
  const [showDetails, setShowDetails] = useState(false);
  const isResolved = risk.status === "Resolved";
  const hasDetails = risk.description || risk.question || risk.nextAction;

  return (
    <div className={`rounded-lg border p-3 ${isResolved ? "bg-emerald-50/30" : "bg-white"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium text-gray-900 break-words">{risk.title}</p>
          <div className="flex items-center gap-2 mt-1 flex-wrap">
            <Badge variant="outline" className={`text-[10px] ${RISK_COLORS[risk.riskLevel] || ""}`}>{risk.riskLevel}</Badge>
            <Badge variant="outline" className={`text-[10px] ${STATUS_COLORS[risk.status] || ""}`}>{risk.status}</Badge>
          </div>
          <div className="flex items-center gap-1.5 mt-1 flex-wrap text-[10px] text-gray-400">
            {risk.responsible && <span>{risk.responsible}</span>}
            {propertyName && <span>· {propertyName}</span>}
            {stageName && <span>· {stageName}</span>}
            {risk.dueDate && <span>· Due {formatDate(risk.dueDate)}</span>}
          </div>
        </div>
      </div>

      {hasDetails && (
        <button
          className="mt-2 text-xs text-gray-500 hover:text-gray-700 flex items-center gap-1 min-h-[36px]"
          onClick={() => setShowDetails(!showDetails)}
          aria-expanded={showDetails}
        >
          {showDetails ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
          {showDetails ? "Hide Details" : "View Details"}
        </button>
      )}

      {showDetails && (
        <div className="mt-2 space-y-2 text-xs text-gray-600 border-t pt-2">
          {risk.description && <p><span className="font-semibold text-gray-800">說明：</span> {risk.description}</p>}
          {risk.question && <p><span className="font-semibold text-gray-800">問題：</span> {risk.question}</p>}
          {risk.nextAction && <p><span className="font-semibold text-gray-800">下一步：</span> {risk.nextAction}</p>}
        </div>
      )}

      <div className="flex items-center gap-1 mt-2">
        <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-gray-500" onClick={() => onEdit(risk)} aria-label="編輯風險">
          <Pencil className="w-3.5 h-3.5" /><span className="ml-0.5 hidden sm:inline">編輯</span>
        </Button>
        {!isResolved && (
          <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-emerald-600 hover:bg-emerald-50" onClick={() => onResolve(risk.id)} aria-label="標記風險已解決">
            <Check className="w-3.5 h-3.5" /><span className="ml-0.5 hidden sm:inline">標記已解決</span>
          </Button>
        )}
        {isResolved && (
          <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-blue-600 hover:bg-blue-50" onClick={() => onReopen(risk.id)} aria-label="重新開啟風險">
            <RotateCcw className="w-3.5 h-3.5" /><span className="ml-0.5 hidden sm:inline">重新開啟</span>
          </Button>
        )}
        <AlertDialog>
          <AlertDialogTrigger asChild>
            <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-red-600 hover:bg-red-50" aria-label="刪除風險">
              <Trash2 className="w-3.5 h-3.5" />
            </Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>刪除此風險？</AlertDialogTitle>
              <AlertDialogDescription>此操作會從本瀏覽器刪除該風險紀錄，且無法復原。</AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>取消</AlertDialogCancel>
              <AlertDialogAction onClick={() => onDelete(risk.id)} className="bg-red-600 hover:bg-red-700">刪除</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </div>
  );
}