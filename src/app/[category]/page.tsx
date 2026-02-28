import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PostGrid } from '@/components/blog/PostGrid';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NewsletterHero } from '@/components/email/NewsletterHero';
import { getPostsByCategory } from '@/lib/content';
import { CATEGORIES, categoryLabels, categoryDescriptions, Category } from '@/lib/constants';
import { absoluteUrl } from '@/lib/utils';

interface CategoryPageProps {
  params: Promise<{ category: string }>;
}

export async function generateStaticParams() {
  return CATEGORIES.map((category) => ({ category }));
}

export async function generateMetadata({ params }: CategoryPageProps): Promise<Metadata> {
  const { category } = await params;
  if (!CATEGORIES.includes(category as Category)) return {};

  const label = categoryLabels[category as Category];
  const description = categoryDescriptions[category as Category];

  return {
    title: `${label} — Guides, Tips & Tool Reviews`,
    description,
    openGraph: {
      title: label,
      description,
      url: absoluteUrl(`/${category}`),
    },
    alternates: {
      canonical: absoluteUrl(`/${category}`),
    },
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { category } = await params;

  if (!CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const posts = getPostsByCategory(category);
  const label = categoryLabels[category as Category];
  const description = categoryDescriptions[category as Category];

  return (
    <>
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: label, href: `/${category}` }]} />
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{label}</h1>
        <p className="text-lg text-muted mb-10 max-w-2xl">{description}</p>
        {posts.length > 0 ? (
          <PostGrid posts={posts} />
        ) : (
          <p className="text-muted">No articles yet. Check back soon!</p>
        )}
      </Container>
      <NewsletterHero />
    </>
  );
}
