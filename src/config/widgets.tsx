import type { WidgetType, BaseWidgetViewProps } from '@/types';
import MovieSearchSelector from '@/components/modals/views/MovieSearchSelector';

export interface WidgetConfig {
  id: WidgetType;
  label: string;
  icon: string;
  color: string;
  title: string;
  component: React.ComponentType<BaseWidgetViewProps>;
}

export const WIDGET_CONFIG: Record<WidgetType, WidgetConfig> = {
  MOVIE: {
    id: 'MOVIE',
    label: 'Movie',
    icon: '🎬',
    color: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    title: 'Select a movie',
    component: MovieSearchSelector,
  },
  MUSIC: {
    id: 'MUSIC',
    label: 'Music',
    icon: '🎵',
    color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    title: 'Configure music',
    component: () => <div className="p-10 text-center text-neutral-500">Music widget configuration coming soon...</div>,
  },
  CUSTOM_TEXT: {
    id: 'CUSTOM_TEXT',
    label: 'Custom Text',
    icon: '📝',
    color: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    title: 'Configure text',
    component: () => <div className="p-10 text-center text-neutral-500">Custom Text configuration coming soon...</div>,
  },
};
