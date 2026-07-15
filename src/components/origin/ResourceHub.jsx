import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";

import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import { publishedKnowledgeItems } from "@/data/knowledgeCentre";

const formatDate = (value, locale = "en-AU") => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString(locale, {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
};

const EN_LABELS = {
  eyebrow: "Resources",
  noMatches: "No matching resources",
  comingSoon: "Coming soon",
  noMatchesText: (query) => `No resources matched “${query}”. Try another search term.`,
  comingSoonText: "We are preparing practical resources for this knowledge centre.",
  clearSearch: "Clear search",
  resource: "resource",
  resources: "resources",
  readGuide: "Read guide",
  minuteRead: "min read",
};

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
  items = publishedKnowledgeItems,
  labels = EN_LABELS,
  locale = "en-AU",
  linkPrefix = "/article",
}) {
  const [query, setQuery] = useState("");
  const text = { ...EN_LABELS, ...labels };

  useEffect(() => {
    document.title = seoTitle;

    const setMeta = (selector, attribute, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', "content", metaDescription);
    setMeta('meta[property="og:title"]', "content", seoTitle);
    setMeta('meta[property="og:description"]', "content", metaDescription);
  }, [seoTitle, metaDescription]);

  const serviceItems = useMemo(
    () => items.filter((item) => item.service === service),
    [items, service]
  );

  const filteredItems = useMemo(() => {
    const term = query.trim().toLowerCase();
    if (!term) return serviceItems;

    return serviceItems.filter((item) =>
      [
        item.title,
        item.originalTitle,
        item.category,
        item.originalCategory,
        item.summary,
        item.excerpt,
        item.body,
        ...(item.tags || []),
      ].some((field) => String(field || "").toLowerCase().includes(term))
    );
  }, [query, serviceItems]);

  const groupedSections = useMemo(() => {
    const groups = {};
    filteredItems.forEach((item) => {
      const category = item.category || "General";
      if (!groups[category]) groups[category] = [];
      groups[category].push(item);
    });

    const ordered = [
      ...categoryOrder.filter((category) => groups[category]?.length),
      ...Object.keys(groups).filter((category) => !categoryOrder.includes(category)),
    ];

    return ordered.map((category) => ({ section: category, items: groups[category] }));
  }, [filteredItems, categoryOrder]);

  return (
    <>
      <section className="relative overflow-hidden pb-9 pt-28 md:pb-11 md:pt-32">
        {bannerImage && <img src={bannerImage} alt="" className="absolute inset-0 h-full w-full object-cover" />}
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="relative z-10 mx-auto max-w-3xl px-6 text-center lg:px-10">
          <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-golden">{text.eyebrow}</p>
          <h1 className="font-heading mb-2 text-3xl leading-tight text-parchment md:text-4xl">{title}</h1>
          <p className="mx-auto mb-6 max-w-2xl text-sm leading-relaxed text-parchment/75 md:text-base">{subtitle}</p>
          <div className="relative mx-auto max-w-lg">
            <Search size={16} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30" />
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder={searchPlaceholder}
              aria-label={searchPlaceholder}
              className="w-full rounded-full border-0 bg-white py-3.5 pl-11 pr-4 text-sm text-midnight shadow-lg outline-none focus:ring-2 focus:ring-golden/50"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pb-20 !pt-12 md:!pb-28 md:!pt-16">
        {filteredItems.length === 0 ? (
          <div className="mx-auto max-w-lg py-16 text-center">
            <h2 className="font-heading mb-3 text-2xl font-light text-midnight">{query ? text.noMatches : text.comingSoon}</h2>
            <p className="text-sm leading-relaxed text-midnight/50">{query ? text.noMatchesText(query) : text.comingSoonText}</p>
            {query && <button type="button" onClick={() => setQuery("")} className="mt-5 text-sm font-medium text-golden hover:underline">{text.clearSearch}</button>}
          </div>
        ) : (
          <div className="space-y-16">
            {groupedSections.map(({ section, items: sectionItems }) => (
              <section key={section}>
                <div className="mb-7 flex flex-wrap items-baseline gap-4">
                  <h2 className="font-heading text-2xl font-light text-midnight md:text-3xl">{section}</h2>
                  <span className="text-xs tracking-wider text-midnight/30">{sectionItems.length} {sectionItems.length === 1 ? text.resource : text.resources}</span>
                </div>
                <div className="mb-9 h-px w-full bg-stone" />
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 md:gap-8 lg:grid-cols-3">
                  {sectionItems.map((item) => (
                    <GuideCard
                      key={item.id || item.slug}
                      title={item.title}
                      category={item.category}
                      summary={item.summary || item.excerpt}
                      slug={item.slug}
                      imageUrl={item.hero_image_url}
                      readingTime={item.reading_time}
                      publishDate={formatDate(item.publish_date, locale)}
                      linkPrefix={linkPrefix}
                      readLabel={text.readGuide}
                      minuteLabel={text.minuteRead}
                    />
                  ))}
                </div>
              </section>
            ))}
          </div>
        )}
      </SectionWrapper>

      {cta && (
        <section className="bg-accent-navy py-7 md:py-9">
          <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-5 px-6 md:flex-row lg:px-10">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-xl font-light leading-tight text-parchment">{cta.title}</h2>
              {cta.subtitle && <p className="mt-1 max-w-lg text-sm leading-relaxed text-parchment/65">{cta.subtitle}</p>}
            </div>
            <div className="flex flex-col items-center gap-3 sm:flex-row">
              {(cta.buttons || []).map((button) => (
                <Link key={`${button.label}-${button.link}`} to={button.link} className={button.variant === "outline" ? "whitespace-nowrap rounded-full border border-parchment/30 px-6 py-2.5 text-xs font-medium text-parchment transition-colors hover:bg-parchment/10" : "whitespace-nowrap rounded-full bg-golden px-6 py-2.5 text-xs font-medium text-midnight transition-colors hover:bg-golden/90"}>{button.label}</Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}
