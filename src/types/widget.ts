import type { Widget } from '@prisma/client';

export type WidgetType = Widget['type'];

export interface MovieContent {
  tmdbId?: number;
  title?: string;
  posterPath?: string;
  releaseDate?: string;
}

export type WidgetContentData = MovieContent; // | MusicContent | CustomTextContent;
