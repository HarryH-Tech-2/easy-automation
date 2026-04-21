import { notFound } from 'next/navigation';
import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PostHeader } from '@/components/blog/PostHeader';
import { TLDR } from '@/components/blog/TLDR';
import { TableOfContents } from '@/components/blog/TableOfContents';
import { ReadingProgress } from '@/components/blog/ReadingProgress';
import { ShareButtons } from '@/components/blog/ShareButtons';
import { TagList } from '@/components/blog/TagList';
import { AuthorBio } from '@/components/blog/AuthorBio';
import { RelatedPosts } from '@/components/blog/RelatedPosts';
import { AffiliateDisclosure } from '@/components/monetization/AffiliateDisclosure';
import { NewsletterInline } from '@/components/email/NewsletterInline';
import { FAQAccordion } from '@/app/automation-faqs/FAQAccordion';
import { ArticleJsonLd, FAQJsonLd, HowToJsonLd } from '@/components/seo/JsonLd';
import { compileMdxContent } from '@/lib/mdx';
import { getPostBySlug, getAllPosts, getRelatedPosts } from '@/lib/content';
import { extractHeadings } from '@/lib/toc';
import { CATEGORIES, categoryLabels, Category } from '@/lib/constants';
import { getAuthor, getAllAuthors } from '@/lib/authors';
import { absoluteUrl } from '@/lib/utils';

function resolveAuthor(frontmatterAuthor?: string) {
  if (!frontmatterAuthor) return getAuthor();
  const byName = getAllAuthors().find(
    (a) => a.name.toLowerCase() === frontmatterAuthor.toLowerCase()
  );
  if (byName) return byName;
  const bySlug = getAuthor(frontmatterAuthor.toLowerCase().replace(/\s+/g, '-'));
  return bySlug;
}

interface PostPageProps {
  params: Promise<{ category: string; slug: string }>;
}

export async function generateStaticParams() {
  const posts = getAllPosts();
  return posts.map((post) => ({
    category: post.category,
    slug: post.slug,
  }));
}

export async function generateMetadata({ params }: PostPageProps): Promise<Metadata> {
  const { category, slug } = await params;
  const post = getPostBySlug(category, slug);
  if (!post) return {};

  const { frontmatter } = post;
  const url = absoluteUrl(`/${category}/${slug}`);

  return {
    title: frontmatter.title,
    description: frontmatter.description,
    openGraph: {
      type: 'article',
      title: frontmatter.title,
      description: frontmatter.description,
      url,
      publishedTime: frontmatter.date,
      modifiedTime: frontmatter.updated || frontmatter.date,
      images: frontmatter.featuredImage ? [frontmatter.featuredImage] : [],
      tags: frontmatter.tags,
    },
    twitter: {
      card: 'summary_large_image',
      title: frontmatter.title,
      description: frontmatter.description,
      images: frontmatter.featuredImage
        ? [{ url: frontmatter.featuredImage, alt: frontmatter.featuredImageAlt || frontmatter.title }]
        : ['/images/og-default.png'],
    },
    alternates: {
      canonical: url,
    },
  };
}

export default async function PostPage({ params }: PostPageProps) {
  const { category, slug } = await params;

  if (!CATEGORIES.includes(category as Category)) {
    notFound();
  }

  const post = getPostBySlug(category, slug);
  if (!post) {
    notFound();
  }

  const { frontmatter, content, readingTime, wordCount } = post;
  const mdxContent = await compileMdxContent(content);
  const headings = extractHeadings(content);
  const related = getRelatedPosts(post, 3);
  const url = absoluteUrl(`/${category}/${slug}`);
  const hasAffiliateLinks = frontmatter.affiliateTools && frontmatter.affiliateTools.length > 0;
  const author = resolveAuthor(frontmatter.author);
  const imageUrl = frontmatter.featuredImage ? absoluteUrl(frontmatter.featuredImage) : undefined;
  const hasSummary =
    !!frontmatter.tldr || (!!frontmatter.keyTakeaways && frontmatter.keyTakeaways.length > 0);

  return (
    <>
      <ReadingProgress />
      <ArticleJsonLd
        title={frontmatter.title}
        description={frontmatter.description}
        url={url}
        datePublished={frontmatter.date}
        dateModified={frontmatter.updated}
        image={imageUrl}
        author={author}
        wordCount={wordCount}
        articleSection={categoryLabels[category as Category]}
        speakable={hasSummary}
      />
      {frontmatter.faqs && frontmatter.faqs.length > 0 && (
        <FAQJsonLd faqs={frontmatter.faqs} />
      )}
      {frontmatter.howToSteps && frontmatter.howToSteps.length > 0 && (
        <HowToJsonLd
          name={frontmatter.title}
          description={frontmatter.description}
          steps={frontmatter.howToSteps}
        />
      )}

      <Container className="py-8 md:py-12">
        <Breadcrumbs
          items={[
            { name: categoryLabels[category as Category], href: `/${category}` },
            { name: frontmatter.title, href: `/${category}/${slug}` },
          ]}
        />

        <div className="lg:grid lg:grid-cols-[1fr_280px] lg:gap-12">
          {/* Main content */}
          <article>
            <PostHeader
              frontmatter={frontmatter}
              category={category}
              readingTime={readingTime}
              author={author}
            />

            {hasAffiliateLinks && <AffiliateDisclosure />}

            <TLDR tldr={frontmatter.tldr} keyTakeaways={frontmatter.keyTakeaways} />

            <div className="prose prose-lg max-w-none">
              {mdxContent}
            </div>

            {frontmatter.faqs && frontmatter.faqs.length > 0 && (
              <section className="mt-12 pt-8 border-t border-border">
                <h2 className="font-heading text-2xl md:text-3xl font-bold mb-6">
                  Frequently asked questions
                </h2>
                <FAQAccordion faqs={frontmatter.faqs} />
              </section>
            )}

            <div className="mt-8 pt-8 border-t border-border">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                <TagList tags={frontmatter.tags} />
                <ShareButtons url={url} title={frontmatter.title} />
              </div>
              <AuthorBio author={author} />
            </div>
          </article>

          {/* Sidebar */}
          <aside className="hidden lg:block">
            <div className="sticky top-24 space-y-8">
              <TableOfContents headings={headings} />
              <NewsletterInline />
            </div>
          </aside>
        </div>

        <RelatedPosts posts={related} />
      </Container>
    </>
  );
}
