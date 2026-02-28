import type { MetadataRoute } from 'next';
import { getAllPosts, getAllTags, getPostsByCategory } from '@/lib/content';
import { CATEGORIES } from '@/lib/constants';

const BASE_URL = 'https://easyautomation.io';

export default function sitemap(): MetadataRoute.Sitemap {
  const posts = getAllPosts();
  const tags = getAllTags();

  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: '2025-06-01', changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/about-us`, lastModified: '2025-05-01', changeFrequency: 'monthly', priority: 0.7 },
    { url: `${BASE_URL}/contact-us`, lastModified: '2025-05-01', changeFrequency: 'monthly', priority: 0.6 },
    { url: `${BASE_URL}/automation-faqs`, lastModified: '2025-06-01', changeFrequency: 'monthly', priority: 0.8 },
    { url: `${BASE_URL}/privacy-policy`, lastModified: '2025-05-01', changeFrequency: 'yearly', priority: 0.3 },
    { url: `${BASE_URL}/do-not-sell-personal-information`, lastModified: '2025-05-01', changeFrequency: 'yearly', priority: 0.3 },
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

  const tagPages: MetadataRoute.Sitemap = tags.map((tag) => ({
    url: `${BASE_URL}/tag/${tag.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: '2025-06-01',
    changeFrequency: 'weekly' as const,
    priority: 0.5,
  }));

  return [...staticPages, ...categoryPages, ...postPages, ...tagPages];
}
