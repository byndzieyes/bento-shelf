'use client';

import { useState } from 'react';
import BentoGrid from '@/components/BentoGrid';
import AddWidgetModal from '@/components/modals/AddWidgetModal';
import type { ProfileClientViewProps, WidgetType } from '@/types';

export default function ProfileClientView({ profileOwner, isOwner }: ProfileClientViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState<{ id: string; type: WidgetType } | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditWidget = (widgetId: string, widgetType: WidgetType) => {
    setEditTarget({ id: widgetId, type: widgetType });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setEditTarget(null);
  };

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-12 flex justify-between items-end gap-4">
        <div className="flex-1">
          <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">@{profileOwner.username}</h1>
          <p className="text-neutral-500 mt-2 font-medium">Your personal shelf</p>
        </div>

        {isOwner && (
          <div className="flex items-center gap-3">
            {isEditing && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="bg-white hover:bg-neutral-200 text-black px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-white/5 active:scale-95"
              >
                Add Widget
              </button>
            )}

            <button
              onClick={() => setIsEditing((prev) => !prev)}
              className={`px-5 py-2 rounded-full text-sm font-bold transition-all border active:scale-95 ${
                isEditing
                  ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20'
                  : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
              }`}
            >
              {isEditing ? 'Done' : 'Edit'}
            </button>
          </div>
        )}
      </header>

      <div className="max-w-6xl mx-auto">
        <BentoGrid
          initialWidgets={profileOwner.widgets}
          isOwner={isOwner}
          isEditing={isEditing}
          username={profileOwner.username}
          onEditWidget={handleEditWidget}
        />
      </div>

      <AddWidgetModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        username={profileOwner.username}
        editTarget={editTarget}
      />
    </main>
  );
}
