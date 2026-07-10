import React, { useEffect, useState } from "react";
import { base44 } from "@/api/base44Client";
import LeadForm from "@/components/origin/LeadForm";

const HERO_IMAGE =
  "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1200&q=80";

export default function PropertyManagement() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    try {
      base44.analytics.track({
        eventName: "page_viewed",
        properties: {
          page: "property-management",
        },
      });
    } catch {
      // Analytics should never break the page
    }
  }, []);

  const openForm = () => {
    setFormOpen(true);

    try {
      base44.analytics.track({
        eventName: "cta_clicked",
        properties: {
          cta: "get_property_appraisal",
          page: "property-management",
        },
      });
    } catch {
      // Ignore analytics failures
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  const closeForm = () => {
    setFormOpen(false);

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <section className="bg-parchment min-h-screen pt-28 pb-16 md:pt-32 md:pb-24">
      <div className="mx-auto max-w-7xl px-6 lg:px-10">
        {!formOpen ? (
          <div className="grid min-h-[68vh] grid-cols-1 items-center gap-10 lg:grid-cols-2 lg:gap-16">
            {/* Left Content */}
            <div className="order-2 lg:order-1">
              <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-golden">
                Melbourne Property Concierge
              </p>

              <h1 className="font-heading text-4xl font-light leading-[1.08] tracking-tight text-midnight md:text-5xl lg:text-[3.5rem]">
                Maximise the Value of
                <br />
                <span className="text-golden">
                  Your Property.
                </span>
              </h1>

              <p className="mt-6 max-w-lg text-base leading-relaxed text-midnight/60 md:text-lg">
                Whether you're considering selling,
                leasing, or simply exploring your
                options, let us recommend the best
                next step.
              </p>

              <button
                type="button"
                onClick={openForm}
                className="mt-9 inline-flex items-center justify-center rounded-full bg-golden px-8 py-3.5 text-sm font-medium text-midnight transition-colors hover:bg-golden/90"
              >
                Get My Property Appraisal
              </button>
            </div>

            {/* Hero Image */}
            <div className="order-1 overflow-hidden rounded-xl lg:order-2">
              <img
                src={HERO_IMAGE}
                alt="Melbourne residential property"
                className="aspect-[4/3] w-full object-cover"
              />
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-2xl">
            <LeadForm
              sourcePage="property-management"
              onBack={closeForm}
            />
          </div>
        )}
      </div>
    </section>
  );
}