import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PostGrid } from '@/components/blog/PostGrid';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { getAllPosts } from '@/lib/content';
import { Post } from '@/lib/types';
import { absoluteUrl } from '@/lib/utils';
import { SearchForm } from './SearchForm';

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

export async function generateMetadata({ searchParams }: SearchPageProps): Promise<Metadata> {
  const { q } = await searchParams;
  const query = q?.trim() ?? '';
  const title = query ? `Search results for "${query}"` : 'Search';
  return {
    title,
    description: query
      ? `Articles matching "${query}" on Easy Automation.`
      : 'Search marketing and finance automation guides on Easy Automation.',
    alternates: { canonical: absoluteUrl('/search') },
    // Search result pages should not compete with canonical hubs in the index.
    robots: { index: false, follow: true },
  };
}

function scorePost(post: Post, terms: string[]): number {
  const haystacks = [
    { text: post.frontmatter.title.toLowerCase(), weight: 5 },
    { text: post.frontmatter.description.toLowerCase(), weight: 3 },
    { text: post.frontmatter.tags.join(' ').toLowerCase(), weight: 2 },
    { text: post.content.toLowerCase(), weight: 1 },
  ];
  let score = 0;
  for (const term of terms) {
    for (const { text, weight } of haystacks) {
      if (text.includes(term)) score += weight;
    }
  }
  return score;
}

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const { q } = await searchParams;
  const query = (q ?? '').trim();
  const terms = query.toLowerCase().split(/\s+/).filter(Boolean);

  const results: Post[] = terms.length
    ? getAllPosts()
        .map((post) => ({ post, score: scorePost(post, terms) }))
        .filter(({ score }) => score > 0)
        .sort((a, b) => b.score - a.score)
        .map(({ post }) => post)
    : [];

  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Search', href: '/search' }]} />
      <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Search</h1>
      <p className="text-muted mb-8">
        Find marketing and finance automation guides, comparisons, and tutorials.
      </p>

      <SearchForm defaultValue={query} />

      {query ? (
        <>
          <p className="text-muted mb-8">
            {results.length} result{results.length === 1 ? '' : 's'} for{' '}
            <span className="font-semibold text-foreground">&ldquo;{query}&rdquo;</span>
          </p>
          {results.length > 0 ? (
            <PostGrid posts={results} />
          ) : (
            <div className="rounded-xl border border-border p-8 text-center">
              <p className="text-muted">
                No articles matched your search. Try broader terms like &ldquo;email&rdquo;,
                &ldquo;invoicing&rdquo;, or &ldquo;lead scoring&rdquo;.
              </p>
            </div>
          )}
        </>
      ) : (
        <p className="text-muted">Enter a term above to search across all articles.</p>
      )}
    </Container>
  );
}
