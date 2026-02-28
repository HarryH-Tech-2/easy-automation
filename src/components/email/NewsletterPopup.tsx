'use client';

import { useExitIntent } from '@/hooks/useExitIntent';
import { EmailForm } from './EmailForm';
import { X, Zap } from 'lucide-react';

export function NewsletterPopup() {
  const { showPopup, dismiss } = useExitIntent();

  if (!showPopup) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={dismiss} />
      {/* Modal */}
      <div className="relative w-full max-w-md rounded-2xl bg-background p-8 shadow-2xl">
        <button
          onClick={dismiss}
          className="absolute top-4 right-4 rounded-lg p-1 hover:bg-surface-alt transition-colors"
          aria-label="Close"
        >
          <X className="h-5 w-5" />
        </button>
        <div className="text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary-light mb-4">
            <Zap className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-heading text-2xl font-bold mb-2">
            Wait! Don&apos;t Miss Out
          </h2>
          <p className="text-sm text-muted mb-6">
            Join thousands of professionals getting free automation tips every week.
          </p>
          <EmailForm buttonText="Get Free Updates" />
        </div>
      </div>
    </div>
  );
}
