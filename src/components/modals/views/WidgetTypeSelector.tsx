'use client';

import type { WidgetTypeSelectorProps, WidgetTypeConfig } from '@/types';

export default function WidgetTypeSelector({ onSelect }: WidgetTypeSelectorProps) {
  const types: WidgetTypeConfig[] = [
    {
      id: 'MOVIE',
      label: 'Movie',
      icon: '🎬',
      color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    { id: 'MUSIC', label: 'Music', icon: '🎵', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
    {
      id: 'CUSTOM_TEXT',
      label: 'Custom Text',
      icon: '📝',
      color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

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
