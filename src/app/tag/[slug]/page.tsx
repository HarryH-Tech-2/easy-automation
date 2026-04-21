import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PostGrid } from '@/components/blog/PostGrid';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getPostsByTag, getAllTags } from '@/lib/content';
import { CATEGORIES, Category } from '@/lib/constants';
import { absoluteUrl } from '@/lib/utils';

// Threshold below which a tag page is too thin to be worth indexing.
// Matches sitemap.ts — keep in sync.
export const TAG_INDEX_THRESHOLD = 3;

interface TagPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const tags = getAllTags();
  return tags.map((tag) => ({
    slug: tag.toLowerCase().replace(/\s+/g, '-'),
  }));
}

// A tag that collides with an existing category slug duplicates the category
// page — canonicalize it to the category and noindex.
function matchingCategory(slug: string): Category | null {
  return (CATEGORIES as readonly string[]).includes(slug) ? (slug as Category) : null;
}

export async function generateMetadata({ params }: TagPageProps): Promise<Metadata> {
  const { slug } = await params;
  const displayName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  const posts = getPostsByTag(slug);
  const postTitles = posts.slice(0, 3).map((p) => p.frontmatter.title).join(', ');

  const categoryMatch = matchingCategory(slug);
  const shouldIndex = !categoryMatch && posts.length >= TAG_INDEX_THRESHOLD;
  const canonical = categoryMatch
    ? absoluteUrl(`/${categoryMatch}`)
    : absoluteUrl(`/tag/${slug}`);

  return {
    title: `${displayName} — Articles & Guides`,
    description: `Explore ${posts.length} expert guide${posts.length !== 1 ? 's' : ''} about ${displayName.toLowerCase()}: ${postTitles}${posts.length > 3 ? ', and more' : ''}.`,
    alternates: { canonical },
    robots: {
      index: shouldIndex,
      follow: true,
    },
  };
}

export default async function TagPage({ params }: TagPageProps) {
  const { slug } = await params;
  const posts = getPostsByTag(slug);

  if (posts.length === 0) {
    notFound();
  }

  const displayName = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ name: `Tag: ${displayName}`, href: `/tag/${slug}` }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
        Articles tagged &ldquo;{displayName}&rdquo;
      </h1>
      <p className="text-muted mb-10">{posts.length} article{posts.length !== 1 ? 's' : ''} found</p>
      <PostGrid posts={posts} />
    </Container>
  );
}
