import type { Widget } from '@prisma/client';
import type { MovieContent } from './tmdb';
import type { ProfileOwnerWithWidgets } from './profile';
import type { WidgetType } from './widget';

export interface BentoGridProps {
  initialWidgets: Widget[];
  isOwner: boolean;
  isEditing: boolean;
  username: string;
}

export interface MovieSearchSelectorProps {
  username: string;
  onSuccess: () => void;
}

export interface WidgetTypeSelectorProps {
  onSelect: (type: WidgetType) => void;
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

export interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
}
