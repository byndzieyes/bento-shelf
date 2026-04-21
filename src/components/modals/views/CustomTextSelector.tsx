'use client';

import { useState, useTransition } from 'react';
import { toast } from 'sonner';
import { addCustomTextWidget, updateWidgetContent } from '@/actions/widget';
import type { BaseWidgetViewProps, CustomTextContent } from '@/types';

export default function CustomTextSelector({ username, onSuccess, editTarget }: BaseWidgetViewProps) {
  const [text, setText] = useState(() => (editTarget?.content as unknown as CustomTextContent)?.text ?? '');
  const [isPending, startTransition] = useTransition();

  const handleSave = () => {
    if (!text.trim()) return;

    startTransition(async () => {
      try {
        if (editTarget) {
          await updateWidgetContent(editTarget.id, username, { text });
          toast.success('Text widget updated!');
        } else {
          await addCustomTextWidget(username, text);
          toast.success('Text widget added!');
        }
        onSuccess();
      } catch (err) {
        toast.error(`Failed to ${editTarget ? 'update' : 'add'} text widget`);
        console.error(err);
      }
    });
  };

  return (
    <div className="flex h-full flex-col p-6">
      <textarea
        autoFocus
        value={text}
        onChange={(e) => setText(e.target.value)}
        placeholder="Write a note or quote..."
        className="h-48 w-full flex-1 resize-none rounded-2xl border border-neutral-800 bg-neutral-950 p-4 text-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50"
        disabled={isPending}
      />
      <div className="mt-6 flex justify-end">
        <button
          onClick={handleSave}
          disabled={isPending || !text.trim()}
          className="rounded-full bg-white px-6 py-3 font-bold text-black shadow-lg transition-all hover:bg-neutral-200 active:scale-95 disabled:cursor-not-allowed disabled:bg-neutral-700 disabled:text-neutral-400"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
      </div>
    </div>
  );
}
