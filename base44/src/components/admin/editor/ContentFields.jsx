import React from 'react';
import { Plus, X } from 'lucide-react';
import SectionCard, { inputClass, labelClass } from './SectionCard';
import HeroImageUploader from './HeroImageUploader';

const categories = [
  'Getting Started as a Landlord',
  'Rental Appraisal',
  'Choosing a Property Manager',
  'Leasing Process',
  'Compliance',
  'Maintenance & Inspections',
  'End of Lease',
];

export default function ContentFields({ data, update, onTitleChange, onSlugChange, slugWarning }) {
  const addFaq = () => update('faq_items', [...data.faq_items, { question: '', answer: '' }]);
  const updateFaq = (i, field, value) => {
    const items = [...data.faq_items];
    items[i] = { ...items[i], [field]: value };
    update('faq_items', items);
  };
  const removeFaq = (i) => update('faq_items', data.faq_items.filter((_, idx) => idx !== i));

  return (
    <>
      <SectionCard title="Content" description="Title, body and hero imagery">
        <div>
          <label className={labelClass}>Title</label>
          <input type="text" value={data.title} onChange={(e) => onTitleChange(e.target.value)} required className={inputClass} />
        </div>
        <div>
          <label className={labelClass}>Slug</label>
          <input type="text" value={data.slug} onChange={(e) => onSlugChange(e.target.value)} required className={`${inputClass} font-mono`} />
          <p className="text-xs text-midnight/30 mt-1">Public URL: /article/{data.slug || '...'}</p>
          {slugWarning && <p className="text-xs text-amber-600 mt-1">{slugWarning}</p>}
        </div>
        <div>
          <label className={labelClass}>Category</label>
          <select value={data.category} onChange={(e) => update('category', e.target.value)} className={inputClass}>
            {categories.map((cat) => <option key={cat} value={cat}>{cat}</option>)}
          </select>
        </div>
        <div>
          <label className={labelClass}>Summary</label>
          <textarea value={data.summary} onChange={(e) => update('summary', e.target.value)} rows={2} className={inputClass} />
        </div>
        <HeroImageUploader value={data.hero_image_url} update={update} />
        <div>
          <label className={labelClass}>Article Body (Markdown)</label>
          <textarea value={data.body} onChange={(e) => update('body', e.target.value)} rows={12} className={`${inputClass} font-mono`} placeholder="## Section heading&#10;&#10;Article content..." />
        </div>
      </SectionCard>

      <SectionCard title="FAQ Items" description="Common questions and answers">
        <div className="flex items-center justify-between">
          <span className="text-xs text-midnight/40">{data.faq_items.length} item(s)</span>
          <button type="button" onClick={addFaq} className="flex items-center gap-1 text-xs text-golden hover:text-golden/80">
            <Plus size={12} /> Add FAQ
          </button>
        </div>
        {data.faq_items.map((faq, i) => (
          <div key={i} className="bg-parchment/50 border border-stone rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-midnight/40">FAQ {i + 1}</span>
              <button type="button" onClick={() => removeFaq(i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
            <input type="text" value={faq.question} onChange={(e) => updateFaq(i, 'question', e.target.value)} placeholder="Question" className="w-full border border-stone rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-accent-navy" />
            <textarea value={faq.answer} onChange={(e) => updateFaq(i, 'answer', e.target.value)} placeholder="Answer" rows={2} className="w-full border border-stone rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-navy" />
          </div>
        ))}
        {data.faq_items.length === 0 && <p className="text-xs text-midnight/30 text-center py-4">No FAQ items yet.</p>}
      </SectionCard>
    </>
  );
}