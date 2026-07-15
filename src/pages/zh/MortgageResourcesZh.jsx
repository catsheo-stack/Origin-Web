import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";
import { publishedKnowledgeItemsZh } from "@/data/knowledgeCentreZh";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&w=1920&q=80";
const labels = {
  eyebrow: "知識資源", noMatches: "找不到相關內容", comingSoon: "內容即將推出",
  noMatchesText: (query) => `沒有資源符合「${query}」。請嘗試其他關鍵字。`, comingSoonText: "我們正在整理這個知識中心的實用內容。",
  clearSearch: "清除搜尋", resource: "篇資源", resources: "篇資源", readGuide: "閱讀指南", minuteRead: "分鐘閱讀",
};
export default function MortgageResourcesZh() {
  return <ResourceHub
    seoTitle="澳洲房屋貸款知識中心｜Origin Property Concierge"
    metaDescription="為澳洲物業買家提供借貸能力、首期、貸款預批、購房成本及房屋貸款結構的實用指南。"
    title="房屋貸款知識中心"
    subtitle="為物業買家整理的貸款準備、借貸策略、購房成本及實用財務教育。"
    searchPlaceholder="搜尋房屋貸款及財務主題"
    bannerImage={BANNER_IMAGE}
    overlayClass="bg-gradient-to-br from-midnight/90 to-accent-navy/75"
    service="mortgage-finance"
    categoryOrder={["房屋貸款"]}
    items={publishedKnowledgeItemsZh}
    labels={labels}
    locale="zh-Hant-AU"
    linkPrefix="/zh/article"
    cta={{ title: "需要協助了解房屋貸款？", subtitle: "預約諮詢，取得配合您實際情況的貸款方向。", buttons: [
      { label: "預約諮詢", link: "/zh/book-consultation?service=mortgage-finance", variant: "golden" },
      { label: "聯絡我們", link: "/zh/contact?service=mortgage-finance", variant: "outline" },
    ] }}
  />;
}
