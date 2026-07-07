import React from 'react';
import { Plus, X } from 'lucide-react';
import SectionCard from './SectionCard';

const getFavicon = (url) => {
  try {
    const domain = new URL(url).hostname;
    return `https://www.google.com/s2/favicons?domain=${domain}&sz=32`;
  } catch {
    return null;
  }
};

export default function ExternalReferencesSection({ data, update }) {
  const refs = data.external_references || [];
  const suggested = data.suggested_external_references || [];
  const add = () => update('external_references', [...refs, { title: '', url: '', description: '' }]);
  const updateRef = (i, field, value) => {
    const next = [...refs];
    next[i] = { ...next[i], [field]: value };
    update('external_references', next);
  };
  const remove = (i) => update('external_references', refs.filter((_, idx) => idx !== i));

  return (
    <SectionCard title="External References" description="Authoritative sources and citations">
      {suggested.length > 0 && (
        <div className="rounded-lg bg-golden/5 border border-golden/20 p-3">
          <p className="text-xs font-medium text-golden mb-2">Hermes Suggestions</p>
          <div className="space-y-1.5">
            {suggested.map((ref, i) => (
              <div key={i} className="text-xs text-midnight/60">
                <span className="font-medium">{ref.title}</span>
                {ref.url && <span className="text-midnight/30"> — {ref.url}</span>}
              </div>
            ))}
          </div>
        </div>
      )}
      <div className="flex items-center justify-between">
        <span className="text-xs text-midnight/40">{refs.length} reference(s)</span>
        <button type="button" onClick={add} className="flex items-center gap-1 text-xs text-golden hover:text-golden/80">
          <Plus size={12} /> Add Reference
        </button>
      </div>
      {refs.map((ref, i) => {
        const favicon = getFavicon(ref.url);
        return (
          <div key={i} className="bg-parchment/50 border border-stone rounded-lg p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs text-midnight/40 flex items-center gap-2">
                {favicon && (
                  <img
                    src={favicon}
                    alt=""
                    className="w-4 h-4 rounded"
                    onError={(e) => { e.target.style.display = 'none'; }}
                  />
                )}
                Reference {i + 1}
              </span>
              <button type="button" onClick={() => remove(i)} className="text-red-400 hover:text-red-600"><X size={14} /></button>
            </div>
            <input type="text" value={ref.title} onChange={(e) => updateRef(i, 'title', e.target.value)} placeholder="e.g. Consumer Affairs Victoria" className="w-full border border-stone rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-accent-navy" />
            <input type="text" value={ref.url} onChange={(e) => updateRef(i, 'url', e.target.value)} placeholder="https://..." className="w-full border border-stone rounded-lg px-3 py-2 text-sm mb-2 focus:outline-none focus:border-accent-navy" />
            <textarea value={ref.description || ''} onChange={(e) => updateRef(i, 'description', e.target.value)} placeholder="Short description of this source" rows={2} className="w-full border border-stone rounded-lg px-3 py-2 text-sm focus:outline-none focus:border-accent-navy" />
          </div>
        );
      })}
      {refs.length === 0 && <p className="text-xs text-midnight/30 text-center py-4">No external references yet.</p>}
    </SectionCard>
  );
}