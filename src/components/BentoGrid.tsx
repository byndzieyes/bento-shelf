'use client';

import { useState, useTransition } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import { updateWidgetsLayout, deleteWidget } from '@/actions/widget';
import WidgetRenderer from './widgets/WidgetRenderer';
import LikeButton from './widgets/LikeButton';
import type { Layouts, WidgetLayoutData, BentoGridProps, Layout } from '@/types';
import { toast } from 'sonner';

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

export default function BentoGrid({
  initialWidgets,
  isOwner,
  isEditing,
  username,
  onEditWidget,
}: BentoGridProps) {
  const [layouts, setLayouts] = useState<Layouts>(() => {
    const initialLayouts: Layouts = {};

    initialWidgets.forEach((w) => {
      const layoutData = isWidgetLayoutData(w.layoutData) ? w.layoutData : { lg: { x: 0, y: 0, w: 1, h: 1 } };

      Object.entries(layoutData).forEach(([bp, pos]) => {
        if (!initialLayouts[bp]) initialLayouts[bp] = [];
        initialLayouts[bp].push({
          i: w.id,
          ...pos,
        });
      });
    });

    return initialLayouts;
  });

  const [isPending, startTransition] = useTransition();
  const [currentBreakpoint, setCurrentBreakpoint] = useState('lg');
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

    startTransition(() => {
      updateWidgetsLayout(username, sanitizedAllLayouts).catch((err) => {
        toast.error('Failed to save layout.');
        console.error(err);
      });
    });
  };

  const handleDeleteWidget = (widgetId: string) => {
    if (!window.confirm('Are you sure you want to delete the widget?')) return;

    startTransition(() => {
      toast.promise(deleteWidget(widgetId, username), {
        loading: 'Deleting widget...',
        success: 'Widget deleted.',
        error: 'Failed to delete widget.',
      });
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
      onBreakpointChange={(bp) => setCurrentBreakpoint(bp)}
    >
      {initialWidgets.map((widget) => {
        const layoutForCurrentBP = layouts[currentBreakpoint] || [];
        const layoutItem = layoutForCurrentBP.find((l) => l.i === widget.id);

        const w = layoutItem?.w ?? 1;
        const h = layoutItem?.h ?? 1;

        return (
          <div
            key={widget.id}
            className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-6 flex flex-col transition-colors overflow-hidden"
          >
            {isEditing && (
              <div className="drag-handle absolute top-4 left-4 cursor-grab text-white/50 hover:text-white transition-colors p-2 text-2xl leading-none z-20 bg-black/50 rounded-full backdrop-blur-sm">
                ⠿
              </div>
            )}

            {isEditing && onEditWidget && (
              <button
                onClick={() => onEditWidget(widget.id, widget.type)}
                disabled={isPending}
                className="absolute top-4 right-14 z-20 bg-indigo-500/80 hover:bg-indigo-500 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors shadow-lg disabled:opacity-50"
                title="Edit Widget"
              >
                ✎
              </button>
            )}

            {isEditing && (
              <button
                onClick={() => handleDeleteWidget(widget.id)}
                disabled={isPending}
                className="absolute top-4 right-4 z-20 bg-red-500/80 hover:bg-red-500 text-white w-8 h-8 rounded-full flex items-center justify-center backdrop-blur-sm transition-colors shadow-lg disabled:opacity-50"
                title="Delete Widget"
              >
                ✕
              </button>
            )}

            <WidgetRenderer widget={widget} w={w} h={h} />

            <LikeButton
              widgetId={widget.id}
              profileUsername={username}
              initialLikes={widget._count?.likes ?? 0}
              initialIsLiked={(widget.likes?.length ?? 0) > 0}
            />
          </div>
        );
      })}
    </ResponsiveGridLayout>
  );
}
