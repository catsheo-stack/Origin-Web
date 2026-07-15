import React from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";

const PROPERTY_OPTIONS = [
  { value: "house", label: "獨立屋" },
  { value: "apartment", label: "公寓" },
  { value: "townhouse", label: "聯排別墅" },
  { value: "other", label: "其他" }
];

export default function PropertyTypeSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="property-type" className="text-xs font-medium text-gray-600">
        物業類型
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="property-type" className="h-11 w-full sm:w-56">
          <SelectValue placeholder="選擇物業類型" />
        </SelectTrigger>
        <SelectContent>
          {PROPERTY_OPTIONS.map(opt => (
            <SelectItem key={opt.value} value={opt.value}>
              {opt.label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}