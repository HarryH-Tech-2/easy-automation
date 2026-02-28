'use client';

import { useScrollSpy } from '@/hooks/useScrollSpy';
import { TOCHeading } from '@/lib/types';
import { cn } from '@/lib/utils';

interface TableOfContentsProps {
  headings: TOCHeading[];
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const activeId = useScrollSpy(
    headings.map((h) => h.id),
    120
  );

  if (headings.length === 0) return null;

  return (
    <nav className="sticky top-24" aria-label="Table of contents">
      <h2 className="font-heading font-semibold text-sm mb-3 uppercase tracking-wider text-muted">
        On this page
      </h2>
      <ul className="space-y-1 text-sm">
        {headings.map((heading) => (
          <li key={heading.id}>
            <a
              href={`#${heading.id}`}
              className={cn(
                'block py-1 transition-colors border-l-2 hover:text-primary',
                heading.level === 2 && 'pl-3',
                heading.level === 3 && 'pl-6',
                heading.level === 4 && 'pl-9',
                activeId === heading.id
                  ? 'border-primary text-primary font-medium'
                  : 'border-transparent text-muted'
              )}
            >
              {heading.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
