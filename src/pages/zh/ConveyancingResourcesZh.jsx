import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";
import { publishedKnowledgeItemsZh } from "@/data/knowledgeCentreZh";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1570129477492-45c003edd2be?auto=format&fit=crop&w=1920&q=80";
const labels = {
  eyebrow: "知識資源", noMatches: "找不到相關內容", comingSoon: "內容即將推出",
  noMatchesText: (query) => `沒有資源符合「${query}」。請嘗試其他關鍵字。`, comingSoonText: "我們正在整理這個知識中心的實用內容。",
  clearSearch: "清除搜尋", resource: "篇資源", resources: "篇資源", readGuide: "閱讀指南", minuteRead: "分鐘閱讀",
};
export default function ConveyancingResourcesZh() {
  return <ResourceHub
    seoTitle="維州房產過戶知識中心｜Origin Property Concierge"
    metaDescription="為維州買家及賣家提供購房合約、Section 32、產權資料及交割流程的實用說明。"
    title="房產過戶知識中心"
    subtitle="為維州買家及賣家整理的合約、Section 32、產權及交割流程實用指南。"
    searchPlaceholder="搜尋房產過戶及合約主題"
    bannerImage={BANNER_IMAGE}
    overlayClass="bg-gradient-to-br from-stone-900/85 to-amber-950/70"
    service="conveyancing"
    categoryOrder={["房產過戶"]}
    items={publishedKnowledgeItemsZh}
    labels={labels}
    locale="zh-Hant-AU"
    linkPrefix="/zh/article"
    cta={{ title: "需要協助處理物業交易？", subtitle: "預約諮詢，了解合約、Section 32 檢查及交割安排。", buttons: [
      { label: "預約諮詢", link: "/zh/book-consultation?service=conveyancing", variant: "golden" },
      { label: "聯絡我們", link: "/zh/contact?service=conveyancing", variant: "outline" },
    ] }}
  />;
}
