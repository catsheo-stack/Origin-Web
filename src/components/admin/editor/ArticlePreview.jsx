import React, { useState } from 'react';
import { X, Monitor, Tablet, Smartphone } from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import FAQAccordion from '@/components/origin/FAQAccordion';

const DEVICES = {
  desktop: { label: 'Desktop', icon: Monitor, width: '100%' },
  tablet: { label: 'Tablet', icon: Tablet, width: '768px' },
  mobile: { label: 'Mobile', icon: Smartphone, width: '390px' },
};

const markdownComponents = {
  h2: ({ node, ...props }) => <h2 className="font-heading text-xl text-midnight mt-8 mb-3" {...props} />,
  p: ({ node, ...props }) => <p className="text-base text-midnight/60 leading-relaxed mb-4" {...props} />,
  ul: ({ node, ...props }) => <ul className="list-disc pl-5 space-y-1 mb-4" {...props} />,
  li: ({ node, ...props }) => <li className="text-base text-midnight/60 leading-relaxed" {...props} />,
  strong: ({ node, ...props }) => <strong className="text-midnight font-medium" {...props} />,
};

export default function ArticlePreview({ article, onClose }) {
  const [device, setDevice] = useState('desktop');

  return (
    <div className="fixed inset-0 z-50 bg-midnight/60 flex flex-col">
      <div className="bg-white border-b border-stone px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="text-xs text-midnight/40 mr-2 hidden sm:inline">Preview</span>
          {Object.entries(DEVICES).map(([key, { label, icon: Icon }]) => (
            <button key={key} type="button" onClick={() => setDevice(key)} className={`flex items-center gap-1.5 text-xs px-3 py-1.5 rounded-full transition-colors ${device === key ? 'bg-accent-navy text-parchment' : 'text-midnight/50 hover:bg-stone/50'}`}>
              <Icon size={13} /> {label}
            </button>
          ))}
        </div>
        <button type="button" onClick={onClose} className="flex items-center gap-1 text-xs text-midnight/60 hover:text-midnight px-3 py-1.5">
          <X size={14} /> Close
        </button>
      </div>

      <div className="flex-1 overflow-y-auto bg-stone/30 p-4 md:p-8 flex justify-center">
        <div className="bg-parchment shadow-xl transition-all duration-300" style={{ width: DEVICES[device].width, maxWidth: '100%' }}>
          <section className="bg-parchment pt-10 pb-8">
            <div className="max-w-3xl mx-auto px-6">
              {article.category && <p className="text-xs font-medium tracking-widest uppercase text-golden mb-4">{article.category}</p>}
              <h1 className="font-heading text-3xl md:text-4xl font-light text-midnight leading-tight mb-4">{article.title || 'Untitled'}</h1>
              {article.summary && <p className="text-base text-midnight/60 leading-relaxed">{article.summary}</p>}
            </div>
          </section>

          {article.hero_image_url && (
            <section className="bg-parchment pb-8">
              <div className="max-w-4xl mx-auto px-6">
                <img src={article.hero_image_url} alt={article.title} className="w-full rounded-xl object-cover aspect-[16/9]" />
              </div>
            </section>
          )}

          <section className="bg-parchment pb-12">
            <div className="max-w-3xl mx-auto px-6">
              <ReactMarkdown components={markdownComponents}>{article.body || ''}</ReactMarkdown>
            </div>
          </section>

          {article.faq_items && article.faq_items.length > 0 && (
            <section className="bg-white py-12">
              <div className="max-w-3xl mx-auto px-6">
                <h2 className="font-heading text-2xl text-midnight mb-8">Frequently Asked Questions</h2>
                <FAQAccordion items={article.faq_items} />
              </div>
            </section>
          )}

          <section className="bg-accent-navy py-16 md:py-20">
            <div className="max-w-7xl mx-auto px-6 lg:px-10 text-center">
              <h2 className="font-heading text-2xl md:text-3xl lg:text-4xl font-light text-parchment leading-tight">Ready to discuss your property?</h2>
              <p className="mt-4 text-sm md:text-base text-parchment/60 max-w-lg mx-auto leading-relaxed font-body">Book a no-obligation conversation with our property management team.</p>
              <span className="inline-block mt-8 bg-golden text-midnight text-sm font-medium px-8 py-3.5 rounded-full">Get My Rental Appraisal</span>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}