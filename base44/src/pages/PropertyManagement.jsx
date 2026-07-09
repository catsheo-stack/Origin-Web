import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import LeadForm from "@/components/origin/LeadForm";

const HERO_IMAGE = "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export default function PropertyManagement() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "property-management" } });
  }, []);

  const openForm = () => {
    setFormOpen(true);
    base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "get_rental_appraisal", page: "property-management" } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <section className="bg-parchment pt-28 md:pt-32 pb-16 md:pb-24 min-h-screen">
      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {!formOpen ? (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center min-h-[68vh]">
            <div className="order-2 lg:order-1">
              <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-5">
                Melbourne Property Concierge
              </p>
              <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-light text-midnight leading-[1.1] tracking-tight">
                Need Help Leasing or<br />
                <span className="text-golden">Managing Your Property?</span>
              </h1>
              <p className="mt-6 text-base md:text-lg text-midnight/60 leading-relaxed max-w-md font-body">
                Get matched with the right property management support for your investment property.
              </p>
              <button
                type="button"
                onClick={openForm}
                className="inline-block mt-9 bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition-colors"
              >
                Get My Rental Appraisal
              </button>
            </div>
            <div className="order-1 lg:order-2 rounded-xl overflow-hidden">
              <img
                src={HERO_IMAGE}
                alt="Modern Melbourne investment property interior"
                className="w-full h-auto object-cover aspect-[4/3]"
              />
            </div>
          </div>
        ) : (
          <div className="max-w-2xl mx-auto">
            <LeadForm sourcePage="property-management" onBack={() => { setFormOpen(false); window.scrollTo({ top: 0, behavior: "smooth" }); }} />
          </div>
        )}
      </div>
    </section>
  );
}