import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { PostGrid } from '@/components/blog/PostGrid';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { NewsletterHero } from '@/components/email/NewsletterHero';
import { FAQAccordion } from '@/app/automation-faqs/FAQAccordion';
import { CollectionPageJsonLd, FAQJsonLd } from '@/components/seo/JsonLd';
import { getPostsByCategory } from '@/lib/content';
import { CATEGORIES, categoryLabels, Category } from '@/lib/constants';
import { categoryContent } from '@/lib/categoryContent';
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
  const description = categoryContent[category as Category].shortDescription;

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
  const content = categoryContent[category as Category];
  const url = absoluteUrl(`/${category}`);

  return (
    <>
      <CollectionPageJsonLd
        name={label}
        description={content.shortDescription}
        url={url}
        items={posts.map((p) => ({
          name: p.frontmatter.title,
          url: absoluteUrl(`/${p.category}/${p.slug}`),
          description: p.frontmatter.description,
          datePublished: p.frontmatter.date,
        }))}
      />
      {content.faqs.length > 0 && <FAQJsonLd faqs={content.faqs} />}

      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: label, href: `/${category}` }]} />
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">{label}</h1>
          <div className="prose prose-lg max-w-none mb-8">
            {content.introParagraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
            <h2>What you&apos;ll find in this section</h2>
            <ul>
              {content.topicsCovered.map((t) => (
                <li key={t}>{t}</li>
              ))}
            </ul>
          </div>
        </div>

        <section className="mt-10">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">All articles</h2>
          {posts.length > 0 ? (
            <PostGrid posts={posts} />
          ) : (
            <p className="text-muted">No articles yet. Check back soon!</p>
          )}
        </section>

        {content.faqs.length > 0 && (
          <section className="mt-16 max-w-3xl">
            <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
              Frequently asked questions
            </h2>
            <FAQAccordion faqs={content.faqs} />
          </section>
        )}
      </Container>
      <NewsletterHero />
    </>
  );
}
