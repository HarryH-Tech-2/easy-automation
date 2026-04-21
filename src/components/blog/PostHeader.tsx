import Image from 'next/image';
import Link from 'next/link';
import { Clock, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PostFrontmatter } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { categoryLabels, Category } from '@/lib/constants';
import type { Author } from '@/lib/authors';

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
  category: string;
  readingTime: string;
  author: Author;
}

export function PostHeader({ frontmatter, category, readingTime, author }: PostHeaderProps) {
  return (
    <header className="mb-8">
      <Badge variant="primary" className="mb-4">
        {categoryLabels[category as Category] || category}
      </Badge>
      <h1 className="font-heading text-3xl md:text-4xl lg:text-5xl font-bold mb-4 leading-tight">
        {frontmatter.title}
      </h1>
      <p className="text-lg text-muted mb-6">{frontmatter.description}</p>
      <div className="flex flex-wrap items-center gap-4 text-sm text-muted mb-6">
        <Link
          href={`/authors/${author.slug}`}
          className="flex items-center gap-1.5 hover:text-primary transition-colors"
        >
          <User className="h-4 w-4" />
          {author.name}
        </Link>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          <span>
            <span className="sr-only">Published </span>
            <time dateTime={frontmatter.date}>{formatDate(frontmatter.date)}</time>
          </span>
        </span>
        {frontmatter.updated && frontmatter.updated !== frontmatter.date && (
          <span className="flex items-center gap-1.5 text-primary">
            <span className="sr-only">Last updated </span>
            Updated <time dateTime={frontmatter.updated}>{formatDate(frontmatter.updated)}</time>
          </span>
        )}
        <span className="flex items-center gap-1.5">
          <Clock className="h-4 w-4" />
          {readingTime}
        </span>
      </div>
      {frontmatter.featuredImage && (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Image
            src={frontmatter.featuredImage}
            alt={frontmatter.featuredImageAlt || frontmatter.title}
            fill
            className="object-cover"
            priority
            sizes="(max-width: 768px) 100vw, 800px"
          />
        </div>
      )}
    </header>
  );
}
