import React from 'react';
import Card from '../ui/Card';
import { aiVisibility as ai } from '@/data/hermes/dashboardData';

const metrics = [
  { key: 'structuredData', label: 'Structured Data' },
  { key: 'entityCoverage', label: 'Entity Coverage' },
  { key: 'knowledgeGraph', label: 'Knowledge Graph' },
  { key: 'citationReadiness', label: 'Citation Readiness' },
];

export default function AiVisibilityWidget() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900">AI Visibility</h3>
      <p className="text-xs text-gray-400 mt-0.5 mb-5">Readiness for LLM citation</p>
      <div className="flex items-end gap-2 mb-5">
        <span className="text-4xl font-semibold text-gray-900 tracking-tight">{ai.score}</span>
        <span className="text-sm text-gray-400 mb-1">/ 100</span>
      </div>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.key}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">{m.label}</span>
              <span className="text-xs font-semibold text-gray-900">{ai[m.key]}%</span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${ai[m.key]}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}