import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ClipboardCheck, TrendingUp, Home, FileText, FileSignature, ListChecks } from "lucide-react";
import { base44 } from "@/api/base44Client";
import SectionWrapper from "@/components/origin/SectionWrapper";
import CTABanner from "@/components/origin/CTABanner";

const TOOLS = [
  {
    name: "Buyer Agent Checklist",
    description: "Plan and track every stage of your property buying journey, from search and due diligence to settlement and key handover.",
    category: "Buyer Advisory",
    path: "/tools/buyer-agent-checklist",
    icon: ListChecks,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "Origin Home Buying Planner",
    description: "Plan your buying budget, estimate costs, assess your deposit position and calculate your financial readiness.",
    category: "Buyer Advisory",
    path: "/tools/origin-home-buying-planner",
    icon: Home,
    image: "https://images.unsplash.com/photo-1568605114967-8130f3a36994?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "Investment Yield Calculator",
    description: "Estimate rental yield, annual holding costs and pre-tax cashflow for investment properties.",
    category: "Property Management",
    path: "/tools/investment-yield-calculator",
    icon: TrendingUp,
    image: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "Property Management Readiness Checklist",
    description: "Prepare your rental property before leasing with this interactive readiness checklist.",
    category: "Property Management",
    path: "/tools/property-management-readiness-checklist",
    icon: ClipboardCheck,
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "Buyer Settlement Tracker",
    description: "Track your settlement milestones from contract signing to key handover.",
    category: "Conveyancing",
    path: "/tools/buyer-settlement-tracker",
    icon: FileText,
    image: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?auto=format&fit=crop&w=800&q=80",
    available: true,
  },
  {
    name: "Seller Settlement Tracker",
    description: "Track your sale from contract signing through to settlement and receiving your proceeds.",
    category: "Conveyancing",
    path: "/tools/seller-settlement-tracker",
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
      onClick={() => { base44.analytics.track({ eventName: "tool_opened", properties: { tool: tool.name } }); }}
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
          Open Tool
          <ArrowRight size={14} />
        </span>
      </div>
    </Link>
  );
}

export default function Tools() {
  useEffect(() => {
    document.title = "Tools | Origin Concierge";
    const setMeta = (sel, attr, content) => {
      let el = document.head.querySelector(sel);
      if (!el) { el = document.createElement("meta"); document.head.appendChild(el); }
      el.setAttribute(attr, content);
    };
    setMeta('meta[name="description"]', "content", "Use Origin Concierge tools to plan your property budget, estimate investment yield and prepare for property management.");
    setMeta('meta[property="og:title"]', "content", "Tools | Origin Concierge");
    setMeta('meta[property="og:description"]', "content", "Use Origin Concierge tools to plan your property budget, estimate investment yield and prepare for property management.");
    base44.analytics.track({ eventName: "page_viewed", properties: { page: "tools" } });
  }, []);

  const available = TOOLS.filter((t) => t.available);

  return (
    <>
      {/* Hero */}
      <section className="bg-parchment pt-32 pb-12 md:pt-40 md:pb-16">
        <div className="max-w-3xl mx-auto px-6 lg:px-10 text-center">
          <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-3">Knowledge Centre</p>
          <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-light text-midnight mb-4">Tools</h1>
          <p className="text-base text-midnight/60 leading-relaxed max-w-xl mx-auto">
            Free interactive tools to help you plan your property budget, estimate investment yield and prepare for property management.
          </p>
        </div>
      </section>

      {/* Available tools */}
      <SectionWrapper className="!pt-8 !pb-20">
        <h2 className="font-heading text-xl md:text-2xl text-midnight mb-6">Available Now</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {available.map((tool) => (
            <ToolCard key={tool.name} tool={tool} />
          ))}
        </div>
      </SectionWrapper>

      <CTABanner
        title="Need more help?"
        subtitle="Book a consultation and we'll guide you to the right next step for your situation."
        ctaText="Book a Call"
        ctaLink="/book-consultation"
      />
    </>
  );
}