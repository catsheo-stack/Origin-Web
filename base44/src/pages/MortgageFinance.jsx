import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import SectionHeader from "@/components/origin/SectionHeader";
import MortgageQuestionnaire from "@/components/origin/MortgageQuestionnaire";

const SIDE_IMAGE = "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&w=1400&q=80";

export default function MortgageFinance() {
  const [formOpen, setFormOpen] = useState(false);

  useEffect(() => {
    document.title = "Origin Property Concierge | Mortgage Broker Melbourne";
    const setMeta = (selector, attr, content) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Mortgage and finance guidance for Melbourne property buyers, including borrowing readiness, pre-approval preparation, refinancing direction and home loan support.");
    setMeta('meta[property="og:title"]', "content", "Origin Property Concierge | Mortgage Broker Melbourne");
    setMeta('meta[property="og:description"]', "content", "Mortgage and finance guidance for Melbourne property buyers, including borrowing readiness, pre-approval preparation, refinancing direction and home loan support.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "mortgage-finance" } });
  }, []);

  const openForm = () => {
    setFormOpen(true);
    base44.analytics.track({ eventName: "cta_clicked", properties: { cta: "mortgage_finance_start_enquiry", page: "mortgage-finance" } });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const backToHero = () => {
    setFormOpen(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (formOpen) {
    return (
      <SectionWrapper className="!pt-28 md:!pt-32 !pb-16 md:!pb-24 min-h-screen">
        <div className="max-w-3xl mx-auto" id="mortgage-finance-questionnaire">
          <SectionHeader
            label="Mortgage & Finance Questionnaire"
            title="Tell us about your finance goals"
            subtitle="Answer a few quick questions so we can understand your borrowing needs and guide your next step."
            align="center"
          />
          <MortgageQuestionnaire onBack={backToHero} />
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      {/* Hero — light split layout with full-bleed side image */}
      <section className="relative bg-parchment flex flex-col lg:flex-row min-h-screen pt-[72px]">
        <div className="lg:w-1/2 flex items-center px-6 lg:px-16 xl:px-24 py-16 lg:py-24">
          <div className="max-w-xl mx-auto lg:mx-0 text-center lg:text-left">
            <div className="w-16 h-px bg-golden/70 mx-auto lg:mx-0 mb-10" />
            <p className="text-[11px] font-medium tracking-[0.3em] uppercase text-golden mb-8">
              Mortgage &amp; Finance &middot; Home Loan Support
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-[3.5rem] font-light text-midnight leading-[1.15] tracking-tight">
              Finance your next move with clarity.
            </h1>
            <p className="mt-8 text-base md:text-lg font-heading font-light text-midnight/55 leading-relaxed max-w-2xl mx-auto lg:mx-0 italic">
              Understand your borrowing position, prepare with confidence and make smarter property decisions before you commit.
            </p>
            <div className="mt-12">
              <button
                type="button"
                onClick={openForm}
                className="inline-block bg-golden text-midnight text-sm font-semibold tracking-wide px-10 py-4 rounded-sm hover:bg-golden/90 transition-colors uppercase"
              >
                Start My Finance Enquiry
              </button>
            </div>
            <div className="mt-10 flex flex-col sm:flex-row items-center lg:items-start lg:justify-start justify-center gap-3 sm:gap-8 text-sm text-midnight/45">
              <Link to="/contact?service=mortgage-finance" className="hover:text-golden transition-colors">
                Ask a question first
              </Link>
              <span className="hidden sm:inline text-midnight/20">&middot;</span>
              <Link to="/mortgage-finance/resources" className="hover:text-golden transition-colors">
                Browse the Knowledge Centre
              </Link>
            </div>
            <div className="w-16 h-px bg-golden/70 mx-auto lg:mx-0 mt-12" />
          </div>
        </div>
        <div className="lg:w-1/2 relative min-h-[320px] lg:min-h-screen">
          <img
            src={SIDE_IMAGE}
            alt="Elegant modern Melbourne home with soft natural light"
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-parchment/60 via-transparent to-transparent lg:from-parchment/40" />
        </div>
      </section>

    </>
  );
}