import React, { useEffect } from "react";
import JourneyDropdownZh from "@/components/origin/JourneyDropdownZh";
const HERO_IMG = "https://media.base44.com/images/public/6a4b6a4d876af717f7025909/b83fb0775_generated_500ee129.png";
export default function HomeZh(){
 useEffect(()=>{document.title="Origin Property Concierge｜您的目標，我們的優先"; const m=document.querySelector('meta[name="description"]'); if(m)m.setAttribute('content','為墨爾本華語客戶連結值得信賴的買方顧問、物業管理、房產過戶及房屋貸款專業服務。');},[]);
 return <section className="relative w-full min-h-screen flex items-center overflow-visible md:overflow-hidden bg-parchment">
  <img src={HERO_IMG} alt="墨爾本現代住宅室內空間" className="absolute inset-0 h-full w-full object-cover" loading="eager"/>
  <div className="absolute inset-0 bg-gradient-to-r from-white/95 via-white/60 to-transparent"/><div className="absolute inset-0 bg-gradient-to-t from-black/15 to-transparent"/>
  <div className="relative z-10 w-full max-w-7xl mx-auto px-6 lg:px-10 pt-28 md:pt-32 pb-40 md:pb-28"><div className="max-w-xl">
   <p className="mb-5 text-xs font-medium uppercase tracking-[0.2em] text-golden">Origin Property Concierge</p>
   <h1 className="font-heading text-4xl md:text-5xl lg:text-6xl font-light leading-[1.08] tracking-tight text-midnight">您的目標，<br/>我們的優先。</h1>
   <p className="mt-6 max-w-lg text-base md:text-lg leading-relaxed text-midnight/70">在房產旅程的每一個階段，為您連結值得信賴的專業人士。</p>
   <p className="mt-3 max-w-lg text-sm leading-relaxed text-midnight/50">無論您正在買房、出售、投資、出租或辦理交割，Origin Concierge 透過一個相互連結的房產服務平台，協助您更安心地向前邁進。</p>
   <JourneyDropdownZh/>
  </div></div>
 </section>
}
