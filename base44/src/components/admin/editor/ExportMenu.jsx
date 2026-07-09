import React, { useState, useRef, useEffect } from 'react';
import { Download, FileText, Code, ChevronDown } from 'lucide-react';
import { buildMarkdown, downloadFile } from './cmsUtils';

export default function ExportMenu({ article }) {
  const [open, setOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const slug = article.slug || 'article';

  const exportMarkdown = () => {
    downloadFile(`${slug}.md`, buildMarkdown(article), 'text/markdown');
    setOpen(false);
  };

  const exportJson = () => {
    downloadFile(`${slug}.json`, JSON.stringify(article, null, 2), 'application/json');
    setOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center gap-1.5 text-xs text-midnight/60 px-4 py-2 rounded-full border border-stone hover:border-accent-navy hover:text-accent-navy transition-colors"
      >
        <Download size={13} /> Export <ChevronDown size={12} />
      </button>
      {open && (
        <div className="absolute right-0 top-full mt-1 bg-white border border-stone rounded-lg shadow-lg overflow-hidden z-20 w-48">
          <button
            type="button"
            onClick={exportMarkdown}
            className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-midnight hover:bg-parchment/50 transition-colors"
          >
            <FileText size={14} /> Markdown (.md)
          </button>
          <button
            type="button"
            onClick={exportJson}
            className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-midnight hover:bg-parchment/50 transition-colors"
          >
            <Code size={14} /> JSON (.json)
          </button>
        </div>
      )}
    </div>
  );
}