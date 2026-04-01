export interface TMDBMovie {
  id: number;
  title: string;
  poster_path: string | null;
  release_date: string;
}

export interface MovieContent {
  tmdbId?: number;
  title?: string;
  posterPath?: string;
  releaseDate?: string;
}
