import React from 'react';
import { FileText, Clock, Type, Save } from 'lucide-react';
import { formatRelativeTime } from './cmsUtils';

const STATUS_CONFIG = {
  idle: { dot: 'bg-midnight/20', text: 'Not saved yet', color: 'text-midnight/40' },
  unsaved: { dot: 'bg-amber-400', text: 'Unsaved changes', color: 'text-amber-600' },
  saving: { dot: 'bg-blue-400 animate-pulse', text: 'Saving...', color: 'text-blue-600' },
  saved: { dot: 'bg-green-500', text: 'Saved', color: 'text-green-600' },
};

export default function StatsBar({ wordCount, charCount, readingTime, saveStatus, lastSavedAt }) {
  const s = STATUS_CONFIG[saveStatus] || STATUS_CONFIG.idle;

  const items = [
    { icon: FileText, label: 'Word Count', value: wordCount.toLocaleString() },
    { icon: Type, label: 'Characters', value: charCount.toLocaleString() },
    { icon: Clock, label: 'Reading Time', value: readingTime > 0 ? `${readingTime} min` : '—' },
  ];

  return (
    <div className="flex items-center gap-5 flex-wrap">
      {items.map(({ icon: Icon, label, value }) => (
        <div key={label} className="flex items-center gap-2">
          <Icon size={14} className="text-midnight/30" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-midnight/30 leading-none">{label}</p>
            <p className="text-sm text-midnight font-medium leading-tight">{value}</p>
          </div>
        </div>
      ))}
      <div className="h-8 w-px bg-stone" />
      <div className="flex items-center gap-2">
        <span className={`w-2 h-2 rounded-full ${s.dot}`} />
        <div>
          <p className="text-[10px] uppercase tracking-wider text-midnight/30 leading-none">Status</p>
          <p className={`text-sm font-medium leading-tight ${s.color}`}>{s.text}</p>
        </div>
      </div>
      {lastSavedAt && saveStatus === 'saved' && (
        <div className="flex items-center gap-2">
          <Save size={14} className="text-midnight/30" />
          <div>
            <p className="text-[10px] uppercase tracking-wider text-midnight/30 leading-none">Last Saved</p>
            <p className="text-sm text-midnight/60 font-medium leading-tight">{formatRelativeTime(lastSavedAt)}</p>
          </div>
        </div>
      )}
    </div>
  );
}