import React from 'react';
import Card from '../ui/Card';
import { contentHealth } from '@/data/hermes/dashboardData';

const items = [
  { key: 'total', label: 'Total Articles' },
  { key: 'drafts', label: 'Drafts' },
  { key: 'published', label: 'Published' },
  { key: 'needsUpdate', label: 'Need Updating' },
];

export default function ContentHealthWidget() {
  const score = contentHealth.avgSeoScore;
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900">Content Health</h3>
      <p className="text-xs text-gray-400 mt-0.5 mb-5">Across all active projects</p>
      <div className="grid grid-cols-2 gap-4 mb-5">
        {items.map((it) => (
          <div key={it.key}>
            <p className="text-2xl font-semibold text-gray-900 tracking-tight">{contentHealth[it.key]}</p>
            <p className="text-xs text-gray-400 mt-0.5">{it.label}</p>
          </div>
        ))}
      </div>
      <div>
        <div className="flex items-center justify-between mb-1.5">
          <span className="text-xs text-gray-500">Average SEO Score</span>
          <span className="text-xs font-semibold text-gray-900">{score}</span>
        </div>
        <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
          <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${score}%` }} />
        </div>
      </div>
    </Card>
  );
}