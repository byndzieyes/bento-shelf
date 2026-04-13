'use client';

import { useState } from 'react';
import WidgetTypeSelector from './views/WidgetTypeSelector';
import type { AddWidgetModalProps, WidgetType } from '@/types';
import { WIDGET_CONFIG } from '@/config/widgets';

export default function AddWidgetModal({ isOpen, onClose, username, editTarget }: AddWidgetModalProps) {
  const [selectedType, setSelectedType] = useState<WidgetType | null>(null);

  if (!isOpen) return null;

  const step = editTarget ? editTarget.type : selectedType || 'TYPE';

  const handleClose = () => {
    setSelectedType(null);
    onClose();
  };

  const getModalTitle = () => {
    if (step === 'TYPE') return editTarget ? 'Edit widget' : 'Add to shelf';
    return WIDGET_CONFIG[step]?.title || 'Configure widget';
  };

  const ActiveView = step !== 'TYPE' ? WIDGET_CONFIG[step]?.component : null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <header className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step !== 'TYPE' && !editTarget && (
              <button
                onClick={() => setSelectedType(null)}
                className="text-neutral-500 hover:text-white p-2 bg-neutral-800 rounded-full"
              >
                ←
              </button>
            )}
            <h2 className="text-xl font-bold">{getModalTitle()}</h2>
          </div>
          <button onClick={handleClose} className="text-neutral-500 hover:text-white p-2">
            ✕
          </button>
        </header>

        <div className="bg-neutral-900">
          {step === 'TYPE' ? (
            <WidgetTypeSelector onSelect={setSelectedType} />
          ) : (
            ActiveView && <ActiveView username={username} onSuccess={handleClose} editTarget={editTarget} />
          )}
        </div>
      </div>
    </div>
  );
}
