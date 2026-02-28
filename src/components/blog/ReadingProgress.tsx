'use client';

import { useReadingProgress } from '@/hooks/useReadingProgress';

export function ReadingProgress() {
  const progress = useReadingProgress();

  return <div className="reading-progress" style={{ width: `${progress}%` }} />;
}
