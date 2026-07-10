import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import GuideCard from "@/components/origin/GuideCard";
import SectionWrapper from "@/components/origin/SectionWrapper";
import { publishedKnowledgeItems } from "@/data/knowledgeCentre";

const SERVICE_LABELS = {
  "buyer-advisory": "Buyer Guides",
  "property-management": "Landlord & Property Owner Guides",
  conveyancing: "Conveyancing Guides",
  "mortgage-finance": "Mortgage & Finance Guides",
  selling: "Seller Guides",
};

const SERVICE_ORDER = [
  "buyer-advisory",
  "property-management",
  "conveyancing",
  "mortgage-finance",
  "selling",
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

export default function Guides() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Guides | Origin Property Concierge";
  }, []);

  const guides = useMemo(
    () =>
      publishedKnowledgeItems.filter(
        (item) => item.type === "guide" || !item.type
      ),
    []
  );

  const filtered = useMemo(() => {
    const term = query.trim().toLowerCase();

    if (!term) return guides;

    return guides.filter((item) =>
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
  }, [query, guides]);

  const grouped = useMemo(() => {
    const map = {};

    filtered.forEach((item) => {
      const service = item.service || "other";
      if (!map[service]) map[service] = [];
      map[service].push(item);
    });

    const orderedServices = [
      ...SERVICE_ORDER.filter((service) => map[service]?.length),
      ...Object.keys(map).filter(
        (service) => !SERVICE_ORDER.includes(service)
      ),
    ];

    return orderedServices.map((service) => ({
      service,
      label: SERVICE_LABELS[service] || "Property Guides",
      guides: map[service],
    }));
  }, [filtered]);

  return (
    <>
      <section className="bg-parchment pb-12 pt-28 md:pb-16 md:pt-32">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-golden">
            Knowledge Centre
          </p>

          <h1 className="font-heading mb-4 text-4xl font-light text-midnight md:text-5xl">
            Guides
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-midnight/60">
            Practical guides for buyers, landlords, sellers and property investors.
          </p>

          <div className="relative mx-auto max-w-lg">
            <Search
              size={18}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30"
            />

            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search guides..."
              className="w-full rounded-full border border-stone bg-white py-3.5 pl-12 pr-4 text-sm text-midnight outline-none focus:border-golden/50 focus:ring-2 focus:ring-golden/10"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pb-20 !pt-10">
        {grouped.length === 0 ? (
          <div className="py-16 text-center">
            <p className="text-midnight/45">
              No guides found for “{query}”.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-4 text-sm text-golden hover:underline"
            >
              Clear search
            </button>
          </div>
        ) : (
          <div className="space-y-16">
            {grouped.map(({ service, label, guides: serviceGuides }) => (
              <section key={service}>
                <div className="mb-7 flex flex-wrap items-baseline gap-4">
                  <h2 className="font-heading text-2xl font-light text-midnight md:text-3xl">
                    {label}
                  </h2>

                  <span className="text-xs tracking-wider text-midnight/30">
                    {serviceGuides.length}{" "}
                    {serviceGuides.length === 1 ? "guide" : "guides"}
                  </span>
                </div>

                <div className="mb-9 h-px w-full bg-stone" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                  {serviceGuides.map((item) => (
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
              </section>
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
}
