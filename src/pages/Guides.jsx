import React, { useState, useEffect, useMemo } from "react";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import { seededGuides } from "@/data/seededGuides";
import { buyerArticles } from "@/data/buyerResources";

const GUIDE_CATEGORIES = [
  { key: "buyer-advisory", label: "Buyer Guides" },
  { key: "property-management", label: "Landlord Guides" },
  { key: "conveyancing", label: "Conveyancing Guides" },
  { key: "mortgage-finance", label: "Mortgage & Finance Guides" },
  { key: "selling", label: "Seller Guides" },
];

export default function Guides() {
  const [query, setQuery] = useState("");
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    document.title = "Guides | Origin Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Read practical Origin Concierge guides for buyers, landlords, sellers and property investors.");
    setMeta('meta[property="og:title"]', "content", "Guides | Origin Concierge");
    setMeta('meta[property="og:description"]', "content", "Read practical Origin Concierge guides for buyers, landlords, sellers and property investors.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "guides" } });

    const load = async () => {
      let cmsArticles = [];
      try {
        cmsArticles = await base44.entities.Article.filter({ status: "published" }, "-created_date", 100);
      } catch {
        // CMS unavailable — fall back to seeded guides only
      }
      const taggedSeeded = seededGuides.map((g) => ({ ...g, service: "property-management" }));
      const taggedBuyer = buyerArticles.map((g) => ({ ...g, service: "buyer-advisory" }));
      const cmsSlugs = new Set(cmsArticles.map((a) => a.slug));
      const merged = [...cmsArticles, ...taggedSeeded.filter((g) => !cmsSlugs.has(g.slug)), ...taggedBuyer.filter((g) => !cmsSlugs.has(g.slug))];
      setArticles(merged);
      setLoading(false);
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
    return GUIDE_CATEGORIES.map((cat) => ({ ...cat, guides: map[cat.key] || [] }));
  }, [articles]);

  const isSearching = query.trim().length > 0;

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return articles.filter((a) =>
      [a.title, a.category, a.summary, a.body].some((field) =>
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
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-midnight mb-4">Guides</h1>
          <p className="text-base text-midnight/60 leading-relaxed mb-8 max-w-xl mx-auto">
            Practical guides for buyers, landlords, sellers and property investors.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search guides..."
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
              <p className="text-midnight/40 mb-2">No guides found for &ldquo;{query}&rdquo;.</p>
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
        ) : (
          <div className="space-y-20">
            {grouped.map(({ key, label, guides }) => (
              <section key={key}>
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight">{label}</h2>
                  {guides.length > 0 && (
                    <span className="text-xs text-midnight/30 tracking-wider">{guides.length} {guides.length === 1 ? "guide" : "guides"}</span>
                  )}
                </div>
                <div className="w-full h-px bg-stone mb-10" />
                {guides.length > 0 ? (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                    {guides.map((article) => (
                      <GuideCard key={article.id || article.slug} title={article.title} category={article.category} summary={article.summary} slug={article.slug} imageUrl={article.hero_image_url} />
                    ))}
                  </div>
                ) : (
                  <div className="bg-white rounded-xl border border-stone/60 p-8 text-center">
                    <p className="text-sm text-midnight/40">Coming soon &mdash; we&rsquo;re preparing guides for this category.</p>
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