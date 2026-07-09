import React from "react";
import { Link } from "react-router-dom";
import { Check, Calendar } from "lucide-react";
import { base44 } from "@/api/base44Client";

const CHECKLIST = [
  { label: "Budget planned", desc: "Your purchase budget has been estimated based on income and deposit." },
  { label: "Buying costs estimated", desc: "Stamp duty, legal fees and upfront costs have been calculated." },
  { label: "Finance planning started", desc: "Your borrowing position and repayments have been assessed." },
  { label: "Property search ready", desc: "You're ready to begin or refine your property search." },
];

/**
 * Ready To Buy — a completion checklist confirming what the user has
 accomplished through the planner, with a CTA to book a buyer strategy session.
 */
export default function ReadyToBuy() {
  return (
    <div className="bg-white rounded-2xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-parchment px-6 py-4 border-b border-stone/60">
        <p className="text-xs tracking-widest uppercase text-golden font-medium mb-0.5">Ready To Buy</p>
        <p className="text-sm text-midnight/60">You've taken the key steps to prepare for your purchase.</p>
      </div>
      <div className="p-6">
        <div className="space-y-3 mb-6">
          {CHECKLIST.map((item) => (
            <div key={item.label} className="flex items-start gap-3">
              <span className="flex-shrink-0 w-6 h-6 rounded-full bg-emerald-100 flex items-center justify-center mt-0.5">
                <Check size={14} className="text-emerald-600" />
              </span>
              <div>
                <p className="text-sm font-medium text-midnight">{item.label}</p>
                <p className="text-xs text-midnight/50 leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="text-center">
          <p className="text-sm text-midnight/60 mb-4 leading-relaxed">
            Ready for personalised guidance? Book a buyer strategy session to discuss your budget, goals and next steps with a professional.
          </p>
          <Link
            to="/book-consultation?service=buyer-advisory"
            onClick={() => base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "planner_ready_to_buy" } })}
            className="inline-flex items-center gap-2 bg-golden text-midnight text-sm font-medium px-7 py-3 rounded-full hover:bg-golden/90 transition"
          >
            <Calendar size={15} /> Book a Buyer Strategy Session
          </Link>
        </div>
      </div>
    </div>
  );
}