import { Post } from '@/lib/types';
import { PostCard } from './PostCard';

interface RelatedPostsProps {
  posts: Post[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
  if (posts.length === 0) return null;

  return (
    <section className="mt-16">
      <h2 className="font-heading text-2xl font-bold mb-6">Related Articles</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {posts.map((post) => (
          <PostCard key={`${post.category}/${post.slug}`} post={post} />
        ))}
      </div>
    </section>
  );
}
