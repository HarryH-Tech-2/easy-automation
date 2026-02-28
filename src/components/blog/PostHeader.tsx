import Image from 'next/image';
import { Clock, Calendar, User } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { PostFrontmatter } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { categoryLabels, Category } from '@/lib/constants';

interface PostHeaderProps {
  frontmatter: PostFrontmatter;
  category: string;
  readingTime: string;
}

export function PostHeader({ frontmatter, category, readingTime }: PostHeaderProps) {
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
        <span className="flex items-center gap-1.5">
          <User className="h-4 w-4" />
          {frontmatter.author || 'Easy Automation'}
        </span>
        <span className="flex items-center gap-1.5">
          <Calendar className="h-4 w-4" />
          {formatDate(frontmatter.date)}
        </span>
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
