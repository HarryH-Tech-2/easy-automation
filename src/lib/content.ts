import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import { Post, PostFrontmatter } from './types';
import { CATEGORIES } from './constants';

const postsDirectory = path.join(process.cwd(), 'content', 'posts');

export function getPostBySlug(category: string, slug: string): Post | null {
  try {
    const filePath = path.join(postsDirectory, category, `${slug}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    const stats = readingTime(content);

    return {
      slug,
      category,
      frontmatter: data as PostFrontmatter,
      content,
      readingTime: stats.text,
      wordCount: stats.words,
    };
  } catch {
    return null;
  }
}

export function getAllPosts(): Post[] {
  const posts: Post[] = [];

  for (const category of CATEGORIES) {
    const categoryDir = path.join(postsDirectory, category);
    if (!fs.existsSync(categoryDir)) continue;

    const files = fs.readdirSync(categoryDir).filter((f) => f.endsWith('.mdx'));

    for (const file of files) {
      const slug = file.replace(/\.mdx$/, '');
      const post = getPostBySlug(category, slug);
      if (post && !post.frontmatter.draft) {
        posts.push(post);
      }
    }
  }

  return posts.sort(
    (a, b) =>
      new Date(b.frontmatter.date).getTime() -
      new Date(a.frontmatter.date).getTime()
  );
}

export function getPostsByCategory(category: string): Post[] {
  return getAllPosts().filter((post) => post.category === category);
}

export function getPostsByTag(tag: string): Post[] {
  return getAllPosts().filter((post) =>
    post.frontmatter.tags.map((t) => t.toLowerCase().replace(/\s+/g, '-')).includes(tag.toLowerCase())
  );
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  for (const post of getAllPosts()) {
    for (const tag of post.frontmatter.tags) {
      tags.add(tag);
    }
  }
  return Array.from(tags).sort();
}

export function getAllCategories(): string[] {
  return [...CATEGORIES];
}

export function getRelatedPosts(currentPost: Post, limit = 3): Post[] {
  const allPosts = getAllPosts().filter(
    (p) => !(p.slug === currentPost.slug && p.category === currentPost.category)
  );

  // Score by shared tags, same category bonus
  const scored = allPosts.map((post) => {
    let score = 0;
    if (post.category === currentPost.category) score += 2;
    for (const tag of post.frontmatter.tags) {
      if (currentPost.frontmatter.tags.includes(tag)) score += 1;
    }
    return { post, score };
  });

  scored.sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
}

export function getPageContent(pageName: string): { frontmatter: Record<string, unknown>; content: string } | null {
  try {
    const filePath = path.join(process.cwd(), 'content', 'pages', `${pageName}.mdx`);
    const fileContents = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContents);
    return { frontmatter: data, content };
  } catch {
    return null;
  }
}
