import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { ArrowLeft, Clock, User, Calendar } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import { base44 } from '@/api/base44Client';
import { seededGuides } from '@/data/seededGuides';
import { buyerArticles } from '@/data/buyerResources';
import SectionWrapper from '@/components/origin/SectionWrapper';
import GuideCard from '@/components/origin/GuideCard';
import FAQAccordion from '@/components/origin/FAQAccordion';
import CTABanner from '@/components/origin/CTABanner';

const slugify = (text) =>
  String(text).toLowerCase().trim().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-');

const extractText = (children) => {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) return children.map(extractText).join('');
  if (React.isValidElement(children)) return extractText(children.props?.children);
  return '';
};

const formatDate = (dateStr) => {
  if (!dateStr) return '';
  try {
    return new Date(dateStr).toLocaleDateString('en-AU', { year: 'numeric', month: 'long', day: 'numeric' });
  } catch {
    return '';
  }
};

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
        const found = results.length > 0 ? results[0] : seededGuides.find((g) => g.slug === slug) || buyerArticles.find((g) => g.slug === slug) || null;

        if (found) {
          setArticle(found);
          base44.analytics.track({ eventName: 'guide_opened', properties: { guide: slug } });

          if (found.related_articles && found.related_articles.length > 0) {
            setRelated(found.related_articles);
          } else {
            const isBuyer = buyerArticles.some((g) => g.slug === slug);
            const source = isBuyer ? buyerArticles : seededGuides;
            const sameCat = source.filter((g) => g.slug !== slug && g.category === found.category);
            const otherCat = source.filter((g) => g.slug !== slug && g.category !== found.category);
            setRelated([...sameCat, ...otherCat].slice(0, 3));
          }
        }
      } catch {
        const found = seededGuides.find((g) => g.slug === slug) || buyerArticles.find((g) => g.slug === slug) || null;
        if (found) {
          setArticle(found);
          if (found.related_articles && found.related_articles.length > 0) {
            setRelated(found.related_articles);
          } else {
            const isBuyer = buyerArticles.some((g) => g.slug === slug);
            const source = isBuyer ? buyerArticles : seededGuides;
            const sameCat = source.filter((g) => g.slug !== slug && g.category === found.category);
            const otherCat = source.filter((g) => g.slug !== slug && g.category !== found.category);
            setRelated([...sameCat, ...otherCat].slice(0, 3));
          }
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
          <Link to="/conveyancing/resources" className="text-golden hover:text-golden/80 text-sm">
            &larr; Back to Conveyancing Resources
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const svc = article.service;
  const isConveyancing = svc === 'conveyancing';
  const isMortgage = svc === 'mortgage-finance';
  const isBuyer = svc === 'buyer-advisory' || buyerArticles.some((g) => g.slug === slug);
  const isPropertyManagement = svc === 'property-management';

  const backLink = isConveyancing ? '/conveyancing/resources'
    : isMortgage ? '/mortgage-finance/resources'
    : isBuyer ? '/buyer-advisory/resources'
    : isPropertyManagement ? '/property-management/resources'
    : '/property-guides';
  const backLabel = isConveyancing ? 'Conveyancing Resources'
    : isMortgage ? 'Mortgage & Finance Resources'
    : isBuyer ? 'Buyer Advisory Resources'
    : isPropertyManagement ? 'Property Management Resources'
    : 'Property Guides';

  // SEO
  if (article.seo_title) document.title = article.seo_title;
  if (article.meta_description) {
    let descEl = document.head.querySelector('meta[name="description"]');
    if (!descEl) { descEl = document.createElement('meta'); document.head.appendChild(descEl); }
    descEl.setAttribute('content', article.meta_description);
  }

  const markdownComponents = {
    h2: ({ children, ...props }) => {
      const id = slugify(extractText(children));
      return <h2 id={id} className="font-heading text-xl md:text-2xl text-midnight mt-10 mb-4 scroll-mt-24" {...props}>{children}</h2>;
    },
    h3: ({ children, ...props }) => {
      const id = slugify(extractText(children));
      return <h3 id={id} className="font-heading text-lg text-midnight mt-6 mb-2 scroll-mt-24" {...props}>{children}</h3>;
    },
    p: ({ ...props }) => <p className="text-base text-midnight/70 leading-relaxed mb-4" {...props} />,
    ul: ({ ...props }) => <ul className="list-disc pl-5 space-y-1.5 mb-4 text-midnight/70" {...props} />,
    ol: ({ ...props }) => <ol className="list-decimal pl-5 space-y-1.5 mb-4 text-midnight/70" {...props} />,
    li: ({ ...props }) => <li className="text-base text-midnight/70 leading-relaxed" {...props} />,
    strong: ({ ...props }) => <strong className="text-midnight font-medium" {...props} />,
    a: ({ href, children, ...props }) => {
      if (href && href.startsWith('/')) {
        return <Link to={href} className="text-golden hover:text-golden/80 underline transition-colors">{children}</Link>;
      }
      return <a href={href} className="text-golden hover:text-golden/80 underline transition-colors" target="_blank" rel="noopener noreferrer" {...props}>{children}</a>;
    },
    blockquote: ({ ...props }) => <blockquote className="border-l-4 border-golden/40 pl-4 italic text-midnight/60 mb-4" {...props} />,
  };

  return (
    <>
      {/* Header */}
      <section className="bg-parchment pt-28 pb-10 md:pt-32 md:pb-14">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          <Link to={backLink} className="inline-flex items-center gap-2 text-sm text-midnight/50 hover:text-accent-navy transition-colors mb-8">
            <ArrowLeft size={14} />
            {backLabel}
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
          {(article.author || article.publish_date || article.reading_time) && (
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-midnight/40">
              {article.author && (
                <span className="flex items-center gap-1.5">
                  <User size={13} />
                  {article.author}
                </span>
              )}
              {article.publish_date && (
                <span className="flex items-center gap-1.5">
                  <Calendar size={13} />
                  {formatDate(article.publish_date)}
                </span>
              )}
              {article.reading_time > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {article.reading_time} min read
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {/* Hero image */}
      {article.hero_image_url && (
        <section className="bg-parchment pb-10">
          <div className="max-w-4xl mx-auto px-6 lg:px-10">
            <img src={article.hero_image_url} alt={article.title} className="w-full rounded-xl object-cover aspect-[16/9]" />
          </div>
        </section>
      )}

      {/* Body + TOC */}
      <section className="bg-parchment pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-6 lg:px-10">
          {article.table_of_contents && article.table_of_contents.length > 0 && (
            <nav className="bg-stone/30 rounded-xl p-6 mb-10">
              <p className="text-xs font-medium tracking-widest uppercase text-golden mb-4">Table of Contents</p>
              <ul className="space-y-2">
                {article.table_of_contents.map((item, i) => (
                  <li key={i}>
                    <a href={`#${item.anchor}`} className="text-sm text-accent-navy hover:text-golden transition-colors">
                      {item.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </nav>
          )}

          <ReactMarkdown components={markdownComponents}>
            {article.body}
          </ReactMarkdown>
        </div>
      </section>

      {/* FAQ */}
      {article.faq_items && article.faq_items.length > 0 && (
        <SectionWrapper bg="bg-white">
          <div className="max-w-3xl mx-auto">
            <h2 className="font-heading text-2xl text-midnight mb-8">Frequently Asked Questions</h2>
            <FAQAccordion items={article.faq_items} />
          </div>
        </SectionWrapper>
      )}

      {/* Related */}
      {related.length > 0 && (
        <SectionWrapper>
          <h2 className="font-heading text-xl text-midnight mb-8">Related Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {related.map((r) => (
              <GuideCard
                key={r.id || r.slug}
                title={r.title}
                category={r.category || article.category}
                summary={r.summary}
                slug={r.slug}
                imageUrl={r.hero_image_url}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      {/* CTA */}
      {isConveyancing ? (
        <CTABanner
          title="Need help with your property transaction?"
          subtitle="Book a consultation and we'll guide you through contract review, Section 32 checks and settlement."
          ctaText="Book a Consultation"
          ctaLink="/book-consultation?service=conveyancing"
        />
      ) : isMortgage ? (
        <CTABanner
          title="Need help navigating your home loan options?"
          subtitle="Book a consultation and we'll connect you with finance guidance tailored to your situation."
          ctaText="Book a Consultation"
          ctaLink="/book-consultation?service=mortgage-finance"
        />
      ) : isBuyer ? (
        <CTABanner
          title="Need help choosing the right property?"
          subtitle="Book a consultation and we'll help you understand your buying goals, risks and next steps."
          ctaText="Start My Buyer Journey"
          ctaLink="/buyer-advisory"
        />
      ) : isPropertyManagement ? (
        <CTABanner
          title="Ready to discuss your property?"
          subtitle="Book a no-obligation conversation with our property management team."
          ctaText="Get My Rental Appraisal"
          ctaLink="/property-management#lead-form"
        />
      ) : (
        <CTABanner
          title="Ready to discuss your property?"
          subtitle="Book a no-obligation conversation with our team."
          ctaText="Book a Consultation"
          ctaLink="/book-consultation"
        />
      )}
    </>
  );
}