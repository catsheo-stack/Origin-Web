import React from 'react';
import SectionCard, { inputClass, labelClass } from './SectionCard';
import SeoChecklist from './SeoChecklist';

export default function SeoFields({ data, update, readingTime, wordCount }) {
  return (
    <SectionCard title="SEO & Targeting" description="Search metadata, checklist and audience targeting">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>SEO Title</label>
          <input type="text" value={data.seo_title} onChange={(e) => update('seo_title', e.target.value)} className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Focus Keyword</label>
          <input type="text" value={data.focus_keyword} onChange={(e) => update('focus_keyword', e.target.value)} placeholder="e.g. Property Manager Melbourne" className={inputClass} />
          <p className="text-xs text-midnight/30 mt-1">Later supplied by Hermes Lab.</p>
        </div>
      </div>
      <div>
        <label className={labelClass}>Meta Description</label>
        <textarea value={data.meta_description} onChange={(e) => update('meta_description', e.target.value)} rows={2} className={inputClass} />
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Search Intent</label>
          <select value={data.search_intent || ''} onChange={(e) => update('search_intent', e.target.value)} className={inputClass}>
            <option value="">Select...</option>
            <option>Informational</option>
            <option>Commercial</option>
            <option>Transactional</option>
            <option>Local SEO</option>
          </select>
        </div>
        <div>
          <label className={labelClass}>Target Audience</label>
          <select value={data.target_audience || ''} onChange={(e) => update('target_audience', e.target.value)} className={inputClass}>
            <option value="">Select...</option>
            <option>Landlord</option>
            <option>Investor</option>
            <option>First Home Buyer</option>
            <option>Buyer</option>
            <option>Vendor</option>
            <option>Tenant</option>
          </select>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className={labelClass}>Word Count</label>
          <div className={`${inputClass} bg-parchment/50 text-midnight/60`}>{wordCount.toLocaleString()}</div>
        </div>
        <div>
          <label className={labelClass}>Reading Time</label>
          <div className={`${inputClass} bg-parchment/50 text-midnight/60`}>{readingTime > 0 ? `${readingTime} min` : '—'}</div>
        </div>
      </div>
      <SeoChecklist data={data} wordCount={wordCount} />
    </SectionCard>
  );
}