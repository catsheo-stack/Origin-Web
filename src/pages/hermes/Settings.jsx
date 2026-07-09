import React from 'react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';

const sections = [
  {
    title: 'Brand Settings',
    desc: 'Identity, voice and tone for generated content',
    fields: [
      { label: 'Brand Name', value: 'Origin Property Concierge' },
      { label: 'Tagline', value: 'Premium property management for Melbourne investors' },
      { label: 'Primary Domain', value: 'originproperty.com.au' },
    ],
  },
  {
    title: 'Writing Style',
    desc: 'Editorial guidelines for the writer engine',
    fields: [
      { label: 'Tone', value: 'Professional, authoritative, warm' },
      { label: 'Reading Level', value: 'Year 10 — accessible expert' },
      { label: 'Point of View', value: 'Second person (you)' },
    ],
  },
  {
    title: 'SEO Defaults',
    desc: 'Default optimisation rules',
    fields: [
      { label: 'Default Search Intent', value: 'Informational' },
      { label: 'Target Word Count', value: '1500' },
      { label: 'Focus Keyword Required', value: 'Yes' },
    ],
  },
  {
    title: 'AI Defaults',
    desc: 'Model and generation parameters',
    fields: [
      { label: 'Default Model', value: 'Not configured' },
      { label: 'Creativity', value: 'Balanced' },
      { label: 'Fact Checking', value: 'Strict' },
    ],
  },
  {
    title: 'Export Defaults',
    desc: 'CMS export behaviour',
    fields: [
      { label: 'Default Format', value: 'JSON + Markdown' },
      { label: 'Auto-publish', value: 'No' },
      { label: 'CMS Endpoint', value: 'hermesImport' },
    ],
  },
  {
    title: 'Future API Settings',
    desc: 'External integrations (coming soon)',
    fields: [
      { label: 'OpenAI API Key', value: '—' },
      { label: 'Google Search Console', value: 'Not connected' },
      { label: 'Analytics', value: 'Not connected' },
    ],
  },
];

const inputClass =
  'w-full h-10 px-3 rounded-lg border border-gray-200 bg-white text-sm text-gray-700 focus:outline-none focus:border-gray-300';

export default function Settings() {
  return (
    <div>
      <PageHeader title="Settings" subtitle="Configure defaults for the Hermes Lab platform." />
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
        {sections.map((s) => (
          <Card key={s.title} className="p-6">
            <h3 className="font-semibold text-gray-900">{s.title}</h3>
            <p className="text-xs text-gray-400 mt-0.5 mb-5">{s.desc}</p>
            <div className="space-y-4">
              {s.fields.map((f) => (
                <div key={f.label}>
                  <label className="block text-xs font-medium text-gray-500 mb-1.5">{f.label}</label>
                  <input type="text" defaultValue={f.value} className={inputClass} />
                </div>
              ))}
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}