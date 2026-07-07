import React from 'react';
import { Sparkles, Wand2, FileText, HelpCircle, AlignLeft, PenLine } from 'lucide-react';

// Placeholder actions — workflow reserved for future Hermes Lab integration.
const ACTIONS = [
  { key: 'title', label: 'Generate Title', icon: PenLine },
  { key: 'summary', label: 'Generate Summary', icon: AlignLeft },
  { key: 'seo', label: 'Generate SEO', icon: Sparkles },
  { key: 'faq', label: 'Generate FAQ', icon: HelpCircle },
  { key: 'full', label: 'Generate Full Article', icon: FileText },
  { key: 'improve', label: 'Improve Writing', icon: Wand2 },
];

export default function AiActions() {
  const handle = () => alert('Hermes Lab integration coming soon.');
  return (
    <div className="flex flex-wrap gap-2">
      {ACTIONS.map(({ key, label, icon: Icon }) => (
        <button
          key={key}
          type="button"
          onClick={handle}
          className="flex items-center gap-1.5 text-xs text-midnight/60 px-3 py-2 rounded-full border border-stone hover:border-golden hover:text-golden transition-colors"
        >
          <Icon size={13} /> {label}
        </button>
      ))}
    </div>
  );
}