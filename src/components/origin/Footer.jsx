import React,{useState} from "react";
import {useLocation} from "react-router-dom";
import FooterDropdown from "./FooterDropdown";
export default function Footer(){
 const [open,setOpen]=useState(null);const {pathname}=useLocation();const zh=pathname==='/zh'||pathname.startsWith('/zh/');const P=zh?'/zh':'';
 const groups=zh?[
  {k:'s',t:'服務',l:[['買方顧問',`${P}/buyer-advisory`],['物業管理',`${P}/property-management`],['房產過戶',`${P}/conveyancing`],['房屋貸款',`${P}/mortgage-finance`]]},
  {k:'k',t:'知識中心',l:[['中文知識中心','/zh/knowledge-centre'],['買方顧問資源','/zh/buyer-advisory/resources'],['房東與物業管理','/zh/property-management/resources'],['房產過戶資源','/zh/conveyancing/resources'],['房屋貸款資源','/zh/mortgage-finance/resources'],['常見問題','/zh/faq'],['房產實用工具','/zh/tools']]},
  {k:'c',t:'公司',l:[['首頁','/zh'],['關於我們','/zh/about'],['聯絡我們','/zh/contact'],['預約諮詢','/zh/book-consultation']]},
  {k:'l',t:'法律',l:[['隱私政策','/zh/privacy-policy'],['使用條款','/zh/terms-of-use'],['專業服務免責聲明','/zh/professional-disclaimer']]}
 ]:[
  {k:'s',t:'Services',l:[['Buyer Advisory','/buyer-advisory'],['Property Owners','/property-management'],['Conveyancing','/conveyancing'],['Mortgage & Finance','/mortgage-finance']]},
  {k:'k',t:'Knowledge Centre',l:[['All Articles','/articles'],['All Guides','/guides'],['FAQ','/faq'],['Tools','/tools']]},
  {k:'c',t:'Company',l:[['Home','/'],['About','/about'],['Contact','/contact']]},
  {k:'l',t:'Legal',l:[['Privacy Policy','/privacy-policy'],['Terms of Use','/terms-of-use'],['Professional Disclaimer','/professional-disclaimer']]}
 ];
 return <footer className="bg-midnight text-parchment/80"><div className="mx-auto max-w-7xl px-6 py-5 lg:px-10"><div className="flex flex-col gap-1 md:flex-row md:items-start md:gap-10"><div className="pb-2 md:mr-auto"><p className="font-heading mb-1.5 text-sm font-light text-parchment">Origin Property <span className="font-normal text-golden">Concierge</span></p><a href="mailto:hello@originpropertyconcierge.com.au" className="text-xs text-parchment/50 hover:text-golden">hello@originpropertyconcierge.com.au</a></div>{groups.map(g=><FooterDropdown key={g.k} title={g.t} links={g.l.map(([label,path])=>({label,path}))} isOpen={open===g.k} onToggle={()=>setOpen(open===g.k?null:g.k)}/>)}</div></div><div className="border-t border-white/10"><div className="mx-auto max-w-7xl px-6 py-2.5 lg:px-10"><div className="mx-auto max-w-4xl text-center"><p className="text-[11px] leading-5 text-parchment/45">{zh?'Origin Property Concierge 是獨立的房產禮賓及協調平台，並在需要時為客戶連結具備適當牌照的專業人士。':'Origin Property Concierge is an independent property concierge and coordination platform connecting clients with appropriately licensed professionals where required.'}</p><p className="mt-1 text-[11px] text-parchment/35">© {new Date().getFullYear()} Origin Property Concierge. {zh?'版權所有。':'All rights reserved.'}</p></div></div></div></footer>;
}
