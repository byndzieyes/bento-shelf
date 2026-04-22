'use client';

import { useState, useTransition } from 'react';
import { useAuth } from '@clerk/nextjs';
import { toggleLike } from '@/actions/like';
import { toast } from 'sonner';
import type { LikeButtonProps } from '@/types';

export default function LikeButton({ widgetId, profileUsername, initialLikes, initialIsLiked }: LikeButtonProps) {
  const { userId } = useAuth();
  const [isLiked, setIsLiked] = useState(initialIsLiked);
  const [likesCount, setLikesCount] = useState(initialLikes);
  const [isPending, startTransition] = useTransition();

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();

    if (!userId) {
      toast.error('You must be logged in to like a widget.');
      return;
    }

    const newIsLiked = !isLiked;
    setIsLiked(newIsLiked);
    setLikesCount((prev) => (newIsLiked ? prev + 1 : prev - 1));

    startTransition(async () => {
      try {
        await toggleLike(widgetId, profileUsername);
      } catch (err) {
        setIsLiked(!newIsLiked);
        setLikesCount((prev) => (!newIsLiked ? prev + 1 : prev - 1));
        toast.error('Failed to update like status');
        console.error(err);
      }
    });
  };

  return (
    <button
      onClick={handleLike}
      disabled={isPending}
      className={`absolute bottom-4 right-4 z-20 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-bold transition-all duration-300 active:scale-90 hover:scale-110 ${
        isLiked
          ? 'bg-red-500/20 text-red-500 border border-red-500/30 shadow-lg shadow-red-500/10'
          : 'bg-black/50 text-neutral-400 hover:text-white border border-white/10 backdrop-blur-sm hover:bg-neutral-800'
      }`}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill={isLiked ? 'currentColor' : 'none'}
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="h-4 w-4"
      >
        <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
      </svg>
      {likesCount > 0 && <span>{likesCount}</span>}
    </button>
  );
}
