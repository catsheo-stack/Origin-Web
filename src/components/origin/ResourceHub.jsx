import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import articlesData from "@/data/articles";

export default function ResourceHub({
  seoTitle,
  metaDescription,
  title,
  subtitle,
  searchPlaceholder = "Search topics",
  bannerImage,
  overlayClass = "bg-accent-navy/85",
  service,
  categoryOrder = [],
  cta,
}) {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = seoTitle;

    const setMeta = (selector, attr, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      element.setAttribute(attr, content);
    };

    setMeta('meta[name="description"]', "content", metaDescription);
    setMeta('meta[property="og:title"]', "content", seoTitle);
    setMeta('meta[property="og:description"]', "content", metaDescription);
  }, [seoTitle, metaDescription]);

  const articles = useMemo(() => {
    return (Array.isArray(articlesData) ? articlesData : [])
      .filter(
        (article) =>
          article.service === service &&
          (!article.status || article.status === "published")
      )
      .sort(
        (a, b) =>
          new Date(b.publish_date || 0).getTime() -
          new Date(a.publish_date || 0).getTime()
      );
  }, [service]);

  const filteredArticles = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;

    return articles.filter((article) =>
      [
        article.title,
        article.category,
        article.summary,
        article.excerpt,
        article.body,
        ...(article.tags || []),
      ]
        .map((field) => String(field || "").toLowerCase())
        .some((field) => field.includes(q))
    );
  }, [query, articles]);

  const sections = useMemo(() => {
    const grouped = {};

    filteredArticles.forEach((article) => {
      const category = article.category || "General";
      if (!grouped[category]) grouped[category] = [];
      grouped[category].push(article);
    });

    const ordered = [
      ...categoryOrder.filter((category) => grouped[category]?.length),
      ...Object.keys(grouped).filter((category) => !categoryOrder.includes(category)),
    ];

    return ordered.map((category) => ({
      section: category,
      articles: grouped[category],
    }));
  }, [filteredArticles, categoryOrder]);

  return (
    <>
      <section className="relative overflow-hidden pb-8 pt-28 md:pb-10 md:pt-32">
        {bannerImage && (
          <img
            src={bannerImage}
            alt=""
            className="absolute inset-0 h-full w-full object-cover"
          />
        )}
        <div className={`absolute inset-0 ${overlayClass}`} />

        <div className="relative mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-golden">
            Resources
          </p>
          <h1 className="font-heading mb-2 text-3xl leading-tight text-parchment md:text-4xl">
            {title}
          </h1>
          <p className="mx-auto mb-6 max-w-xl text-sm leading-relaxed text-parchment/70">
            {subtitle}
          </p>

          <div className="relative mx-auto max-w-lg">
            <Search
              size={16}
              className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30"
            />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              className="w-full rounded-full border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-midnight shadow-lg focus:outline-none focus:ring-2 focus:ring-golden/50"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pb-20 !pt-16 md:!pb-28 md:!pt-20">
        {filteredArticles.length === 0 ? (
          <div className="mx-auto max-w-lg py-20 text-center">
            <p className="font-heading mb-3 text-xl font-light text-midnight md:text-2xl">
              {query ? "No matching resources" : "Coming soon"}
            </p>
            <p className="text-sm leading-relaxed text-midnight/50">
              {query
                ? `No resources found for “${query}”.`
                : "We are preparing practical resources for this knowledge centre."}
            </p>
            {query && (
              <button
                type="button"
                onClick={() => setQuery("")}
                className="mt-4 text-sm text-golden hover:underline"
              >
                Clear search
              </button>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {sections.map(({ section, articles }) => (
              <section key={section}>
                <div className="mb-8 flex items-baseline gap-4">
                  <h2 className="font-heading text-2xl font-light text-midnight md:text-3xl">
                    {section}
                  </h2>
                  <span className="text-xs tracking-wider text-midnight/30">
                    {articles.length} {articles.length === 1 ? "resource" : "resources"}
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
                      publishDate={article.publish_date}
                      readingTime={article.reading_time}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </SectionWrapper>

      {cta && (
        <section className="bg-accent-navy py-6 md:py-8">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 md:flex-row lg:px-10">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-lg font-light leading-tight text-parchment md:text-xl">
                {cta.title}
              </h2>
              {cta.subtitle && (
                <p className="mx-auto mt-1 max-w-lg text-xs leading-relaxed text-parchment/60 md:mx-0 md:text-sm">
                  {cta.subtitle}
                </p>
              )}
            </div>

            <div className="flex flex-col items-center gap-3 sm:flex-row">
              {cta.buttons.map((button) => (
                <Link
                  key={button.label}
                  to={button.link}
                  className={
                    button.variant === "outline"
                      ? "whitespace-nowrap rounded-full border border-parchment/30 px-6 py-2.5 text-xs font-medium text-parchment transition-colors hover:bg-parchment/10"
                      : "whitespace-nowrap rounded-full bg-golden px-6 py-2.5 text-xs font-medium text-midnight transition-colors hover:bg-golden/90"
                  }
                >
                  {button.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
