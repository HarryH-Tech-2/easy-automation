import { cn } from '@/lib/utils';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'outline';
  className?: string;
}

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-3 py-1 text-xs font-medium',
        {
          'bg-surface-alt text-foreground': variant === 'default',
          'bg-primary-light text-primary-dark': variant === 'primary',
          'border border-border text-muted': variant === 'outline',
        },
        className
      )}
    >
      {children}
    </span>
  );
}
