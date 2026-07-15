import React from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import PropertyTypeSelector from "@/components/buyer-checklist/PropertyTypeSelector";
import PriorityListEditor from "@/components/buyer-checklist/planning/PriorityListEditor";
import { PRIORITY_LIST_KEYS } from "@/utils/buyerJourneyValidation";

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
        <h2 className="text-lg font-semibold text-gray-900">我的購屋偏好</h2>
        <p className="text-sm text-gray-500">記錄您在尋找物業時最重視的條件。</p>
      </div>

      <SectionCard title="置業目的">
        <FieldRow label="購買用途">
          <Select value={preferences.purchasePurpose || ""} onValueChange={v => set("purchasePurpose", v)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="請選擇…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="自住買家">自住買家</SelectItem>
              <SelectItem value="投資">投資</SelectItem>
              <SelectItem value="不確定">不確定</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
      </SectionCard>

      <SectionCard title="地點">
        <FieldRow label="目標地區">
          <TextInput value={preferences.targetSuburbs} onChange={v => set("targetSuburbs", v)} placeholder="例如：Brunswick、Coburg" />
        </FieldRow>
        <FieldRow label="搜尋範圍">
          <TextInput value={preferences.searchRadius} onChange={v => set("searchRadius", v)} placeholder="例如：10 公里" />
        </FieldRow>
        <FieldRow label="偏好地點">
          <TextInput value={preferences.preferredLocations} onChange={v => set("preferredLocations", v)} placeholder="例如：鄰近公園、安靜街道" />
        </FieldRow>
        <FieldRow label="校網要求">
          <SelectInput value={preferences.schoolZoneRequirement} onChange={v => set("schoolZoneRequirement", v)} />
        </FieldRow>
        <FieldRow label="公共交通">
          <SelectInput value={preferences.publicTransportRequirement} onChange={v => set("publicTransportRequirement", v)} />
        </FieldRow>
        <FieldRow label="通勤要求">
          <TextInput value={preferences.commuteRequirement} onChange={v => set("commuteRequirement", v)} placeholder="例如：30 分鐘內到達市中心" />
        </FieldRow>
      </SectionCard>

      <SectionCard title="物業要求">
        <FieldRow label="物業類型">
          <PropertyTypeSelector value={propertyType} onChange={onUpdatePropertyType} />
        </FieldRow>
        <FieldRow label="最少睡房數目">
          <TextInput value={preferences.minBedrooms} onChange={v => set("minBedrooms", v)} placeholder="例如：3" />
        </FieldRow>
        <FieldRow label="最少浴室數目">
          <TextInput value={preferences.minBathrooms} onChange={v => set("minBathrooms", v)} placeholder="例如：2" />
        </FieldRow>
        <FieldRow label="最少車位數目">
          <TextInput value={preferences.minCarSpaces} onChange={v => set("minCarSpaces", v)} placeholder="例如：1" />
        </FieldRow>
        <FieldRow label="偏好土地面積">
          <TextInput value={preferences.preferredLandSize} onChange={v => set("preferredLandSize", v)} placeholder="例如：500 平方米" />
        </FieldRow>
        <FieldRow label="單層物業偏好">
          <SelectInput value={preferences.singleLevelPreference} onChange={v => set("singleLevelPreference", v)} />
        </FieldRow>
        <FieldRow label="戶外空間偏好">
          <SelectInput value={preferences.outdoorSpacePreference} onChange={v => set("outdoorSpacePreference", v)} />
        </FieldRow>
        <FieldRow label="裝修接受程度">
          <SelectInput value={preferences.renovationTolerance} onChange={v => set("renovationTolerance", v)} />
        </FieldRow>
      </SectionCard>

      <SectionCard title="預算與時間">
        <FieldRow label="最低預算">
          <TextInput value={preferences.minBudget} onChange={v => set("minBudget", v)} placeholder="例如：$400,000" />
        </FieldRow>
        <FieldRow label="最高預算">
          <TextInput value={preferences.maxBudget} onChange={v => set("maxBudget", v)} placeholder="例如：$600,000" />
        </FieldRow>
        <FieldRow label="最高購買上限">
          <TextInput value={preferences.maxPurchaseLimit} onChange={v => set("maxPurchaseLimit", v)} placeholder="例如：$650,000" />
        </FieldRow>
        <FieldRow label="預計首期">
          <TextInput value={preferences.estimatedDeposit} onChange={v => set("estimatedDeposit", v)} placeholder="例如：$120,000" />
        </FieldRow>
        <FieldRow label="偏好交割期">
          <TextInput value={preferences.preferredSettlementPeriod} onChange={v => set("preferredSettlementPeriod", v)} placeholder="例如：60 天" />
        </FieldRow>
        <FieldRow label="購買時間">
          <Select value={preferences.purchaseTimeframe || ""} onValueChange={v => set("purchaseTimeframe", v)}>
            <SelectTrigger className="h-9 text-sm">
              <SelectValue placeholder="請選擇…" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1-3 months">1至3個月</SelectItem>
              <SelectItem value="3-6 months">3至6個月</SelectItem>
              <SelectItem value="6-12 months">6至12個月</SelectItem>
              <SelectItem value="12個月以上">12個月以上</SelectItem>
              <SelectItem value="不急">不急</SelectItem>
            </SelectContent>
          </Select>
        </FieldRow>
      </SectionCard>

      <SectionCard title="優先條件清單">
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