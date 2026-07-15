import { publishedKnowledgeItems } from "@/data/knowledgeCentre";
import { knowledgeBodiesZh } from "@/data/knowledgeBodiesZh";

const translations = {
  "what-does-a-buyer-agent-actually-do": {
    category: "買房入門",
    title: "買方顧問實際可以為您做甚麼？",
    summary: "了解買方顧問如何協助物業搜尋、盡職調查、議價及整個購買流程，而不只是提供房源。",
    tags: ["買方顧問", "墨爾本買房", "物業搜尋", "議價"],
  },
  "buyer-checklist-before-you-start-looking": {
    category: "買房入門",
    title: "開始看房前的買家準備清單",
    summary: "在看房前先釐清預算、購房需求、目標地區、貸款狀況及不可妥協的條件。",
    tags: ["買房清單", "購房預算", "貸款預批", "選區"],
  },
  "what-to-check-before-making-an-offer": {
    category: "盡職調查與風險",
    title: "出價前應檢查哪些事項？",
    summary: "實用說明如何評估價格、地段、房屋狀況、合約風險、業主委員會問題及未來轉售潛力。",
    tags: ["出價前檢查", "盡職調查", "合約風險", "業主委員會"],
  },
  "why-section-32-review-matters-before-you-buy": {
    category: "Section 32 審閱",
    title: "買房前為何必須審閱 Section 32？",
    summary: "了解賣方聲明可能披露的規劃用途、業主委員會、地役權、費用及其他物業風險。",
    tags: ["Section 32", "賣方聲明", "維州買房", "產權風險"],
  },
  "how-to-prepare-for-property-negotiation": {
    category: "議價策略",
    title: "如何為物業議價做好準備",
    summary: "掌握成交價證據、與售房代理溝通、判斷競爭買家行為，以及避免因情緒而出價過高。",
    tags: ["物業議價", "成交價", "買房策略", "售房代理"],
  },
  "auction-bidding-tips-for-buyers": {
    category: "拍賣策略",
    title: "買家拍賣競投實用技巧",
    summary: "學習設定最高限價、判斷拍賣節奏，並在保護預算的同時自信出價。",
    tags: ["物業拍賣", "競投技巧", "最高限價", "墨爾本拍賣"],
  },
  "how-to-choose-the-right-suburb": {
    category: "地區選擇",
    title: "如何選擇適合自己的墨爾本地區",
    summary: "在決定地區前，平衡生活方式、學校、交通、升值潛力、租賃需求及未來轉售吸引力。",
    tags: ["墨爾本地區", "校區", "交通", "升值潛力"],
  },
  "owner-occupier-vs-investor-buying-strategy": {
    category: "投資者指南",
    title: "自住買家與投資者的購房策略有何不同？",
    summary: "物業選擇應配合購買目的。了解自住生活需求與投資回報導向之間的策略差異。",
    tags: ["自住買家", "投資物業", "租金回報", "購房策略"],
  },
  "landlord-checklist-before-leasing": {
    category: "房東入門",
    title: "出租物業前的房東準備清單",
    summary: "從法規合規、安全檢查到物業展示，了解出租投資物業前應完成的準備工作。",
    tags: ["房東清單", "出租物業", "租賃合規", "投資房"],
  },
  "what-does-a-property-manager-do": {
    category: "房東入門",
    title: "物業經理實際負責哪些工作？",
    summary: "了解物業管理的完整範圍，包括租客篩選、租金管理、維修、檢查及合規，而不只是代收租金。",
    tags: ["物業管理", "租客管理", "租金管理", "房東服務"],
  },
  "rental-appraisal-explained": {
    category: "租金評估",
    title: "租金評估是甚麼？",
    summary: "了解專業租金評估會考慮哪些市場資料、物業條件及出租策略。",
    tags: ["租金評估", "市場租金", "出租建議", "投資物業"],
  },
  "what-affects-rental-value": {
    category: "租金評估",
    title: "哪些因素會影響物業租金？",
    summary: "了解地段、房型、物業狀況、配套、市場供求及季節如何影響可實現租金。",
    tags: ["租金價值", "市場租金", "出租回報", "租賃需求"],
  },
  "how-to-choose-property-manager-melbourne": {
    category: "選擇物業經理",
    title: "如何在墨爾本選擇合適的物業經理",
    summary: "了解應比較的服務、收費、溝通方式、在地經驗，以及委託前值得提出的問題。",
    tags: ["墨爾本物業經理", "物業管理公司", "管理費", "房東"],
  },
  "should-i-change-property-manager": {
    category: "選擇物業經理",
    title: "我是否應該更換物業經理？",
    summary: "辨識溝通不足、租金拖欠處理不當、維修延誤及合規風險等可能需要更換管理公司的訊號。",
    tags: ["更換物業經理", "物業管理問題", "房東權益", "管理轉移"],
  },
  "leasing-process-step-by-step": {
    category: "出租流程",
    title: "物業出租流程逐步說明",
    summary: "從租金建議、廣告、看房、租客申請到簽署租約，清楚了解物業由上市至成功出租的步驟。",
    tags: ["出租流程", "租客申請", "租約", "物業廣告"],
  },
  "preparing-your-property-for-rent": {
    category: "出租流程",
    title: "出租前如何準備物業",
    summary: "透過清潔、維修、安全檢查及適當展示，提高物業吸引力並吸引合適租客。",
    tags: ["出租準備", "物業展示", "租客", "租賃"],
  },
  "smoke-alarm-compliance-victoria": {
    category: "法規合規",
    title: "維州出租物業煙霧警報器合規要求",
    summary: "了解維州住宅租賃法下，房東對煙霧警報器檢查、維護及記錄保存的基本責任。",
    tags: ["煙霧警報器", "維州租賃法", "房東合規", "出租安全"],
  },
  "minimum-rental-standards": {
    category: "法規合規",
    title: "維州出租物業最低標準",
    summary: "概覽維州出租物業在安全、供暖、鎖具、通風、電力及其他方面需要符合的基本標準。",
    tags: ["最低出租標準", "維州房東", "租賃合規", "出租物業"],
  },
  "routine-inspection-guide": {
    category: "維修與例行檢查",
    title: "例行物業檢查指南",
    summary: "了解例行檢查的目的、一般流程、應記錄的事項，以及房東可如何跟進發現的問題。",
    tags: ["例行檢查", "物業狀況", "租客", "維修"],
  },
  "repairs-and-maintenance-responsibilities": {
    category: "維修與例行檢查",
    title: "維修與保養責任如何劃分？",
    summary: "了解一般維修、緊急維修、租客造成的損壞，以及房東與租客各自可能承擔的責任。",
    tags: ["維修責任", "緊急維修", "房東", "租客"],
  },
  "end-of-lease-checklist": {
    category: "租約結束",
    title: "租約結束房東清單",
    summary: "逐步處理搬出通知、最終檢查、清潔、鑰匙交還、費用結算及押金相關事項。",
    tags: ["租約結束", "搬出檢查", "押金", "房東清單"],
  },
  "bond-and-final-inspection-guide": {
    category: "租約結束",
    title: "押金與最終檢查指南",
    summary: "了解押金申請、入住狀況報告、合理損耗、物業損壞及最終檢查的重點。",
    tags: ["租賃押金", "最終檢查", "合理損耗", "狀況報告"],
  },
  "how-to-choose-the-right-property-manager": {
    category: "物業管理",
    title: "委託物業經理前應考慮哪些事項？",
    summary: "房東在委任物業經理前，應比較溝通、租客篩選、維修管理、合規知識及當地市場經驗。",
    tags: ["選擇物業經理", "房東", "租客篩選", "合規"],
  },
  "what-buyers-should-check-before-signing-a-contract": {
    category: "房產過戶",
    title: "買家簽署購房合約前應檢查甚麼？",
    summary: "在承諾購買前，檢查合約、Section 32、產權資料、特別條款、業主委員會及交割安排。",
    tags: ["購房合約", "Section 32", "房產過戶", "交割"],
  },
  "finance-preparation-before-buying-property": {
    category: "房屋貸款",
    title: "買房前應如何準備貸款與資金？",
    summary: "了解借貸能力、首期與購房成本、預批、貸款結構及融資條款，讓看房及出價更有方向。",
    tags: ["房屋貸款", "貸款預批", "借貸能力", "購房成本"],
  },
};

export const publishedKnowledgeItemsZh = publishedKnowledgeItems.map((item) => {
  const translated = translations[item.slug];
  const fullContent = knowledgeBodiesZh[item.slug];
  return translated
    ? {
        ...item,
        ...translated,
        ...(fullContent || {}),
        originalTitle: item.title,
        originalCategory: item.category,
      }
    : item;
});

export const getKnowledgeItemZhBySlug = (slug) =>
  publishedKnowledgeItemsZh.find((item) => item.slug === slug) || null;

export default publishedKnowledgeItemsZh;
