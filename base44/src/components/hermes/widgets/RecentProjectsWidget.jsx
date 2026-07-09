import React from 'react';
import { Link } from 'react-router-dom';
import Card from '../ui/Card';
import Badge from '../ui/Badge';
import { projects, projectColors } from '@/data/hermes/projects';

export default function RecentProjectsWidget() {
  return (
    <Card className="p-6">
      <div className="flex items-center justify-between mb-5">
        <h3 className="font-semibold text-gray-900">Recent Projects</h3>
        <Link to="/hermes/projects" className="text-xs font-medium text-gray-400 hover:text-gray-900">
          View all
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors"
          >
            <div
              className={`w-9 h-9 rounded-lg ${projectColors[p.color]} text-white text-xs font-semibold flex items-center justify-center shrink-0`}
            >
              {p.initials}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-sm font-medium text-gray-900 truncate">{p.name}</p>
              <p className="text-xs text-gray-400">
                {p.articles} articles · {p.published} published
              </p>
            </div>
            <Badge tone={p.status === 'Active' ? 'green' : 'gray'}>{p.status}</Badge>
          </div>
        ))}
      </div>
    </Card>
  );
}