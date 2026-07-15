import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { DATE_TYPES, DATE_STATUSES, validateImportantDate } from "@/en/utils/buyerJourneyValidation";

function FormField({ label, children, error }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}

export default function ImportantDateFormDialog({ open, dateRecord, properties, onClose, onSave }) {
  const [form, setForm] = useState({
    dateType: "Inspection", date: "", time: "", propertyId: "", status: "Upcoming", note: ""
  });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(dateRecord ? {
        dateType: dateRecord.dateType || "Inspection",
        date: dateRecord.date || "",
        time: dateRecord.time || "",
        propertyId: dateRecord.propertyId || "",
        status: dateRecord.status || "Upcoming",
        note: dateRecord.note || ""
      } : {
        dateType: "Inspection", date: "", time: "", propertyId: "", status: "Upcoming", note: ""
      });
      setErrors({});
    }
  }, [open, dateRecord]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const { valid, errors } = validateImportantDate(form);
    if (!valid) { setErrors(errors); return; }
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md max-h-[85dvh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle>{dateRecord ? "Edit Date" : "Add Date"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="Date Type" error={errors.dateType}>
            <Select value={form.dateType} onValueChange={v => set("dateType", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {DATE_TYPES.map(t => <SelectItem key={t} value={t}>{t}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Date" error={errors.date}>
            <Input type="date" className="h-9 text-sm" value={form.date} onChange={e => set("date", e.target.value)} />
          </FormField>
          <FormField label="Time (optional)">
            <Input type="time" className="h-9 text-sm" value={form.time} onChange={e => set("time", e.target.value)} />
          </FormField>
          <FormField label="Status">
            <Select value={form.status} onValueChange={v => set("status", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {DATE_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Linked Property">
              <Select value={form.propertyId || "none"} onValueChange={v => set("propertyId", v === "none" ? "" : v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Property</SelectItem>
                  {properties.filter(p => p.status !== "Rejected").map(p => (
                    <SelectItem key={p.id} value={p.id}>{p.address || p.suburb || "Unnamed property"}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Note">
              <Textarea className="text-sm min-h-[60px]" value={form.note} onChange={e => set("note", e.target.value)} rows={2} />
            </FormField>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleSave}>{dateRecord ? "Save" : "Add"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}