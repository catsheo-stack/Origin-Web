import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock, User } from "lucide-react";
import ReactMarkdown from "react-markdown";

import articlesData from "@/data/articles";
import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import FAQAccordion from "@/components/origin/FAQAccordion";
import CTABanner from "@/components/origin/CTABanner";

const slugify = (text) =>
  String(text)
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-");

const extractText = (children) => {
  if (typeof children === "string") return children;
  if (Array.isArray(children)) return children.map(extractText).join("");
  if (React.isValidElement(children)) return extractText(children.props?.children);
  return "";
};

const formatDate = (dateString) => {
  if (!dateString) return "";
  try {
    return new Date(dateString).toLocaleDateString("en-AU", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  } catch {
    return "";
  }
};

const stripHtml = (value = "") =>
  String(value)
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();

const containsHtml = (value = "") => /<\/?[a-z][\s\S]*>/i.test(value);

const RESOURCE_LINKS = {
  "buyer-advisory": "/buyer-advisory/resources",
  "property-management": "/property-management/resources",
  conveyancing: "/conveyancing/resources",
  "mortgage-finance": "/mortgage-finance/resources",
};

export default function ArticleDetail() {
  const { slug } = useParams();

  const allArticles = useMemo(
    () =>
      (Array.isArray(articlesData) ? articlesData : []).filter(
        (item) => !item.status || item.status === "published"
      ),
    []
  );

  const article = useMemo(
    () => allArticles.find((item) => item.slug === slug) || null,
    [allArticles, slug]
  );

  const related = useMemo(() => {
    if (!article) return [];
    return allArticles
      .filter((item) => item.slug !== article.slug)
      .sort((a, b) => {
        const aScore =
          (a.service === article.service ? 2 : 0) +
          (a.category === article.category ? 1 : 0);
        const bScore =
          (b.service === article.service ? 2 : 0) +
          (b.category === article.category ? 1 : 0);
        return bScore - aScore;
      })
      .slice(0, 3);
  }, [article, allArticles]);

  useEffect(() => {
    if (!article) {
      document.title = "Article Not Found | Origin Concierge";
      return;
    }

    document.title =
      article.seo_title || `${article.title || "Article"} | Origin Concierge`;

    const description =
      article.meta_description ||
      article.summary ||
      article.excerpt ||
      stripHtml(article.body || article.content || "");

    if (description) {
      let meta = document.head.querySelector('meta[name="description"]');
      if (!meta) {
        meta = document.createElement("meta");
        meta.setAttribute("name", "description");
        document.head.appendChild(meta);
      }
      meta.setAttribute("content", description.slice(0, 160));
    }
  }, [article]);

  if (!article) {
    return (
      <SectionWrapper className="min-h-[55vh] pt-32">
        <div className="py-20 text-center">
          <h1 className="font-heading mb-4 text-2xl text-midnight">
            Article not found
          </h1>
          <p className="mb-6 text-sm text-midnight/50">
            This article may have been moved or is no longer available.
          </p>
          <Link to="/articles" className="text-sm text-golden hover:text-golden/80">
            &larr; Back to Knowledge Centre
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const backLink = RESOURCE_LINKS[article.service] || "/articles";
  const articleSummary = article.summary || article.excerpt || "";
  const articleBody = article.body || article.content || "Article content coming soon.";

  const markdownComponents = {
    h2: ({ children, ...props }) => (
      <h2
        id={slugify(extractText(children))}
        className="font-heading mb-4 mt-10 scroll-mt-24 text-xl text-midnight md:text-2xl"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ children, ...props }) => (
      <h3
        id={slugify(extractText(children))}
        className="font-heading mb-2 mt-6 scroll-mt-24 text-lg text-midnight"
        {...props}
      >
        {children}
      </h3>
    ),
    p: (props) => (
      <p className="mb-4 text-base leading-relaxed text-midnight/70" {...props} />
    ),
    ul: (props) => (
      <ul className="mb-4 list-disc space-y-1.5 pl-5 text-midnight/70" {...props} />
    ),
    ol: (props) => (
      <ol className="mb-4 list-decimal space-y-1.5 pl-5 text-midnight/70" {...props} />
    ),
    li: (props) => (
      <li className="text-base leading-relaxed text-midnight/70" {...props} />
    ),
    strong: (props) => <strong className="font-medium text-midnight" {...props} />,
    a: ({ href, children, ...props }) =>
      href?.startsWith("/") ? (
        <Link
          to={href}
          className="text-golden underline transition-colors hover:text-golden/80"
        >
          {children}
        </Link>
      ) : (
        <a
          href={href}
          className="text-golden underline transition-colors hover:text-golden/80"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      ),
  };

  return (
    <>
      <section className="bg-parchment pb-10 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            to={backLink}
            className="mb-8 inline-flex items-center gap-2 text-sm text-midnight/50 transition-colors hover:text-accent-navy"
          >
            <ArrowLeft size={14} />
            Back to Knowledge Centre
          </Link>

          {article.category && (
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-golden">
              {article.category}
            </p>
          )}

          <h1 className="font-heading mb-4 text-3xl font-light leading-tight text-midnight md:text-4xl lg:text-[2.75rem]">
            {article.title}
          </h1>

          {articleSummary && (
            <p className="text-base leading-relaxed text-midnight/60">
              {articleSummary}
            </p>
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
              {Number(article.reading_time) > 0 && (
                <span className="flex items-center gap-1.5">
                  <Clock size={13} />
                  {article.reading_time} min read
                </span>
              )}
            </div>
          )}
        </div>
      </section>

      {article.hero_image_url && (
        <section className="bg-parchment pb-10">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <img
              src={article.hero_image_url}
              alt={article.title}
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
          </div>
        </section>
      )}

      <section className="bg-parchment pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {containsHtml(articleBody) ? (
            <div
              className="article-content text-base leading-relaxed text-midnight/70 [&_a]:text-golden [&_a]:underline [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-heading [&_h2]:text-xl [&_h2]:text-midnight md:[&_h2]:text-2xl [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-heading [&_h3]:text-lg [&_h3]:text-midnight [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5 [&_p]:mb-4 [&_strong]:font-medium [&_strong]:text-midnight [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5"
              dangerouslySetInnerHTML={{ __html: articleBody }}
            />
          ) : (
            <ReactMarkdown components={markdownComponents}>{articleBody}</ReactMarkdown>
          )}
        </div>
      </section>

      {Array.isArray(article.faq_items) && article.faq_items.length > 0 && (
        <SectionWrapper bg="bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading mb-8 text-2xl text-midnight">
              Frequently Asked Questions
            </h2>
            <FAQAccordion items={article.faq_items} />
          </div>
        </SectionWrapper>
      )}

      {related.length > 0 && (
        <SectionWrapper>
          <h2 className="font-heading mb-8 text-xl text-midnight">
            Related Articles
          </h2>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((item) => (
              <GuideCard
                key={item.id || item.slug}
                title={item.title}
                category={item.category}
                summary={item.summary || item.excerpt}
                slug={item.slug}
                imageUrl={item.hero_image_url}
                publishDate={item.publish_date}
                readingTime={item.reading_time}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

      {article.service === "conveyancing" ? (
        <CTABanner
          title="Need help with your property transaction?"
          subtitle="Book a consultation and we'll guide you through contract review, Section 32 checks and settlement."
          ctaText="Book a Consultation"
          ctaLink="/book-consultation?service=conveyancing"
        />
      ) : article.service === "mortgage-finance" ? (
        <CTABanner
          title="Need help navigating your home loan options?"
          subtitle="Book a consultation and we'll connect you with finance guidance tailored to your situation."
          ctaText="Book a Consultation"
          ctaLink="/book-consultation?service=mortgage-finance"
        />
      ) : article.service === "buyer-advisory" ? (
        <CTABanner
          title="Need help choosing the right property?"
          subtitle="Book a consultation and we'll help you understand your buying goals, risks and next steps."
          ctaText="Start My Buyer Journey"
          ctaLink="/buyer-advisory"
        />
      ) : article.service === "property-management" ? (
        <CTABanner
          title="Ready to maximise your property's potential?"
          subtitle="Whether you're considering selling, leasing or comparing both options, we'll help you determine the best next step."
          ctaText="Get My Property Appraisal"
          ctaLink="/property-management#lead-form"
        />
      ) : null}
    </>
  );
}
