'use client';

import { useState } from 'react';
import WidgetTypeSelector from './views/WidgetTypeSelector';
import MovieSearchSelector from './views/MovieSearchSelector';
import type { AddWidgetModalProps, WidgetType } from '@/types';

export default function AddWidgetModal({ isOpen, onClose, username }: AddWidgetModalProps) {
  const [step, setStep] = useState<'TYPE' | WidgetType>('TYPE');

  if (!isOpen) return null;

  const handleClose = () => {
    setStep('TYPE');
    onClose();
  };

  const getModalTitle = () => {
    if (step === 'TYPE') return 'Add to shelf';
    if (step === 'MOVIE') return 'Select a movie';
    return 'Configure widget';
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center bg-black/80 backdrop-blur-md p-4">
      <div className="bg-neutral-900 border border-neutral-800 rounded-[3rem] w-full max-w-2xl overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-200">
        <header className="p-6 border-b border-neutral-800 flex justify-between items-center">
          <div className="flex items-center gap-3">
            {step !== 'TYPE' && (
              <button
                onClick={() => setStep('TYPE')}
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
          {step === 'TYPE' && <WidgetTypeSelector onSelect={setStep} />}
          {step === 'MOVIE' && <MovieSearchSelector username={username} onSuccess={handleClose} />}
        </div>
      </div>
    </div>
  );
}
