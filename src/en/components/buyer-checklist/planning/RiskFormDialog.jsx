import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import {
  RISK_LEVELS, RISK_STATUSES, RISK_RESPONSIBLE_PARTIES,
  RISK_MAX_LENGTHS, validateRisk
} from "@/en/utils/buyerJourneyValidation";

function FormField({ label, children, error }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs">{label}</Label>
      {children}
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}

const DEFAULT_FORM = {
  title: "", riskLevel: "Medium", propertyId: "", relatedStageId: "",
  responsible: "Me", status: "Open", description: "", question: "", nextAction: "", dueDate: ""
};

export default function RiskFormDialog({ open, risk, properties, stages, onClose, onSave }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(risk ? {
        title: risk.title || "", riskLevel: risk.riskLevel || "Medium",
        propertyId: risk.propertyId || "", relatedStageId: risk.relatedStageId || "",
        responsible: risk.responsible || "Me", status: risk.status || "Open",
        description: risk.description || "", question: risk.question || "",
        nextAction: risk.nextAction || "", dueDate: risk.dueDate || ""
      } : { ...DEFAULT_FORM });
      setErrors({});
    }
  }, [open, risk]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const canSave = form.title.trim().length > 0 && form.riskLevel && form.status;

  const handleSave = () => {
    const { valid, errors } = validateRisk(form);
    if (!valid) { setErrors(errors); return; }
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-lg max-h-[85dvh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle>{risk ? "Edit Risk" : "Add Risk"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <FormField label="Risk Title" error={errors.title}>
              <Input className="h-9 text-sm" maxLength={RISK_MAX_LENGTHS.title} value={form.title} onChange={e => set("title", e.target.value)} placeholder="e.g. Possible special levy" />
            </FormField>
          </div>
          <FormField label="Risk Level" error={errors.riskLevel}>
            <Select value={form.riskLevel} onValueChange={v => set("riskLevel", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RISK_LEVELS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Status">
            <Select value={form.status} onValueChange={v => set("status", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RISK_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Responsible Party">
            <Select value={form.responsible} onValueChange={v => set("responsible", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RISK_RESPONSIBLE_PARTIES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="Due Date">
            <Input type="date" className="h-9 text-sm" value={form.dueDate} onChange={e => set("dueDate", e.target.value)} />
          </FormField>
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
          <FormField label="Related Stage">
            <Select value={form.relatedStageId || "none"} onValueChange={v => set("relatedStageId", v === "none" ? "" : v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">No Stage</SelectItem>
                {stages.map(s => <SelectItem key={s.id} value={s.id}>{s.number}. {s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="Short Description" error={errors.description}>
              <Textarea className="text-sm min-h-[60px]" maxLength={RISK_MAX_LENGTHS.description} value={form.description} onChange={e => set("description", e.target.value)} rows={2} placeholder="Briefly describe the concern." />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Question for Professional" error={errors.question}>
              <Textarea className="text-sm min-h-[60px]" maxLength={RISK_MAX_LENGTHS.question} value={form.question} onChange={e => set("question", e.target.value)} rows={2} placeholder="What do you need confirmed?" />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="Recommended Next Action" error={errors.nextAction}>
              <Textarea className="text-sm min-h-[50px]" maxLength={RISK_MAX_LENGTHS.nextAction} value={form.nextAction} onChange={e => set("nextAction", e.target.value)} rows={2} placeholder="e.g. Ask conveyancer to review the minutes" />
            </FormField>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose} className="min-h-[44px]">Cancel</Button>
          <Button onClick={handleSave} disabled={!canSave} className="min-h-[44px]">{risk ? "Save" : "Add Risk"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}