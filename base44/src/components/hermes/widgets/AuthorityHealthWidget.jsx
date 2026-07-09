import React from 'react';
import { Star } from 'lucide-react';
import Card from '../ui/Card';
import { authorityHealth as ah } from '@/data/hermes/dashboardData';

export default function AuthorityHealthWidget() {
  const metrics = [
    { label: 'Backlink Score', value: ah.backlinkScore },
    { label: 'Domain Authority', value: ah.domainAuthority },
    { label: 'Citation Health', value: ah.citationHealth, suffix: '%' },
  ];
  return (
    <Card className="p-6">
      <h3 className="font-semibold text-gray-900">Authority Health</h3>
      <p className="text-xs text-gray-400 mt-0.5 mb-5">Off-site signals and reputation</p>
      <div className="flex items-center gap-3 mb-5 p-3 bg-gray-50 rounded-xl">
        <div className="flex items-center gap-1">
          <Star size={18} className="text-amber-400 fill-amber-400" />
          <span className="text-lg font-semibold text-gray-900">{ah.googleReviews.rating}</span>
        </div>
        <div className="text-xs text-gray-500 leading-tight">{ah.googleReviews.count} Google reviews</div>
      </div>
      <div className="space-y-3">
        {metrics.map((m) => (
          <div key={m.label}>
            <div className="flex items-center justify-between mb-1">
              <span className="text-xs text-gray-500">{m.label}</span>
              <span className="text-xs font-semibold text-gray-900">
                {m.value}
                {m.suffix || ''}
              </span>
            </div>
            <div className="h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <div className="h-full bg-gray-900 rounded-full" style={{ width: `${m.value}%` }} />
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}