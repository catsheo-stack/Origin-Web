import React from 'react';
import { STATUS_FLOW, STATUS_META } from './cmsUtils';
import SectionCard, { labelClass } from './SectionCard';

export default function LifecycleSection({ data, update }) {
  const current = data.status || 'draft';

  return (
    <SectionCard title="Lifecycle" description="Editorial workflow status">
      <div>
        <label className={labelClass}>Status</label>
        <select
          value={current}
          onChange={(e) => update('status', e.target.value)}
          className="w-full border border-stone rounded-lg px-4 py-2.5 text-sm bg-white focus:outline-none focus:border-accent-navy transition-colors"
        >
          {STATUS_FLOW.map((s) => (
            <option key={s} value={s}>{STATUS_META[s].label}</option>
          ))}
        </select>
      </div>
      <div className="flex items-center gap-1 flex-wrap">
        {STATUS_FLOW.map((s, i) => (
          <React.Fragment key={s}>
            <div
              className={`text-[10px] px-2.5 py-1 rounded-full font-medium ${s === current ? STATUS_META[s].color : 'bg-stone/30 text-midnight/30'}`}
            >
              {STATUS_META[s].label}
            </div>
            {i < STATUS_FLOW.length - 1 && <span className="text-midnight/20 text-xs">→</span>}
          </React.Fragment>
        ))}
      </div>
      <label className="flex items-center gap-2 text-sm text-midnight cursor-pointer">
        <input
          type="checkbox"
          checked={data.featured}
          onChange={(e) => update('featured', e.target.checked)}
          className="w-4 h-4 accent-golden"
        />
        Featured article
      </label>
      <p className="text-xs text-midnight/30">
        Only <span className="text-green-600 font-medium">Published</span> articles appear on the public website.
      </p>
    </SectionCard>
  );
}