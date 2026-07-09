import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ChevronDown, Home, KeyRound, FileSignature, Landmark } from "lucide-react";
import { base44 } from "@/api/base44Client";

const OPTIONS = [
  { label: "I'm Buying a Property", icon: Home, path: "/buyer-advisory" },
  { label: "I'm Leasing My Property", icon: KeyRound, path: "/property-management" },
  { label: "I Need Conveyancing", icon: FileSignature, path: "/conveyancing" },
  { label: "I Need Mortgage & Finance", icon: Landmark, path: "/mortgage-finance" },
];

export default function JourneyDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (path) => {
    base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "journey_dropdown", destination: path } });
    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative inline-block mt-8">
      <button
        onClick={() => setOpen(!open)}
        className="inline-flex items-center gap-2 bg-accent-navy text-parchment text-sm font-medium px-7 py-3.5 rounded-full shadow-md hover:bg-midnight transition-all duration-300"
        aria-expanded={open}
      >
        Start Your Property Journey
        <ChevronDown className={`w-4 h-4 transition-transform duration-300 ${open ? "rotate-180" : ""}`} />
      </button>
      {open && (
        <>
          <div className="fixed inset-0 z-20" onClick={() => setOpen(false)} />
          <div className="absolute left-0 z-30 mt-3 w-72 rounded-2xl bg-white shadow-xl border border-stone/60 overflow-hidden animate-in fade-in slide-in-from-top-2 duration-200">
            {OPTIONS.map((opt) => (
              <button
                key={opt.path}
                onClick={() => handleSelect(opt.path)}
                className="flex items-center gap-3 w-full px-5 py-3.5 text-left text-sm text-midnight hover:bg-parchment transition-colors border-b border-stone/50 last:border-b-0"
              >
                <opt.icon className="w-4 h-4 text-golden" />
                <span>{opt.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}