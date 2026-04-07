'use client';

import { useState, useTransition } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { updateWidgetsLayout } from '@/app/actions';
import WidgetRenderer from './widgets/WidgetRenderer';
import type { Layouts, WidgetLayoutData, BentoGridProps, Layout } from '@/types';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

function isWidgetLayoutData(data: unknown): data is WidgetLayoutData {
  return data != null && typeof data === 'object' && !Array.isArray(data);
}

function getStableLayoutString(layouts: Layouts): string {
  const stable: Layouts = {};
  for (const bp of Object.keys(layouts).sort()) {
    stable[bp] = layouts[bp].map(({ i, x, y, w, h }) => ({ i, x, y, w, h })).sort((a, b) => a.i.localeCompare(b.i));
  }
  return JSON.stringify(stable);
}

export default function BentoGrid({ initialWidgets, isOwner, isEditing, username }: BentoGridProps) {
  const [layouts, setLayouts] = useState<Layouts>(() => {
    const initialLayouts: Layouts = {};

    initialWidgets.forEach((w) => {
      const layoutData = isWidgetLayoutData(w.layoutData) ? w.layoutData : { lg: { x: 0, y: 0, w: 1, h: 1 } };

      Object.entries(layoutData).forEach(([bp, pos]) => {
        if (!initialLayouts[bp]) initialLayouts[bp] = [];
        initialLayouts[bp].push({
          i: w.id.toString(),
          ...pos,
        });
      });
    });

    return initialLayouts;
  });

  const [isPending, startTransition] = useTransition();
  const [lastSavedLayout, setLastSavedLayout] = useState<string>(() => getStableLayoutString(layouts));

  const handleLayoutChange = (layout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);

    if (!isOwner || !isEditing) return;

    const newLayoutString = getStableLayoutString(allLayouts);
    if (newLayoutString === lastSavedLayout) return;

    setLastSavedLayout(newLayoutString);

    const sanitizedAllLayouts: Layouts = {};
    for (const [bp, items] of Object.entries(allLayouts)) {
      sanitizedAllLayouts[bp] = items.map(({ i, x, y, w, h }) => ({ i, x, y, w, h }));
    }

    startTransition(async () => {
      try {
        await updateWidgetsLayout(username, sanitizedAllLayouts);
        console.log('Layout saved successfully!');
      } catch (err) {
        console.error('Error saving layout:', err);
      }
    });
  };

  return (
    <ResponsiveGridLayout
      className={`layout transition-opacity ${isPending ? 'opacity-50 cursor-wait pointer-events-none' : ''} ${isEditing ? 'editing' : ''}`}
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
      rowHeight={180}
      margin={[20, 20]}
      isDraggable={isOwner && isEditing}
      isResizable={isOwner && isEditing}
      draggableHandle=".drag-handle"
      resizeHandles={['se']}
      onLayoutChange={handleLayoutChange}
    >
      {initialWidgets.map((widget) => (
        <div
          key={widget.id.toString()}
          className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-6 flex flex-col transition-colors overflow-hidden"
        >
          {isEditing && (
            <div className="drag-handle absolute top-4 left-4 cursor-grab text-white/50 hover:text-white transition-colors p-2 text-2xl leading-none z-20 bg-black/50 rounded-full backdrop-blur-sm">
              ⠿
            </div>
          )}

          <WidgetRenderer widget={widget} />
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
