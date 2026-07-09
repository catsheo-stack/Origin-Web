import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import SectionHeader from "@/components/origin/SectionHeader";
import BuyerQuestionnaire from "@/components/origin/BuyerQuestionnaire";

const HERO_IMAGE = "https://images.unsplash.com/photo-1564013799919-ab600027ffc6?auto=format&fit=crop&w=1920&q=80";

export default function BuyerAdvisory() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = "Origin Property Concierge | Buyer Agent Melbourne";
    const setMeta = (selector, attr, content) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Buyer agent and buyer advisory support for Melbourne home buyers and investors. Property search, due diligence, negotiation and settlement guidance.");
    setMeta('meta[property="og:title"]', "content", "Origin Property Concierge | Buyer Agent Melbourne");
    setMeta('meta[property="og:description"]', "content", "Buyer agent and buyer advisory support for Melbourne home buyers and investors.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "buyer-advisory" } });
  }, []);

  const openForm = () => {
    setFormOpen(true);
    base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "buyer_start_journey", page: "buyer-advisory" } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToHero = () => {
    setFormOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (formOpen) {
    return (
      <SectionWrapper className="!pt-28 md:!pt-32 !pb-16 md:!pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto">
          <SectionHeader
            label="Buyer Questionnaire"
            title="Tell us about your buying goals"
            subtitle="Five quick questions — so we can understand what you're looking for and guide your next step."
            align="center"
          />
          <BuyerQuestionnaire onBack={backToHero} />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <section className="relative min-h-[88vh] flex items-center overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="Premium Melbourne residential street with modern homes"
        className="absolute inset-0 w-full h-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-r from-midnight/85 via-midnight/70 to-midnight/35" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 py-32 md:py-40 w-full">
        <div className="max-w-2xl">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-5">Buyer Advisory</p>
          <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-light text-parchment leading-[1.1] tracking-tight">
            Buyer Agent &amp; Buyer Advisory Melbourne
          </h1>
          <p className="mt-6 text-xl md:text-2xl font-heading font-light text-parchment/90">
            Find the right property with confidence.
          </p>
          <p className="mt-3 text-base text-parchment/70 leading-relaxed max-w-xl">
            We guide you to make informed property decisions from search through to settlement.
          </p>
          <div className="mt-9">
            <button
              type="button"
              onClick={openForm}
              className="inline-block bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition-colors text-center"
            >
              Start My Buyer Journey
            </button>
          </div>
          <p className="mt-6 text-sm text-parchment/60">
            Prefer to ask a question first?{" "}
            <Link to="/contact?service=buyer-advisory" className="text-golden hover:underline">
              Contact us
            </Link>
          </p>
          <p className="mt-3 text-sm text-parchment/60">
            Exploring your options?{" "}
            <Link to="/buyer-advisory/resources" className="text-golden hover:underline">
              Browse the Buyer Advisory Knowledge Centre
            </Link>
          </p>
        </div>
      </div>
    </section>
  );
}