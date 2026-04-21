'use client';

import { useState, useTransition, useEffect } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import { searchMovies } from '@/lib/tmdb';
import { addMovieWidget, updateWidgetContent } from '@/actions/widget';
import type { TMDBMovie, MovieSearchSelectorProps, MovieContent } from '@/types';

export default function MovieSearchSelector({ username, onSuccess, editTarget }: MovieSearchSelectorProps) {
  const [query, setQuery] = useState(() => (editTarget?.content as MovieContent)?.title ?? '');
  const [results, setResults] = useState<TMDBMovie[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (query.trim()) {
      setIsSearching(true);
    } else {
      setResults([]);
      setIsSearching(false);
      return;
    }

    const debounceId = setTimeout(async () => {
      try {
        const movies = await searchMovies(query);
        setResults(movies);
      } catch (err) {
        console.error('Failed to search movies:', err);
      } finally {
        setIsSearching(false);
      }
    }, 500);

    return () => clearTimeout(debounceId);
  }, [query]);

  const handleAction = (movie: TMDBMovie) => {
    startTransition(async () => {
      try {
        if (editTarget) {
          await updateWidgetContent(editTarget.id, username, {
            tmdbId: movie.id,
            title: movie.title,
            posterPath: movie.poster_path ?? undefined,
            releaseDate: movie.release_date ?? undefined,
          });
          toast.success('Movie widget updated!');
        } else {
          await addMovieWidget(username, movie);
          toast.success('Movie added to shelf!');
        }
        onSuccess();
      } catch (err) {
        toast.error(`Failed to ${editTarget ? 'update' : 'add'} movie`);
        console.error(err);
      }
    });
  };

  return (
    <div className="flex flex-col h-125">
      <div className="p-6">
        <input
          autoFocus
          className="w-full bg-neutral-950 border border-neutral-800 rounded-2xl px-5 py-3 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition"
          placeholder="Search for a movie..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>

      <div className="flex-1 overflow-y-auto p-6 pt-0">
        {!query.trim() ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <span className="text-5xl opacity-50 mb-2">🍿</span>
            <p className="font-medium text-sm">Type a movie name to search...</p>
          </div>
        ) : isSearching && results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-4">
            <div className="w-8 h-8 border-4 border-indigo-500 border-t-transparent rounded-full animate-spin" />
            <p className="font-medium text-sm">Searching for &quot;{query}&quot;...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="h-full flex flex-col items-center justify-center text-neutral-500 space-y-3">
            <span className="text-5xl opacity-50 mb-2">🤷‍♂️</span>
            <p className="font-medium text-sm">No movies found for &quot;{query}&quot;</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {results.map((movie) => (
              <button
                key={movie.id}
                disabled={isPending}
                onClick={() => handleAction(movie)}
                className="group relative block w-full pt-[150%] rounded-2xl overflow-hidden bg-neutral-800 border border-neutral-700 hover:border-indigo-500 transition-all disabled:opacity-50 active:scale-95"
              >
                {movie.poster_path ? (
                  <Image
                    src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
                    alt={movie.title}
                    fill
                    unoptimized
                    className="object-cover group-hover:scale-110 transition duration-500"
                  />
                ) : (
                  <div className="absolute inset-0 flex items-center justify-center text-neutral-500 text-[10px] p-2 text-center leading-tight">
                    {movie.title}
                  </div>
                )}

                <div className="absolute inset-0 bg-linear-to-t from-black/90 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                  <div className="translate-y-2 group-hover:translate-y-0 transition-transform duration-300 text-left w-full z-10">
                    <p className="text-white text-[10px] font-bold line-clamp-2 leading-tight">{movie.title}</p>
                    <p className="text-indigo-400 text-[10px] mt-0.5">{movie.release_date?.slice(0, 4)}</p>
                  </div>
                </div>
              </button>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
