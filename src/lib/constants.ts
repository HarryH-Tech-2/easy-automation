import { SiteConfig, NavItem } from './types';

export const siteConfig: SiteConfig = {
  name: 'Easy Automation',
  description: 'Learn how to automate your marketing and finance workflows. Practical guides, tool comparisons, and expert tips to save time and scale your business.',
  url: 'https://easyautomation.io',
  tagline: 'The future will be automated, make it easy',
  author: 'Easy Automation',
  email: 'contact@easyautomation.io',
  socials: {},
};

export const navItems: NavItem[] = [
  { label: 'Home', href: '/' },
  {
    label: 'Marketing Automation',
    href: '/marketing-automation',
    children: [
      { label: 'All Articles', href: '/marketing-automation' },
    ],
  },
  {
    label: 'Finance Automation',
    href: '/finance-automation',
    children: [
      { label: 'All Articles', href: '/finance-automation' },
    ],
  },
  { label: 'FAQs', href: '/automation-faqs' },
  { label: 'About', href: '/about-us' },
  { label: 'Contact', href: '/contact-us' },
];

export const CATEGORIES = ['marketing-automation', 'finance-automation'] as const;
export type Category = (typeof CATEGORIES)[number];

export const categoryLabels: Record<Category, string> = {
  'marketing-automation': 'Marketing Automation',
  'finance-automation': 'Finance Automation',
};

export const categoryDescriptions: Record<Category, string> = {
  'marketing-automation': 'Learn how to automate your marketing workflows with practical guides and tool comparisons.',
  'finance-automation': 'Discover how to streamline your financial processes with automation tools and strategies.',
};
