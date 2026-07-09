import React from 'react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';

const metrics = [
  { label: 'AI Visibility Score', value: 68, suffix: '/100', desc: 'Overall LLM discoverability' },
  { label: 'Entity Coverage', value: 62, suffix: '%', desc: 'Named entities recognised' },
  { label: 'FAQ Coverage', value: 74, suffix: '%', desc: 'Questions answerable' },
  { label: 'Schema Coverage', value: 85, suffix: '%', desc: 'Structured data deployed' },
  { label: 'LLM Readiness', value: 71, suffix: '%', desc: 'Content parseability' },
  { label: 'Answer Quality', value: 79, suffix: '%', desc: 'Citation-worthy answers' },
  { label: 'Knowledge Coverage', value: 54, suffix: '%', desc: 'Topic breadth' },
];

const opportunities = [
  'Optimise Smoke Alarm article for featured snippets',
  'Add FAQ schema to Rental Appraisal guide',
  'Strengthen entity definitions for VCAT content',
  'Expand topic coverage on landlord insurance',
];

export default function AiVisibility() {
  return (
    <div>
      <PageHeader
        title="AI Visibility"
        subtitle="How discoverable your content is to large language models."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-6">
        {metrics.map((m) => (
          <Card key={m.label} className="p-6">
            <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">{m.label}</p>
            <div className="flex items-end gap-1 mt-2 mb-3">
              <span className="text-3xl font-semibold text-gray-900 tracking-tight">{m.value}</span>
              <span className="text-sm text-gray-400 mb-1">{m.suffix}</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden mb-2">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${m.value}%` }} />
            </div>
            <p className="text-xs text-gray-400">{m.desc}</p>
          </Card>
        ))}
        <Card className="p-6 border-dashed bg-gray-50/50">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider">
            Future AI Citation Opportunities
          </p>
          <p className="text-3xl font-semibold text-gray-300 tracking-tight mt-2 mb-3">—</p>
          <p className="text-xs text-gray-400">Engine pending connection</p>
        </Card>
      </div>
      <Card className="p-6">
        <h3 className="font-semibold text-gray-900 mb-1">Citation Opportunities</h3>
        <p className="text-xs text-gray-400 mb-4">Recommended actions to improve LLM citation</p>
        <ul className="space-y-1">
          {opportunities.map((o, i) => (
            <li key={i} className="flex items-center gap-3 py-2.5 border-b border-gray-50 last:border-0">
              <span className="w-6 h-6 rounded-full bg-blue-50 text-blue-600 text-xs font-medium flex items-center justify-center shrink-0">
                {i + 1}
              </span>
              <span className="text-sm text-gray-700">{o}</span>
            </li>
          ))}
        </ul>
      </Card>
    </div>
  );
}