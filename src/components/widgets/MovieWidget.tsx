import type { MovieWidgetProps } from '@/types';
import Image from 'next/image';

export default function MovieWidget({ content }: MovieWidgetProps) {
  if (!content || !content.posterPath) {
    return (
      <div className="mt-auto flex flex-col items-center justify-center h-full text-center">
        <span className="text-4xl mb-2">🎬</span>
        <p className="text-neutral-500 text-sm font-medium">Select a movie...</p>
      </div>
    );
  }

  return (
    <>
      <Image
        src={`https://image.tmdb.org/t/p/w500${content.posterPath}`}
        alt={content.title || 'Movie Poster'}
        fill
        unoptimized
        priority
        className="object-cover rounded-[2.5rem] opacity-70 pointer-events-none"
        draggable={false}
      />

      <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent rounded-[2.5rem] pointer-events-none" />

      <div className="relative mt-auto z-10 p-2">
        <h3 className="text-white/70 text-xs font-bold uppercase tracking-widest mb-1 drop-shadow-md">Movie</h3>
        <p className="text-white font-bold text-xl leading-tight drop-shadow-lg">{content.title}</p>
      </div>
    </>
  );
}
