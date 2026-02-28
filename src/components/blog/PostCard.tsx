import Link from 'next/link';
import Image from 'next/image';
import { Clock, Calendar } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';
import { Post } from '@/lib/types';
import { formatDate } from '@/lib/utils';
import { categoryLabels, Category } from '@/lib/constants';

interface PostCardProps {
  post: Post;
}

export function PostCard({ post }: PostCardProps) {
  const { frontmatter, slug, category, readingTime } = post;

  return (
    <Card hover>
      <Link href={`/${category}/${slug}`} className="block group">
        {frontmatter.featuredImage && (
          <div className="relative aspect-video mb-4 -mx-6 -mt-6 overflow-hidden rounded-t-xl">
            <Image
              src={frontmatter.featuredImage}
              alt={frontmatter.featuredImageAlt || frontmatter.title}
              fill
              className="object-cover transition-transform group-hover:scale-105"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
        <Badge variant="primary" className="mb-3">
          {categoryLabels[category as Category] || category}
        </Badge>
        <h3 className="font-heading font-semibold text-lg mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {frontmatter.title}
        </h3>
        <p className="text-sm text-muted mb-4 line-clamp-2">
          {frontmatter.description}
        </p>
        <div className="flex items-center gap-4 text-xs text-muted">
          <span className="flex items-center gap-1">
            <Calendar className="h-3.5 w-3.5" />
            {formatDate(frontmatter.date)}
          </span>
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" />
            {readingTime}
          </span>
        </div>
      </Link>
    </Card>
  );
}
