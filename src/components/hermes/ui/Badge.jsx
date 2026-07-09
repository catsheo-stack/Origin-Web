import React from 'react';

const tones = {
  gray: 'bg-gray-100 text-gray-600',
  blue: 'bg-blue-50 text-blue-700',
  green: 'bg-emerald-50 text-emerald-700',
  amber: 'bg-amber-50 text-amber-700',
  red: 'bg-rose-50 text-rose-700',
  purple: 'bg-purple-50 text-purple-700',
};

export default function Badge({ children, tone = 'gray' }) {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${tones[tone] || tones.gray}`}
    >
      {children}
    </span>
  );
}