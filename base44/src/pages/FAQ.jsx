import React, { useState, useMemo, useEffect } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import FAQAccordion from "@/components/origin/FAQAccordion";
import { FAQ_CATEGORIES } from "@/data/faqData";

export default function FAQ() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Frequently Asked Questions | Origin Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Find answers to common questions about buying property, selling property, conveyancing, mortgage finance and property management in Australia.");
    setMeta('meta[property="og:title"]', "content", "Frequently Asked Questions | Origin Concierge");
    setMeta('meta[property="og:description"]', "content", "Find answers to common questions about buying property, selling property, conveyancing, mortgage finance and property management in Australia.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "faq" } });

    // FAQPage structured data
    const allFaqs = FAQ_CATEGORIES.flatMap((c) => c.faqs);
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: allFaqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer },
      })),
    };
    let s = document.getElementById("faq-schema");
    if (!s) { s = document.createElement("script"); s.id = "faq-schema"; s.type = "application/ld+json"; document.head.appendChild(s); }
    s.textContent = JSON.stringify(schema);

    return () => { const el = document.getElementById("faq-schema"); if (el) el.remove(); };
  }, []);

  const filtered = useMemo(() => {
    if (!query.trim()) return FAQ_CATEGORIES;
    const q = query.toLowerCase();
    return FAQ_CATEGORIES.map((cat) => ({
      ...cat,
      faqs: cat.faqs.filter(
        (f) => f.question.toLowerCase().includes(q) || f.answer.toLowerCase().includes(q)
      ),
    })).filter((cat) => cat.faqs.length > 0);
  }, [query]);

  const hasResults = filtered.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="bg-parchment pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-midnight mb-4">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-midnight/60 leading-relaxed mb-8 max-w-xl mx-auto">
            Find answers to common questions about buying, selling, conveyancing, mortgage finance and property management.
          </p>

          {/* Search */}
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search frequently asked questions..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-stone bg-white text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:border-golden/50 focus:ring-2 focus:ring-golden/10 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* FAQ content */}
      <SectionWrapper className="!pt-8 !pb-16">
        <div className="max-w-3xl mx-auto">
          {hasResults ? (
            <div className="space-y-12">
              {filtered.map((cat) => (
                <div key={cat.name}>
                  <h2 className="font-heading text-xl md:text-2xl text-midnight mb-4">{cat.name}</h2>
                  {cat.faqs.length > 0 ? (
                    <div className="bg-white rounded-2xl border border-stone/60 px-6 md:px-8">
                      <FAQAccordion items={cat.faqs} />
                    </div>
                  ) : (
                    <div className="bg-white rounded-2xl border border-stone/60 px-6 md:px-8 py-8">
                      <p className="text-sm text-midnight/40 text-center">
                        More FAQs coming soon. Have a question?{" "}
                        <Link to="/contact" className="text-golden hover:text-golden/80 underline">
                          Contact us
                        </Link>
                        .
                      </p>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-midnight/50 mb-4">
                No FAQs match &ldquo;{query}&rdquo;.
              </p>
              <button
                onClick={() => setQuery("")}
                className="text-golden hover:text-golden/80 text-sm underline"
              >
                Clear search
              </button>
            </div>
          )}
        </div>
      </SectionWrapper>

      {/* Last Updated */}
      <div className="max-w-3xl mx-auto px-6 lg:px-10 pb-12">
        <p className="text-xs text-midnight/40 text-center">Last updated: July 2026</p>
      </div>

    </>
  );
}