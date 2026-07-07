import React from 'react';
import SectionCard from './SectionCard';
import { formatRelativeTime } from './cmsUtils';

export default function VersionHistory({ revisions }) {
  const revs = revisions || [];

  return (
    <SectionCard title="Version History" description="Article revision log" collapsible defaultOpen={false}>
      {revs.length === 0 ? (
        <p className="text-xs text-midnight/30 text-center py-4">No revisions yet. Save the article to create the first revision.</p>
      ) : (
        <div className="space-y-3">
          {[...revs].reverse().map((rev) => (
            <div key={rev.version} className="flex items-start gap-3 pb-3 border-b border-stone/40 last:border-0 last:pb-0">
              <div className="flex items-center justify-center w-7 h-7 rounded-full bg-accent-navy/10 text-accent-navy text-xs font-medium flex-shrink-0">
                v{rev.version}
              </div>
              <div className="flex-1">
                <p className="text-sm text-midnight font-medium">{rev.action}</p>
                <p className="text-xs text-midnight/40">{formatRelativeTime(rev.timestamp)}</p>
                {rev.title && <p className="text-xs text-midnight/30 mt-0.5">&ldquo;{rev.title}&rdquo;</p>}
              </div>
            </div>
          ))}
        </div>
      )}
    </SectionCard>
  );
}