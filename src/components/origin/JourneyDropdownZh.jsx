import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Home, KeyRound, FileSignature, Landmark } from "lucide-react";

const OPTIONS = [
  { label: "我要購買物業", icon: Home, path: "/zh/buyer-advisory" },
  { label: "我要出租及管理物業", icon: KeyRound, path: "/zh/property-management" },
  { label: "我需要房產過戶服務", icon: FileSignature, path: "/zh/conveyancing" },
  { label: "我需要房屋貸款協助", icon: Landmark, path: "/zh/mortgage-finance" },
];

export default function JourneyDropdownZh() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  return (
    <div className="relative inline-block mt-8">
      <button onClick={() => setOpen(v => !v)} aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-accent-navy px-7 py-3.5 text-sm font-medium text-parchment shadow-md transition-all duration-300 hover:bg-midnight">
        開始您的房產旅程
        <ChevronDown className={`h-4 w-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && <>
        <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
        <div className="absolute left-0 z-30 mt-3 w-[calc(100vw-2rem)] max-w-sm md:w-80 rounded-2xl border border-stone/60 bg-white shadow-xl max-h-[70vh] overflow-y-auto">
          {OPTIONS.map(option => <button key={option.path} onClick={() => {setOpen(false); navigate(option.path)}}
            className="flex w-full items-center gap-3 border-b border-stone/50 px-5 py-4 text-left text-sm text-midnight transition-colors hover:bg-parchment last:border-b-0">
            <option.icon className="h-4 w-4 text-golden flex-shrink-0"/><span>{option.label}</span>
          </button>)}
        </div>
      </>}
    </div>
  );
}
