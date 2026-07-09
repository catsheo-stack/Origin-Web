import React from 'react';
import PageHeader from '@/components/hermes/ui/PageHeader';
import PrioritiesWidget from '@/components/hermes/widgets/PrioritiesWidget';
import ContentHealthWidget from '@/components/hermes/widgets/ContentHealthWidget';
import AuthorityHealthWidget from '@/components/hermes/widgets/AuthorityHealthWidget';
import AiVisibilityWidget from '@/components/hermes/widgets/AiVisibilityWidget';
import RecentProjectsWidget from '@/components/hermes/widgets/RecentProjectsWidget';
import RecentActivityWidget from '@/components/hermes/widgets/RecentActivityWidget';

export default function Dashboard() {
  return (
    <div>
      <PageHeader title="Dashboard" subtitle="Good morning — here's what needs your attention today." />
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <div className="lg:col-span-2">
          <PrioritiesWidget />
        </div>
        <div>
          <AiVisibilityWidget />
        </div>
        <div>
          <ContentHealthWidget />
        </div>
        <div>
          <AuthorityHealthWidget />
        </div>
        <div>
          <RecentActivityWidget />
        </div>
        <div className="lg:col-span-3">
          <RecentProjectsWidget />
        </div>
      </div>
    </div>
  );
}