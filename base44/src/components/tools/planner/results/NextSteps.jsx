import React from "react";
import { Link } from "react-router-dom";
import { Download, Calendar, Pencil, RotateCcw, ArrowRight } from "lucide-react";
import { base44 } from "@/api/base44Client";

export default function NextSteps({ onPrint, onEdit, onReset }) {
  return (
    <div className="bg-white rounded-2xl border border-stone/60 p-6 md:p-10 text-center">
      <h2 className="font-heading text-2xl md:text-3xl text-midnight mb-3">Recommended Next Step</h2>
      <p className="text-sm text-midnight/50 mb-8 max-w-lg mx-auto leading-relaxed">
        Based on your current position, the next step is to review your budget with a property professional before searching or making an offer.
      </p>
      <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-6">
        <button onClick={onPrint} className="inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition w-full sm:w-auto">
          <Download size={15} /> Download My Report
        </button>
        <Link to="/book-consultation?service=buyer-advisory" onClick={() => base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "planner_next_step_session" } })} className="inline-flex items-center justify-center gap-2 border border-midnight/15 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-stone/40 transition w-full sm:w-auto">
          <Calendar size={15} /> Book Strategy Session
        </Link>
        <button onClick={onEdit} className="inline-flex items-center justify-center gap-2 border border-midnight/15 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-stone/40 transition w-full sm:w-auto">
          <Pencil size={15} /> Edit Inputs
        </button>
        <button onClick={onReset} className="inline-flex items-center justify-center gap-2 border border-midnight/15 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-stone/40 transition w-full sm:w-auto">
          <RotateCcw size={15} /> Reset
        </button>
      </div>
      <Link to="/buyer-advisory/resources" className="inline-flex items-center gap-1 text-sm text-golden hover:text-golden/80 transition">
        Read the Buyer Budget Guide <ArrowRight size={13} />
      </Link>
    </div>
  );
}