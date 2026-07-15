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
  { value: "house", label: "House" },
  { value: "apartment", label: "Apartment" },
  { value: "townhouse", label: "Townhouse" },
  { value: "other", label: "Other" }
];

export default function PropertyTypeSelector({ value, onChange }) {
  return (
    <div className="flex flex-col gap-1.5">
      <Label htmlFor="property-type" className="text-xs font-medium text-gray-600">
        Property Type
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="property-type" className="h-11 w-full sm:w-56">
          <SelectValue placeholder="Select Property Type" />
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