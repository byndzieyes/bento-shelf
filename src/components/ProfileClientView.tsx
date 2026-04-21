'use client';

import { useState } from 'react';
import Image from 'next/image';
import { toast } from 'sonner';
import BentoGrid from '@/components/BentoGrid';
import AddWidgetModal from '@/components/modals/AddWidgetModal';
import EditProfileModal from '@/components/modals/EditProfileModal';
import type { ProfileClientViewProps, Widget } from '@/types';

export default function ProfileClientView({ profileOwner, isOwner }: ProfileClientViewProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editTarget, setEditTarget] = useState<Widget | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);

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

  const handleShare = async () => {
    const url = window.location.href;

    const isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    if (isMobile && navigator.share) {
      try {
        await navigator.share({
          title: `@${profileOwner.username}'s Shelf`,
          url: url,
        });
        return;
      } catch (error) {
        if (error instanceof Error && error.name === 'AbortError') return;
      }
    }

    try {
      await navigator.clipboard.writeText(url);
      toast.success('Link copied to clipboard!');
    } catch (clipboardError) {
      toast.error('Failed to copy link');
      console.error('Error copying link to clipboard:', clipboardError);
    }
  };

  const socialLinks = (profileOwner.socialLinks as Record<string, string>) || {};

  return (
    <main className="min-h-screen bg-neutral-950 text-white p-6 md:p-12">
      <header className="max-w-6xl mx-auto mb-6 flex flex-col md:flex-row justify-between items-start gap-8 md:gap-4">
        <div className="flex flex-col sm:flex-row items-start gap-6 flex-1 w-full">
          {profileOwner.avatarUrl ? (
            <Image
              src={profileOwner.avatarUrl}
              alt={`@${profileOwner.username}`}
              width={128}
              height={128}
              unoptimized
              className="w-24 h-24 md:w-32 md:h-32 rounded-full object-cover shadow-2xl shrink-0 border-2 border-neutral-800"
            />
          ) : (
            <div className="w-24 h-24 md:w-32 md:h-32 rounded-full bg-neutral-900 flex items-center justify-center text-4xl font-bold text-neutral-600 shadow-2xl shrink-0 border-2 border-neutral-800">
              {profileOwner.username.charAt(0).toUpperCase()}
            </div>
          )}

          <div className="flex-1 sm:mt-2 w-full">
            <h1 className="text-3xl md:text-5xl font-black tracking-tighter text-white">@{profileOwner.username}</h1>
            <p className="text-neutral-500 mt-2 font-medium">Your personal shelf</p>

            {(profileOwner.bio || socialLinks.instagram || socialLinks.twitter) && (
              <div className="mt-6 flex flex-col gap-4">
                {profileOwner.bio && (
                  <p className="text-lg text-neutral-300 max-w-2xl leading-relaxed">{profileOwner.bio}</p>
                )}

                <div className="flex items-center gap-4">
                  {socialLinks.instagram && (
                    <a
                      href={`https://instagram.com/${socialLinks.instagram}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-pink-500 transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                      </svg>
                    </a>
                  )}
                  {socialLinks.twitter && (
                    <a
                      href={`https://x.com/${socialLinks.twitter}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-neutral-500 hover:text-white transition-colors"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="currentColor"
                      >
                        <path d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z" />
                      </svg>
                    </a>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 sm:mt-4">
          <button
            onClick={handleShare}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all hover:text-white hover:border-neutral-700 active:scale-95 shadow-sm"
            title="Share Profile"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8" />
              <polyline points="16 6 12 2 8 6" />
              <line x1="12" y1="2" x2="12" y2="15" />
            </svg>
          </button>

          {isOwner && (
            <>
              <button
                onClick={() => setIsEditProfileOpen(true)}
                className="flex h-10 w-10 items-center justify-center rounded-full bg-neutral-900 border border-neutral-800 text-neutral-400 transition-all hover:text-white hover:border-neutral-700 active:scale-95 shadow-sm"
                title="Edit Profile"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="18"
                  height="18"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M12 20h9" />
                  <path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4L16.5 3.5z" />
                </svg>
              </button>

              {isEditing && (
                <button
                  onClick={() => setIsModalOpen(true)}
                  className="bg-white hover:bg-neutral-200 text-black px-5 py-2 rounded-full text-sm font-bold transition-all shadow-lg shadow-white/5 active:scale-95"
                >
                  Add Widget
                </button>
              )}

              <button
                onClick={() => {
                  setIsEditing((prev) => {
                    const next = !prev;
                    if (next) {
                      toast.info('Editing mode enabled', { id: 'edit-mode' });
                    } else {
                      toast.success('All changes saved!', { id: 'edit-mode' });
                    }
                    return next;
                  });
                }}
                className={`px-5 py-2 rounded-full text-sm font-bold transition-all border active:scale-95 ${
                  isEditing
                    ? 'bg-indigo-500/10 border-indigo-500/30 text-indigo-400 hover:bg-indigo-500/20'
                    : 'bg-neutral-900 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                }`}
              >
                {isEditing ? 'Done' : 'Edit'}
              </button>
            </>
          )}
        </div>
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
      <EditProfileModal isOpen={isEditProfileOpen} onClose={() => setIsEditProfileOpen(false)} profile={profileOwner} />
    </main>
  );
}
