import React, { useEffect, useMemo } from "react";
import { Link, useParams } from "react-router-dom";
import { ArrowLeft, Clock } from "lucide-react";
import SectionWrapper from "@/components/origin/SectionWrapper";
import GuideCard from "@/components/origin/GuideCard";
import CTABanner from "@/components/origin/CTABanner";
import FAQAccordion from "@/components/origin/FAQAccordion";
import { getKnowledgeItemZhBySlug, publishedKnowledgeItemsZh } from "@/data/knowledgeCentreZh";

const servicePaths = {
  "buyer-advisory": "/zh/buyer-advisory/resources",
  "property-management": "/zh/property-management/resources",
  conveyancing: "/zh/conveyancing/resources",
  "mortgage-finance": "/zh/mortgage-finance/resources",
};

const ctaByService = {
  "buyer-advisory": {
    title: "想更有信心地規劃購房？",
    subtitle: "預約諮詢，討論您的預算、地區、物業要求及下一步。",
  },
  "property-management": {
    title: "想改善出租物業的管理方式？",
    subtitle: "預約諮詢，討論租金、租客、合規及日常管理。",
  },
  conveyancing: {
    title: "需要協助了解合約與過戶流程？",
    subtitle: "預約諮詢，了解下一步及應準備的文件。",
  },
  "mortgage-finance": {
    title: "想先釐清貸款與購房預算？",
    subtitle: "預約諮詢，討論借貸能力、預批及購房成本。",
  },
};

function renderBody(body = "") {
  return body.split("\n\n").map((block, index) => {
    if (block.startsWith("## ")) {
      return <h2 key={index} className="font-heading mt-10 mb-4 text-xl font-medium text-midnight">{block.slice(3)}</h2>;
    }
    if (block.startsWith("- ")) {
      const items = block.split("\n").filter((line) => line.startsWith("- "));
      return <ul key={index} className="my-5 space-y-3">{items.map((item, itemIndex) => {
        const text = item.slice(2);
        const match = text.match(/^\*\*(.+?)\*\*(.*)$/);
        return <li key={itemIndex} className="flex items-start gap-3 text-sm leading-7 text-midnight/65">
          <span className="mt-3 h-1 w-1 flex-shrink-0 rounded-full bg-golden" />
          {match ? <span><strong className="font-medium text-midnight">{match[1]}</strong>{match[2]}</span> : <span>{text}</span>}
        </li>;
      })}</ul>;
    }
    return <p key={index} className="mb-5 text-base leading-8 text-midnight/65">{block}</p>;
  });
}

export default function ArticleDetailZh() {
  const { slug } = useParams();
  const item = useMemo(() => getKnowledgeItemZhBySlug(slug), [slug]);
  const related = useMemo(() => item ? publishedKnowledgeItemsZh.filter((candidate) => candidate.slug !== item.slug && candidate.service === item.service).slice(0, 3) : [], [item]);

  useEffect(() => {
    document.title = item ? `${item.title}｜Origin Property Concierge` : "找不到指南｜Origin Property Concierge";
    if (!item) return;
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.setAttribute("name", "description");
      document.head.appendChild(meta);
    }
    meta.setAttribute("content", String(item.summary || "").slice(0, 160));
  }, [item]);

  if (!item) {
    return <SectionWrapper className="min-h-[55vh] pt-32"><div className="py-20 text-center"><h1 className="font-heading mb-4 text-3xl text-midnight">找不到這篇指南</h1><Link to="/zh/knowledge-centre" className="text-sm text-golden hover:underline">返回知識中心</Link></div></SectionWrapper>;
  }

  const cta = ctaByService[item.service] || ctaByService["buyer-advisory"];

  return <>
    <section className="bg-parchment pb-10 pt-28 md:pb-14 md:pt-32">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <Link to={servicePaths[item.service] || "/zh/knowledge-centre"} className="mb-8 inline-flex items-center gap-2 text-sm text-midnight/50 hover:text-accent-navy"><ArrowLeft size={14} />返回相關資源</Link>
        <p className="mb-4 text-xs font-medium uppercase tracking-widest text-golden">{item.category}</p>
        <h1 className="font-heading mb-4 text-3xl font-light leading-tight text-midnight md:text-4xl">{item.title}</h1>
        <p className="text-base leading-relaxed text-midnight/60">{item.summary}</p>
        {item.reading_time && <div className="mt-6 inline-flex items-center gap-1.5 text-xs text-midnight/40"><Clock size={13} />約 {item.reading_time} 分鐘閱讀</div>}
      </div>
    </section>

    {item.hero_image_url && <section className="bg-parchment pb-10"><div className="mx-auto max-w-4xl px-6 lg:px-10"><img src={item.hero_image_url} alt={item.title} className="aspect-[16/9] w-full rounded-xl object-cover" /></div></section>}

    <section className="bg-parchment pb-16 md:pb-24">
      <div className="mx-auto max-w-3xl px-6 lg:px-10">
        <article className="rounded-2xl border border-stone/70 bg-white p-7 shadow-sm md:p-10">
          {renderBody(item.body)}
          <div className="mt-10 rounded-xl bg-parchment p-5 text-sm leading-7 text-midnight/55">
            本指南提供一般資料，不構成法律、信貸、財務或稅務建議。物業交易及租賃規則可能更新，作出決定前應向相關持牌專業人士取得適合您情況的建議。
          </div>
        </article>
      </div>
    </section>

    {item.faq_items?.length > 0 && <SectionWrapper bg="bg-white" className="!py-16 md:!py-20">
      <div className="mx-auto max-w-3xl">
        <h2 className="font-heading mb-8 text-2xl font-light text-midnight md:text-3xl">常見問題</h2>
        <FAQAccordion items={item.faq_items} />
      </div>
    </SectionWrapper>}

    {related.length > 0 && <SectionWrapper bg="bg-parchment"><h2 className="font-heading mb-8 text-2xl text-midnight">相關資源</h2><div className="grid grid-cols-1 gap-6 md:grid-cols-3">{related.map((resource) => <GuideCard key={resource.slug} title={resource.title} category={resource.category} summary={resource.summary} slug={resource.slug} imageUrl={resource.hero_image_url} readingTime={resource.reading_time} linkPrefix="/zh/article" readLabel="閱讀指南" minuteLabel="分鐘閱讀" />)}</div></SectionWrapper>}

    <CTABanner title={cta.title} subtitle={cta.subtitle} ctaText="預約諮詢" ctaLink="/zh/book-consultation" />
  </>;
}
