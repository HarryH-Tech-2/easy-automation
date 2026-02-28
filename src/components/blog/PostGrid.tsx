import { Post } from '@/lib/types';
import { PostCard } from './PostCard';

interface PostGridProps {
  posts: Post[];
  columns?: 2 | 3;
}

export function PostGrid({ posts, columns = 3 }: PostGridProps) {
  return (
    <div
      className={
        columns === 3
          ? 'grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'
          : 'grid grid-cols-1 md:grid-cols-2 gap-6'
      }
    >
      {posts.map((post) => (
        <PostCard key={`${post.category}/${post.slug}`} post={post} />
      ))}
    </div>
  );
}
