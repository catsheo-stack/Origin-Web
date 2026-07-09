import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Check, Calendar, BookOpen } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";

export default function ThankYou() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "thank-you" } });
  }, []);

  return (
    <SectionWrapper className="min-h-[70vh] flex items-center pt-32 md:pt-40">
      <div className="max-w-xl mx-auto w-full">
        {/* Confirmation card */}
        <div className="bg-white rounded-2xl p-10 md:p-12 text-center shadow-sm">
          <div className="w-14 h-14 rounded-full bg-golden/10 flex items-center justify-center mx-auto mb-6">
            <Check size={24} className="text-golden" strokeWidth={1.5} />
          </div>
          <h1 className="font-heading text-3xl md:text-4xl text-midnight mb-3">
            Thank you
          </h1>
          <p className="text-sm text-midnight/60 leading-relaxed max-w-sm mx-auto">
            We've received your details. We'll be in touch shortly with a tailored
            property management recommendation.
          </p>
        </div>

        {/* Calendar / booking placeholder */}
        <div className="mt-6 bg-parchment rounded-2xl p-8 md:p-10 border border-stone/60">
          <div className="flex items-center justify-center gap-2 mb-3">
            <Calendar size={18} className="text-golden" strokeWidth={1.5} />
            <h2 className="font-heading text-base text-midnight">Prefer to book a time?</h2>
          </div>
          <p className="text-sm text-midnight/55 leading-relaxed text-center mb-6">
            Schedule a consultation at a time that suits you.
          </p>
          <div className="bg-white rounded-xl border border-dashed border-stone py-14 flex items-center justify-center">
            <p className="text-xs text-midnight/40">Calendar booking will appear here</p>
          </div>
        </div>

        {/* Knowledge Centre link */}
        <div className="mt-6 text-center">
          <Link
            to="/property-guides"
            className="inline-flex items-center gap-2 text-sm text-golden font-medium hover:text-golden/80 transition-colors"
          >
            <BookOpen size={14} strokeWidth={1.5} />
            Browse Knowledge Centre while you wait
          </Link>
        </div>
      </div>
    </SectionWrapper>
  );
}