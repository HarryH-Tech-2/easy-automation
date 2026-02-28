'use client';

import { useState, useEffect, useCallback } from 'react';

const STORAGE_KEY = 'ea-popup-dismissed';
const DISMISS_DAYS = 7;

export function useExitIntent() {
  const [showPopup, setShowPopup] = useState(false);

  const dismiss = useCallback(() => {
    setShowPopup(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, Date.now().toString());
    }
  }, []);

  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY);
    if (dismissed) {
      const dismissedAt = parseInt(dismissed, 10);
      const daysSince = (Date.now() - dismissedAt) / (1000 * 60 * 60 * 24);
      if (daysSince < DISMISS_DAYS) return;
    }

    function handleMouseLeave(e: MouseEvent) {
      if (e.clientY <= 0) {
        setShowPopup(true);
      }
    }

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, []);

  return { showPopup, dismiss };
}
