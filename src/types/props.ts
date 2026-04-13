import type { Widget } from '@prisma/client';
import type { MovieContent } from './widget';
import type { ProfileOwnerWithWidgets } from './profile';
import type { WidgetType } from './widget';

export interface BentoGridProps {
  initialWidgets: Widget[];
  isOwner: boolean;
  isEditing: boolean;
  username: string;
  onEditWidget?: (widgetId: string, type: WidgetType) => void;
}

export interface BaseWidgetViewProps {
  username: string;
  onSuccess: () => void;
  editTarget?: { id: string; type: WidgetType } | null;
}

export type MovieSearchSelectorProps = BaseWidgetViewProps;

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
  editTarget?: { id: string; type: WidgetType } | null;
}
