import { notFound } from 'next/navigation';
import Link from 'next/link';
import type { Metadata } from 'next';
import { Linkedin, Globe, MapPin, GraduationCap } from 'lucide-react';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { PostGrid } from '@/components/blog/PostGrid';
import { PersonJsonLd } from '@/components/seo/JsonLd';
import { authors, getAllAuthors } from '@/lib/authors';
import { getAllPosts } from '@/lib/content';
import { absoluteUrl } from '@/lib/utils';

interface AuthorPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return getAllAuthors().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({ params }: AuthorPageProps): Promise<Metadata> {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) return {};

  return {
    title: `${author.name} — ${author.title}`,
    description: author.bio,
    alternates: { canonical: absoluteUrl(`/authors/${author.slug}`) },
    openGraph: {
      type: 'profile',
      title: `${author.name} — ${author.title}`,
      description: author.bio,
      url: absoluteUrl(`/authors/${author.slug}`),
      images: author.image ? [author.image] : ['/images/og-default.png'],
    },
  };
}

export default async function AuthorPage({ params }: AuthorPageProps) {
  const { slug } = await params;
  const author = authors[slug];
  if (!author) notFound();

  const posts = getAllPosts().filter(
    (p) => (p.frontmatter.author || '').toLowerCase() === author.name.toLowerCase()
  );

  return (
    <>
      <PersonJsonLd author={author} />
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: author.name, href: `/authors/${author.slug}` }]} />

        <div className="max-w-4xl">
          <div className="flex flex-col sm:flex-row gap-6 items-start mb-10">
            <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full bg-primary-light flex items-center justify-center shrink-0">
              <span className="text-3xl font-bold text-primary font-heading">{author.initials}</span>
            </div>
            <div>
              <h1 className="font-heading text-3xl md:text-4xl font-bold mb-2">{author.name}</h1>
              <p className="text-lg text-primary font-medium mb-3">{author.title}</p>
              <div className="flex flex-wrap gap-4 text-sm text-muted">
                {author.location && (
                  <span className="inline-flex items-center gap-1.5">
                    <MapPin className="h-4 w-4" />
                    {author.location}
                  </span>
                )}
                {author.education && (
                  <span className="inline-flex items-center gap-1.5">
                    <GraduationCap className="h-4 w-4" />
                    {author.education}
                  </span>
                )}
              </div>
              <div className="flex flex-wrap gap-3 mt-4">
                {author.linkedin && (
                  <a
                    href={author.linkedin}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <Linkedin className="h-4 w-4" />
                    LinkedIn
                  </a>
                )}
                {author.portfolio && (
                  <a
                    href={author.portfolio}
                    target="_blank"
                    rel="noopener noreferrer me"
                    className="inline-flex items-center gap-1.5 text-sm font-medium text-primary hover:underline"
                  >
                    <Globe className="h-4 w-4" />
                    Portfolio
                  </a>
                )}
              </div>
            </div>
          </div>

          <div className="prose prose-lg max-w-none mb-12">
            <h2>About {author.name.split(' ')[0]}</h2>
            <p>{author.longBio || author.bio}</p>
            {author.expertise && author.expertise.length > 0 && (
              <>
                <h2>Areas of Expertise</h2>
                <ul>
                  {author.expertise.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </>
            )}
          </div>

          {posts.length > 0 && (
            <section className="mt-16">
              <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">
                Articles by {author.name.split(' ')[0]}
              </h2>
              <PostGrid posts={posts} />
            </section>
          )}

          <div className="mt-12 text-sm text-muted">
            <Link href="/contact-us" className="text-primary hover:underline">
              Get in touch with {author.name.split(' ')[0]} →
            </Link>
          </div>
        </div>
      </Container>
    </>
  );
}
