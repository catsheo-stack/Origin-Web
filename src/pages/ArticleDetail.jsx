import React, { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Clock,
  User,
  Calendar,
} from "lucide-react";
import ReactMarkdown from "react-markdown";

import articlesData from "@/data/articles";
import { seededGuides } from "@/data/seededGuides";
import { buyerArticles } from "@/data/buyerResources";

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
  if (typeof children === "string") {
    return children;
  }

  if (Array.isArray(children)) {
    return children.map(extractText).join("");
  }

  if (React.isValidElement(children)) {
    return extractText(children.props?.children);
  }

  return "";
};

const formatDate = (dateString) => {
  if (!dateString) {
    return "";
  }

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

const containsHtml = (value = "") =>
  /<\/?[a-z][\s\S]*>/i.test(value);

export default function ArticleDetail() {
  const { slug } = useParams();

  const allArticles = useMemo(() => {
    const combined = [
      ...(Array.isArray(articlesData)
        ? articlesData
        : []),

      ...(Array.isArray(buyerArticles)
        ? buyerArticles
        : []),

      ...(Array.isArray(seededGuides)
        ? seededGuides
        : []),
    ];

    const uniqueArticles = new Map();

    combined.forEach((item) => {
      if (
        item?.slug &&
        !uniqueArticles.has(item.slug)
      ) {
        uniqueArticles.set(item.slug, item);
      }
    });

    return Array.from(uniqueArticles.values());
  }, []);

  const article = useMemo(() => {
    return (
      allArticles.find(
        (item) =>
          item.slug === slug &&
          (!item.status ||
            item.status === "published")
      ) || null
    );
  }, [allArticles, slug]);

  const related = useMemo(() => {
    if (!article) {
      return [];
    }

    if (
      Array.isArray(article.related_articles) &&
      article.related_articles.length > 0
    ) {
      return article.related_articles.slice(0, 3);
    }

    const sameService = allArticles.filter(
      (item) =>
        item.slug !== article.slug &&
        item.service === article.service &&
        (!item.status ||
          item.status === "published")
    );

    const sameCategory = allArticles.filter(
      (item) =>
        item.slug !== article.slug &&
        item.category === article.category &&
        item.service !== article.service &&
        (!item.status ||
          item.status === "published")
    );

    const remaining = allArticles.filter(
      (item) =>
        item.slug !== article.slug &&
        !sameService.some(
          (match) => match.slug === item.slug
        ) &&
        !sameCategory.some(
          (match) => match.slug === item.slug
        ) &&
        (!item.status ||
          item.status === "published")
    );

    return [
      ...sameService,
      ...sameCategory,
      ...remaining,
    ].slice(0, 3);
  }, [article, allArticles]);

  useEffect(() => {
    if (!article) {
      document.title =
        "Article Not Found | Origin Concierge";

      return;
    }

    document.title =
      article.seo_title ||
      `${article.title || "Article"} | Origin Concierge`;

    const description =
      article.meta_description ||
      article.summary ||
      article.excerpt ||
      stripHtml(
        article.body ||
          article.content ||
          ""
      );

    if (description) {
      let descriptionElement =
        document.head.querySelector(
          'meta[name="description"]'
        );

      if (!descriptionElement) {
        descriptionElement =
          document.createElement("meta");

        descriptionElement.setAttribute(
          "name",
          "description"
        );

        document.head.appendChild(
          descriptionElement
        );
      }

      descriptionElement.setAttribute(
        "content",
        description.slice(0, 160)
      );
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
            This article may have been moved or is
            no longer available.
          </p>

          <Link
            to="/articles"
            className="text-sm text-golden hover:text-golden/80"
          >
            &larr; Back to Articles
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const service = article.service;

  const isConveyancing =
    service === "conveyancing";

  const isMortgage =
    service === "mortgage-finance";

  const isBuyer =
    service === "buyer-advisory";

  const isPropertyManagement =
    service === "property-management";

  const backLink = "/articles";
  const backLabel = "All Articles";

  const articleSummary =
    article.summary ||
    article.excerpt ||
    "";

  const articleBody =
    article.body ||
    article.content ||
    "Article content coming soon.";

  const markdownComponents = {
    h2: ({ children, ...props }) => {
      const id = slugify(
        extractText(children)
      );

      return (
        <h2
          id={id}
          className="font-heading mb-4 mt-10 scroll-mt-24 text-xl text-midnight md:text-2xl"
          {...props}
        >
          {children}
        </h2>
      );
    },

    h3: ({ children, ...props }) => {
      const id = slugify(
        extractText(children)
      );

      return (
        <h3
          id={id}
          className="font-heading mb-2 mt-6 scroll-mt-24 text-lg text-midnight"
          {...props}
        >
          {children}
        </h3>
      );
    },

    p: (props) => (
      <p
        className="mb-4 text-base leading-relaxed text-midnight/70"
        {...props}
      />
    ),

    ul: (props) => (
      <ul
        className="mb-4 list-disc space-y-1.5 pl-5 text-midnight/70"
        {...props}
      />
    ),

    ol: (props) => (
      <ol
        className="mb-4 list-decimal space-y-1.5 pl-5 text-midnight/70"
        {...props}
      />
    ),

    li: (props) => (
      <li
        className="text-base leading-relaxed text-midnight/70"
        {...props}
      />
    ),

    strong: (props) => (
      <strong
        className="font-medium text-midnight"
        {...props}
      />
    ),

    a: ({
      href,
      children,
      ...props
    }) => {
      if (href?.startsWith("/")) {
        return (
          <Link
            to={href}
            className="text-golden underline transition-colors hover:text-golden/80"
          >
            {children}
          </Link>
        );
      }

      return (
        <a
          href={href}
          className="text-golden underline transition-colors hover:text-golden/80"
          target="_blank"
          rel="noopener noreferrer"
          {...props}
        >
          {children}
        </a>
      );
    },

    blockquote: (props) => (
      <blockquote
        className="mb-4 border-l-4 border-golden/40 pl-4 italic text-midnight/60"
        {...props}
      />
    ),
  };

  return (
    <>
      {/* Article header */}
      <section className="bg-parchment pb-10 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            to={backLink}
            className="mb-8 inline-flex items-center gap-2 text-sm text-midnight/50 transition-colors hover:text-accent-navy"
          >
            <ArrowLeft size={14} />
            {backLabel}
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

          {(article.author ||
            article.publish_date ||
            article.reading_time) && (
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
                  {formatDate(
                    article.publish_date
                  )}
                </span>
              )}

              {Number(
                article.reading_time
              ) > 0 && (
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
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <img
              src={article.hero_image_url}
              alt={article.title}
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
          </div>
        </section>
      )}

      {/* Article body */}
      <section className="bg-parchment pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {Array.isArray(
            article.table_of_contents
          ) &&
            article.table_of_contents.length >
              0 && (
              <nav className="mb-10 rounded-xl bg-stone/30 p-6">
                <p className="mb-4 text-xs font-medium uppercase tracking-widest text-golden">
                  Table of Contents
                </p>

                <ul className="space-y-2">
                  {article.table_of_contents.map(
                    (item, index) => (
                      <li
                        key={`${item.anchor}-${index}`}
                      >
                        <a
                          href={`#${item.anchor}`}
                          className="text-sm text-accent-navy transition-colors hover:text-golden"
                        >
                          {item.heading}
                        </a>
                      </li>
                    )
                  )}
                </ul>
              </nav>
            )}

          {containsHtml(articleBody) ? (
            <div
              className="
                article-content
                text-base
                leading-relaxed
                text-midnight/70

                [&_h2]:font-heading
                [&_h2]:mb-4
                [&_h2]:mt-10
                [&_h2]:text-xl
                [&_h2]:text-midnight
                md:[&_h2]:text-2xl

                [&_h3]:font-heading
                [&_h3]:mb-2
                [&_h3]:mt-6
                [&_h3]:text-lg
                [&_h3]:text-midnight

                [&_p]:mb-4

                [&_ul]:mb-4
                [&_ul]:list-disc
                [&_ul]:space-y-1.5
                [&_ul]:pl-5

                [&_ol]:mb-4
                [&_ol]:list-decimal
                [&_ol]:space-y-1.5
                [&_ol]:pl-5

                [&_strong]:font-medium
                [&_strong]:text-midnight

                [&_a]:text-golden
                [&_a]:underline
              "
              dangerouslySetInnerHTML={{
                __html: articleBody,
              }}
            />
          ) : (
            <ReactMarkdown
              components={
                markdownComponents
              }
            >
              {articleBody}
            </ReactMarkdown>
          )}
        </div>
      </section>

      {/* FAQ */}
      {Array.isArray(
        article.faq_items
      ) &&
        article.faq_items.length > 0 && (
          <SectionWrapper bg="bg-white">
            <div className="mx-auto max-w-3xl">
              <h2 className="font-heading mb-8 text-2xl text-midnight">
                Frequently Asked Questions
              </h2>

              <FAQAccordion
                items={article.faq_items}
              />
            </div>
          </SectionWrapper>
        )}

      {/* Related articles */}
      {related.length > 0 && (
        <SectionWrapper>
          <h2 className="font-heading mb-8 text-xl text-midnight">
            Related Articles
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map(
              (relatedArticle) => (
                <GuideCard
                  key={
                    relatedArticle.id ||
                    relatedArticle.slug
                  }
                  title={
                    relatedArticle.title
                  }
                  category={
                    relatedArticle.category ||
                    article.category
                  }
                  summary={
                    relatedArticle.summary ||
                    relatedArticle.excerpt
                  }
                  slug={
                    relatedArticle.slug
                  }
                  imageUrl={
                    relatedArticle.hero_image_url
                  }
                />
              )
            )}
          </div>
        </SectionWrapper>
      )}

      {/* Service-specific CTA */}
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
          title="Ready to maximise your property's potential?"
          subtitle="Whether you're considering selling, leasing or comparing both options, we'll help you determine the best next step."
          ctaText="Get My Property Appraisal"
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