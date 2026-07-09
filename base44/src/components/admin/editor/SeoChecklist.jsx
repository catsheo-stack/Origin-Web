import React from 'react';
import { Check, X } from 'lucide-react';

export default function SeoChecklist({ data, wordCount }) {
  const paragraphs = (data.body || '').split(/\n\n/).filter(Boolean);
  const items = [
    { label: 'SEO Title', ok: !!(data.seo_title && data.seo_title.trim()) },
    { label: 'Meta Description', ok: !!(data.meta_description && data.meta_description.trim()) },
    { label: 'Focus Keyword', ok: !!(data.focus_keyword && data.focus_keyword.trim()) },
    { label: 'Word Count (300+)', ok: wordCount >= 300 },
    { label: 'FAQ', ok: !!(data.faq_items && data.faq_items.length > 0) },
    { label: 'Hero Image', ok: !!data.hero_image_url },
    { label: 'Internal Links', ok: !!(data.internal_links && data.internal_links.length > 0) },
    { label: 'External References', ok: !!(data.external_references && data.external_references.length > 0) },
    { label: 'Readability', ok: wordCount >= 300 && paragraphs.length >= 3 },
  ];
  const completed = items.filter((i) => i.ok).length;

  return (
    <div className="rounded-lg bg-parchment/40 border border-stone/60 p-4">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-medium text-midnight/60">SEO Checklist</p>
        <span className="text-xs text-midnight/40">{completed}/{items.length}</span>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
        {items.map(({ label, ok }) => (
          <div
            key={label}
            className={`flex items-center gap-2 text-xs px-3 py-2 rounded-lg ${ok ? 'bg-green-50 text-green-700' : 'bg-white text-midnight/40'}`}
          >
            {ok ? <Check size={13} /> : <X size={13} />}
            {label}
          </div>
        ))}
      </div>
      <div className="mt-4 flex items-center justify-between p-3 rounded-lg bg-midnight/[0.03] border border-midnight/10">
        <div>
          <p className="text-xs font-medium text-midnight/60">SEO Score</p>
          <p className="text-[10px] text-midnight/30">Populated by Hermes Lab</p>
        </div>
        <span className="text-xs text-midnight/50">{data.seo_score || 'Pending Hermes Analysis'}</span>
      </div>
    </div>
  );
}