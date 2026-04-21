import { useState } from 'react';
import type { MovieWidgetProps } from '@/types';
import Image from 'next/image';
import { Skeleton } from '@/components/ui/Skeleton';

export default function MovieWidget({ content, w, h }: MovieWidgetProps) {
  const [isImageLoading, setIsImageLoading] = useState(true);

  if (!content || !content.posterPath) {
    return (
      <div className="flex h-full flex-col items-center justify-center text-center">
        <span className="mb-2 text-4xl">🎬</span>
        <p className="text-sm font-medium text-neutral-500">Select a movie...</p>
      </div>
    );
  }

  const releaseYear = content.releaseDate?.slice(0, 4);

  if (w === 1 && h === 1) {
    return (
      <>
        {isImageLoading && <Skeleton className="absolute inset-0 z-10" />}
        <Image
          src={`https://image.tmdb.org/t/p/w300${content.posterPath}`}
          alt={content.title || 'Movie Poster'}
          fill
          unoptimized
          priority
          className="object-cover"
          draggable={false}
          onLoad={() => setIsImageLoading(false)}
        />
      </>
    );
  }

  if (w >= 3 && h <= 2) {
    return (
      <div className="absolute inset-0 flex h-full w-full bg-neutral-900 overflow-hidden">
        <div className="relative h-full w-[45%]">
          {isImageLoading && <Skeleton className="absolute inset-0 z-10" />}
          <Image
            src={`https://image.tmdb.org/t/p/w500${content.posterPath}`}
            alt={content.title || 'Movie Poster'}
            fill
            unoptimized
            priority
            className="object-cover"
            draggable={false}
            onLoad={() => setIsImageLoading(false)}
          />
          <div className="pointer-events-none absolute inset-y-0 right-0 w-1/2 bg-linear-to-r from-transparent to-neutral-900" />
        </div>

        <div className="relative z-10 flex h-full w-[55%] flex-col justify-center px-8">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-xs font-bold uppercase tracking-widest text-indigo-400">MOVIE</h3>
          </div>
          <p className="text-2xl font-bold leading-tight text-white line-clamp-2 drop-shadow-md">{content.title}</p>
          {releaseYear && <p className="mt-2 text-sm font-medium text-neutral-400">{releaseYear}</p>}
        </div>
      </div>
    );
  }

  return (
    <>
      {isImageLoading && <Skeleton className="absolute inset-0 z-20" />}
      <Image
        src={`https://image.tmdb.org/t/p/w500${content.posterPath}`}
        alt={content.title || 'Movie Poster'}
        fill
        unoptimized
        priority
        className="pointer-events-none object-cover opacity-70"
        draggable={false}
        onLoad={() => setIsImageLoading(false)}
      />
      <div className="pointer-events-none absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-transparent" />
      <div className="relative z-10 mt-auto p-4 md:p-6">
        <h3 className="mb-1 text-xs font-bold uppercase tracking-widest text-white/70 drop-shadow-md">Movie</h3>
        <p className="text-xl font-bold leading-tight text-white drop-shadow-lg md:text-2xl">{content.title}</p>
        {releaseYear && <p className="mt-1 text-sm font-medium text-neutral-300 drop-shadow-lg">{releaseYear}</p>}
      </div>
    </>
  );
}
