import React,{useState,useEffect} from "react";
import {Link,useLocation} from "react-router-dom";
import {Menu,X,ChevronDown} from "lucide-react";
import originLogo from "@/assets/origin-logo.png";

export default function Navbar(){
 const [scrolled,setScrolled]=useState(false),[visible,setVisible]=useState(true),[lastY,setLastY]=useState(0),[mobileOpen,setMobileOpen]=useState(false),[kcOpen,setKcOpen]=useState(false);
 const location=useLocation();
 const zh=location.pathname==="/zh"||location.pathname.startsWith("/zh/");
 useEffect(()=>{const f=()=>{const y=window.scrollY;setScrolled(y>20);setVisible(y<lastY||y<80);setLastY(y)};window.addEventListener('scroll',f,{passive:true});return()=>window.removeEventListener('scroll',f)},[lastY]);
 useEffect(()=>{setMobileOpen(false);setKcOpen(false)},[location.pathname]);
 const P=zh?'/zh':'';
 const labels=zh?{buyer:'買方顧問',pm:'物業管理',conv:'房產過戶',mort:'房屋貸款',kc:'知識中心',call:'預約諮詢'}:{buyer:'Buyer Advisory',pm:'Property Management',conv:'Conveyancing',mort:'Mortgage & Finance',kc:'Knowledge Centre',call:'Book a Call'};
 const zhToEn={
  '/zh/knowledge-centre':'/knowledge-centre','/zh/buyer-advisory/resources':'/buyer-advisory/resources','/zh/property-management/resources':'/property-management/resources','/zh/conveyancing/resources':'/conveyancing/resources','/zh/mortgage-finance/resources':'/mortgage-finance/resources','/zh/tools':'/tools','/zh/tools/investment-yield-calculator':'/tools/investment-yield-calculator'
 };
 const switchPath=zh?(zhToEn[location.pathname]||location.pathname.replace(/^\/zh/,'')||'/'):`/zh${location.pathname==='/'?'':location.pathname}`;
 const service=[['buyer',`${P}/buyer-advisory`],['pm',`${P}/property-management`],['conv',`${P}/conveyancing`],['mort',`${P}/mortgage-finance`]];
 const knowledgeLinks=zh?[
  ['中文知識中心','/zh/knowledge-centre'],['買方顧問資源','/zh/buyer-advisory/resources'],['房東與物業管理','/zh/property-management/resources'],['房產過戶資源','/zh/conveyancing/resources'],['房屋貸款資源','/zh/mortgage-finance/resources'],['常見問題','/zh/faq'],['房產實用工具','/zh/tools']
 ]:[['Articles','/articles'],['Guides','/guides'],['FAQ','/faq'],['Tools','/tools']];
 return <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${visible?'translate-y-0':'-translate-y-full'} ${scrolled?'bg-parchment/95 backdrop-blur-xl shadow-sm':'bg-parchment/80 backdrop-blur-xl'}`}>
  <nav className="max-w-7xl mx-auto px-6 lg:px-10 h-[72px] flex items-center justify-between">
   <Link to={P||'/'} className="flex items-center gap-2"><img src={originLogo} alt="Origin Concierge logo" className="h-8 w-8 object-contain shrink-0"/><span className="font-heading text-xl font-light tracking-tight text-midnight whitespace-nowrap">Origin Property <span className="text-golden font-normal">Concierge</span></span></Link>
   <div className="hidden md:flex items-center gap-7">
    {service.map(([k,path])=><Link key={k} to={path} className="text-sm font-body tracking-wide text-midnight/70 hover:text-accent-navy">{labels[k]}</Link>)}
    <div className="relative" onMouseEnter={()=>setKcOpen(true)} onMouseLeave={()=>setKcOpen(false)}><button className="text-sm text-midnight/70 flex items-center gap-1">{labels.kc}<ChevronDown size={14}/></button>{kcOpen&&<div className="absolute top-full left-1/2 -translate-x-1/2 pt-3"><div className="w-64 bg-white rounded-xl shadow-xl border border-stone overflow-hidden">{knowledgeLinks.map(([label,path],i)=><Link key={path} to={path} className={`block px-5 py-3 text-sm hover:bg-stone/30 ${i?'border-t':''}`}>{label}</Link>)}</div></div>}</div>
    <Link to={switchPath} className="text-xs font-semibold text-golden border border-golden/50 rounded-full px-3 py-2">{zh?'EN':'繁中'}</Link>
    <Link to={zh?'/zh/book-consultation':'/book-consultation'} className="bg-midnight text-parchment text-sm px-5 py-2.5 rounded-full hover:bg-accent-navy">{labels.call}</Link>
   </div>
   <button className="md:hidden p-2 text-midnight" onClick={()=>setMobileOpen(!mobileOpen)}>{mobileOpen?<X size={24}/>:<Menu size={24}/>}</button>
  </nav>
  {mobileOpen&&<div className="md:hidden bg-parchment/95 border-t border-stone px-6 py-6 space-y-1">{service.map(([k,path])=><Link key={k} to={path} className="block text-base text-midnight/80 py-2">{labels[k]}</Link>)}<div><button type="button" onClick={()=>setKcOpen(!kcOpen)} className="w-full flex items-center justify-between text-base text-midnight/80 py-2" aria-expanded={kcOpen}><span>{labels.kc}</span><ChevronDown size={18} className={`transition-transform ${kcOpen?'rotate-180':''}`}/></button>{kcOpen&&<div className="pl-4 pb-1">{knowledgeLinks.map(([label,path])=><Link key={path} to={path} className="block text-sm text-midnight/70 py-2">{label}</Link>)}</div>}</div><Link to={switchPath} className="block text-base text-golden py-2">{zh?'English':'繁體中文'}</Link><Link to={zh?'/zh/book-consultation':'/book-consultation'} className="block bg-midnight text-parchment text-center text-sm px-5 py-3 rounded-full mt-4">{labels.call}</Link></div>}
 </header>;
}
