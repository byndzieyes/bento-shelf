'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { updateUserProfile } from '@/actions/profile';
import type { EditProfileModalProps } from '@/types';

export default function EditProfileModal({ isOpen, onClose, profile }: EditProfileModalProps) {
  const initialLinks = (profile.socialLinks as Record<string, string>) || {};

  const [bio, setBio] = useState(profile.bio || '');
  const [instagram, setInstagram] = useState(initialLinks.instagram || '');
  const [twitter, setTwitter] = useState(initialLinks.twitter || '');

  const [prevIsOpen, setPrevIsOpen] = useState(isOpen);

  if (isOpen !== prevIsOpen) {
    setPrevIsOpen(isOpen);
    if (isOpen) {
      setBio(profile.bio || '');
      const currentLinks = (profile.socialLinks as Record<string, string>) || {};
      setInstagram(currentLinks.instagram || '');
      setTwitter(currentLinks.twitter || '');
    }
  }

  const [isPending, startTransition] = useTransition();

  if (!isOpen) return null;

  const handleSubmit = (e: React.SyntheticEvent) => {
    e.preventDefault();

    startTransition(async () => {
      try {
        const links: Record<string, string> = {};
        if (instagram.trim()) links.instagram = instagram.trim();
        if (twitter.trim()) links.twitter = twitter.trim();

        await updateUserProfile({
          bio: bio.trim() || null,
          socialLinks: links,
        });

        toast.success('Profile updated successfully!');
        onClose();
      } catch (error) {
        toast.error('Failed to update profile');
        console.error(error);
      }
    });
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-4xl w-full max-w-md overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <header className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <h2 className="text-xl font-bold text-white">Edit Profile</h2>
          <button onClick={onClose} className="text-neutral-500 hover:text-white p-2 transition-colors">
            ✕
          </button>
        </header>

        <form onSubmit={handleSubmit} className="p-6 flex flex-col gap-5">
          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Bio</label>
            <textarea
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              maxLength={160}
              rows={3}
              className="w-full resize-none rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="A little bit about yourself..."
            />
            <div className="text-right text-xs text-neutral-600 mt-1">{bio.length}/160</div>
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">Instagram Username</label>
            <input
              type="text"
              value={instagram}
              onChange={(e) => setInstagram(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="e.g. username"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-neutral-400 mb-2">X (Twitter) Username</label>
            <input
              type="text"
              value={twitter}
              onChange={(e) => setTwitter(e.target.value)}
              className="w-full rounded-xl border border-neutral-800 bg-neutral-950 p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
              placeholder="e.g. username"
            />
          </div>

          <div className="mt-4 flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              disabled={isPending}
              className="px-5 py-2.5 rounded-full font-bold text-white bg-neutral-800 hover:bg-neutral-700 transition-all active:scale-95 disabled:opacity-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isPending}
              className="px-5 py-2.5 rounded-full font-bold text-black bg-white hover:bg-neutral-200 transition-all active:scale-95 shadow-lg shadow-white/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isPending ? 'Saving...' : 'Save'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
