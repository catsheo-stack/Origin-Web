import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const inputClass =
  'w-full border border-stone rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-accent-navy transition-colors';

export const labelClass = 'block text-sm font-medium text-midnight mb-1.5';

export default function SectionCard({
  title,
  description,
  children,
  collapsible = false,
  defaultOpen = true,
  accent = 'navy',
}) {
  const [open, setOpen] = useState(defaultOpen);
  const bar =
    accent === 'golden'
      ? 'bg-golden'
      : accent === 'hermes'
      ? 'bg-midnight/40'
      : 'bg-accent-navy';

  const Header = (
    <div className="flex items-center gap-3">
      <div className={`w-1 h-5 rounded-full ${bar}`} />
      <div className={collapsible ? 'text-left' : ''}>
        <h2 className="font-heading text-base text-midnight">{title}</h2>
        {description && <p className="text-xs text-midnight/40 mt-0.5">{description}</p>}
      </div>
    </div>
  );

  return (
    <section className="bg-white rounded-xl border border-stone/60 overflow-hidden">
      {collapsible ? (
        <button
          type="button"
          onClick={() => setOpen(!open)}
          className="flex items-center justify-between w-full px-6 py-4 border-b border-stone/40"
        >
          {Header}
          <ChevronDown size={16} className={`text-midnight/40 transition-transform ${open ? 'rotate-180' : ''}`} />
        </button>
      ) : (
        <div className="px-6 py-4 border-b border-stone/40">{Header}</div>
      )}
      {open && <div className="p-6 space-y-5">{children}</div>}
    </section>
  );
}