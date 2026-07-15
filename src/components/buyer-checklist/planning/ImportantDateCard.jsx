import React from "react";
import { Pencil, Check, Trash2, Ban } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent,
  AlertDialogDescription, AlertDialogFooter, AlertDialogHeader,
  AlertDialogTitle, AlertDialogTrigger
} from "@/components/ui/alert-dialog";
import { getImportantDateStatus } from "@/utils/checklistProgress";

const STATUS_COLORS = {
  "Overdue": "bg-red-100 text-red-700 border-red-200",
  "Due Today": "bg-amber-100 text-amber-700 border-amber-200",
  "Next 7 Days": "bg-blue-100 text-blue-700 border-blue-200",
  "Later": "bg-gray-100 text-gray-600 border-gray-200",
  "已完成": "bg-emerald-100 text-emerald-700 border-emerald-200",
  "Cancelled": "bg-gray-100 text-gray-400 border-gray-200"
};

function formatDate(dateStr) {
  if (!dateStr) return "";
  const parts = String(dateStr).split("-").map(Number);
  if (parts.length !== 3 || parts.some(isNaN)) return dateStr;
  return new Date(parts[0], parts[1] - 1, parts[2]).toLocaleDateString(undefined, {
    day: "numeric", month: "short", year: "numeric"
  });
}

export default function ImportantDateCard({ dateRecord, today, propertyName, onEdit, onComplete, onCancel, onDelete }) {
  const status = getImportantDateStatus(dateRecord, today);
  const isCompleted = dateRecord.status === "已完成";
  const isCancelled = dateRecord.status === "Cancelled";
  const isActive = !isCompleted && !isCancelled;

  return (
    <div className={`rounded-lg border p-3 ${isCompleted ? "bg-emerald-50/40" : isCancelled ? "bg-gray-50/50 opacity-60" : "bg-white"}`}>
      <div className="flex items-start justify-between gap-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <span className="text-sm font-medium text-gray-900">{formatDate(dateRecord.date)}</span>
            {dateRecord.time && <span className="text-xs text-gray-500">{dateRecord.time}</span>}
            <Badge variant="outline" className={`text-[10px] ${STATUS_COLORS[status] || ""}`}>{status}</Badge>
          </div>
          <p className="text-xs text-gray-600 mt-0.5">{dateRecord.dateType}</p>
          {propertyName && <p className="text-[10px] text-gray-400 mt-0.5">{propertyName}</p>}
          {dateRecord.note && <p className="text-xs text-gray-500 mt-1 break-words">{dateRecord.note}</p>}
        </div>
        <div className="flex items-center gap-1 flex-shrink-0">
          {isActive && (
            <>
              <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2" onClick={() => onComplete(dateRecord.id)} aria-label="標記完成">
                <Check className="w-3.5 h-3.5" />
                <span className="ml-0.5 hidden sm:inline">完成</span>
              </Button>
              <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-gray-500" onClick={() => onCancel(dateRecord.id)} aria-label="取消日期">
                <Ban className="w-3.5 h-3.5" />
                <span className="ml-0.5 hidden sm:inline">取消</span>
              </Button>
            </>
          )}
          <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-gray-500" onClick={() => onEdit(dateRecord)} aria-label="編輯日期">
            <Pencil className="w-3.5 h-3.5" />
            <span className="ml-0.5 hidden sm:inline">編輯</span>
          </Button>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 min-h-[36px] text-xs px-2 text-red-600 hover:bg-red-50" aria-label="刪除日期">
                <Trash2 className="w-3.5 h-3.5" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>刪除此日期？</AlertDialogTitle>
                <AlertDialogDescription>
                  This will permanently remove "{dateRecord.dateType}" on {formatDate(dateRecord.date)}.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>取消</AlertDialogCancel>
                <AlertDialogAction onClick={() => onDelete(dateRecord.id)} className="bg-red-600 hover:bg-red-700">刪除</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </div>
      </div>
    </div>
  );
}