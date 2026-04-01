'use client';

import { useState, useTransition } from 'react';
import { Responsive, WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
import { updateWidgetsLayout } from '@/app/actions';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

// Define Layouts type locally to avoid import issues from @types
type Layouts = { [breakpoint: string]: Layout[] };

const ResponsiveGridLayout = WidthProvider(Responsive);

// This represents the layout data for a widget as stored in the database.
// It's a map from breakpoint names (e.g., 'lg', 'md') to their positions.
type WidgetLayoutData = Record<string, Pick<Layout, 'x' | 'y' | 'w' | 'h'>>;

interface Widget {
  id: string;
  type: string;
  layoutData: unknown;
}

interface BentoGridProps {
  initialWidgets: Widget[];
  isOwner: boolean;
  isEditing: boolean;
  username: string;
}

function isWidgetLayoutData(data: unknown): data is WidgetLayoutData {
  return data != null && typeof data === 'object' && !Array.isArray(data);
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

  const handleLayoutChange = (layout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);

    if (!isOwner) return;

    startTransition(async () => {
      const sanitizedAllLayouts: Layouts = {};
      for (const [bp, items] of Object.entries(allLayouts)) {
        sanitizedAllLayouts[bp] = items.map((item) => ({
          i: item.i,
          x: item.x,
          y: item.y,
          w: item.w,
          h: item.h,
        }));
      }

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
      className={`layout transition-opacity ${isPending ? 'opacity-50 cursor-wait' : ''} ${isEditing ? 'editing' : ''}`}
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
      rowHeight={180}
      margin={[20, 20]}
      isDraggable={isOwner && isEditing && !isPending}
      isResizable={isOwner && isEditing && !isPending}
      draggableHandle=".drag-handle"
      resizeHandles={['se']}
      onLayoutChange={handleLayoutChange}
    >
      {initialWidgets.map((widget) => (
        <div
          key={widget.id.toString()}
          className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-6 flex flex-col transition-colors"
        >
          {isEditing && (
            <div className="drag-handle absolute top-4 left-4 cursor-grab text-neutral-500 hover:text-white transition-colors p-2 text-2xl leading-none">
              ⠿
            </div>
          )}

          <div className="mt-auto">
            <h3 className="text-neutral-500 text-sm font-medium uppercase tracking-wider">{widget.type}</h3>
            <p className="text-white font-semibold mt-1">Here will be the content</p>
          </div>
        </div>
      ))}
    </ResponsiveGridLayout>
  );
}
