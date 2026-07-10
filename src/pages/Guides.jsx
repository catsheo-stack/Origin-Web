import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import { seededGuides } from "@/data/seededGuides";
import { buyerArticles } from "@/data/buyerResources";

const GUIDE_CATEGORIES = [
  {
    key: "buyer-advisory",
    label: "Buyer Guides",
  },
  {
    key: "property-management",
    label: "Landlord Guides",
  },
  {
    key: "conveyancing",
    label: "Conveyancing Guides",
  },
  {
    key: "mortgage-finance",
    label: "Mortgage & Finance Guides",
  },
  {
    key: "selling",
    label: "Seller Guides",
  },
];

const normaliseGuide = (guide, fallbackService) => ({
  ...guide,
  service: guide.service || fallbackService,
  summary: guide.summary || guide.excerpt || "",
  status: guide.status || "published",
});

export default function Guides() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Guides | Origin Concierge";

    const setMeta = (selector, attribute, content) => {
      let element = document.head.querySelector(selector);

      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }

      element.setAttribute(attribute, content);
    };

    setMeta(
      'meta[name="description"]',
      "content",
      "Read practical Origin Concierge guides for buyers, landlords, sellers and property investors."
    );

    setMeta(
      'meta[property="og:title"]',
      "content",
      "Guides | Origin Concierge"
    );

    setMeta(
      'meta[property="og:description"]',
      "content",
      "Read practical Origin Concierge guides for buyers, landlords, sellers and property investors."
    );
  }, []);

  const guides = useMemo(() => {
    const localGuides = [
      ...(Array.isArray(seededGuides)
        ? seededGuides.map((guide) =>
            normaliseGuide(guide, "property-management")
          )
        : []),

      ...(Array.isArray(buyerArticles)
        ? buyerArticles.map((guide) =>
            normaliseGuide(guide, "buyer-advisory")
          )
        : []),
    ];

    const uniqueGuides = new Map();

    localGuides.forEach((guide) => {
      if (
        guide?.slug &&
        guide.status === "published" &&
        !uniqueGuides.has(guide.slug)
      ) {
        uniqueGuides.set(guide.slug, guide);
      }
    });

    return Array.from(uniqueGuides.values());
  }, []);

  const groupedGuides = useMemo(() => {
    const guideMap = {};

    guides.forEach((guide) => {
      const service = guide.service || "other";

      if (!guideMap[service]) {
        guideMap[service] = [];
      }

      guideMap[service].push(guide);
    });

    return GUIDE_CATEGORIES.map((category) => ({
      ...category,
      guides: guideMap[category.key] || [],
    }));
  }, [guides]);

  const filteredGuides = useMemo(() => {
    const searchQuery = query.trim().toLowerCase();

    if (!searchQuery) {
      return [];
    }

    return guides.filter((guide) => {
      const searchableFields = [
        guide.title,
        guide.category,
        guide.summary,
        guide.excerpt,
        guide.body,
        ...(guide.tags || []),
      ];

      return searchableFields.some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(searchQuery)
      );
    });
  }, [query, guides]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      <section className="bg-parchment pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-golden">
            Knowledge Centre
          </p>

          <h1 className="font-heading mb-4 text-3xl font-light text-midnight md:text-4xl lg:text-5xl">
            Guides
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-midnight/60">
            Practical guides for buyers, landlords, sellers and property
            investors.
          </p>

          <div className="relative mx-auto max-w-lg">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30"
            />

            <input
              type="text"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search guides..."
              className="w-full rounded-full border border-stone bg-white py-3.5 pl-12 pr-4 text-sm text-midnight placeholder:text-midnight/30 transition-colors focus:border-golden/50 focus:outline-none focus:ring-2 focus:ring-golden/10"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pb-20 !pt-8">
        {isSearching ? (
          filteredGuides.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-2 text-midnight/40">
                No guides found for &ldquo;{query}&rdquo;.
              </p>

              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-sm text-golden hover:underline"
              >
                Clear search
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-8 text-xs uppercase tracking-widest text-midnight/40">
                {filteredGuides.length}{" "}
                {filteredGuides.length === 1 ? "result" : "results"}
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {filteredGuides.map((guide) => (
                  <GuideCard
                    key={guide.id || guide.slug}
                    title={guide.title}
                    category={guide.category}
                    summary={guide.summary || guide.excerpt}
                    slug={guide.slug}
                    imageUrl={guide.hero_image_url}
                  />
                ))}
              </div>
            </div>
          )
        ) : (
          <div className="space-y-20">
            {groupedGuides.map(({ key, label, guides: categoryGuides }) => (
              <section key={key}>
                <div className="mb-8 flex items-baseline gap-4">
                  <h2 className="font-heading text-2xl font-light text-midnight md:text-3xl">
                    {label}
                  </h2>

                  {categoryGuides.length > 0 && (
                    <span className="text-xs tracking-wider text-midnight/30">
                      {categoryGuides.length}{" "}
                      {categoryGuides.length === 1 ? "guide" : "guides"}
                    </span>
                  )}
                </div>

                <div className="mb-10 h-px w-full bg-stone" />

                {categoryGuides.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                    {categoryGuides.map((guide) => (
                      <GuideCard
                        key={guide.id || guide.slug}
                        title={guide.title}
                        category={guide.category}
                        summary={guide.summary || guide.excerpt}
                        slug={guide.slug}
                        imageUrl={guide.hero_image_url}
                      />
                    ))}
                  </div>
                ) : (
                  <div className="rounded-xl border border-stone/60 bg-white p-8 text-center">
                    <p className="text-sm text-midnight/40">
                      Coming soon — we are preparing guides for this category.
                    </p>
                  </div>
                )}
              </section>
            ))}
          </div>
        )}
      </SectionWrapper>
    </>
  );
}