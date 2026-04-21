import Link from 'next/link';
import { Linkedin, Globe } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import type { Author } from '@/lib/authors';

export function AuthorBio({ author }: { author: Author }) {
  return (
    <Card className="mt-8">
      <div className="flex gap-4 items-start">
        <div className="w-16 h-16 rounded-full bg-primary-light flex items-center justify-center shrink-0">
          <span className="text-2xl font-bold text-primary font-heading">{author.initials}</span>
        </div>
        <div className="flex-1">
          <h3 className="font-heading font-semibold text-lg">
            <Link href={`/authors/${author.slug}`} className="hover:text-primary transition-colors">
              {author.name}
            </Link>
          </h3>
          <p className="text-sm text-primary font-medium mt-0.5">{author.title}</p>
          <p className="text-sm text-muted mt-2">{author.bio}</p>
          <div className="flex flex-wrap gap-3 mt-3">
            <Link
              href={`/authors/${author.slug}`}
              className="text-xs font-medium text-primary hover:underline"
            >
              Full bio →
            </Link>
            {author.linkedin && (
              <a
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <Linkedin className="h-3 w-3" />
                LinkedIn
              </a>
            )}
            {author.portfolio && (
              <a
                href={author.portfolio}
                target="_blank"
                rel="noopener noreferrer me"
                className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
              >
                <Globe className="h-3 w-3" />
                Portfolio
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}
