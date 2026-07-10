import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, Search } from "lucide-react";
import articlesData from "@/data/articles";

const KNOWLEDGE_CENTRES = [
  {
    service: "buyer-advisory",
    title: "Buyer Advisory",
    label: "Buyer Advisory Knowledge Centre",
    description:
      "Property search guidance, due diligence, negotiation strategies and practical resources for buyers.",
    path: "/buyer-advisory/resources",
    image:
      "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1600&q=85",
  },
  {
    service: "property-management",
    title: "Property Owners",
    label: "Property Owner Knowledge Centre",
    description:
      "Selling, leasing, rental appraisal and property management guidance for owners and investors.",
    path: "/property-management/resources",
    image:
      "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1600&q=85",
  },
  {
    service: "conveyancing",
    title: "Conveyancing",
    label: "Conveyancing Knowledge Centre",
    description:
      "Contract review, Section 32, settlement preparation and property transaction guidance.",
    path: "/conveyancing/resources",
    image:
      "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=1600&q=85",
  },
  {
    service: "mortgage-finance",
    title: "Mortgage & Finance",
    label: "Mortgage & Finance Knowledge Centre",
    description:
      "Borrowing preparation, home loan guidance and finance resources for property buyers and owners.",
    path: "/mortgage-finance/resources",
    image:
      "https://images.unsplash.com/photo-1554224155-8d04cb21cd6c?auto=format&fit=crop&w=1600&q=85",
  },
];

export default function Articles() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "Knowledge Centre | Origin Property Concierge";

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
      "Explore Origin Property Concierge knowledge centres for buyer advisory, property ownership, conveyancing, mortgage and finance."
    );
  }, []);

  const publishedArticles = useMemo(
    () =>
      (Array.isArray(articlesData) ? articlesData : []).filter(
        (article) => !article.status || article.status === "published"
      ),
    []
  );

  const filteredCentres = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return KNOWLEDGE_CENTRES;

    return KNOWLEDGE_CENTRES.filter((centre) => {
      const serviceArticles = publishedArticles.filter(
        (article) => article.service === centre.service
      );

      const searchable = [
        centre.title,
        centre.label,
        centre.description,
        ...serviceArticles.flatMap((article) => [
          article.title,
          article.category,
          article.summary,
          article.excerpt,
          ...(article.tags || []),
        ]),
      ]
        .map((value) => String(value || "").toLowerCase())
        .join(" ");

      return searchable.includes(q);
    });
  }, [query, publishedArticles]);

  return (
    <main className="min-h-screen bg-parchment">
      <section className="border-b border-stone/60 bg-parchment pb-10 pt-28 md:pb-12 md:pt-32">
        <div className="mx-auto max-w-4xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.22em] text-golden">
            Knowledge Centre
          </p>
          <h1 className="font-heading text-4xl font-light tracking-tight text-midnight md:text-5xl">
            Property Knowledge, Organised Clearly
          </h1>
          <p className="mx-auto mt-4 max-w-2xl text-base leading-relaxed text-midnight/60">
            Select the area most relevant to you and explore practical articles,
            guides, tools and property resources.
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
              placeholder="Search knowledge centres..."
              aria-label="Search knowledge centres"
              className="w-full rounded-full border border-stone bg-white py-3.5 pl-12 pr-5 text-sm text-midnight outline-none transition focus:border-golden/60 focus:ring-2 focus:ring-golden/10"
            />
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 py-10 lg:px-10 lg:py-12">
        {filteredCentres.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
            {filteredCentres.map((centre) => {
              const count = publishedArticles.filter(
                (article) => article.service === centre.service
              ).length;

              return (
                <Link
                  key={centre.service}
                  to={centre.path}
                  className="group relative min-h-[290px] overflow-hidden rounded-2xl border border-stone/60 bg-midnight shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl focus:outline-none focus:ring-2 focus:ring-golden focus:ring-offset-2"
                >
                  <img
                    src={centre.image}
                    alt=""
                    loading="lazy"
                    className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-midnight via-midnight/65 to-midnight/10" />

                  <div className="relative z-10 flex min-h-[290px] flex-col justify-end p-7 md:p-8">
                    <div className="mb-2 flex items-center gap-3">
                      <p className="text-xs font-medium uppercase tracking-[0.2em] text-golden">
                        {centre.title}
                      </p>
                      <span className="text-xs text-white/55">
                        {count} {count === 1 ? "article" : "articles"}
                      </span>
                    </div>

                    <h2 className="font-heading text-2xl font-light leading-tight text-white md:text-3xl">
                      {centre.label}
                    </h2>
                    <p className="mt-3 max-w-xl text-sm leading-relaxed text-white/75 md:text-base">
                      {centre.description}
                    </p>
                    <div className="mt-5 inline-flex items-center gap-2 text-sm font-medium text-golden">
                      Explore Knowledge Centre
                      <ArrowRight
                        size={16}
                        className="transition-transform duration-300 group-hover:translate-x-1"
                      />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-stone/60 bg-white px-6 py-14 text-center">
            <h2 className="font-heading text-2xl text-midnight">
              No matching knowledge centre
            </h2>
            <p className="mt-2 text-sm text-midnight/50">
              Try searching for buyer, landlord, conveyancing, mortgage or finance.
            </p>
            <button
              type="button"
              onClick={() => setQuery("")}
              className="mt-5 text-sm font-medium text-golden hover:underline"
            >
              Clear search
            </button>
          </div>
        )}
      </section>
    </main>
  );
}
