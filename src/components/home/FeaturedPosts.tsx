import { Container } from '@/components/ui/Container';
import { Section } from '@/components/ui/Section';
import { PostGrid } from '@/components/blog/PostGrid';
import { Post } from '@/lib/types';
import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

interface FeaturedPostsProps {
  posts: Post[];
}

export function FeaturedPosts({ posts }: FeaturedPostsProps) {
  return (
    <Section>
      <Container>
        <div className="flex items-end justify-between mb-8">
          <div>
            <h2 className="font-heading text-3xl font-bold">Latest Articles</h2>
            <p className="text-muted mt-2">Practical guides to automate your workflows</p>
          </div>
          <Link
            href="/marketing-automation"
            className="hidden sm:inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
          >
            View all <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <PostGrid posts={posts.slice(0, 6)} />
      </Container>
    </Section>
  );
}
