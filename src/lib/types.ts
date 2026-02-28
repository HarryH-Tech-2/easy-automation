export interface PostFrontmatter {
  title: string;
  description: string;
  date: string;
  updated?: string;
  category: string;
  tags: string[];
  featuredImage?: string;
  featuredImageAlt?: string;
  author?: string;
  draft?: boolean;
  faqs?: FAQ[];
  affiliateTools?: AffiliateTool[];
  tldr?: string;
}

export interface Post {
  slug: string;
  category: string;
  frontmatter: PostFrontmatter;
  content: string;
  readingTime: string;
  wordCount: number;
}

export interface FAQ {
  question: string;
  answer: string;
}

export interface AffiliateTool {
  name: string;
  url: string;
  description: string;
  pros?: string[];
  cons?: string[];
  pricing?: string;
  rating?: number;
  badge?: string;
}

export interface TOCHeading {
  id: string;
  text: string;
  level: number;
}

export interface NavItem {
  label: string;
  href: string;
  children?: NavItem[];
}

export interface SiteConfig {
  name: string;
  description: string;
  url: string;
  tagline: string;
  author: string;
  email: string;
  socials: {
    twitter?: string;
    linkedin?: string;
    youtube?: string;
  };
}
