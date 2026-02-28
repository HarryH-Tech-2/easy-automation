import { cn } from '@/lib/utils';
import { AlertCircle, Info, Lightbulb, AlertTriangle } from 'lucide-react';

interface CalloutProps {
  type?: 'info' | 'warning' | 'tip' | 'tldr';
  title?: string;
  children: React.ReactNode;
}

const icons = {
  info: Info,
  warning: AlertTriangle,
  tip: Lightbulb,
  tldr: AlertCircle,
};

const styles = {
  info: 'border-blue-500 bg-blue-50 [&[data-theme=dark]]:bg-blue-950/30',
  warning: 'border-yellow-500 bg-yellow-50 [&[data-theme=dark]]:bg-yellow-950/30',
  tip: 'border-green-500 bg-green-50 [&[data-theme=dark]]:bg-green-950/30',
  tldr: 'border-primary bg-primary-light',
};

const defaultTitles = {
  info: 'Info',
  warning: 'Warning',
  tip: 'Tip',
  tldr: 'TL;DR — Key Takeaway',
};

export function Callout({ type = 'info', title, children }: CalloutProps) {
  const Icon = icons[type];

  return (
    <div
      className={cn(
        'my-6 rounded-lg border-l-4 p-4 not-prose',
        styles[type]
      )}
    >
      <div className="flex items-center gap-2 font-heading font-semibold mb-2">
        <Icon className="h-5 w-5 shrink-0" />
        <span>{title || defaultTitles[type]}</span>
      </div>
      <div className="text-sm leading-relaxed">{children}</div>
    </div>
  );
}
