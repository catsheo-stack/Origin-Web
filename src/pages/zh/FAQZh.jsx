import React, { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { Search } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import FAQAccordion from "@/components/origin/FAQAccordion";
import { FAQ_CATEGORIES_ZH, FAQ_RELATED_RESOURCES_ZH } from "@/data/faqDataZh";

const DESCRIPTION =
  "了解在墨爾本及維州買房、房屋貸款、產權過戶、出租物業管理、出售物業及使用房產工具時常見的問題。";

export default function FAQZh() {
  const [query, setQuery] = useState("");

  useEffect(() => {
    document.title = "墨爾本房產常見問題｜Origin Property Concierge";

    const setMeta = (selector, attribute, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };

    setMeta('meta[name="description"]', "content", DESCRIPTION);
    setMeta('meta[property="og:title"]', "content", "墨爾本房產常見問題｜Origin Property Concierge");
    setMeta('meta[property="og:description"]', "content", DESCRIPTION);

    base44.analytics.track({
      eventName: "page_viewed",
      properties: { page: "faq_zh", language: "zh-Hant" },
    });

    const allFaqs = FAQ_CATEGORIES_ZH.flatMap((category) => category.faqs);
    const schema = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      inLanguage: "zh-Hant-AU",
      mainEntity: allFaqs.map((faq) => ({
        "@type": "Question",
        name: faq.question,
        acceptedAnswer: { "@type": "Answer", text: faq.answer },
      })),
    };

    let script = document.getElementById("faq-schema-zh");
    if (!script) {
      script = document.createElement("script");
      script.id = "faq-schema-zh";
      script.type = "application/ld+json";
      document.head.appendChild(script);
    }
    script.textContent = JSON.stringify(schema);

    return () => {
      document.getElementById("faq-schema-zh")?.remove();
    };
  }, []);

  const filteredCategories = useMemo(() => {
    const normalizedQuery = query.trim().toLocaleLowerCase("zh-Hant");
    if (!normalizedQuery) return FAQ_CATEGORIES_ZH;

    return FAQ_CATEGORIES_ZH.map((category) => ({
      ...category,
      faqs: category.faqs.filter(
        (faq) =>
          faq.question.toLocaleLowerCase("zh-Hant").includes(normalizedQuery) ||
          faq.answer.toLocaleLowerCase("zh-Hant").includes(normalizedQuery)
      ),
    })).filter((category) => category.faqs.length > 0);
  }, [query]);

  return (
    <>
      <section className="bg-parchment pt-24 pb-12 md:pt-32 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs tracking-[0.22em] uppercase text-golden mb-4">Origin 房產知識中心</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-midnight mb-4">
            房產常見問題
          </h1>
          <p className="text-base text-midnight/60 leading-relaxed mb-8 max-w-2xl mx-auto">
            以清晰、實用的方式解答在墨爾本買房、貸款、產權過戶、出租管理和出售物業時常見的問題。
          </p>

          <div className="relative max-w-lg mx-auto">
            <Search
              size={18}
              className="absolute left-4 top-1/2 -translate-y-1/2 text-midnight/30"
              aria-hidden="true"
            />
            <label htmlFor="faq-search-zh" className="sr-only">
              搜尋常見問題
            </label>
            <input
              id="faq-search-zh"
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="搜尋問題或關鍵字……"
              className="w-full pl-12 pr-4 py-3.5 rounded-full border border-stone bg-white text-sm text-midnight placeholder:text-midnight/30 focus:outline-none focus:border-golden/50 focus:ring-2 focus:ring-golden/10 transition-colors"
            />
          </div>
        </div>
      </section>

      <SectionWrapper className="!pt-8 !pb-16">
        <div className="max-w-3xl mx-auto">
          {filteredCategories.length > 0 ? (
            <div className="space-y-12">
              {filteredCategories.map((category) => (
                <section key={category.name} aria-labelledby={`faq-${category.name}`}>
                  <h2
                    id={`faq-${category.name}`}
                    className="font-heading text-xl md:text-2xl text-midnight mb-4"
                  >
                    {category.name}
                  </h2>
                  <div className="bg-white rounded-2xl border border-stone/60 px-6 md:px-8">
                    <FAQAccordion items={category.faqs} />
                  </div>
                </section>
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <p className="text-sm text-midnight/50 mb-4">找不到與「{query}」相符的問題。</p>
              <button
                type="button"
                onClick={() => setQuery("")}
                className="text-golden hover:text-golden/80 text-sm underline"
              >
                清除搜尋
              </button>
            </div>
          )}

          <div className="mt-14 rounded-2xl border border-stone/60 bg-white px-6 py-8 md:px-8">
            <h2 className="font-heading text-xl text-midnight mb-3">仍然找不到答案？</h2>
            <p className="text-sm leading-7 text-midnight/60 mb-5">
              每宗物業交易和貸款安排都可能不同。您可以提交簡單查詢，我們會按您的需要協助連結合適的專業人士。
            </p>
            <div className="flex flex-wrap gap-3">
              {FAQ_RELATED_RESOURCES_ZH.map((resource) => (
                <Link
                  key={resource.path}
                  to={resource.path}
                  className="rounded-full border border-stone px-4 py-2 text-sm text-midnight/70 transition-colors hover:border-golden/60 hover:text-golden"
                >
                  {resource.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </SectionWrapper>

      <div className="max-w-3xl mx-auto px-6 lg:px-10 pb-12">
        <p className="text-xs text-midnight/40 text-center">
          最後更新：2026 年 7 月。以上內容只供一般資訊參考，不構成法律、信貸、財務或稅務建議。
        </p>
      </div>
    </>
  );
}
