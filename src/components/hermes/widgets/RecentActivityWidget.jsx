import React from 'react';
import Card from '../ui/Card';
import { recentActivity } from '@/data/hermes/dashboardData';

export default function RecentActivityWidget() {
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900">Recent Activity</h3>
      <p className="text-xs text-gray-400 mt-0.5 mb-5">Latest events across projects</p>
      <ol className="relative space-y-4 before:absolute before:left-[5px] before:top-2 before:bottom-2 before:w-px before:bg-gray-100">
        {recentActivity.map((a) => (
          <li key={a.id} className="relative pl-6">
            <span className="absolute left-0 top-1.5 w-2.5 h-2.5 rounded-full bg-white border-2 border-gray-300" />
            <p className="text-sm text-gray-900">
              <span className="font-medium">{a.action}</span> · {a.detail}
            </p>
            <p className="text-xs text-gray-400 mt-0.5">{a.time}</p>
          </li>
        ))}
      </ol>
    </Card>
  );
}