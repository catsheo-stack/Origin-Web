import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter
} from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { PROPERTY_STATUSES, MAX_LENGTHS, validateProperty } from "@/utils/buyerJourneyValidation";

const PROPERTY_TYPE_OPTIONS = [
  { value: "house", label: "獨立屋" },
  { value: "apartment", label: "公寓" },
  { value: "townhouse", label: "聯排別墅" },
  { value: "other", label: "其他" }
];

function FormField({ label, children, error }) {
  return (
    <div className="space-y-1">
      <Label className="text-xs text-gray-600">{label}</Label>
      {children}
      {error && <p className="text-[10px] text-red-500">{error}</p>}
    </div>
  );
}

function FormSection({ title, children }) {
  return (
    <div className="space-y-3">
      <h4 className="text-xs font-semibold uppercase tracking-wider text-gray-400">{title}</h4>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{children}</div>
    </div>
  );
}

export default function PropertyFormDialog({ open, property, onClose, onSave }) {
  const [form, setForm] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open) {
      setForm(property || {
        address: "", suburb: "", state: "", postcode: "",
        advertisedPrice: "", propertyType: "", bedrooms: "", bathrooms: "",
        carSpaces: "", landSize: "", inspectionDate: "", auctionDate: "",
        sellingAgentName: "", sellingAgentPhone: "", sellingAgentEmail: "",
        listingUrl: "", status: "已儲存", buyerRating: 0,
        keyAdvantages: "", keyConcerns: "", notes: ""
      });
      setErrors({});
    }
  }, [open, property]);

  const setField = (field, value) => {
    setForm(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    const { valid, errors: validationErrors } = validateProperty(form);
    if (!valid) {
      setErrors(validationErrors);
      return;
    }
    onSave(form);
    onClose();
  };

  return (
    <Dialog open={open} onOpenChange={(o) => !o && onClose()}>
      <DialogContent className="max-w-2xl max-h-[85dvh] overflow-y-auto overscroll-contain">
        <DialogHeader>
          <DialogTitle>{property ? "編輯物業" : "新增物業"}</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <FormSection title="Main Details">
            <FormField label={`Address (max ${MAX_LENGTHS.address})`} error={errors.address}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.address} value={form.address || ""} onChange={e => setField("address", e.target.value)} />
            </FormField>
            <FormField label={`Suburb (max ${MAX_LENGTHS.suburb})`} error={errors.suburb}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.suburb} value={form.suburb || ""} onChange={e => setField("suburb", e.target.value)} />
            </FormField>
            <FormField label={`State (max ${MAX_LENGTHS.state})`} error={errors.state}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.state} value={form.state || ""} onChange={e => setField("state", e.target.value)} />
            </FormField>
            <FormField label={`Postcode (max ${MAX_LENGTHS.postcode})`} error={errors.postcode}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.postcode} value={form.postcode || ""} onChange={e => setField("postcode", e.target.value)} />
            </FormField>
            <FormField label={`Advertised price (max ${MAX_LENGTHS.advertisedPrice})`} error={errors.advertisedPrice}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.advertisedPrice} value={form.advertisedPrice || ""} onChange={e => setField("advertisedPrice", e.target.value)} placeholder="例如：$550,000" />
            </FormField>
            <FormField label="物業類型">
              <Select value={form.propertyType || ""} onValueChange={v => setField("propertyType", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue placeholder="請選擇…" /></SelectTrigger>
                <SelectContent>
                  {PROPERTY_TYPE_OPTIONS.map(opt => <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="睡房">
              <Input className="h-9 text-sm" type="number" value={form.bedrooms || ""} onChange={e => setField("bedrooms", e.target.value)} />
            </FormField>
            <FormField label="浴室">
              <Input className="h-9 text-sm" type="number" value={form.bathrooms || ""} onChange={e => setField("bathrooms", e.target.value)} />
            </FormField>
            <FormField label="Car spaces">
              <Input className="h-9 text-sm" type="number" value={form.carSpaces || ""} onChange={e => setField("carSpaces", e.target.value)} />
            </FormField>
            <FormField label="土地面積">
              <Input className="h-9 text-sm" value={form.landSize || ""} onChange={e => setField("landSize", e.target.value)} placeholder="例如：500 平方米" />
            </FormField>
          </FormSection>

          <FormSection title="Campaign Details">
            <FormField label="Inspection date">
              <Input className="h-9 text-sm" type="date" value={form.inspectionDate || ""} onChange={e => setField("inspectionDate", e.target.value)} />
            </FormField>
            <FormField label="Auction date">
              <Input className="h-9 text-sm" type="date" value={form.auctionDate || ""} onChange={e => setField("auctionDate", e.target.value)} />
            </FormField>
            <FormField label={`Agent name (max ${MAX_LENGTHS.sellingAgentName})`}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.sellingAgentName} value={form.sellingAgentName || ""} onChange={e => setField("sellingAgentName", e.target.value)} />
            </FormField>
            <FormField label={`Agent phone (max ${MAX_LENGTHS.sellingAgentPhone})`}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.sellingAgentPhone} value={form.sellingAgentPhone || ""} onChange={e => setField("sellingAgentPhone", e.target.value)} />
            </FormField>
            <FormField label={`Agent email (max ${MAX_LENGTHS.sellingAgentEmail})`}>
              <Input className="h-9 text-sm" type="email" maxLength={MAX_LENGTHS.sellingAgentEmail} value={form.sellingAgentEmail || ""} onChange={e => setField("sellingAgentEmail", e.target.value)} />
            </FormField>
            <FormField label={`Listing URL (max ${MAX_LENGTHS.listingUrl})`} error={errors.listingUrl}>
              <Input className="h-9 text-sm" maxLength={MAX_LENGTHS.listingUrl} value={form.listingUrl || ""} onChange={e => setField("listingUrl", e.target.value)} placeholder="https://..." />
            </FormField>
          </FormSection>

          <FormSection title="Buyer Assessment">
            <FormField label="狀態">
              <Select value={form.status || "已儲存"} onValueChange={v => setField("status", v)}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {PROPERTY_STATUSES.map(s => <SelectItem key={s} value={s}>{s}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label="Buyer rating (1–5)" error={errors.buyerRating}>
              <Select value={String(form.buyerRating || 0)} onValueChange={v => setField("buyerRating", Number(v))}>
                <SelectTrigger className="h-9 text-sm"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {[0, 1, 2, 3, 4, 5].map(r => <SelectItem key={r} value={String(r)}>{r === 0 ? "Not rated" : `${r} star${r > 1 ? "s" : ""}`}</SelectItem>)}
                </SelectContent>
              </Select>
            </FormField>
            <FormField label={`Key advantages (max ${MAX_LENGTHS.keyAdvantages})`}>
              <Textarea className="text-sm min-h-[60px]" maxLength={MAX_LENGTHS.keyAdvantages} value={form.keyAdvantages || ""} onChange={e => setField("keyAdvantages", e.target.value)} />
            </FormField>
            <FormField label={`Key concerns (max ${MAX_LENGTHS.keyConcerns})`}>
              <Textarea className="text-sm min-h-[60px]" maxLength={MAX_LENGTHS.keyConcerns} value={form.keyConcerns || ""} onChange={e => setField("keyConcerns", e.target.value)} />
            </FormField>
            <FormField label={`Notes (max ${MAX_LENGTHS.notes})`}>
              <Textarea className="text-sm min-h-[60px] sm:col-span-2" maxLength={MAX_LENGTHS.notes} value={form.notes || ""} onChange={e => setField("notes", e.target.value)} />
            </FormField>
          </FormSection>
        </div>

        <DialogFooter className="border-t pt-4">
          <Button variant="outline" onClick={onClose}>取消</Button>
          <Button onClick={handleSave}>儲存物業</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}