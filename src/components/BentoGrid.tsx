'use client';

import { useState, useTransition } from 'react';
import { Responsive } from 'react-grid-layout';
import { WidthProvider } from 'react-grid-layout';
import type { Layout } from 'react-grid-layout';
// Define Layouts type locally to avoid import issues from @types
type Layouts = { [breakpoint: string]: Layout[] };
import { updateWidgetsLayout } from '@/app/actions';

import 'react-grid-layout/css/styles.css';
import 'react-resizable/css/styles.css';

const ResponsiveGridLayout = WidthProvider(Responsive);

interface Widget {
  id: string;
  x: number;
  y: number;
  w: number;
  h: number;
  type: string;
}

interface BentoGridProps {
  initialWidgets: Widget[];
  isOwner: boolean;
  username: string;
}

export default function BentoGrid({ initialWidgets, isOwner, username }: BentoGridProps) {
  const [layouts, setLayouts] = useState<Layouts>({
    lg: initialWidgets.map((w) => ({
      i: w.id.toString(),
      x: w.x,
      y: w.y,
      w: w.w,
      h: w.h,
    })),
  });

  const [isPending, startTransition] = useTransition();

  const handleLayoutChange = (layout: Layout[], allLayouts: Layouts) => {
    setLayouts(allLayouts);

    if (!isOwner) return;

    startTransition(async () => {
      const sanitizedLayout = layout.map((item) => ({
        i: item.i,
        x: item.x,
        y: item.y,
        w: item.w,
        h: item.h,
      }));
      try {
        await updateWidgetsLayout(username, sanitizedLayout);
        console.log('Layout saved successfully!');
      } catch (err) {
        console.error('Error saving layout:', err);
      }
    });
  };

  return (
    <ResponsiveGridLayout
      className={`layout transition-opacity ${isPending ? 'opacity-50 cursor-wait' : ''}`}
      layouts={layouts}
      breakpoints={{ lg: 1200, md: 996, sm: 768, xs: 480, xxs: 0 }}
      cols={{ lg: 4, md: 4, sm: 2, xs: 1, xxs: 1 }}
      rowHeight={180}
      margin={[20, 20]}
      isDraggable={isOwner && !isPending}
      isResizable={isOwner && !isPending}
      draggableHandle=".drag-handle"
      onLayoutChange={handleLayoutChange}
    >
      {initialWidgets.map((widget) => (
        <div
          key={widget.id.toString()}
          className="bg-neutral-900 border border-neutral-800 rounded-[2.5rem] p-6 flex flex-col group transition-colors hover:border-neutral-700"
        >
          {isOwner && (
            <div className="drag-handle absolute top-6 left-6 cursor-grab opacity-0 group-hover:opacity-100 transition-opacity text-neutral-600 hover:text-white">
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
