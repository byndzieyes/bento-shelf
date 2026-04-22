import type { MovieContent, CustomTextContent, Widget, WidgetType } from './widget';
import type { ProfileOwnerWithWidgets } from './profile';

export interface BentoGridProps {
  initialWidgets: ProfileOwnerWithWidgets['widgets'];
  isOwner: boolean;
  isEditing: boolean;
  username: string;
  onEditWidget?: (widgetId: string, type: WidgetType) => void;
}

export interface BaseWidgetViewProps {
  username: string;
  onSuccess: () => void;
  editTarget?: Widget | null;
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
  w: number;
  h: number;
}

export interface CustomTextWidgetProps {
  content: CustomTextContent;
  w: number;
  h: number;
}

export interface WidgetRendererProps {
  widget: ProfileOwnerWithWidgets['widgets'][number];
  w: number;
  h: number;
}

export interface AddWidgetModalProps {
  isOpen: boolean;
  onClose: () => void;
  username: string;
  editTarget?: Widget | null;
}

export interface EditProfileModalProps {
  isOpen: boolean;
  onClose: () => void;
  profile: ProfileOwnerWithWidgets;
}

export interface LikeButtonProps {
  widgetId: string;
  profileUsername: string;
  initialLikes: number;
  initialIsLiked: boolean;
}
