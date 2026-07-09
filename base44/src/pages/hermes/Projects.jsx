import React from 'react';
import { Plus } from 'lucide-react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';
import Badge from '@/components/hermes/ui/Badge';
import { projects, projectColors } from '@/data/hermes/projects';

export default function Projects() {
  return (
    <div>
      <PageHeader
        title="Projects"
        subtitle="Every piece of content belongs to a project."
        actions={
          <button className="inline-flex items-center gap-1.5 bg-gray-900 text-white text-sm font-medium px-4 py-2 rounded-full hover:bg-gray-800 transition-colors">
            <Plus size={15} /> New Project
          </button>
        }
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {projects.map((p) => (
          <Card key={p.id} className="p-6 hover:shadow-md transition-shadow cursor-pointer">
            <div className="flex items-start justify-between mb-4">
              <div
                className={`w-11 h-11 rounded-xl ${projectColors[p.color]} text-white text-sm font-semibold flex items-center justify-center`}
              >
                {p.initials}
              </div>
              <Badge tone={p.status === 'Active' ? 'green' : 'gray'}>{p.status}</Badge>
            </div>
            <h3 className="font-semibold text-gray-900 mb-1">{p.name}</h3>
            <p className="text-sm text-gray-500 leading-relaxed mb-5">{p.description}</p>
            <div className="grid grid-cols-3 gap-2 pt-4 border-t border-gray-100">
              <div>
                <p className="text-lg font-semibold text-gray-900">{p.articles}</p>
                <p className="text-xs text-gray-400">Articles</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{p.published}</p>
                <p className="text-xs text-gray-400">Published</p>
              </div>
              <div>
                <p className="text-lg font-semibold text-gray-900">{p.avgSeo || '—'}</p>
                <p className="text-xs text-gray-400">Avg SEO</p>
              </div>
            </div>
          </Card>
        ))}
        <button className="border-2 border-dashed border-gray-200 rounded-2xl p-6 flex flex-col items-center justify-center text-gray-400 hover:border-gray-300 hover:text-gray-600 transition-colors min-h-[220px]">
          <Plus size={24} className="mb-2" />
          <span className="text-sm font-medium">Create Project</span>
        </button>
      </div>
    </div>
  );
}