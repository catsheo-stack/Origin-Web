import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, TrendingUp, Home, FileText, FileSignature, ListChecks } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import CTABanner from "@/components/origin/CTABanner";

const TOOLS = [
  {
    name: "買方顧問置業清單",
    description: "由物業搜尋、盡職調查及議價，到交割準備與鑰匙交收，逐步規劃並追蹤整個置業流程。",
    category: "買方顧問",
    path: "/zh/tools/buyer-agent-checklist",
    icon: ListChecks,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "Origin 買房規劃工具",
    description: "整理買房預算、估算相關費用、評估首期資金狀況，並了解目前的財務準備程度。",
    category: "買方顧問",
    path: "/zh/tools/origin-home-buying-planner",
    icon: Home,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "投資物業租金回報計算器",
    description: "估算投資物業的租金回報率、每年持有成本及稅前現金流。",
    category: "物業管理",
    path: "/zh/tools/investment-yield-calculator",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "出租物業準備清單",
    description: "透過互動清單，檢查出租物業在正式招租前是否已做好基本準備。",
    category: "物業管理",
    path: "/zh/tools/property-management-readiness-checklist",
    icon: ClipboardCheck,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "買家交割進度追蹤器",
    description: "由簽署合約至收取鎖匙，逐步追蹤買方交割的重要里程碑。",
    category: "房產過戶",
    path: "/zh/tools/buyer-settlement-tracker",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "賣家交割進度追蹤器",
    description: "由簽署出售合約開始，追蹤至完成交割及收取售樓款項的主要步驟。",
    category: "房產過戶",
    path: "/zh/tools/seller-settlement-tracker",
    icon: FileSignature,
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
];

function ToolCard({ tool }) {
  const Icon = tool.icon;
  return (
    <Link
      to={tool.path}
      onClick={() => base44.analytics.track({ eventName: "tool_opened", properties: { tool: tool.name, language: "zh-Hant" } })}
      className="bg-white rounded-2xl border border-stone/60 overflow-hidden flex flex-col hover:shadow-md transition-shadow group"
    >
      <div className="relative h-44 overflow-hidden">
        <img src={tool.image} alt={tool.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
        <div className="absolute inset-0 bg-gradient-to-t from-midnight/50 via-midnight/10 to-transparent" />
        <div className="absolute top-3 left-3 w-9 h-9 rounded-full bg-white/90 backdrop-blur flex items-center justify-center">
          <Icon size={18} className="text-golden" strokeWidth={1.5} />
        </div>
      </div>
      <div className="p-6 flex flex-col flex-grow">
        <p className="text-xs font-medium tracking-wide uppercase text-midnight/40 mb-1.5">{tool.category}</p>
        <h3 className="font-heading text-lg text-midnight mb-2">{tool.name}</h3>
        <p className="text-sm text-midnight/50 leading-relaxed mb-5 flex-grow">{tool.description}</p>
        <span className="inline-flex items-center gap-1.5 text-sm font-medium text-golden">
          開啟工具
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function ToolsZh() {
  useEffect(() => {
    document.title = "房產實用工具｜Origin Property Concierge";
    const setMeta = (selector, attribute, content) => {
      let element = document.head.querySelector(selector);
      if (!element) {
        element = document.createElement("meta");
        document.head.appendChild(element);
      }
      element.setAttribute(attribute, content);
    };
    setMeta('meta[name="description"]', "content", "使用 Origin Property Concierge 的免費房產工具，協助您規劃買房預算、估算投資物業租金回報，並準備出租及交割流程。");
    setMeta('meta[property="og:title"]', "content", "房產實用工具｜Origin Property Concierge");
    setMeta('meta[property="og:description"]', "content", "免費房產規劃、租金回報、出租準備及交割追蹤工具，為墨爾本華語客戶提供清晰實用的參考。");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tools", language: "zh-Hant" } });
  }, []);

  const available = TOOLS.filter((tool) => tool.available);

  return (
    <>
      <section className="bg-parchment pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-3">知識中心</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-midnight mb-4">房產實用工具</h1>
          <p className="text-base text-midnight/60 leading-relaxed max-w-xl mx-auto">
            免費互動工具，協助您規劃買房預算、估算投資物業租金回報，並有條理地準備出租及交割流程。
          </p>
        </div>
      </section>

      <SectionWrapper className="!pt-8 !pb-20">
        <h2 className="font-heading text-xl md:text-2xl text-midnight mb-6">現已開放使用</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {available.map((tool) => <ToolCard key={tool.name} tool={tool} />)}
        </div>
      </SectionWrapper>

      <CTABanner
        title="需要進一步協助？"
        subtitle="預約諮詢，我們會根據您的情況協助您釐清下一步。"
        ctaText="預約諮詢"
        ctaLink="/zh/book-consultation"
      />
    </>
  );
}
