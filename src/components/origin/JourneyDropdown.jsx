import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  ChevronDown,
  Home,
  KeyRound,
  FileSignature,
  Landmark,
} from "lucide-react";
import { base44 } from "@/api/base44Client";

const OPTIONS = [
  {
    label: "I'm Buying a Property",
    icon: Home,
    path: "/buyer-advisory",
  },
  {
    label: "I'm Leasing My Property",
    icon: KeyRound,
    path: "/property-management",
  },
  {
    label: "I Need Conveyancing",
    icon: FileSignature,
    path: "/conveyancing",
  },
  {
    label: "I Need Mortgage & Finance",
    icon: Landmark,
    path: "/mortgage-finance",
  },
];

export default function JourneyDropdown() {
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const handleSelect = (path) => {
    try {
      base44.analytics.track({
        eventName: "cta_clicked",
        properties: {
          cta: "journey_dropdown",
          destination: path,
        },
      });
    } catch {}

    setOpen(false);
    navigate(path);
  };

  return (
    <div className="relative inline-block mt-8">
      <button
        onClick={() => setOpen((v) => !v)}
        aria-expanded={open}
        className="inline-flex items-center gap-2 rounded-full bg-accent-navy px-7 py-3.5 text-sm font-medium text-parchment shadow-md transition-all duration-300 hover:bg-midnight"
      >
        Start Your Property Journey

        <ChevronDown
          className={`h-4 w-4 transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <>
          <div
            className="fixed inset-0 z-20"
            onClick={() => setOpen(false)}
          />

          <div
            className="
              absolute
              left-0
              z-30
              mt-3

              w-[calc(100vw-2rem)]
              max-w-sm
              md:w-80

              rounded-2xl
              border
              border-stone/60
              bg-white
              shadow-xl

              max-h-[70vh]
              overflow-y-auto
              overscroll-contain

              animate-in
              fade-in
              slide-in-from-top-2
              duration-200
            "
          >
            {OPTIONS.map((option) => (
              <button
                key={option.path}
                onClick={() => handleSelect(option.path)}
                className="
                  flex
                  w-full
                  items-center
                  gap-3
                  border-b
                  border-stone/50
                  px-5
                  py-4
                  text-left
                  text-sm
                  text-midnight
                  transition-colors
                  hover:bg-parchment
                  last:border-b-0
                "
              >
                <option.icon className="h-4 w-4 text-golden flex-shrink-0" />

                <span>{option.label}</span>
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}