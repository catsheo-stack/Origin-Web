import React, { useState } from 'react';
import { X, Sparkles } from 'lucide-react';
import { mapHermesPayload } from './cmsUtils';

export default function HermesImportDialog({ onApply, onClose }) {
  const [json, setJson] = useState('');
  const [error, setError] = useState('');

  const handleImport = () => {
    setError('');
    try {
      const parsed = JSON.parse(json);
      const mapped = mapHermesPayload(parsed);
      onApply(mapped);
    } catch (e) {
      setError('Invalid JSON: ' + e.message);
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-midnight/60 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] flex flex-col">
        <div className="flex items-center justify-between px-6 py-4 border-b border-stone">
          <div className="flex items-center gap-2">
            <Sparkles size={16} className="text-golden" />
            <h2 className="font-heading text-base text-midnight">Import from Hermes</h2>
          </div>
          <button onClick={onClose} className="text-midnight/40 hover:text-midnight"><X size={18} /></button>
        </div>
        <div className="p-6 space-y-4 overflow-y-auto">
          <p className="text-xs text-midnight/50">
            Paste a Hermes Lab article JSON payload below. The CMS will map the fields automatically — no AI generation occurs in the CMS.
          </p>
          <textarea
            value={json}
            onChange={(e) => setJson(e.target.value)}
            rows={12}
            placeholder='{ "title": "...", "slug": "...", "body": "..." }'
            className="w-full border border-stone rounded-lg px-4 py-3 text-sm font-mono focus:outline-none focus:border-accent-navy"
          />
          {error && <p className="text-xs text-red-500">{error}</p>}
        </div>
        <div className="flex justify-end gap-2 px-6 py-4 border-t border-stone">
          <button onClick={onClose} className="text-sm text-midnight/60 px-4 py-2 rounded-full border border-stone hover:border-midnight/20 transition-colors">Cancel</button>
          <button onClick={handleImport} disabled={!json.trim()} className="bg-golden text-midnight text-sm px-6 py-2 rounded-full hover:bg-golden/90 disabled:opacity-40 transition-colors">Import &amp; Populate</button>
        </div>
      </div>
    </div>
  );
}