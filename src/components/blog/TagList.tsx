import Link from 'next/link';
import { Badge } from '@/components/ui/Badge';

interface TagListProps {
  tags: string[];
}

export function TagList({ tags }: TagListProps) {
  return (
    <div className="flex flex-wrap gap-2">
      {tags.map((tag) => (
        <Link
          key={tag}
          href={`/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`}
        >
          <Badge variant="outline" className="hover:border-primary hover:text-primary transition-colors cursor-pointer">
            {tag}
          </Badge>
        </Link>
      ))}
    </div>
  );
}
