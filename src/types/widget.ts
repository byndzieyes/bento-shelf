import type { Widget } from '@prisma/client';

export type WidgetType = Widget['type'];

export interface WidgetTypeConfig {
  id: WidgetType;
  label: string;
  icon: string;
  color: string;
}
