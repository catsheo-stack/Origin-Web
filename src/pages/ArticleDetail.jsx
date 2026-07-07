import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { base44 } from '@/api/base44Client';
import { seededGuides } from '@/data/seededGuides';
import SectionWrapper from '@/components/origin/SectionWrapper';
import GuideCard from '@/components/origin/GuideCard';
import FAQAccordion from '@/components/origin/FAQAccordion';
import CTABanner from '@/components/origin/CTABanner';

export default function ArticleDetail() {
  const { slug } = useParams();
  const [article, setArticle] = useState(null);
  const [related, setRelated] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      try {
        const results = await base44.entities.Article.filter({ slug, status: 'published' });
        const found = results.length > 0 ? results[0] : seededGuides.find((g) => g.slug === slug) || null;

        if (found) {
          setArticle(found);
          base44.analytics.track({ eventName: 'guide_opened', properties: { guide: slug } });

          // Related: other seeded guides (same category first), excluding current
          const sameCat = seededGuides.filter((g) => g.slug !== slug && g.category === found.category);
          const otherCat = seededGuides.filter((g) => g.slug !== slug && g.category !== found.category);
          setRelated([...sameCat, ...otherCat].slice(0, 3));
        }
      } catch {
        // CMS unavailable — try seeded guide directly
        const found = seededGuides.find((g) => g.slug === slug) || null;
        if (found) {
          setArticle(found);
          const sameCat = seededGuides.filter((g) => g.slug !== slug && g.category === found.category);
          const otherCat = seededGuides.filter((g) => g.slug !== slug && g.category !== found.category);
          setRelated([...sameCat, ...otherCat].slice(0, 3));
        }
      } finally {
        setLoading(false);
      }
    };
    load();
  }, [slug]);

  if (loading) {
    return (
      <SectionWrapper className="pt-32 min-h-[50vh] flex items-center">
        <div className="w-8 h-8 border-4 border-stone border-t-golden rounded-full animate-spin mx-auto" />
      </SectionWrapper>
    );
  }

  if (!article) {
    return (
      <SectionWrapper className="pt-32">
        <div className="text-center py-20">
          <h1 className="font-heading text-2xl text-midnight mb-4">Article not found</h1>
          <Link to="/property-guides" className="text-golden hover:text-golden/80 text-sm">
            ← Back to Property Guides
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  return (
    <>
      <section className="bg-parchment pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link to="/property-guides" className="inline-flex items-center gap-2 text-sm text-midnight/50 hover:text-accent-navy transition-colors mb-8">
            <ArrowLeft size={14} />
            Property Guides
          </Link>
          {article.category && (
            <p className="text-xs font-medium tracking-widest uppercase text-golden mb-4">{article.category}</p>
          )}
          <h1 className="font-heading text-3xl md:text-4xl lg:text-[2.75rem] font-light text-midnight leading-tight mb-4">
            {article.title}
          </h1>
          {article.summary && (
            <p className="text-base text-midnight/60 leading-relaxed">{article.summary}</p>
          )}
        </div>
      </section>

      {article.hero_image_url && (
        <section className="bg-parchment pb-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <img src={article.hero_image_url} alt={article.title} className="w-full rounded-xl object-cover aspect-[16/9]" />
          </div>
        </section>
      )}

      <section className="bg-parchment pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <ReactMarkdown
            components={{
              h2: ({node, ...props}) => <h2 className="font-heading text-xl text-midnight mt-8 mb-3" {...props} />,
              p: ({node, ...props}) => <p className="text-base text-midnight/60 leading-relaxed mb-4" {...props} />,
              ul: ({node, ...props}) => <ul className="list-disc pl-5 space-y-1 mb-4" {...props} />,
              li: ({node, ...props}) => <li className="text-base text-midnight/60 leading-relaxed" {...props} />,
              strong: ({node, ...props}) => <strong className="text-midnight font-medium" {...props} />,
            }}
          >
            {article.body}
          </ReactMarkdown>
        </div>
      </section>

      {article.faq_items && article.faq_items.length > 0 && (
        <SectionWrapper bg="bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl text-midnight mb-8">Frequently Asked Questions</h2>
            <FAQAccordion items={article.faq_items} />
          </div>
        </SectionWrapper>
      )}

      {related.length > 0 && (
        <SectionWrapper>
          <h2 className="font-heading text-xl text-midnight mb-8">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <GuideCard
                key={r.id}
                title={r.title}
                category={r.category}
                summary={r.summary}
                slug={r.slug}
                imageUrl={r.hero_image_url}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      <CTABanner
        title="Ready to discuss your property?"
        subtitle="Book a no-obligation conversation with our property management team."
        ctaText="Get My Rental Appraisal"
        ctaLink="/property-management#lead-form"
      />
    </>
  );
}