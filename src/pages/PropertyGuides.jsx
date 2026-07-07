import React, { useState, useEffect, useMemo } from 'react';
import { Search } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionWrapper from '@/components/origin/SectionWrapper';
import GuideCard from '@/components/origin/GuideCard';
import { seededGuides, categoryOrder } from '@/data/seededGuides';

export default function PropertyGuides() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [query, setQuery] = useState('');

  useEffect(() => {
    base44.analytics.track({ eventName: 'page_viewed', properties: { page: 'property-guides' } });
    const load = async () => {
      let cmsArticles = [];
      try {
        cmsArticles = await base44.entities.Article.filter({ status: 'published' }, '-created_date', 50);
      } catch {
        // CMS unavailable — fall back to seeded guides only
      }
      const cmsSlugs = new Set(cmsArticles.map((a) => a.slug));
      const merged = [...cmsArticles, ...seededGuides.filter((g) => !cmsSlugs.has(g.slug))];
      setArticles(merged);
      setLoading(false);
    };
    load();
  }, []);

  // Client-side search across title, category, summary, body
  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return articles;
    return articles.filter((a) =>
      [a.title, a.category, a.summary, a.body].some((field) =>
        (field || '').toLowerCase().includes(q)
      )
    );
  }, [articles, query]);

  const isSearching = query.trim().length > 0;

  // Group filtered guides by category (preserving defined order)
  const grouped = categoryOrder
    .map((cat) => ({ category: cat, guides: filtered.filter((a) => a.category === cat) }))
    .filter((g) => g.guides.length > 0);

  return (
    <>
      {/* Navy hero with integrated search */}
      <section className="bg-accent-navy pt-28 md:pt-32 pb-8 md:pb-10">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-3">
            Resources
          </p>
          <h1 className="font-heading text-3xl md:text-4xl text-parchment mb-2 leading-tight">
            Property Management Knowledge Centre
          </h1>
          <p className="text-sm text-parchment/60 mb-6 max-w-xl mx-auto leading-relaxed">
            Landlord guides, checklists, FAQs and rental resources — curated for Melbourne investors.
          </p>
          <div className="relative max-w-lg mx-auto">
            <Search size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30 pointer-events-none" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search property management topics"
              className="w-full border-0 rounded-full pl-11 pr-4 py-3.5 text-sm font-body text-midnight bg-white focus:outline-none focus:ring-2 focus:ring-golden/50 shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Guides */}
      <SectionWrapper className="!pt-16 md:!pt-20 !pb-20 md:!pb-28">
        {loading ? (
          <div className="text-center py-16">
            <div className="w-8 h-8 border-4 border-stone border-t-golden rounded-full animate-spin mx-auto" />
          </div>
        ) : grouped.length === 0 ? (
          <div className="text-center py-16">
            <p className="text-midnight/40 mb-2">No guides found for "{query}".</p>
            <button onClick={() => setQuery('')} className="text-sm text-golden hover:underline">
              Clear search
            </button>
          </div>
        ) : isSearching ? (
          <div>
            <p className="text-xs tracking-widest uppercase text-midnight/40 mb-8">
              {filtered.length} result{filtered.length !== 1 ? 's' : ''}
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
        ) : (
          <div className="space-y-20">
            {grouped.map(({ category, guides }) => (
              <section key={category}>
                <div className="flex items-baseline gap-4 mb-8">
                  <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight">
                    {category}
                  </h2>
                  <span className="text-xs text-midnight/30 tracking-wider">
                    {guides.length} {guides.length === 1 ? 'guide' : 'guides'}
                  </span>
                </div>
                <div className="w-full h-px bg-stone mb-10" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
                  {guides.map((article) => (
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
    </>
  );
}