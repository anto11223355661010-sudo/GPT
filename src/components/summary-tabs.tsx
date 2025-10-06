'use client';

import { useState } from 'react';
import type { SummaryVariant } from '@/types/summary';

export function SummaryTabs({ variants }: { variants: SummaryVariant[] }) {
  const [active, setActive] = useState<SummaryVariant['label']>('concis');
  const variant = variants.find((item) => item.label === active) ?? variants[0];

  return (
    <div className="space-y-4">
      <div className="flex gap-3">
        {variants.map((item) => (
          <button
            key={item.label}
            onClick={() => setActive(item.label)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              active === item.label ? 'bg-accent text-white' : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
            }`}
          >
            {item.label === 'concis' && 'Concis'}
            {item.label === 'moyen' && 'Moyen'}
            {item.label === 'developpe' && 'Développé'}
          </button>
        ))}
      </div>
      <div className="rounded-3xl border border-slate-200 bg-surface p-6 shadow-sm">
        <p className="whitespace-pre-wrap text-sm leading-6 text-slate-700">{variant?.content}</p>
      </div>
    </div>
  );
}
