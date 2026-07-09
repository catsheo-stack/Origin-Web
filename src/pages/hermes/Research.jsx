import React from 'react';
import { Search, Clock, ArrowUpRight } from 'lucide-react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';
import Badge from '@/components/hermes/ui/Badge';

const topics = [
  { id: 1, title: 'Rental market trends Melbourne 2026', category: 'Market', status: 'Ready', updated: '2h ago' },
  { id: 2, title: 'VCAT hearing process changes', category: 'Legal', status: 'In Progress', updated: '1d ago' },
  { id: 3, title: 'Smoke alarm compliance updates Victoria', category: 'Compliance', status: 'Ready', updated: '3d ago' },
  { id: 4, title: 'Rental minimum standards review', category: 'Compliance', status: 'In Progress', updated: '4d ago' },
  { id: 5, title: 'Bond dispute statistics VIC', category: 'Data', status: 'Planned', updated: '1w ago' },
  { id: 6, title: 'Pet ownership rental reforms', category: 'Legal', status: 'Planned', updated: '1w ago' },
];

const statusTone = { Ready: 'green', 'In Progress': 'blue', Planned: 'gray' };

export default function Research() {
  return (
    <div>
      <PageHeader title="Research" subtitle="Topic discovery and research intelligence." />
      <div className="relative mb-6">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400" />
        <input
          type="text"
          placeholder="Research a topic, keyword or competitor…"
          className="w-full h-11 pl-10 pr-4 rounded-xl border border-gray-200 bg-white text-sm placeholder:text-gray-400 focus:outline-none focus:border-gray-300"
        />
      </div>
      <div className="space-y-2">
        {topics.map((t) => (
          <Card key={t.id} className="p-4 flex items-center gap-4 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-gray-900 truncate">{t.title}</p>
              <div className="flex items-center gap-3 mt-1">
                <span className="text-xs text-gray-400">{t.category}</span>
                <span className="flex items-center gap-1 text-xs text-gray-400">
                  <Clock size={11} /> {t.updated}
                </span>
              </div>
            </div>
            <Badge tone={statusTone[t.status]}>{t.status}</Badge>
            <ArrowUpRight size={16} className="text-gray-300" />
          </Card>
        ))}
      </div>
    </div>
  );
}