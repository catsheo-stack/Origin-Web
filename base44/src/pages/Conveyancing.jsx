import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import SectionHeader from "@/components/origin/SectionHeader";
import ConveyancingQuestionnaire from "@/components/origin/ConveyancingQuestionnaire";
// Conveyancing service landing page

const HERO_IMAGE = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80";
const SIDE_IMAGE = "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1000&q=80";

export default function Conveyancing() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = "Origin Property Concierge | Conveyancing Melbourne";
    const setMeta = (selector, attr, content) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Conveyancing support for Melbourne buyers and sellers, including contract review, Section 32 review, settlement guidance and property transaction support.");
    setMeta('meta[property="og:title"]', "content", "Origin Property Concierge | Conveyancing Melbourne");
    setMeta('meta[property="og:description"]', "content", "Conveyancing support for Melbourne buyers and sellers, including contract review, Section 32 review, settlement guidance and property transaction support.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "conveyancing" } });
  }, []);

  const openForm = () => {
    setFormOpen(true);
    base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "conveyancing_start_enquiry", page: "conveyancing" } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToHero = () => {
    setFormOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (formOpen) {
    return (
      <SectionWrapper className="!pt-28 md:!pt-32 !pb-16 md:!pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto" id="conveyancing-questionnaire">
          <SectionHeader
            label="Conveyancing Questionnaire"
            title="Tell us about your conveyancing needs"
            subtitle="Answer a few quick questions so we can understand your transaction and guide your next step."
            align="center"
          />
          <ConveyancingQuestionnaire onBack={backToHero} />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <section className="relative bg-accent-navy min-h-[92vh] flex items-center pt-28 md:pt-32 pb-20 md:pb-28 overflow-hidden">
      <img
        src={HERO_IMAGE}
        alt="Legal documents and contracts on a desk"
        className="absolute inset-0 w-full h-full object-cover opacity-[0.12]"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-accent-navy via-accent-navy/95 to-accent-navy" />
      <div className="relative max-w-7xl mx-auto px-6 lg:px-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          <div className="lg:col-span-7 text-center lg:text-left">
            <div className="w-16 h-px bg-golden/70 mx-auto lg:mx-0 mb-10" />
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-golden mb-8">
              Conveyancing &middot; Property Law
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-light text-parchment leading-[1.15] tracking-tight">
              Committed to the precision
              <br />
              your transaction deserves
            </h1>
            <p className="mt-8 text-base md:text-lg font-heading font-light text-parchment/65 leading-relaxed max-w-2xl mx-auto lg:mx-0 italic">
              Every clause examined. Every obligation understood.
              <br />
              Transact with the certainty that no detail is overlooked.
            </p>
            <div className="mt-12">
              <button
                type="button"
                onClick={openForm}
                className="inline-block bg-golden text-accent-navy text-sm font-semibold tracking-wide px-10 py-4 rounded-sm hover:bg-golden/90 transition-colors uppercase"
              >
                Begin Your Enquiry
              </button>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-8 text-sm text-parchment/45">
              <Link to="/contact?service=conveyancing" className="hover:text-golden transition-colors">
                Ask a question first
              </Link>
              <span className="hidden sm:inline text-parchment/20">&middot;</span>
              <Link to="/conveyancing/resources" className="hover:text-golden transition-colors">
                Browse the Knowledge Centre
              </Link>
            </div>
            <div className="w-16 h-px bg-golden/70 mx-auto lg:mx-0 mt-12" />
          </div>
          <div className="lg:col-span-5 hidden lg:block">
            <div className="relative">
              <div className="absolute inset-0 -m-3 border border-golden/30" />
              <img
                src={SIDE_IMAGE}
                alt="Fountain pen signing a legal contract document"
                className="relative w-full h-[560px] object-cover rounded-sm grayscale-[0.25]"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}