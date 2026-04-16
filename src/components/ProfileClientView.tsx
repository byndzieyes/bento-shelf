'use client';

import { useState } from 'react';
import BentoGrid from '@/components/BentoGrid';
import AddWidgetModal from '@/components/modals/AddWidgetModal';
import type { ProfileClientViewProps, Widget } from '@/types';

export default function ProfileClientView({ profileOwner, isOwner }: ProfileClientViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState<Widget | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditWidget = (widgetId: string) => {
    const widgetToEdit = profileOwner.widgets.find((w) => w.id === widgetId);
    if (widgetToEdit) {
      setEditTarget(widgetToEdit);
      setIsModalOpen(true);
    }
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
        {profileOwner.widgets.length === 0 ? (
          <div className="flex min-h-[50vh] flex-col items-center justify-center rounded-3xl border-2 border-dashed border-neutral-800 bg-neutral-900/50 py-12 text-center">
            <h2 className="mt-6 text-2xl font-bold text-white">Shelf is empty</h2>
            <p className="mt-2 text-neutral-500">Add your first widget to start building your collection</p>
            {isOwner && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="mt-8 rounded-full bg-white px-6 py-3 text-base font-bold text-black shadow-lg shadow-white/10 transition-all hover:bg-neutral-200 active:scale-95"
              >
                Add Widget
              </button>
            )}
          </div>
        ) : (
          <BentoGrid
            initialWidgets={profileOwner.widgets}
            isOwner={isOwner}
            isEditing={isEditing}
            username={profileOwner.username}
            onEditWidget={handleEditWidget}
          />
        )}
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
