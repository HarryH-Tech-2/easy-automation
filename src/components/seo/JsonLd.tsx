interface JsonLdProps {
  data: Record<string, unknown>;
}

export function JsonLd({ data }: JsonLdProps) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

import { siteConfig } from '@/lib/constants';
import type { Author } from '@/lib/authors';

export function OrganizationJsonLd() {
  const sameAs = Object.values(siteConfig.socials).filter(
    (u): u is string => typeof u === 'string' && u.length > 0
  );
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'Easy Automation',
    url: 'https://easyautomation.io',
    logo: 'https://easyautomation.io/images/logo.png',
    description: 'Learn how to automate your marketing and finance workflows.',
  };
  if (sameAs.length > 0) data.sameAs = sameAs;
  return <JsonLd data={data} />;
}

export function WebSiteJsonLd() {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'WebSite',
        name: 'Easy Automation',
        url: 'https://easyautomation.io',
        description: 'The future will be automated, make it easy',
        potentialAction: {
          '@type': 'SearchAction',
          target: {
            '@type': 'EntryPoint',
            urlTemplate: 'https://easyautomation.io/search?q={search_term_string}',
          },
          'query-input': 'required name=search_term_string',
        },
      }}
    />
  );
}

export function ArticleJsonLd({
  title,
  description,
  url,
  datePublished,
  dateModified,
  image,
  author,
  wordCount,
  articleSection,
  speakable,
}: {
  title: string;
  description: string;
  url: string;
  datePublished: string;
  dateModified?: string;
  image?: string;
  author: Author;
  wordCount?: number;
  articleSection?: string;
  /** When true, flags the TL;DR + key-takeaways block for Google voice/Assistant. */
  speakable?: boolean;
}) {
  const authorSameAs = [author.linkedin, author.portfolio].filter(
    (u): u is string => typeof u === 'string' && u.length > 0
  );
  const authorEntity: Record<string, unknown> = {
    '@type': 'Person',
    name: author.name,
    url: `https://easyautomation.io/authors/${author.slug}`,
    jobTitle: author.title,
  };
  if (authorSameAs.length > 0) authorEntity.sameAs = authorSameAs;
  if (author.image) authorEntity.image = author.image;

  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'BlogPosting',
    headline: title,
    description,
    url,
    mainEntityOfPage: { '@type': 'WebPage', '@id': url },
    datePublished,
    dateModified: dateModified || datePublished,
    image: image || 'https://easyautomation.io/images/og-default.png',
    inLanguage: 'en-US',
    author: authorEntity,
    publisher: {
      '@type': 'Organization',
      name: 'Easy Automation',
      url: 'https://easyautomation.io',
      logo: {
        '@type': 'ImageObject',
        url: 'https://easyautomation.io/images/logo.png',
      },
    },
  };
  if (wordCount) data.wordCount = wordCount;
  if (articleSection) data.articleSection = articleSection;
  if (speakable) {
    data.speakable = {
      '@type': 'SpeakableSpecification',
      cssSelector: ['.tldr-block', '.key-takeaways'],
    };
  }

  return <JsonLd data={data} />;
}

export function PersonJsonLd({ author }: { author: Author }) {
  const sameAs = [author.linkedin, author.portfolio].filter(
    (u): u is string => typeof u === 'string' && u.length > 0
  );
  const data: Record<string, unknown> = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: author.name,
    url: `https://easyautomation.io/authors/${author.slug}`,
    jobTitle: author.title,
    description: author.bio,
    worksFor: {
      '@type': 'Organization',
      name: 'Easy Automation',
      url: 'https://easyautomation.io',
    },
  };
  if (sameAs.length > 0) data.sameAs = sameAs;
  if (author.image) data.image = author.image;
  if (author.location) {
    data.address = { '@type': 'PostalAddress', addressLocality: author.location };
  }
  return <JsonLd data={data} />;
}

export function FAQJsonLd({ faqs }: { faqs: { question: string; answer: string }[] }) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        // Flags the FAQ accordion (which renders all Q/A content) as
        // speakable for Google Assistant / voice-search read-aloud.
        speakable: {
          '@type': 'SpeakableSpecification',
          cssSelector: ['.faq-accordion'],
        },
        mainEntity: faqs.map((faq) => ({
          '@type': 'Question',
          name: faq.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: faq.answer,
          },
        })),
      }}
    />
  );
}

export function HowToJsonLd({
  name,
  description,
  steps,
}: {
  name: string;
  description: string;
  steps: { name: string; text: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'HowTo',
        name,
        description,
        step: steps.map((step, index) => ({
          '@type': 'HowToStep',
          position: index + 1,
          name: step.name,
          text: step.text,
        })),
      }}
    />
  );
}

export function CollectionPageJsonLd({
  name,
  description,
  url,
  items,
}: {
  name: string;
  description: string;
  url: string;
  items: { name: string; url: string; description?: string; datePublished?: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'CollectionPage',
        name,
        description,
        url,
        inLanguage: 'en-US',
        isPartOf: { '@type': 'WebSite', url: 'https://easyautomation.io' },
        mainEntity: {
          '@type': 'ItemList',
          numberOfItems: items.length,
          itemListElement: items.map((item, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            url: item.url,
            name: item.name,
            ...(item.description ? { description: item.description } : {}),
            ...(item.datePublished ? { datePublished: item.datePublished } : {}),
          })),
        },
      }}
    />
  );
}

export function BreadcrumbJsonLd({
  items,
}: {
  items: { name: string; href: string }[];
}) {
  return (
    <JsonLd
      data={{
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: items.map((item, index) => ({
          '@type': 'ListItem',
          position: index + 1,
          name: item.name,
          item: `https://easyautomation.io${item.href}`,
        })),
      }}
    />
  );
}
