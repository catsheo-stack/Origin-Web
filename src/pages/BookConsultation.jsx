import React, { useEffect } from "react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import SectionHeader from "@/components/origin/SectionHeader";
import LeadForm from "@/components/origin/LeadForm";

export default function BookConsultation() {
  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "book-consultation" } });
  }, []);

  return (
    <>
      <section className="bg-parchment pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="max-w-7xl mx-auto px-6 lg:px-10">
          <SectionHeader
            label="Book a Consultation"
            title="Let's talk about your property"
            subtitle="Share a few details and we'll get back to you with a tailored property management recommendation. No obligation, no pressure."
          />
        </div>
      </section>

      <SectionWrapper>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start">
          <div className="lg:sticky lg:top-32">
            <h3 className="font-heading text-xl font-light text-midnight mb-6">What you'll receive</h3>
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-golden mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-midnight">Personalised rental appraisal</h4>
                  <p className="text-sm text-midnight/50 mt-1 leading-relaxed">Based on current market data for your specific suburb and property type.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-golden mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-midnight">Transparent fee breakdown</h4>
                  <p className="text-sm text-midnight/50 mt-1 leading-relaxed">Clear pricing with no hidden costs or unexpected charges.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-golden mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-midnight">Tailored management recommendation</h4>
                  <p className="text-sm text-midnight/50 mt-1 leading-relaxed">Honest advice based on your property, your goals, and your situation.</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-1.5 h-1.5 rounded-full bg-golden mt-2 flex-shrink-0" />
                <div>
                  <h4 className="text-sm font-medium text-midnight">No obligation</h4>
                  <p className="text-sm text-midnight/50 mt-1 leading-relaxed">This is a conversation, not a commitment. No pressure, no hard sell.</p>
                </div>
              </div>
            </div>
          </div>
          <LeadForm sourcePage="book-consultation" />
        </div>
      </SectionWrapper>
    </>
  );
}