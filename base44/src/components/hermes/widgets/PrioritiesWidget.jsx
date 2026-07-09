import React from 'react';
import { RefreshCw, Link2, Bot, TrendingUp } from 'lucide-react';
import Card from '../ui/Card';
import { priorities } from '@/data/hermes/dashboardData';

const iconMap = { refresh: RefreshCw, backlink: Link2, visibility: Bot, ranking: TrendingUp };

export default function PrioritiesWidget() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <div>
          <h3 className="font-semibold text-gray-900">Today's Priorities</h3>
          <p className="text-xs text-gray-400 mt-0.5">{priorities.length} items need attention</p>
        </div>
        <button className="text-xs font-medium text-gray-400 hover:text-gray-900">View all</button>
      </div>
      <ul className="space-y-1">
        {priorities.map((p) => {
          const Icon = iconMap[p.type] || RefreshCw;
          return (
            <li key={p.id} className="flex items-center gap-3 py-2.5 group">
              <button className="w-5 h-5 rounded-full border-2 border-gray-200 group-hover:border-gray-400 transition-colors shrink-0" />
              <Icon size={15} className="text-gray-400 shrink-0" />
              <span className="text-sm text-gray-700 flex-1">{p.label}</span>
              <span className="text-xs text-gray-400">{p.due}</span>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}