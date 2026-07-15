import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight, BookOpen, Building2, FileCheck2, Landmark, HelpCircle } from "lucide-react";
import SectionWrapper from "@/components/origin/SectionWrapper";

const hubs = [
  { title: "買方顧問", description: "購房準備、盡職調查、Section 32、議價、拍賣及選區策略。", link: "/zh/buyer-advisory/resources", icon: BookOpen },
  { title: "房東與物業管理", description: "租金評估、出租流程、租賃合規、維修及租約結束指南。", link: "/zh/property-management/resources", icon: Building2 },
  { title: "房產過戶", description: "合約、Section 32、產權資料及交割流程的實用說明。", link: "/zh/conveyancing/resources", icon: FileCheck2 },
  { title: "房屋貸款", description: "借貸能力、首期、貸款預批、購房成本及貸款結構。", link: "/zh/mortgage-finance/resources", icon: Landmark },
];

export default function KnowledgeCentreZh() {
  useEffect(() => {
    document.title = "中文房產知識中心｜Origin Property Concierge";
    let meta = document.head.querySelector('meta[name="description"]');
    if (!meta) { meta = document.createElement("meta"); meta.setAttribute("name", "description"); document.head.appendChild(meta); }
    meta.setAttribute("content", "為墨爾本華語買家、房東及業主提供買房、物業管理、房產過戶及房屋貸款實用指南。 ");
  }, []);

  return <>
    <section className="bg-accent-navy pb-14 pt-28 md:pb-16 md:pt-32">
      <div className="mx-auto max-w-3xl px-6 text-center lg:px-10">
        <p className="mb-3 text-xs font-medium uppercase tracking-[0.2em] text-golden">Origin 知識資源</p>
        <h1 className="font-heading mb-4 text-3xl font-light text-parchment md:text-4xl">中文房產知識中心</h1>
        <p className="mx-auto max-w-2xl text-sm leading-relaxed text-parchment/70 md:text-base">以清晰、實用的繁體中文，協助墨爾本買家、房東及業主了解重要流程、風險與決策重點。</p>
      </div>
    </section>
    <SectionWrapper className="!py-16 md:!py-24">
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
        {hubs.map(({ title, description, link, icon: Icon }) => <Link key={link} to={link} className="group rounded-2xl border border-stone/70 bg-white p-7 shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md">
          <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-full bg-parchment text-golden"><Icon size={21} /></div>
          <h2 className="font-heading mb-2 text-2xl font-light text-midnight">{title}</h2>
          <p className="mb-5 text-sm leading-relaxed text-midnight/55">{description}</p>
          <span className="inline-flex items-center gap-1.5 text-sm font-medium text-golden">查看資源 <ArrowUpRight size={14} className="transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" /></span>
        </Link>)}
      </div>
      <div className="mt-10 rounded-2xl bg-midnight p-7 text-center md:p-9">
        <HelpCircle className="mx-auto mb-3 text-golden" size={25} />
        <h2 className="font-heading text-2xl font-light text-parchment">有具體問題？</h2>
        <p className="mx-auto mt-2 max-w-xl text-sm leading-relaxed text-parchment/65">瀏覽常見問題，了解買房、貸款、過戶、物業管理及網站工具的實用解答。</p>
        <Link to="/zh/faq" className="mt-5 inline-flex rounded-full bg-golden px-6 py-2.5 text-sm font-medium text-midnight">查看常見問題</Link>
      </div>
    </SectionWrapper>
  </>;
}
