import React from 'react';
import { Star, Link2, AtSign, MapPin, Handshake, FileText, Megaphone } from 'lucide-react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import Card from '@/components/hermes/ui/Card';

const sections = [
  { icon: Star, title: 'Google Reviews', value: '4.8', detail: '127 reviews', tone: 'amber' },
  { icon: Link2, title: 'Backlinks', value: '72', detail: 'referring domains', tone: 'blue' },
  { icon: AtSign, title: 'Brand Mentions', value: '24', detail: 'last 30 days', tone: 'purple' },
  { icon: MapPin, title: 'Directory Listings', value: '18', detail: '5 pending', tone: 'emerald' },
  { icon: Handshake, title: 'Partnership Opportunities', value: '7', detail: 'new this week', tone: 'blue' },
  { icon: FileText, title: 'Guest Articles', value: '3', detail: 'in progress', tone: 'amber' },
  { icon: Megaphone, title: 'Digital PR', value: '12', detail: 'outreach sent', tone: 'purple' },
  { icon: MapPin, title: 'Local Citations', value: '91%', detail: 'consistency score', tone: 'emerald' },
];

const toneBg = {
  amber: 'bg-amber-50 text-amber-600',
  blue: 'bg-blue-50 text-blue-600',
  purple: 'bg-purple-50 text-purple-600',
  emerald: 'bg-emerald-50 text-emerald-600',
};

export default function AuthorityCentre() {
  return (
    <div>
      <PageHeader
        title="Authority Centre"
        subtitle="Off-site authority, reputation and link-building intelligence."
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
        {sections.map((s) => (
          <Card key={s.title} className="p-6">
            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-4 ${toneBg[s.tone]}`}>
              <s.icon size={18} />
            </div>
            <p className="text-2xl font-semibold text-gray-900 tracking-tight">{s.value}</p>
            <p className="text-sm font-medium text-gray-700 mt-1">{s.title}</p>
            <p className="text-xs text-gray-400 mt-0.5">{s.detail}</p>
          </Card>
        ))}
      </div>
    </div>
  );
}