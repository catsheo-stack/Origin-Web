import React, { useState } from 'react';
import { Share2 } from 'lucide-react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';
import { knowledgeChain, nodeTone } from '@/data/hermes/knowledgeGraph';

export default function KnowledgeGraph() {
  const [selected, setSelected] = useState(knowledgeChain[0].id);
  const node = knowledgeChain.find((n) => n.id === selected);

  return (
    <div>
      <PageHeader title="Knowledge Graph" subtitle="Entity relationships across the property management domain." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 p-8">
          <div className="flex flex-col items-center">
            {knowledgeChain.map((n, i) => (
              <React.Fragment key={n.id}>
                <button
                  onClick={() => setSelected(n.id)}
                  className={`flex items-center gap-2.5 px-5 py-2.5 rounded-xl text-sm font-medium transition-all ${nodeTone[n.type]} ${
                    selected === n.id ? 'ring-2 ring-offset-2 ring-gray-900' : ''
                  }`}
                >
                  <Share2 size={14} className={n.type === 'Domain' ? 'text-white/70' : 'opacity-60'} />
                  {n.label}
                </button>
                {i < knowledgeChain.length - 1 && <div className="w-px h-6 bg-gray-200" />}
              </React.Fragment>
            ))}
          </div>
        </Card>
        <Card className="p-6 h-fit">
          <p className="text-xs font-medium text-gray-400 uppercase tracking-wider mb-3">Selected Entity</p>
          <h3 className="text-lg font-semibold text-gray-900 mb-1">{node.label}</h3>
          <span className="inline-block text-xs text-gray-500 bg-gray-100 rounded-full px-2.5 py-0.5 mb-4">
            {node.type}
          </span>
          <dl className="space-y-3 text-sm">
            <div className="flex justify-between">
              <dt className="text-gray-400">Relations</dt>
              <dd className="font-medium text-gray-900">{node.relations}</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Status</dt>
              <dd className="font-medium text-emerald-600">Mapped</dd>
            </div>
            <div className="flex justify-between">
              <dt className="text-gray-400">Coverage</dt>
              <dd className="font-medium text-gray-900">62%</dd>
            </div>
          </dl>
          <p className="text-xs text-gray-400 mt-6 pt-6 border-t border-gray-100">
            Relationship intelligence will appear here as the graph engine matures.
          </p>
        </Card>
      </div>
    </div>
  );
}