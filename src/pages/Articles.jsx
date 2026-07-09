import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";

const SERVICE_LABELS = {
  "buyer-advisory": "Buyer Advisory Articles",
  "property-management": "Property Management Articles",
  "conveyancing": "Conveyancing Articles",
  "mortgage-finance": "Mortgage & Finance Articles",
};

const SERVICE_ORDER = ["buyer-advisory", "property-management", "conveyancing", "mortgage-finance"];

export default function Articles() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Articles | Origin Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Explore Origin Concierge articles on buying property, property management, conveyancing and mortgage finance.");
    setMeta('meta[property="og:title"]', "content", "Articles | Origin Concierge");
    setMeta('meta[property="og:description"]', "content", "Explore Origin Concierge articles on buying property, property management, conveyancing and mortgage finance.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "articles" } });

    const load = async () => {
      try {
        const results = await base44.entities.Article.filter({ status: "published" }, "-publish_date", 100);
        setArticles(results);
      } catch {
        setArticles([]);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const grouped = useMemo(() => {
    const map = {};
    articles.forEach((a) => {
      const svc = a.service || "other";
      if (!map[svc]) map[svc] = [];
      map[svc].push(a);
    });
    const ordered = SERVICE_ORDER.filter((s) => map[s] && map[s].length > 0);
    const remaining = Object.keys(map).filter((s) => !SERVICE_ORDER.includes(s) && s !== "other");
    const other = map["other"] ? ["other"] : [];
    return [...ordered, ...remaining, ...other]
      .filter((s) => s !== "other")
      .map((s) => ({ service: s, label: SERVICE_LABELS[s] || s, articles: map[s] }));
  }, [articles]);

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles.filter((a) =>
      [a.title, a.category, a.summary, a.body, ...(a.tags || [])].some((field) =>
        (field || "").toLowerCase().includes(q)
      )
    );
  }, [query, articles]);

  return (
    <>
      {/* Hero */}
      <section className="bg-parchment pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-3">Knowledge Centre</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-midnight mb-4">Articles</h1>
          <p className="text-base text-midnight/60 leading-relaxed mb-8 max-w-xl mx-auto">
            Explore expert articles on buying property, property management, conveyancing and mortgage finance.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search articles..."
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-stone bg-white text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:border-golden/50 focus:ring-2 focus:ring-golden/10 transition-colors"
            />
          </div>
        </div>
      </section>

      {/* Content */}
      <SectionWrapper className="!pt-8 !pb-20">
        {loading ? (
          <div className="flex justify-center py-20">
            <div className="w-8 h-8 border-4 border-stone border-t-golden rounded-full animate-spin" />
          </div>
        ) : isSearching ? (
          filtered.length === 0 ? (
            <div className="text-center py-16">
              <p className="text-midnight/40 mb-2">No articles found for &ldquo;{query}&rdquo;.</p>
              <button onClick={() => setQuery("")} className="text-sm text-golden hover:underline">Clear search</button>
            </div>
          ) : (
            <div>
              <p className="text-xs tracking-widest uppercase text-midnight/40 mb-8">{filtered.length} result{filtered.length !== 1 ? "s" : ""}</p>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                {filtered.map((article) => (
                  <GuideCard key={article.id || article.slug} title={article.title} category={article.category} summary={article.summary} slug={article.slug} imageUrl={article.hero_image_url} />
                ))}
              </div>
            </div>
          )
        ) : grouped.length === 0 ? (
          <div className="text-center py-20 max-w-lg mx-auto">
            <p className="font-heading text-xl md:text-2xl font-light text-midnight mb-3">Coming soon</p>
            <p className="text-sm text-midnight/50 leading-relaxed">We&rsquo;re curating expert articles for you. In the meantime, feel free to reach out with any questions.</p>
          </div>
        ) : (
          <div className="space-y-20">
            {grouped.map(({ service, label, articles }) => (
              <section key={service}>
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight">{label}</h2>
                  <span className="text-xs text-midnight/30 tracking-wider">{articles.length} {articles.length === 1 ? "article" : "articles"}</span>
                </div>
                <div className="w-full h-px bg-stone mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {articles.map((article) => (
                    <GuideCard key={article.id || article.slug} title={article.title} category={article.category} summary={article.summary} slug={article.slug} imageUrl={article.hero_image_url} />
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