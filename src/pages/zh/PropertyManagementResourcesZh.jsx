import React from "react";
import ResourceHub from "@/components/origin/ResourceHub";
import { publishedKnowledgeItemsZh } from "@/data/knowledgeCentreZh";

const BANNER_IMAGE = "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1920&q=80";
const CATEGORY_ORDER = ["房東入門", "租金評估", "選擇物業經理", "出租流程", "法規合規", "維修與例行檢查", "租約結束", "物業管理"];
const labels = {
  eyebrow: "知識資源", noMatches: "找不到相關內容", comingSoon: "內容即將推出",
  noMatchesText: (query) => `沒有資源符合「${query}」。請嘗試其他關鍵字。`,
  comingSoonText: "我們正在整理這個知識中心的實用內容。", clearSearch: "清除搜尋",
  resource: "篇資源", resources: "篇資源", readGuide: "閱讀指南", minuteRead: "分鐘閱讀",
};

export default function PropertyManagementResourcesZh() {
  return <ResourceHub
    seoTitle="墨爾本房東與物業管理知識中心｜Origin Property Concierge"
    metaDescription="為墨爾本房東及投資者提供租金評估、出租流程、租賃合規、維修及物業管理指南。"
    title="房東與物業管理知識中心"
    subtitle="為墨爾本房東及投資者整理的出租、租金評估、租賃合規及物業管理實用資源。"
    searchPlaceholder="搜尋房東及物業管理主題"
    bannerImage={BANNER_IMAGE}
    overlayClass="bg-gradient-to-br from-midnight/90 to-accent-navy/75"
    service="property-management"
    categoryOrder={CATEGORY_ORDER}
    items={publishedKnowledgeItemsZh}
    labels={labels}
    locale="zh-Hant-AU"
    linkPrefix="/zh/article"
    cta={{
      title: "準備討論您的物業？",
      subtitle: "無論您考慮出租、出售或比較兩者，我們都可協助您釐清合適的下一步。",
      buttons: [
        { label: "取得物業評估", link: "/zh/property-management", variant: "golden" },
        { label: "預約諮詢", link: "/zh/book-consultation?service=property-management", variant: "outline" },
      ],
    }}
  />;
}
