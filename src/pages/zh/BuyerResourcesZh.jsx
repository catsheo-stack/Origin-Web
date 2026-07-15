import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";
import { publishedKnowledgeItemsZh } from "@/data/knowledgeCentreZh";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=1920&q=80";
const CATEGORY_ORDER = ["買房入門", "盡職調查與風險", "Section 32 審閱", "議價策略", "拍賣策略", "地區選擇", "投資者指南"];
const labels = {
  eyebrow: "知識資源",
  noMatches: "找不到相關內容",
  comingSoon: "內容即將推出",
  noMatchesText: (query) => `沒有資源符合「${query}」。請嘗試其他關鍵字。`,
  comingSoonText: "我們正在整理這個知識中心的實用內容。",
  clearSearch: "清除搜尋",
  resource: "篇資源",
  resources: "篇資源",
  readGuide: "閱讀指南",
  minuteRead: "分鐘閱讀",
};

export default function BuyerResourcesZh() {
  return <ResourceHub
    seoTitle="墨爾本買方顧問知識中心｜Origin Property Concierge"
    metaDescription="為墨爾本買家提供購房準備、盡職調查、Section 32、議價、拍賣及選區指南。"
    title="買方顧問知識中心"
    subtitle="為墨爾本自住買家及投資者整理的購房指南、區域分析、拍賣策略與盡職調查資源。"
    searchPlaceholder="搜尋買房及買方顧問主題"
    bannerImage={BANNER_IMAGE}
    overlayClass="bg-gradient-to-br from-blue-950/85 to-blue-900/70"
    service="buyer-advisory"
    categoryOrder={CATEGORY_ORDER}
    items={publishedKnowledgeItemsZh}
    labels={labels}
    locale="zh-Hant-AU"
    linkPrefix="/zh/article"
    cta={{
      title: "需要協助選擇合適的物業？",
      subtitle: "我們可以協助您釐清購房目標、風險及下一步。",
      buttons: [
        { label: "開始我的買房旅程", link: "/zh/buyer-advisory", variant: "golden" },
        { label: "預約諮詢", link: "/zh/book-consultation?service=buyer-advisory", variant: "outline" },
      ],
    }}
  />;
}
