import type { Widget } from '@prisma/client';
import type { MovieContent } from './tmdb';
import type { ProfileOwnerWithWidgets } from './profile';

export interface BentoGridProps {
  initialWidgets: Widget[];
  isOwner: boolean;
  isEditing: boolean;
  username: string;
}

export interface ProfileClientViewProps {
  profileOwner: ProfileOwnerWithWidgets;
  isOwner: boolean;
}

export interface MovieWidgetProps {
  content: MovieContent;
}

export interface WidgetRendererProps {
  widget: Widget;
}
