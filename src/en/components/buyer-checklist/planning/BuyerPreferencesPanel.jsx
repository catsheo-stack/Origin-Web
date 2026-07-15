import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyTypeSelector from "@/en/components/buyer-checklist/PropertyTypeSelector";
import PriorityListEditor from "@/en/components/buyer-checklist/planning/PriorityListEditor";
import { PRIORITY_LIST_KEYS } from "@/en/utils/buyerJourneyValidation";

const SELECT_OPTIONS = ["Important", "Preferred", "Not Important"];

function FieldRow({ label, children }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-1 sm:gap-2 sm:items-center">
      <Label className="text-xs text-gray-600">{label}</Label>
      <div className="sm:col-span-2">{children}</div>
    </div>
  );
}

function TextInput({ value, onChange, placeholder }) {
  return (
    <Input
      className="h-9 text-sm"
      value={value || ""}
      placeholder={placeholder || ""}
      onChange={e => onChange(e.target.value)}
    />
  );
}

function SelectInput({ value, onChange, placeholder }) {
  return (
    <Select value={value || ""} onValueChange={onChange}>
      <SelectTrigger className="h-9 text-sm">
        <SelectValue placeholder={placeholder || "Select..."} />
      </SelectTrigger>
      <SelectContent>
        {SELECT_OPTIONS.map(opt => (
          <SelectItem key={opt} value={opt}>{opt}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}

function SectionCard({ title, children }) {
  return (
    <div className="bg-white rounded-lg border p-4 space-y-3">
      <h3 className="text-sm font-semibold text-gray-800">{title}</h3>
      {children}
    </div>
  );
}

export default function BuyerPreferencesPanel({ preferences, onUpdate, propertyType, onUpdatePropertyType }) {
  const set = (field, value) => onUpdate({ [field]: value });
  const setPriorityList = (key, items) => {
    onUpdate({ priorityLists: { ...preferences.priorityLists, [key]: items } });
  };

  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-lg font-semibold text-gray-900">My Buying Preferences</h2>
        <p className="text-sm text-gray-500">Record the features that matter most to your property search.</p>
      </div>

      <SectionCard title="Purchase Purpose">
        <FieldRow label="Buying purpose">
          <Select value={preferences.purchasePurpose || ""} onValueChange={v => set("purchasePurpose", v)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Owner Occupier">Owner Occupier</SelectItem>
              <SelectItem value="Investment">Investment</SelectItem>
              <SelectItem value="Not Sure">Not Sure</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
      </SectionCard>

      <SectionCard title="Location">
        <FieldRow label="Target suburbs">
          <TextInput value={preferences.targetSuburbs} onChange={v => set("targetSuburbs", v)} placeholder="e.g. Brunswick, Coburg" />
        </FieldRow>
        <FieldRow label="Search radius">
          <TextInput value={preferences.searchRadius} onChange={v => set("searchRadius", v)} placeholder="e.g. 10km" />
        </FieldRow>
        <FieldRow label="Preferred locations">
          <TextInput value={preferences.preferredLocations} onChange={v => set("preferredLocations", v)} placeholder="e.g. Near park, quiet street" />
        </FieldRow>
        <FieldRow label="School-zone requirement">
          <SelectInput value={preferences.schoolZoneRequirement} onChange={v => set("schoolZoneRequirement", v)} />
        </FieldRow>
        <FieldRow label="Public transport">
          <SelectInput value={preferences.publicTransportRequirement} onChange={v => set("publicTransportRequirement", v)} />
        </FieldRow>
        <FieldRow label="Commute requirement">
          <TextInput value={preferences.commuteRequirement} onChange={v => set("commuteRequirement", v)} placeholder="e.g. Under 30min to CBD" />
        </FieldRow>
      </SectionCard>

      <SectionCard title="Property Requirements">
        <FieldRow label="Property type">
          <PropertyTypeSelector value={propertyType} onChange={onUpdatePropertyType} />
        </FieldRow>
        <FieldRow label="Minimum bedrooms">
          <TextInput value={preferences.minBedrooms} onChange={v => set("minBedrooms", v)} placeholder="e.g. 3" />
        </FieldRow>
        <FieldRow label="Minimum bathrooms">
          <TextInput value={preferences.minBathrooms} onChange={v => set("minBathrooms", v)} placeholder="e.g. 2" />
        </FieldRow>
        <FieldRow label="Minimum car spaces">
          <TextInput value={preferences.minCarSpaces} onChange={v => set("minCarSpaces", v)} placeholder="e.g. 1" />
        </FieldRow>
        <FieldRow label="Preferred land size">
          <TextInput value={preferences.preferredLandSize} onChange={v => set("preferredLandSize", v)} placeholder="e.g. 500sqm" />
        </FieldRow>
        <FieldRow label="Single-level preference">
          <SelectInput value={preferences.singleLevelPreference} onChange={v => set("singleLevelPreference", v)} />
        </FieldRow>
        <FieldRow label="Outdoor-space preference">
          <SelectInput value={preferences.outdoorSpacePreference} onChange={v => set("outdoorSpacePreference", v)} />
        </FieldRow>
        <FieldRow label="Renovation tolerance">
          <SelectInput value={preferences.renovationTolerance} onChange={v => set("renovationTolerance", v)} />
        </FieldRow>
      </SectionCard>

      <SectionCard title="Budget and Timing">
        <FieldRow label="Minimum budget">
          <TextInput value={preferences.minBudget} onChange={v => set("minBudget", v)} placeholder="e.g. $400,000" />
        </FieldRow>
        <FieldRow label="Maximum budget">
          <TextInput value={preferences.maxBudget} onChange={v => set("maxBudget", v)} placeholder="e.g. $600,000" />
        </FieldRow>
        <FieldRow label="Maximum purchase limit">
          <TextInput value={preferences.maxPurchaseLimit} onChange={v => set("maxPurchaseLimit", v)} placeholder="e.g. $650,000" />
        </FieldRow>
        <FieldRow label="Estimated deposit">
          <TextInput value={preferences.estimatedDeposit} onChange={v => set("estimatedDeposit", v)} placeholder="e.g. $120,000" />
        </FieldRow>
        <FieldRow label="Preferred settlement period">
          <TextInput value={preferences.preferredSettlementPeriod} onChange={v => set("preferredSettlementPeriod", v)} placeholder="e.g. 60 days" />
        </FieldRow>
        <FieldRow label="Purchase timeframe">
          <Select value={preferences.purchaseTimeframe || ""} onValueChange={v => set("purchaseTimeframe", v)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="Select..." />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3 months">1–3 months</SelectItem>
              <SelectItem value="3-6 months">3–6 months</SelectItem>
              <SelectItem value="6-12 months">6–12 months</SelectItem>
              <SelectItem value="12+ months">12+ months</SelectItem>
              <SelectItem value="No rush">No rush</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
      </SectionCard>

      <SectionCard title="Priority Lists">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {PRIORITY_LIST_KEYS.map(key => (
            <PriorityListEditor
              key={key}
              listKey={key}
              items={preferences.priorityLists?.[key] || []}
              onChange={items => setPriorityList(key, items)}
            />
          ))}
        </div>
      </SectionCard>
    </div>
  );
}