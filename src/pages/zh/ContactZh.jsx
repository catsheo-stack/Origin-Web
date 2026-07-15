import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";
import SectionWrapper from "@/components/origin/SectionWrapper";
import LegalConsent, { LEGAL_CONSENT_VERSION, MARKETING_CONSENT_VERSION } from "@/components/origin/LegalConsent";

const services = [
  ["Buyer Agent / Buyer Advisory", "買方顧問服務"],
  ["Mortgage Broker / Home Loan Support", "房屋貸款及融資協助"],
  ["Conveyancing", "房產過戶服務"],
  ["Property Management", "出租物業管理"],
  ["Not sure yet", "尚未確定"],
];
const stages = [
  ["Just researching", "正在初步了解"],
  ["Actively looking to buy", "正在積極尋找物業"],
  ["Found a property", "已找到物業"],
  ["Contract / Section 32 review needed", "需要審閱合約／Section 32"],
  ["Need finance guidance", "需要貸款或融資指引"],
  ["Need rental appraisal / property manager", "需要租金評估／物業經理"],
  ["Already own the property", "已持有該物業"],
  ["Other", "其他"],
];
const timelines = [["ASAP","盡快"],["Within 1 month","一個月內"],["1–3 months","一至三個月"],["3–6 months","三至六個月"],["Just planning ahead","暫時規劃中"]];
const methods = [["Phone","電話"],["SMS","短訊"],["Email","電郵"],["WhatsApp","WhatsApp"]];

export default function ContactZh(){
  const { toast } = useToast(); const navigate = useNavigate();
  const [submitting,setSubmitting]=useState(false), [legalConsent,setLegalConsent]=useState(false), [marketingConsent,setMarketingConsent]=useState(false);
  const [form,setForm]=useState({full_name:"",email:"",phone:"",property_address:"",service_required:"",property_stage:"",timeline:"",additional_notes:"",preferred_contact:"Phone"});
  useEffect(()=>{document.title="聯絡我們｜Origin Property Concierge"; base44.analytics.track({eventName:"page_viewed",properties:{page:"contact-zh"}})},[]);
  const update=(k,v)=>setForm(f=>({...f,[k]:v}));
  const submit=async(e)=>{e.preventDefault(); if(!legalConsent){toast({title:"請確認同意事項",description:"提交前請確認您已閱讀並同意隱私政策、使用條款及專業服務免責聲明。",variant:"destructive"});return;} setSubmitting(true); try{await base44.entities.Lead.create({...form,legal_consent:true,legal_consent_version:LEGAL_CONSENT_VERSION,legal_consent_at:new Date().toISOString(),marketing_consent:marketingConsent,marketing_consent_version:marketingConsent?MARKETING_CONSENT_VERSION:null,marketing_consent_at:marketingConsent?new Date().toISOString():null,source_page:"contact-zh",lead_source:"chinese-site"}); toast({title:"查詢已送出",description:"我們會先了解您的情況，再為您安排最合適的下一步。"}); navigate("/zh/thank-you");}catch{toast({title:"暫時未能送出",description:"請稍後再試，或直接以電郵聯絡我們。",variant:"destructive"});}finally{setSubmitting(false)}};
  return <SectionWrapper className="!pt-24 md:!pt-32 !pb-20 md:!pb-28"><div className="max-w-3xl mx-auto"><form onSubmit={submit} className="bg-white rounded-2xl p-8 md:p-12 shadow-sm"><h1 className="font-heading text-3xl md:text-4xl font-light text-midnight mb-3">告訴我們您需要哪方面的協助</h1><p className="text-sm text-midnight/50 mb-8">只需提交一次查詢，我們會按您的情況連結合適的專業人士。</p><div className="grid grid-cols-1 md:grid-cols-2 gap-5"><Select label="所需服務" value={form.service_required} onChange={v=>update("service_required",v)} options={services} required/><Select label="目前階段" value={form.property_stage} onChange={v=>update("property_stage",v)} options={stages}/><Input label="物業地址或目標地區" value={form.property_address} onChange={v=>update("property_address",v)} placeholder="例如：Melbourne CBD、Box Hill 或物業地址"/><Select label="預計時間" value={form.timeline} onChange={v=>update("timeline",v)} options={timelines}/></div><div className="mt-5"><label className="block text-sm font-medium text-midnight mb-1.5">補充資料</label><textarea value={form.additional_notes} onChange={e=>update("additional_notes",e.target.value)} className="w-full border border-stone rounded-lg px-4 py-3 text-sm bg-parchment/50 focus:outline-none focus:border-accent-navy min-h-[110px]" placeholder="請簡單說明您的需求、預算、地區或時間安排……"/></div><div className="mt-8 pt-6 border-t border-stone/50 grid grid-cols-1 md:grid-cols-2 gap-5"><Input label="姓名" value={form.full_name} onChange={v=>update("full_name",v)} placeholder="您的姓名" required/><Input label="電郵地址" value={form.email} onChange={v=>update("email",v)} placeholder="name@example.com" type="email" required/><Input label="電話號碼" value={form.phone} onChange={v=>update("phone",v)} placeholder="04xx xxx xxx"/><Select label="偏好聯絡方式" value={form.preferred_contact} onChange={v=>update("preferred_contact",v)} options={methods}/></div><LegalConsent zh checked={legalConsent} onChange={setLegalConsent} marketingChecked={marketingConsent} onMarketingChange={setMarketingConsent}/><button disabled={submitting||!legalConsent} className="mt-8 w-full bg-golden text-midnight font-medium text-sm py-4 rounded-full hover:bg-golden/90 disabled:opacity-50">{submitting?"正在送出……":"提交查詢"}</button></form></div></SectionWrapper>
}
function Input({label,value,onChange,placeholder,type="text",required}){return <div><label className="block text-sm font-medium text-midnight mb-1.5">{label}</label><input type={type} value={value} onChange={e=>onChange(e.target.value)} placeholder={placeholder} required={required} className="w-full border border-stone rounded-lg px-4 py-3 text-sm bg-parchment/50 focus:outline-none focus:border-accent-navy"/></div>}
function Select({label,value,onChange,options,required}){return <div><label className="block text-sm font-medium text-midnight mb-1.5">{label}</label><select value={value} onChange={e=>onChange(e.target.value)} required={required} className="w-full border border-stone rounded-lg px-4 py-3 text-sm bg-parchment/50 focus:outline-none focus:border-accent-navy"><option value="">請選擇</option>{options.map(([v,l])=><option key={v} value={v}>{l}</option>)}</select></div>}
