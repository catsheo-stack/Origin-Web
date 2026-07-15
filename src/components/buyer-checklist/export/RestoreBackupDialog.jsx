import React, { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, CheckCircle, AlertCircle } from "lucide-react";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { validateBackup, validateBackupFile } from "@/utils/backupValidation";

export default function RestoreBackupDialog({ open, onClose, onRestore }) {
  const [validatedData, setValidatedData] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const fileInputRef = useRef(null);

  const reset = () => {
    setValidatedData(null);
    setError("");
    setSuccess(false);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  const handleClose = () => {
    reset();
    onClose();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setError("");
    setValidatedData(null);

    const fileError = validateBackupFile(file);
    if (fileError) {
      setError(fileError);
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = validateBackup(event.target.result);
      if (result.valid) {
        setValidatedData(result.data);
      } else {
        setError(result.error);
      }
    };
    reader.onerror = () => {
      setError("Download could not be created.");
    };
    reader.readAsText(file);
  };

  const handleRestore = () => {
    if (!validatedData) return;
    onRestore(validatedData);
    setSuccess(true);
    setValidatedData(null);
    setTimeout(() => {
      setSuccess(false);
      handleClose();
    }, 1500);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && handleClose()}>
      <DialogContent className="max-w-md max-h-[85dvh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle>還原備份</DialogTitle>
        </DialogHeader>

        {success ? (
          <div className="flex items-center gap-2 py-4 text-emerald-600">
            <CheckCircle className="w-5 h-5" />
            <p className="text-sm font-medium">備份已成功還原。</p>
          </div>
        ) : (
          <div className="space-y-4">
            <div>
              <input
                ref={fileInputRef}
                type="file"
                accept="application/json,.json"
                onChange={handleFileChange}
                className="hidden"
              />
              <Button
                variant="outline"
                onClick={() => fileInputRef.current?.click()}
                className="w-full min-h-[44px]"
              >
                <Upload className="w-4 h-4 mr-2" />
                {validatedData ? "Change File" : "Select Backup File"}
              </Button>
              <p className="text-xs text-gray-400 mt-1">接受最大 2 MB 的 .json 檔案</p>
            </div>

            {error && (
              <div className="flex items-start gap-2 p-3 bg-red-50 rounded-md">
                <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-600">{error}</p>
              </div>
            )}

            {validatedData && (
              <div className="p-3 bg-amber-50 rounded-md">
                <p className="text-sm font-medium text-amber-800 mb-1">還原此備份？</p>
                <p className="text-xs text-amber-700">
                  Your current checklist, preferences, properties, dates, risks and contacts will be replaced.
                </p>
              </div>
            )}
          </div>
        )}

        {!success && (
          <DialogFooter className="border-t pt-4">
            <Button variant="outline" onClick={handleClose} className="min-h-[44px]">取消</Button>
            <Button
              onClick={handleRestore}
              disabled={!validatedData}
              className="min-h-[44px]"
            >
              Restore Backup
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  );
}