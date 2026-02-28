import { getAllPosts } from '@/lib/content';
import { siteConfig } from '@/lib/constants';

export const dynamic = 'force-static';

export async function GET() {
  const posts = getAllPosts();
  const baseUrl = siteConfig.url;

  const items = posts
    .map((post) => {
      const url = `${baseUrl}/${post.category}/${post.slug}`;
      const pubDate = new Date(post.frontmatter.date).toUTCString();
      const image = post.frontmatter.featuredImage
        ? `<enclosure url="${baseUrl}${post.frontmatter.featuredImage}" type="image/webp" length="0" />`
        : '';

      return `    <item>
      <title><![CDATA[${post.frontmatter.title}]]></title>
      <link>${url}</link>
      <guid isPermaLink="true">${url}</guid>
      <description><![CDATA[${post.frontmatter.description}]]></description>
      <pubDate>${pubDate}</pubDate>
      <category>${post.category.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}</category>
      ${image}
    </item>`;
    })
    .join('\n');

  const feed = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Easy Automation</title>
    <link>${baseUrl}</link>
    <description>${siteConfig.description}</description>
    <language>en-us</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>`;

  return new Response(feed, {
    headers: {
      'Content-Type': 'application/xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
