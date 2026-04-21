import fs from 'fs';
import path from 'path';
import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, getPostsByCategory, getPostsByTag } from '@/lib/content';
import { CATEGORIES } from '@/lib/constants';
import { getAllAuthors } from '@/lib/authors';
import { TAG_INDEX_THRESHOLD } from './tag/[slug]/page';

const BASE_URL = 'https://easyautomation.io';

// Return the source-file mtime as an ISO date string, falling back to build time.
function mtimeOf(relativePath: string): string {
  try {
    const abs = path.join(process.cwd(), relativePath);
    return fs.statSync(abs).mtime.toISOString();
  } catch {
    return new Date().toISOString();
  }
}

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  // Freshest date across all posts — homepage reflects this.
  const latestPostDate = posts.length
    ? posts.reduce(
        (max, p) => {
          const d = p.frontmatter.updated || p.frontmatter.date;
          return d > max ? d : max;
        },
        posts[0].frontmatter.updated || posts[0].frontmatter.date
      )
    : new Date().toISOString();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: latestPostDate, changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about-us`, lastModified: mtimeOf('src/app/about-us/page.tsx'), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact-us`, lastModified: mtimeOf('src/app/contact-us/page.tsx'), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/automation-faqs`, lastModified: mtimeOf('src/app/automation-faqs/page.tsx'), changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: mtimeOf('src/app/privacy-policy/page.tsx'), changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/do-not-sell-personal-information`, lastModified: mtimeOf('src/app/do-not-sell-personal-information/page.tsx'), changeFrequency: 'yearly', priority: 0.3 },
  ];

  const categoryPages: MetadataRoute.Sitemap = CATEGORIES.map((category) => {
    const categoryPosts = getPostsByCategory(category);
    const latestDate = categoryPosts.length > 0
      ? categoryPosts[0].frontmatter.updated || categoryPosts[0].frontmatter.date
      : '2025-05-01';
    return {
      url: `${BASE_URL}/${category}`,
      lastModified: latestDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
  });

  const postPages: MetadataRoute.Sitemap = posts.map((post) => {
    const entry: MetadataRoute.Sitemap[number] = {
      url: `${BASE_URL}/${post.category}/${post.slug}`,
      lastModified: post.frontmatter.updated || post.frontmatter.date,
      changeFrequency: 'monthly' as const,
      priority: 0.9,
    };
    if (post.frontmatter.featuredImage) {
      (entry as Record<string, unknown>).images = [`${BASE_URL}${post.frontmatter.featuredImage}`];
    }
    return entry;
  });

  // Only include tags that are actually indexable:
  //   - Must have >= TAG_INDEX_THRESHOLD posts (avoids thin content)
  //   - Must not collide with a category slug (avoids duplicate hubs)
  const tagPages: MetadataRoute.Sitemap = tags
    .map((tag) => {
      const slug = tag.toLowerCase().replace(/\s+/g, '-');
      const tagPosts = getPostsByTag(slug);
      return { tag, slug, tagPosts };
    })
    .filter(
      ({ slug, tagPosts }) =>
        tagPosts.length >= TAG_INDEX_THRESHOLD &&
        !(CATEGORIES as readonly string[]).includes(slug)
    )
    .map(({ slug, tagPosts }) => {
      const latest = tagPosts.reduce((max, p) => {
        const d = p.frontmatter.updated || p.frontmatter.date;
        return d > max ? d : max;
      }, tagPosts[0].frontmatter.updated || tagPosts[0].frontmatter.date);
      return {
        url: `${BASE_URL}/tag/${slug}`,
        lastModified: latest,
        changeFrequency: 'weekly' as const,
        priority: 0.4,
      };
    });

  const authorPages: MetadataRoute.Sitemap = getAllAuthors().map((author) => ({
    url: `${BASE_URL}/authors/${author.slug}`,
    lastModified: mtimeOf('src/lib/authors.ts'),
    changeFrequency: 'monthly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...postPages, ...tagPages, ...authorPages];
}
