import React, { useState } from 'react';
import { Copy, Download, FileJson, FileText, Clock } from 'lucide-react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';

const sampleArticle = {
  title: 'Smoke Alarm Compliance Victoria',
  slug: 'smoke-alarm-compliance-victoria',
  category: 'Compliance',
  summary: 'A landlord guide to meeting Victorian smoke alarm obligations.',
  status: 'ready_for_cms',
  seo_score: 92,
  hermes_metadata: { ai_version: '2.1', quality_score: 'A' },
};

const markdownPreview = `# Smoke Alarm Compliance Victoria

> A landlord guide to meeting Victorian smoke alarm obligations.

## Key Requirements

All rental properties in Victoria must have working smoke alarms...

## FAQ

### How often must alarms be tested?

Annually, at minimum.`;

const history = [
  { id: 1, article: 'Smoke Alarm Compliance Victoria', format: 'JSON', time: '2h ago' },
  { id: 2, article: 'Rental Appraisal Melbourne', format: 'Markdown', time: '1d ago' },
  { id: 3, article: 'Routine Inspection Frequency', format: 'JSON', time: '3d ago' },
];

export default function CmsExport() {
  const [tab, setTab] = useState('json');
  const json = JSON.stringify(sampleArticle, null, 2);

  return (
    <div>
      <PageHeader title="CMS Export" subtitle="Preview and export finished content to Origin CMS." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5 mb-6">
        <Card className="p-0 overflow-hidden">
          <div className="flex items-center justify-between px-5 py-3 border-b border-gray-100">
            <div className="flex items-center gap-1">
              <button
                onClick={() => setTab('json')}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  tab === 'json' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <FileJson size={13} /> JSON
              </button>
              <button
                onClick={() => setTab('md')}
                className={`flex items-center gap-1.5 text-xs font-medium px-3 py-1.5 rounded-lg transition-colors ${
                  tab === 'md' ? 'bg-gray-100 text-gray-900' : 'text-gray-400 hover:text-gray-700'
                }`}
              >
                <FileText size={13} /> Markdown
              </button>
            </div>
            <button className="text-gray-400 hover:text-gray-700">
              <Copy size={14} />
            </button>
          </div>
          <pre className="p-5 text-xs text-gray-600 font-mono overflow-auto max-h-96 bg-gray-50/50">
            <code>{tab === 'json' ? json : markdownPreview}</code>
          </pre>
        </Card>
        <Card className="p-6">
          <h3 className="font-semibold text-gray-900 mb-1">Export Preview</h3>
          <p className="text-xs text-gray-400 mb-4">Rendered output as it will appear in Origin CMS</p>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">{sampleArticle.title}</h1>
            <p className="text-sm text-gray-500 mt-1">{sampleArticle.summary}</p>
            <div className="flex items-center gap-2 mt-4">
              <span className="text-xs text-gray-400">Category</span>
              <span className="text-xs font-medium text-gray-700">{sampleArticle.category}</span>
            </div>
          </div>
          <button className="mt-6 w-full inline-flex items-center justify-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2.5 rounded-full hover:bg-gray-800 transition-colors">
            <Download size={15} /> Export to Origin CMS
          </button>
        </Card>
      </div>
      <Card className="p-6">
        <div className="flex items-center gap-2 mb-4">
          <Clock size={15} className="text-gray-400" />
          <h3 className="font-semibold text-gray-900">Export History</h3>
        </div>
        <div className="space-y-1">
          {history.map((h) => (
            <div key={h.id} className="flex items-center gap-4 py-3 border-b border-gray-50 last:border-0">
              <span
                className={`text-xs font-medium px-2 py-0.5 rounded ${
                  h.format === 'JSON' ? 'bg-blue-50 text-blue-600' : 'bg-purple-50 text-purple-600'
                }`}
              >
                {h.format}
              </span>
              <span className="text-sm text-gray-900 flex-1">{h.article}</span>
              <span className="text-xs text-emerald-600">Exported</span>
              <span className="text-xs text-gray-400">{h.time}</span>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
}