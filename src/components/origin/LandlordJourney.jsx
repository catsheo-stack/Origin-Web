import React from "react";

const steps = [
  { number: "01", title: "Thinking About Leasing", description: "Considering your options and understanding the rental market." },
  { number: "02", title: "Rental Appraisal", description: "Understanding your property's potential in today's Melbourne market." },
  { number: "03", title: "Compliance", description: "Ensuring your property meets all Victorian rental regulations." },
  { number: "04", title: "Marketing", description: "Professional photography, listings, and exposure to qualified tenants." },
  { number: "05", title: "Applications", description: "Thorough screening and reference checks for every applicant." },
  { number: "06", title: "Tenant Selection", description: "Choosing the right tenant to protect your investment." },
  { number: "07", title: "Lease Commencement", description: "Detailed condition reports and a smooth handover." },
  { number: "08", title: "Routine Inspections", description: "Regular property assessments with detailed photo reports." },
  { number: "09", title: "Maintenance", description: "Proactive maintenance coordination with trusted local trades." },
  { number: "10", title: "Lease Renewal", description: "Market analysis and negotiation to optimise your return." },
];

export default function LandlordJourney() {
  return (
    <div className="relative">
      {/* Vertical line */}
      <div className="absolute left-6 md:left-8 top-0 bottom-0 w-px bg-stone" />

      <div className="space-y-8 md:space-y-10">
        {steps.map((step, i) => (
          <div key={step.number} className="relative flex items-start gap-6 md:gap-8">
            {/* Dot */}
            <div className="relative z-10 flex-shrink-0 w-12 md:w-16 h-12 md:h-16 rounded-full bg-white border border-stone flex items-center justify-center">
              <span className="text-xs font-medium text-golden">{step.number}</span>
            </div>
            {/* Content */}
            <div className="pt-2 md:pt-3">
              <h3 className="font-heading text-base md:text-lg font-medium text-midnight">
                {step.title}
              </h3>
              <p className="mt-1 text-sm text-midnight/50 leading-relaxed font-body max-w-md">
                {step.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}