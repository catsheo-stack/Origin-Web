import React, { useState } from "react";
import { Download, FileText, Printer, Table, Database, Upload, ClipboardList } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle
} from "@/components/ui/dialog";

const PRIMARY_OPTIONS = [
  { id: "summary", label: "Progress Summary", icon: FileText, description: "View a printable summary" },
  { id: "pdf", label: "Save as PDF", icon: Printer, description: "Print or save your checklist as PDF" },
  { id: "blank", label: "Blank Checklist", icon: ClipboardList, description: "Print a blank checklist" }
];

const ADVANCED_OPTIONS = [
  { id: "csv", label: "Checklist CSV", icon: Table, description: "Download tasks as spreadsheet" },
  { id: "backup", label: "Data Backup", icon: Database, description: "Download all data as JSON" },
  { id: "restore", label: "Restore Backup", icon: Upload, description: "Import a previous backup" }
];

export default function DownloadMenu({
  onSummary, onPdf, onCsv, onBackup, onRestore, onBlank,
  includeNotApplicable, onToggleNotApplicable
}) {
  const [open, setOpen] = useState(false);
  const [showAdvanced, setShowAdvanced] = useState(false);

  const handleSelect = (id) => {
    setOpen(false);
    setShowAdvanced(false);
    switch (id) {
      case "summary": onSummary(); break;
      case "pdf": onPdf(); break;
      case "csv": onCsv(); break;
      case "backup": onBackup(); break;
      case "restore": onRestore(); break;
      case "blank": onBlank(); break;
      default: break;
    }
  };

  return (
    <>
      <Button size="sm" onClick={() => setOpen(true)} className="min-h-[40px]">
        <Download className="w-4 h-4 mr-1.5" /> Download
      </Button>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="max-w-sm max-h-[85dvh] overflow-y-auto overscroll-contain">
          <DialogHeader>
            <DialogTitle>Download and Export</DialogTitle>
          </DialogHeader>
          <div className="space-y-1">
            {PRIMARY_OPTIONS.map(opt => {
              const Icon = opt.icon;
              return (
                <button
                  key={opt.id}
                  onClick={() => handleSelect(opt.id)}
                  className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-100 text-sm min-h-[44px] text-left transition-colors"
                >
                  <Icon className="w-4 h-4 flex-shrink-0 text-gray-500" />
                  <div className="min-w-0">
                    <p className="font-medium text-gray-900">{opt.label}</p>
                    <p className="text-xs text-gray-400">{opt.description}</p>
                  </div>
                </button>
              );
            })}
          </div>

          {showAdvanced && (
            <div className="space-y-1 mt-2 pt-2 border-t">
              <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400 px-3 pb-1">Advanced Tools</p>
              {ADVANCED_OPTIONS.map(opt => {
                const Icon = opt.icon;
                return (
                  <button
                    key={opt.id}
                    onClick={() => handleSelect(opt.id)}
                    className="flex items-center gap-3 w-full px-3 py-3 rounded-md hover:bg-gray-100 text-sm min-h-[44px] text-left transition-colors"
                  >
                    <Icon className="w-4 h-4 flex-shrink-0 text-gray-400" />
                    <div className="min-w-0">
                      <p className="font-medium text-gray-700">{opt.label}</p>
                      <p className="text-xs text-gray-400">{opt.description}</p>
                    </div>
                  </button>
                );
              })}
            </div>
          )}

          <button
            onClick={() => setShowAdvanced(!showAdvanced)}
            className="text-xs text-gray-400 hover:text-gray-600 mt-2 min-h-[36px] w-full text-center transition-colors"
          >
            {showAdvanced ? "Hide Advanced" : "Advanced"}
          </button>
          <label className="flex items-center gap-2 mt-3 pt-3 border-t cursor-pointer min-h-[44px]">
            <Checkbox
              checked={includeNotApplicable}
              onCheckedChange={(checked) => onToggleNotApplicable(checked === true)}
            />
            <span className="text-xs text-gray-600">Include Not Applicable tasks in exports</span>
          </label>
          <p className="text-[10px] text-amber-600 mt-2 leading-relaxed">
            Downloads are created on this device. Review files before sharing them because they may contain your notes, property details and professional contacts.
          </p>
        </DialogContent>
      </Dialog>
    </>
  );
}