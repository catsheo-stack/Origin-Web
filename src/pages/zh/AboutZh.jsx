import React, { useEffect } from "react";
import { Link } from "react-router-dom";
import { Award, Star, GraduationCap, Briefcase, Sparkles } from "lucide-react";
import SectionWrapper from "@/components/origin/SectionWrapper";
import PortraitPlaceholder from "@/components/about/PortraitPlaceholder";
import CredentialCard from "@/components/about/CredentialCard";

const CREDENTIALS = [
  {
    icon: Award,
    title: "Westpac 白金級貸款經紀",
    description: "憑藉卓越表現、客戶成果及專業服務獲得肯定。",
  },
  {
    icon: Star,
    title: "RateMyAgent 客戶評價",
    description: "在住宅房產交易中，持續獲得已驗證客戶的正面評價與信任。",
    action: { label: "查看評價", href: "#" },
  },
  {
    icon: GraduationCap,
    title: "房產過戶高級文憑",
    description: "具備正式房產過戶教育背景，深入理解維州房產交易及相關法律流程。",
  },
  {
    icon: Briefcase,
    title: "超過 10 年房產經驗",
    description: "經驗涵蓋房屋貸款、住宅房地產、買方顧問及房產交易。",
  },
];

export default function AboutZh() {
  useEffect(() => {
    document.title = "關於 Catherine｜Origin Property Concierge";
    const metaDesc = document.querySelector('meta[name="description"]');
    if (metaDesc) {
      metaDesc.setAttribute(
        "content",
        "認識 Origin Property Concierge 創辦人 Catherine，了解她在房屋貸款、房地產銷售、買方顧問及房產過戶方面的經驗，以及創立 Origin 的理念。"
      );
    }
  }, []);

  return (
    <>
      <SectionWrapper bg="bg-parchment" className="pt-28 md:pt-36">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-5">
              Origin 的創立故事
            </p>
            <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light text-midnight leading-[1.05] tracking-tight mb-6">
              認識 Catherine
            </h1>
            <div className="space-y-4 text-base md:text-lg text-midnight/65 leading-relaxed font-body max-w-xl">
              <p>
                Catherine 在房產行業累積超過十年經驗後，創立了 Origin Property Concierge。她的理念很簡單：讓房產決策變得更清晰、更有依據，也不再令人感到不知所措。
              </p>
              <p>
                她的經驗橫跨房屋貸款、住宅房地產、買方顧問及房產過戶，因此深明每一個房產決定，都遠不只是單純的買入或出售。
              </p>
              <p>
                Origin Concierge 將這些專業領域整合成一個相互連結的服務體驗，協助客戶更有信心地走過房產旅程的每一個階段。
              </p>
            </div>
          </div>
          <div className="order-first lg:order-last">
            <PortraitPlaceholder label="Catherine 個人照片" />
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="bg-white">
        <div className="max-w-3xl">
          <div className="w-10 h-10 rounded-full bg-parchment flex items-center justify-center mb-5">
            <Sparkles className="w-5 h-5 text-golden" strokeWidth={1.5} />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-light text-midnight leading-tight mb-5">
            以經驗為基礎，由科技進一步提升
          </h2>
          <div className="space-y-4 text-base md:text-lg text-midnight/65 leading-relaxed font-body">
            <p>
              Origin Concierge 將實際行業經驗與 Hermes Lab 結合。Hermes Lab 是一個 AI 輔助知識平台，旨在提供教育資源、更智能的工具及有系統的房產指引。
            </p>
            <p>
              科技不會取代專業意見，而是協助客戶在作出重要房產決定前，更清楚了解自己的選項。
            </p>
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="bg-parchment">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-14 items-start">
          <div>
            <p className="text-xs font-medium tracking-[0.2em] uppercase text-golden mb-4">
              專業資歷
            </p>
            <h2 className="font-heading text-3xl md:text-4xl font-light text-midnight leading-tight mb-5">
              經驗與肯定
            </h2>
            <p className="text-base md:text-lg text-midnight/60 leading-relaxed font-body mb-8 max-w-md">
              在房屋貸款、房地產及房產過戶領域累積逾十年的專業成就，並具備正式資格及經已驗證的客戶信任。
            </p>
            <div className="rounded-2xl overflow-hidden shadow-sm">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=900&q=80"
                alt="展現房產專業與權威形象的現代建築"
                className="w-full h-auto object-cover aspect-[4/3]"
                loading="lazy"
              />
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {CREDENTIALS.map((credential) => (
              <CredentialCard key={credential.title} {...credential} />
            ))}
          </div>
        </div>
      </SectionWrapper>

      <SectionWrapper bg="bg-parchment" className="text-center">
        <div className="max-w-2xl mx-auto">
          <h2 className="font-heading text-2xl md:text-3xl font-light text-midnight leading-tight mb-4">
            您的下一個房產決定需要協助嗎？
          </h2>
          <p className="text-base text-midnight/60 leading-relaxed font-body mb-8">
            無論您正在買房、賣房、投資或出租，我們都樂意協助您。
          </p>
          <Link
            to="/zh"
            className="inline-block bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full hover:bg-golden/90 transition-colors"
          >
            開始您的房產旅程
          </Link>
        </div>
      </SectionWrapper>
    </>
  );
}
