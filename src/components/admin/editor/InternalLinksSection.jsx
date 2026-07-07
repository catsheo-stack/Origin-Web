import React, { useState, useEffect } from 'react';
import { Check } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import SectionCard from './SectionCard';

export default function InternalLinksSection({ data, update, currentId }) {
  const [articles, setArticles] = useState([]);
  const selected = data.internal_links || [];

  useEffect(() => {
    base44.entities.Article.list('-updated_date', 200)
      .then(setArticles)
      .catch(() => {});
  }, []);

  const toggle = (id) => {
    const next = selected.includes(id) ? selected.filter((x) => x !== id) : [...selected, id];
    update('internal_links', next);
  };

  // Suggest related articles — same category first.
  const others = articles.filter((a) => a.id !== currentId);
  const sorted = [...others].sort((a, b) => {
    const aSame = a.category === data.category ? 0 : 1;
    const bSame = b.category === data.category ? 0 : 1;
    return aSame - bSame;
  });
  const selectedTitles = articles.filter((a) => selected.includes(a.id));
  const suggestedIds = data.suggested_internal_links || [];
  const suggestedArticles = articles.filter((a) => suggestedIds.includes(a.id) && !selected.includes(a.id));

  return (
    <SectionCard title="Internal Links" description="Related articles — suggested from the same category">
      {suggestedArticles.length > 0 && (
        <div className="rounded-lg bg-golden/5 border border-golden/20 p-3">
          <p className="text-xs font-medium text-golden mb-2">Hermes Suggestions</p>
          <div className="flex flex-wrap gap-2">
            {suggestedArticles.map((a) => (
              <span key={a.id} className="inline-flex items-center gap-1 text-xs bg-white text-midnight/60 px-2.5 py-1 rounded-full border border-golden/20">
                {a.title}
              </span>
            ))}
          </div>
        </div>
      )}
      {selectedTitles.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {selectedTitles.map((a) => (
            <span key={a.id} className="inline-flex items-center gap-1 text-xs bg-accent-navy/5 text-accent-navy px-2.5 py-1 rounded-full">
              <Check size={11} /> {a.title}
            </span>
          ))}
        </div>
      )}
      <div className="max-h-60 overflow-y-auto border border-stone rounded-lg divide-y divide-stone/40">
        {sorted.length === 0 ? (
          <p className="text-xs text-midnight/30 text-center py-4">No articles available.</p>
        ) : (
          sorted.map((a) => {
            const isSel = selected.includes(a.id);
            const sameCat = a.category === data.category;
            return (
              <button
                type="button"
                key={a.id}
                onClick={() => toggle(a.id)}
                className={`flex items-center justify-between w-full px-4 py-2.5 text-left hover:bg-parchment/50 transition-colors ${isSel ? 'bg-accent-navy/5' : ''}`}
              >
                <div>
                  <p className="text-sm text-midnight">{a.title}</p>
                  <p className="text-xs text-midnight/30">
                    {a.category}
                    {sameCat && <span className="text-golden ml-1">· same category</span>}
                  </p>
                </div>
                <div className={`w-4 h-4 rounded border flex items-center justify-center ${isSel ? 'bg-accent-navy border-accent-navy' : 'border-stone'}`}>
                  {isSel && <Check size={11} className="text-parchment" />}
                </div>
              </button>
            );
          })
        )}
      </div>
    </SectionCard>
  );
}