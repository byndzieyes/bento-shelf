'use server';

import { TMDBMovie } from '@/types';

export async function searchMovies(query: string): Promise<TMDBMovie[]> {
  if (!query) return [];

  const response = await fetch(
    `https://api.themoviedb.org/3/search/movie?query=${encodeURIComponent(query)}&language=en-US`,
    {
      headers: {
        Authorization: `Bearer ${process.env.TMDB_TOKEN}`,
        accept: 'application/json',
      },
      next: { revalidate: 3600 },
    },
  );

  if (!response.ok) return [];

  const data = await response.json();
  return data.results || [];
}
