'use client';

import { useState } from 'react';
import BentoGrid from '@/components/BentoGrid';
import type { ProfileClientViewProps } from '@/types';

export default function ProfileClientView({ profileOwner, isOwner }: ProfileClientViewProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-black tracking-tight">@{profileOwner.username}</h1>
          <p className="text-neutral-500 mt-2">Your personal shelf</p>
        </div>
        {isOwner && (
          <button
            onClick={() => setIsEditing((prev) => !prev)}
            className="bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 px-4 py-1.5 rounded-full text-sm font-semibold"
          >
            {isEditing ? 'Done' : 'Edit'}
          </button>
        )}
      </header>

      <div className="max-w-6xl mx-auto">
        <BentoGrid
          initialWidgets={profileOwner.widgets}
          isOwner={isOwner}
          isEditing={isEditing}
          username={profileOwner.username}
        />
      </div>
    </main>
  );
}
