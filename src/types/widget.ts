import type { Widget } from '@prisma/client';

export type WidgetType = Widget['type'];

export interface MovieContent {
  tmdbId?: number;
  title?: string;
  posterPath?: string;
  releaseDate?: string;
}

export interface CustomTextContent {
  text: string;
}

export type WidgetContentData = MovieContent | CustomTextContent; // | MusicContent;

export type { Widget } from '@prisma/client';

export type ExtendedWidget = Widget & {
  _count?: {
    likes: number;
  };
  likes?: { id: string }[];
};
