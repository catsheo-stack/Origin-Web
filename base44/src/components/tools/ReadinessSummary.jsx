import React from "react";
import { Link } from "react-router-dom";
import { Printer, Calendar, Home, User, Check } from "lucide-react";
import ProgressBar from "@/components/tools/ProgressBar";
import { base44 } from "@/api/base44Client";
import { toast } from "@/components/ui/use-toast";

function getRecommendation(pct) {
  if (pct >= 80) {
    return {
      label: "Excellent — Ready for Leasing",
      text: "Your property appears ready for leasing. Consider arranging professional photography and booking a property management consultation to finalise your go-to-market plan.",
      steps: [
        "Arrange professional marketing photography",
        "Book a Property Management Review",
        "Confirm your preferred lease commencement date",
      ],
    };
  }
  if (pct >= 50) {
    return {
      label: "Good Progress — Nearly Ready",
      text: "Review the remaining checklist items before advertising to reduce delays and compliance risks.",
      steps: [
        "Complete the outstanding compliance and document items",
        "Order any pending safety checks",
        "Book a Property Management Review to close remaining gaps",
      ],
    };
  }
  return {
    label: "Preparation Recommended",
    text: "More preparation is recommended before leasing. Consider booking a Property Management Review to identify potential issues early.",
    steps: [
      "Book a Property Management Review",
      "Prioritise compliance and safety items",
      "Gather property and tenancy documents",
    ],
  };
}

function DetailRow({ label, value }) {
  return (
    <div className="flex justify-between gap-4">
      <dt className="text-midnight/50">{label}</dt>
      <dd className="text-right text-midnight/80">{value || "—"}</dd>
    </div>
  );
}

export default function ReadinessSummary({ owner, sections, checkedItems, totalItems }) {
  const done = checkedItems.size;
  const pct = totalItems ? Math.round((done / totalItems) * 100) : 0;
  const rec = getRecommendation(pct);

  const completedItems = [];
  const missingItems = [];
  sections.forEach((s) => {
    s.items.forEach((i) => {
      if (checkedItems.has(i.id)) completedItems.push(i.label);
      else missingItems.push(i.label);
    });
  });

  return (
    <div className="printable-summary bg-white rounded-xl shadow-sm border border-stone/60 overflow-hidden">
      <div className="bg-accent-navy px-6 py-6 text-center">
        <p className="text-xs tracking-[0.2em] uppercase text-golden mb-1">Owner Readiness Summary</p>
        <p className="font-heading text-xl text-parchment">Property Management Readiness Report</p>
      </div>

      <div className="p-6 md:p-8 space-y-6">
        <div className="text-center">
          <p className="font-heading text-5xl text-midnight leading-none">{pct}%</p>
          <p className="text-sm text-golden font-medium mt-2">{rec.label}</p>
          <div className="max-w-md mx-auto mt-3"><ProgressBar value={pct} className="h-2.5" /></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
          <div className="bg-parchment rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-2 flex items-center gap-1.5"><User size={12} /> Owner Details</p>
            <dl className="space-y-1">
              <DetailRow label="Name" value={owner.ownerName} />
              <DetailRow label="Email" value={owner.email} />
              <DetailRow label="Phone" value={owner.phone} />
            </dl>
          </div>
          <div className="bg-parchment rounded-lg p-4">
            <p className="text-xs uppercase tracking-wide text-midnight/40 mb-2 flex items-center gap-1.5"><Home size={12} /> Property Details</p>
            <dl className="space-y-1">
              <DetailRow label="Address" value={owner.address} />
              <DetailRow label="Type" value={owner.propertyType} />
              <DetailRow label="Tenanted" value={owner.tenanted} />
              <DetailRow label="Available" value={owner.availableDate} />
            </dl>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <p className="text-sm font-medium text-midnight mb-2">Completed Items ({completedItems.length})</p>
            <ul className="space-y-1.5 text-sm text-midnight/70">
              {completedItems.length ? completedItems.map((i, idx) => (
                <li key={idx} className="flex gap-2"><Check size={14} className="text-golden mt-0.5 flex-shrink-0" /> {i}</li>
              )) : <li className="text-midnight/40">None yet</li>}
            </ul>
          </div>
          <div>
            <p className="text-sm font-medium text-midnight mb-2">Missing Items ({missingItems.length})</p>
            <ul className="space-y-1.5 text-sm text-midnight/70">
              {missingItems.length ? missingItems.map((i, idx) => (
                <li key={idx} className="flex gap-2"><span className="w-3.5 h-3.5 rounded-sm border border-stone mt-0.5 flex-shrink-0" /> {i}</li>
              )) : <li className="text-midnight/40">All complete</li>}
            </ul>
          </div>
        </div>

        <div className="border border-stone rounded-lg p-5">
          <p className="text-xs uppercase tracking-wide text-golden mb-1.5">Recommended Next Steps</p>
          <p className="text-sm text-midnight/70 mb-3 leading-relaxed">{rec.text}</p>
          <ol className="list-decimal pl-5 space-y-1 text-sm text-midnight/80">
            {rec.steps.map((s, idx) => <li key={idx}>{s}</li>)}
          </ol>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 print:hidden">
          <button
            onClick={() => {
              window.print();
              toast({ title: "Ready to download", description: "Your print or PDF summary is ready in the browser dialog." });
            }}
            className="inline-flex items-center justify-center gap-2 border border-midnight/20 text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-midnight/5 transition"
          >
            <Printer size={15} /> Print / Save as PDF
          </button>
          <Link
            to="/book-consultation?service=property-management"
            onClick={() => base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "readiness_summary_review" } })}
            className="inline-flex items-center justify-center gap-2 bg-golden text-midnight text-sm font-medium px-6 py-3 rounded-full hover:bg-golden/90 transition"
          >
            <Calendar size={15} /> Book a Property Management Review
          </Link>
        </div>
      </div>
    </div>
  );
}