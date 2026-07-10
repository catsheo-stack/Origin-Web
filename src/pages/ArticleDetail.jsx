import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import ReactMarkdown from "react-markdown";

import CTABanner from "@/components/origin/CTABanner";
import FAQAccordion from "@/components/origin/FAQAccordion";
import GuideCard from "@/components/origin/GuideCard";
import SectionWrapper from "@/components/origin/SectionWrapper";
import {
  getKnowledgeItemBySlug,
  publishedKnowledgeItems,
} from "@/data/knowledgeCentre";

const formatDate = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return date.toLocaleDateString("en-AU", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
};

const containsHtml = (value = "") =>
  /<\/?[a-z][\s\S]*>/i.test(String(value));

export default function ArticleDetail() {
  const { slug } = useParams();

  const item = useMemo(
    () => getKnowledgeItemBySlug(slug),
    [slug]
  );

  const related = useMemo(() => {
    if (!item) return [];

    return publishedKnowledgeItems
      .filter(
        (candidate) =>
          candidate.slug !== item.slug &&
          candidate.service === item.service
      )
      .slice(0, 3);
  }, [item]);

  useEffect(() => {
    if (!item) {
      document.title = "Article Not Found | Origin Property Concierge";
      return;
    }

    document.title =
      item.seo_title ||
      `${item.title} | Origin Property Concierge`;

    let meta = document.head.querySelector('meta[name="description"]');

    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }

    meta.setAttribute(
      "content",
      String(
        item.meta_description ||
          item.summary ||
          item.excerpt ||
          ""
      ).slice(0, 160)
    );
  }, [item]);

  if (!item) {
    return (
      <SectionWrapper className="min-h-[55vh] pt-32">
        <div className="py-20 text-center">
          <h1 className="font-heading mb-4 text-3xl text-midnight">
            Article not found
          </h1>

          <p className="mb-6 text-sm text-midnight/50">
            This guide may have been moved or is no longer available.
          </p>

          <Link to="/guides" className="text-sm text-golden hover:underline">
            ← Back to Guides
          </Link>
        </div>
      </SectionWrapper>
    );
  }

  const body =
    item.body ||
    item.content ||
    "Article content coming soon.";

  const isBuyer = item.service === "buyer-advisory";
  const isOwner = item.service === "property-management";
  const isConveyancing = item.service === "conveyancing";
  const isMortgage = item.service === "mortgage-finance";

  return (
    <>
      <section className="bg-parchment pb-10 pt-28 md:pb-14 md:pt-32">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          <Link
            to="/guides"
            className="mb-8 inline-flex items-center gap-2 text-sm text-midnight/50 transition-colors hover:text-accent-navy"
          >
            <ArrowLeft size={14} />
            All Guides
          </Link>

          {item.category && (
            <p className="mb-4 text-xs font-medium uppercase tracking-widest text-golden">
              {item.category}
            </p>
          )}

          <h1 className="font-heading mb-4 text-3xl font-light leading-tight text-midnight md:text-4xl lg:text-[2.75rem]">
            {item.title}
          </h1>

          {(item.summary || item.excerpt) && (
            <p className="text-base leading-relaxed text-midnight/60">
              {item.summary || item.excerpt}
            </p>
          )}

          <div className="mt-6 flex flex-wrap items-center gap-4 text-xs text-midnight/40">
            {item.publish_date && (
              <span className="inline-flex items-center gap-1.5">
                <Calendar size={13} />
                {formatDate(item.publish_date)}
              </span>
            )}

            {item.reading_time && (
              <span className="inline-flex items-center gap-1.5">
                <Clock size={13} />
                {item.reading_time} min read
              </span>
            )}
          </div>
        </div>
      </section>

      {item.hero_image_url && (
        <section className="bg-parchment pb-10">
          <div className="mx-auto max-w-4xl px-6 lg:px-10">
            <img
              src={item.hero_image_url}
              alt={item.title}
              className="aspect-[16/9] w-full rounded-xl object-cover"
            />
          </div>
        </section>
      )}

      <section className="bg-parchment pb-16 md:pb-24">
        <div className="mx-auto max-w-3xl px-6 lg:px-10">
          {containsHtml(body) ? (
            <div
              className="
                article-content text-base leading-relaxed text-midnight/70
                [&_h2]:mb-4 [&_h2]:mt-10 [&_h2]:font-heading
                [&_h2]:text-2xl [&_h2]:text-midnight
                [&_h3]:mb-2 [&_h3]:mt-6 [&_h3]:font-heading
                [&_h3]:text-xl [&_h3]:text-midnight
                [&_p]:mb-4
                [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-1.5 [&_ul]:pl-5
                [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-1.5 [&_ol]:pl-5
                [&_strong]:font-medium [&_strong]:text-midnight
                [&_a]:text-golden [&_a]:underline
              "
              dangerouslySetInnerHTML={{ __html: body }}
            />
          ) : (
            <ReactMarkdown
              components={{
                h2: (props) => (
                  <h2
                    className="font-heading mb-4 mt-10 text-2xl text-midnight"
                    {...props}
                  />
                ),
                h3: (props) => (
                  <h3
                    className="font-heading mb-2 mt-6 text-xl text-midnight"
                    {...props}
                  />
                ),
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
              }}
            >
              {body}
            </ReactMarkdown>
          )}
        </div>
      </section>

      {Array.isArray(item.faq_items) && item.faq_items.length > 0 && (
        <SectionWrapper bg="bg-white">
          <div className="mx-auto max-w-3xl">
            <h2 className="font-heading mb-8 text-2xl text-midnight">
              Frequently Asked Questions
            </h2>

            <FAQAccordion items={item.faq_items} />
          </div>
        </SectionWrapper>
      )}

      {related.length > 0 && (
        <SectionWrapper>
          <h2 className="font-heading mb-8 text-2xl text-midnight">
            Related Resources
          </h2>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {related.map((relatedItem) => (
              <GuideCard
                key={relatedItem.id || relatedItem.slug}
                title={relatedItem.title}
                category={relatedItem.category}
                summary={relatedItem.summary || relatedItem.excerpt}
                slug={relatedItem.slug}
                imageUrl={relatedItem.hero_image_url}
                readingTime={relatedItem.reading_time}
                publishDate={formatDate(relatedItem.publish_date)}
              />
            ))}
          </div>
        </SectionWrapper>
      )}

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
          subtitle="We can help you understand your buying goals, risks and next steps."
          ctaText="Start My Buyer Journey"
          ctaLink="/buyer-advisory"
        />
      ) : isOwner ? (
        <CTABanner
          title="Ready to maximise your property's potential?"
          subtitle="Whether you're considering selling, leasing or comparing both options, we'll help you determine the best next step."
          ctaText="Get My Property Appraisal"
          ctaLink="/property-management"
        />
      ) : null}
    </>
  );
}
