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
} from "@/utils/buyerJourneyValidation";

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
          <DialogTitle>{risk ? "編輯風險" : "新增風險"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="sm:col-span-2">
            <FormField label="風險標題" error={errors.title}>
              <Input className="h-9 text-sm" maxLength={RISK_MAX_LENGTHS.title} value={form.title} onChange={e => set("title", e.target.value)} placeholder="例如：可能出現特別徵費" />
            </FormField>
          </div>
          <FormField label="風險等級" error={errors.riskLevel}>
            <Select value={form.riskLevel} onValueChange={v => set("riskLevel", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RISK_LEVELS.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="狀態">
            <Select value={form.status} onValueChange={v => set("status", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RISK_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="負責人">
            <Select value={form.responsible} onValueChange={v => set("responsible", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {RISK_RESPONSIBLE_PARTIES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="到期日">
            <Input type="date" className="h-9 text-sm" value={form.dueDate} onChange={e => set("dueDate", e.target.value)} />
          </FormField>
          <FormField label="相關物業">
            <Select value={form.propertyId || "none"} onValueChange={v => set("propertyId", v === "none" ? "" : v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">沒有物業</SelectItem>
                {properties.filter(p => p.status !== "已淘汰").map(p => (
                  <SelectItem key={p.id} value={p.id}>{p.address || p.suburb || "Unnamed property"}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="相關階段">
            <Select value={form.relatedStageId || "none"} onValueChange={v => set("relatedStageId", v === "none" ? "" : v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                <SelectItem value="none">暫無階段</SelectItem>
                {stages.map(s => <SelectItem key={s.id} value={s.id}>{s.number}. {s.name}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="簡短說明" error={errors.description}>
              <Textarea className="text-sm min-h-[60px]" maxLength={RISK_MAX_LENGTHS.description} value={form.description} onChange={e => set("description", e.target.value)} rows={2} placeholder="簡要說明此疑慮。" />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="向專業人士提出的問題" error={errors.question}>
              <Textarea className="text-sm min-h-[60px]" maxLength={RISK_MAX_LENGTHS.question} value={form.question} onChange={e => set("question", e.target.value)} rows={2} placeholder="需要確認甚麼？" />
            </FormField>
          </div>
          <div className="sm:col-span-2">
            <FormField label="建議下一步" error={errors.nextAction}>
              <Textarea className="text-sm min-h-[50px]" maxLength={RISK_MAX_LENGTHS.nextAction} value={form.nextAction} onChange={e => set("nextAction", e.target.value)} rows={2} placeholder="例如：請過戶師審閱會議紀錄" />
            </FormField>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose} className="min-h-[44px]">取消</Button>
          <Button onClick={handleSave} disabled={!canSave} className="min-h-[44px]">{risk ? "Save" : "新增風險"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}