import React, { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";

/**
 * Shared layout for all service Knowledge Centre hubs.
 * Pass a `service` prop to fetch published articles from the unified Article
 * entity filtered by service. Articles are grouped by `category`, ordered by
 * `categoryOrder`. One unified article system — each hub shows only its own.
 */
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
  sections = [],
  analyticsPage,
  cta,
}) {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(!!service);

  useEffect(() => {
    document.title = seoTitle;
    const setMeta = (selector, attr, content) => {
      let el = document.head.querySelector(selector);
      if (!el) {
        el = document.createElement("meta");
        document.head.appendChild(el);
      }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", metaDescription);
    setMeta('meta[property="og:title"]', "content", seoTitle);
    setMeta('meta[property="og:description"]', "content", metaDescription);
    base44.analytics.track({ eventName: "page_viewed", properties: { page: analyticsPage } });

    if (service) {
      const load = async () => {
        try {
          const results = await base44.entities.Article.filter(
            { service, status: "published" },
            "-publish_date",
            100
          );
          setArticles(results);
        } catch {
          setArticles([]);
        } finally {
          setLoading(false);
        }
      };
      load();
    }
  }, [seoTitle, metaDescription, analyticsPage, service]);

  const resolvedSections = useMemo(() => {
    if (service) {
      const map = {};
      articles.forEach((a) => {
        const cat = a.category || "Other";
        if (!map[cat]) map[cat] = [];
        map[cat].push(a);
      });
      const ordered = categoryOrder.filter((cat) => map[cat] && map[cat].length > 0);
      const remaining = Object.keys(map).filter((cat) => !categoryOrder.includes(cat));
      return [...ordered, ...remaining].map((cat) => ({ section: cat, articles: map[cat] }));
    }
    return sections;
  }, [service, articles, categoryOrder, sections]);

  const allArticles = useMemo(
    () => resolvedSections.flatMap((s) => s.articles || []),
    [resolvedSections]
  );

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return allArticles.filter((a) =>
      [a.title, a.category, a.summary, a.body, ...(a.tags || [])].some((field) =>
        (field || "").toLowerCase().includes(q)
      )
    );
  }, [query, allArticles]);

  const hasContent = resolvedSections.length > 0;

  return (
    <>
      {/* Hero */}
      <section className="relative pt-28 md:pt-32 pb-8 md:pb-10 overflow-hidden">
        {bannerImage && (
          <img src={bannerImage} alt="" className="absolute inset-0 w-full h-full object-cover" />
        )}
        <div className={`absolute inset-0 ${overlayClass}`} />
        <div className="relative max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-3">Resources</p>
          <h1 className="font-heading text-3xl md:text-4xl text-parchment mb-2 leading-tight">{title}</h1>
          <p className="text-sm text-parchment/70 mb-6 max-w-xl mx-auto leading-relaxed">{subtitle}</p>
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={searchPlaceholder}
              className="w-full border-0 rounded-full pl-11 pr-4 py-3.5 text-sm font-body text-midnight bg-white focus:outline-none focus:ring-2 focus:ring-golden/50 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper className="!pt-16 md:!pt-20 !pb-20 md:!pb-28">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-stone border-t-golden rounded-full animate-spin" />
          </div>
        ) : isSearching ? (
          filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-midnight/40 mb-2">No guides found for "{query}".</p>
              <button onClick={() => setQuery("")} className="text-sm text-golden hover:underline">
                Clear search
              </button>
            </div>
          ) : (
            <div>
              <p className="text-xs tracking-widest uppercase text-midnight/40 mb-8">
                {filtered.length} result{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((article) => (
                  <GuideCard
                    key={article.id || article.slug}
                    title={article.title}
                    category={article.category}
                    summary={article.summary}
                    slug={article.slug}
                    imageUrl={article.hero_image_url}
                  />
                ))}
              </div>
            </div>
          )
        ) : !hasContent ? (
          <div className="text-center py-20 max-w-lg mx-auto">
            <p className="font-heading text-xl md:text-2xl font-light text-midnight mb-3">Coming soon</p>
            <p className="text-sm text-midnight/50 leading-relaxed">
              We're curating expert guides, checklists and resources for this service. In the meantime, feel free to reach out — we're happy to help with your questions.
            </p>
          </div>
        ) : (
          <div className="space-y-20">
            {resolvedSections.map(({ section, articles }) => (
              <section key={section}>
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight">{section}</h2>
                  <span className="text-xs text-midnight/30 tracking-wider">
                    {articles.length} {articles.length === 1 ? "guide" : "guides"}
                  </span>
                </div>
                <div className="w-full h-px bg-stone mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {articles.map((article) => (
                    <GuideCard
                      key={article.id || article.slug}
                      title={article.title}
                      category={article.category}
                      summary={article.summary}
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

      {/* CTA */}
      {cta && (
        <section className="bg-accent-navy py-6 md:py-8">
          <div className="max-w-7xl mx-auto px-6 lg:px-10 flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="text-center md:text-left">
              <h2 className="font-heading text-lg md:text-xl font-light text-parchment leading-tight">{cta.title}</h2>
              {cta.subtitle && (
                <p className="mt-1 text-xs md:text-sm text-parchment/60 max-w-lg mx-auto md:mx-0 leading-relaxed font-body">{cta.subtitle}</p>
              )}
            </div>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              {cta.buttons.map((btn, i) => (
                <Link
                  key={i}
                  to={btn.link}
                  className={
                    btn.variant === "outline"
                      ? "border border-parchment/30 text-parchment text-xs font-medium px-6 py-2.5 rounded-full hover:bg-parchment/10 transition-colors whitespace-nowrap"
                      : "bg-golden text-midnight text-xs font-medium px-6 py-2.5 rounded-full hover:bg-golden/90 transition-colors whitespace-nowrap"
                  }
                  onClick={() => { base44.analytics.track({ eventName: "cta_clicked", properties: { cta: btn.analyticsKey || btn.label } }); }}
                >
                  {btn.label}
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}
    </>
  );
}