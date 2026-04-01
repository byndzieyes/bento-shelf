import type { Layout } from 'react-grid-layout';

export type { Layout };

// Layouts for the entire grid, keyed by breakpoint
export type Layouts = { [breakpoint: string]: Layout[] };

export interface LayoutItem {
  i: string;
  x: number;
  y: number;
  w: number;
  h: number;
}

export type WidgetLayoutData = Record<string, Pick<Layout, 'x' | 'y' | 'w' | 'h'>>;
