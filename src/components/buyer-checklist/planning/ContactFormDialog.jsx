import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter
} from "@/components/ui/dialog";
import { CONTACT_ROLES, CONTACT_MAX_LENGTHS, validateContact } from "@/utils/buyerJourneyValidation";

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
  name: "", role: "Other", company: "", phone: "", email: "", propertyId: "", notes: ""
};

export default function ContactFormDialog({ open, contact, properties, onClose, onSave }) {
  const [form, setForm] = useState(DEFAULT_FORM);
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(contact ? {
        name: contact.name || "", role: contact.role || "Other",
        company: contact.company || "", phone: contact.phone || "",
        email: contact.email || "", propertyId: contact.propertyId || "",
        notes: contact.notes || ""
      } : { ...DEFAULT_FORM });
      setErrors({});
    }
  }, [open, contact]);

  const set = (field, value) => setForm(prev => ({ ...prev, [field]: value }));

  const handleSave = () => {
    const { valid, errors } = validateContact(form);
    if (!valid) { setErrors(errors); return; }
    onSave(form);
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-md max-h-[85dvh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle>{contact ? "編輯聯絡人" : "新增聯絡人"}</DialogTitle>
        </DialogHeader>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <FormField label="姓名" error={errors.name}>
            <Input className="h-9 text-sm" maxLength={CONTACT_MAX_LENGTHS.name} value={form.name} onChange={e => set("name", e.target.value)} />
          </FormField>
          <FormField label="職務" error={errors.role}>
            <Select value={form.role} onValueChange={v => set("role", v)}>
              <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {CONTACT_ROLES.map(r => <SelectItem key={r} value={r}>{r}</SelectItem>)}
              </SelectContent>
            </Select>
          </FormField>
          <FormField label="公司" error={errors.company}>
            <Input className="h-9 text-sm" maxLength={CONTACT_MAX_LENGTHS.company} value={form.company} onChange={e => set("company", e.target.value)} />
          </FormField>
          <FormField label="電話" error={errors.phone}>
            <Input className="h-9 text-sm" maxLength={CONTACT_MAX_LENGTHS.phone} value={form.phone} onChange={e => set("phone", e.target.value)} />
          </FormField>
          <div className="sm:col-span-2">
            <FormField label="電郵" error={errors.email}>
              <Input type="email" className="h-9 text-sm" maxLength={CONTACT_MAX_LENGTHS.email} value={form.email} onChange={e => set("email", e.target.value)} />
            </FormField>
          </div>
          <div className="sm:col-span-2">
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
          </div>
          <div className="sm:col-span-2">
            <FormField label="備註" error={errors.notes}>
              <Textarea className="text-sm min-h-[60px]" maxLength={CONTACT_MAX_LENGTHS.notes} value={form.notes} onChange={e => set("notes", e.target.value)} rows={2} />
            </FormField>
          </div>
        </div>
        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>{contact ? "Save" : "Add"}</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}