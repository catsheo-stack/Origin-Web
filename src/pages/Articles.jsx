import React, { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";

import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import articlesData from "@/data/articles";

const SERVICE_LABELS = {
  "buyer-advisory": "Buyer Advisory Articles",
  "property-management": "Property Management Articles",
  conveyancing: "Conveyancing Articles",
  "mortgage-finance": "Mortgage & Finance Articles",
};

const SERVICE_ORDER = [
  "buyer-advisory",
  "property-management",
  "conveyancing",
  "mortgage-finance",
];

export default function Articles() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Articles | Origin Concierge";

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
      "Explore Origin Concierge articles on buying property, property management, conveyancing and mortgage finance."
    );

    setMeta(
      'meta[property="og:title"]',
      "content",
      "Articles | Origin Concierge"
    );

    setMeta(
      'meta[property="og:description"]',
      "content",
      "Explore Origin Concierge articles on buying property, property management, conveyancing and mortgage finance."
    );
  }, []);

  const publishedArticles = useMemo(() => {
    return articlesData
      .filter((article) => article.status === "published")
      .sort(
        (a, b) =>
          new Date(b.publish_date).getTime() -
          new Date(a.publish_date).getTime()
      );
  }, []);

  const groupedArticles = useMemo(() => {
    const groupedMap = {};

    publishedArticles.forEach((article) => {
      const service = article.service || "other";

      if (!groupedMap[service]) {
        groupedMap[service] = [];
      }

      groupedMap[service].push(article);
    });

    const orderedServices = SERVICE_ORDER.filter(
      (service) => groupedMap[service]?.length > 0
    );

    const remainingServices = Object.keys(groupedMap).filter(
      (service) =>
        !SERVICE_ORDER.includes(service) &&
        service !== "other" &&
        groupedMap[service]?.length > 0
    );

    return [...orderedServices, ...remainingServices].map((service) => ({
      service,
      label: SERVICE_LABELS[service] || service,
      articles: groupedMap[service],
    }));
  }, [publishedArticles]);

  const filteredArticles = useMemo(() => {
    const normalisedQuery = query.trim().toLowerCase();

    if (!normalisedQuery) {
      return [];
    }

    return publishedArticles.filter((article) => {
      const searchableFields = [
        article.title,
        article.category,
        article.summary,
        article.excerpt,
        article.body,
        ...(article.tags || []),
      ];

      return searchableFields.some((field) =>
        String(field || "")
          .toLowerCase()
          .includes(normalisedQuery)
      );
    });
  }, [query, publishedArticles]);

  const isSearching = query.trim().length > 0;

  return (
    <>
      <section className="bg-parchment pb-12 pt-32 md:pb-16 md:pt-40">
        <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-golden">
            Knowledge Centre
          </p>

          <h1 className="font-heading mb-4 text-3xl font-light text-midnight md:text-4xl lg:text-5xl">
            Articles
          </h1>

          <p className="mx-auto mb-8 max-w-xl text-base leading-relaxed text-midnight/60">
            Explore practical guidance on buying property, property management,
            conveyancing and mortgage finance.
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
              placeholder="Search articles..."
              className="w-full rounded-full border border-stone bg-white py-3.5 pl-12 pr-4 text-sm text-midnight placeholder:text-midnight/30 focus:border-golden/50 focus:outline-none focus:ring-2 focus:ring-golden/10"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pb-20 !pt-8">
        {isSearching ? (
          filteredArticles.length === 0 ? (
            <div className="py-16 text-center">
              <p className="mb-2 text-midnight/40">
                No articles found for &ldquo;{query}&rdquo;.
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
                {filteredArticles.length}{" "}
                {filteredArticles.length === 1 ? "result" : "results"}
              </p>

              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                {filteredArticles.map((article) => (
                  <GuideCard
                    key={article.id || article.slug}
                    title={article.title}
                    category={article.category}
                    summary={article.summary || article.excerpt}
                    slug={article.slug}
                    imageUrl={article.hero_image_url}
                  />
                ))}
              </div>
            </div>
          )
        ) : groupedArticles.length === 0 ? (
          <div className="mx-auto max-w-lg py-20 text-center">
            <p className="font-heading mb-3 text-xl font-light text-midnight md:text-2xl">
              Coming soon
            </p>

            <p className="text-sm leading-relaxed text-midnight/50">
              We are curating practical property articles for you.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {groupedArticles.map(({ service, label, articles }) => (
              <section key={service}>
                <div className="mb-8 flex items-baseline gap-4">
                  <h2 className="font-heading text-2xl font-light text-midnight md:text-3xl">
                    {label}
                  </h2>

                  <span className="text-xs tracking-wider text-midnight/30">
                    {articles.length}{" "}
                    {articles.length === 1 ? "article" : "articles"}
                  </span>
                </div>

                <div className="mb-10 h-px w-full bg-stone" />

                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {articles.map((article) => (
                    <GuideCard
                      key={article.id || article.slug}
                      title={article.title}
                      category={article.category}
                      summary={article.summary || article.excerpt}
                      slug={article.slug}
                      imageUrl={article.hero_image_url}
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