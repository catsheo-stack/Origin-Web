import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";

import GuideCard from "@/components/origin/GuideCard";
import SectionWrapper from "@/components/origin/SectionWrapper";
import { publishedKnowledgeItems } from "@/data/knowledgeCentre";

const KNOWLEDGE_CENTRES = [
  {
    service: "buyer-advisory",
    label: "Buyer Advisory",
    title: "Buyer Advisory Knowledge Centre",
    description:
      "Search strategy, due diligence, negotiation and auction guidance for property buyers.",
    path: "/buyer-advisory/resources",
    image:
      "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=1400&q=85",
  },
  {
    service: "property-management",
    label: "Property Owners",
    title: "Property Owner Knowledge Centre",
    description:
      "Selling, leasing, rental appraisal and property-management resources for owners and investors.",
    path: "/property-management/resources",
    image:
      "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=1400&q=85",
  },
  {
    service: "conveyancing",
    label: "Conveyancing",
    title: "Conveyancing Knowledge Centre",
    description:
      "Contract, Section 32 and settlement guidance for buyers and sellers.",
    path: "/conveyancing/resources",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1400&q=85",
  },
  {
    service: "mortgage-finance",
    label: "Mortgage & Finance",
    title: "Mortgage & Finance Knowledge Centre",
    description:
      "Borrowing preparation, home-loan education and practical finance guidance.",
    path: "/mortgage-finance/resources",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1400&q=85",
  },
];

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

export default function Articles() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Knowledge Centre | Origin Property Concierge";
  }, []);

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return [];

    return publishedKnowledgeItems.filter((item) =>
      [
        item.title,
        item.service,
        item.category,
        item.summary,
        item.excerpt,
        item.body,
        ...(item.tags || []),
      ].some((field) =>
        String(field || "").toLowerCase().includes(term)
      )
    );
  }, [query]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      <section className="border-b border-stone/60 bg-parchment pb-10 pt-28 md:pb-12 md:pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-golden">
            Knowledge Centre
          </p>

          <h1 className="font-heading text-4xl font-light tracking-tight text-midnight md:text-5xl">
            Property Knowledge, Organised Clearly
          </h1>

          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-midnight/60">
            Select a service area or search all practical guides and articles.
          </p>

          <div className="relative mx-auto mt-7 max-w-xl">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search all property resources..."
              className="w-full rounded-full border border-stone bg-white py-3.5 pl-12 pr-5 text-sm text-midnight outline-none transition focus:border-golden/60 focus:ring-2 focus:ring-golden/10"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pb-20 !pt-10">
        {isSearching ? (
          filtered.length > 0 ? (
            <div>
              <p className="mb-8 text-xs uppercase tracking-widest text-midnight/40">
                {filtered.length} {filtered.length === 1 ? "result" : "results"}
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {filtered.map((item) => (
                  <GuideCard
                    key={item.id || item.slug}
                    title={item.title}
                    category={item.category}
                    summary={item.summary || item.excerpt}
                    slug={item.slug}
                    imageUrl={item.hero_image_url}
                    readingTime={item.reading_time}
                    publishDate={formatDate(item.publish_date)}
                  />
                ))}
              </div>
            </div>
          ) : (
            <div className="py-16 text-center">
              <p className="text-midnight/50">
                No resources found for “{query}”.
              </p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 text-sm text-golden hover:underline"
              >
                Clear search
              </button>
            </div>
          )
        ) : (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {KNOWLEDGE_CENTRES.map((centre) => (
              <Link
                key={centre.service}
                to={centre.path}
                className="group relative min-h-[285px] overflow-hidden rounded-2xl border border-stone/60 bg-midnight shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
              >
                <img
                  src={centre.image}
                  alt=""
                  className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/65 to-midnight/10" />

                <div className="relative z-10 flex min-h-[285px] flex-col justify-end p-7 md:p-8">
                  <p className="mb-2 text-xs font-medium uppercase tracking-[0.2em] text-golden">
                    {centre.label}
                  </p>

                  <h2 className="font-heading text-2xl font-light leading-tight text-white md:text-3xl">
                    {centre.title}
                  </h2>

                  <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75">
                    {centre.description}
                  </p>

                  <span className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-golden">
                    Explore Knowledge Centre
                    <ArrowRight
                      size={16}
                      className="transition-transform group-hover:translate-x-1"
                    />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
