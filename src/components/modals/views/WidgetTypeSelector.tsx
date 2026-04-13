'use client';

import type { WidgetTypeSelectorProps } from '@/types';
import { WIDGET_CONFIG } from '@/config/widgets';

export default function WidgetTypeSelector({ onSelect }: WidgetTypeSelectorProps) {
  const types = Object.values(WIDGET_CONFIG);

  return (
    <div className="p-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
      {types.map((t) => (
        <button
          key={t.id}
          onClick={() => onSelect(t.id)}
          className={`flex flex-col items-center justify-center gap-3 p-8 border rounded-3xl transition-all hover:scale-[1.02] active:scale-[0.98] ${t.color}`}
        >
          <span className="text-4xl">{t.icon}</span>
          <span className="font-bold">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
