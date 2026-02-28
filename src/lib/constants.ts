import { SiteConfig, NavItem } from './types';

export const siteConfig: SiteConfig = {
  name: 'Easy Automation',
  description: 'Master marketing and finance automation with expert guides, honest tool comparisons, and step-by-step workflows. Save 20+ hours a week and scale your business on autopilot.',
  url: 'https://easyautomation.io',
  tagline: 'The future will be automated, make it easy',
  author: 'Easy Automation',
  email: 'contact@easyautomation.io',
  socials: {},
};

export const navItems: NavItem[] = [
  {
    label: 'Marketing Automation',
    href: '/marketing-automation',
    children: [
      { label: 'All Articles', href: '/marketing-automation' },
      { label: 'What Is Marketing Automation?', href: '/marketing-automation/what-is-marketing-automation' },
      { label: 'Best Email Marketing Tools', href: '/marketing-automation/best-email-marketing-automation-tools' },
      { label: 'Automation for Small Business', href: '/marketing-automation/marketing-automation-for-small-business' },
      { label: 'AI-Powered Automation', href: '/marketing-automation/ai-powered-marketing-automation' },
      { label: 'E-commerce Automation', href: '/marketing-automation/ecommerce-marketing-automation' },
    ],
  },
  {
    label: 'Finance Automation',
    href: '/finance-automation',
    children: [
      { label: 'All Articles', href: '/finance-automation' },
      { label: 'Accounts Payable Automation', href: '/finance-automation/accounts-payable-automation' },
      { label: 'Automated Expense Tracking', href: '/finance-automation/automated-expense-tracking' },
      { label: 'Automated Invoicing Guide', href: '/finance-automation/automated-invoicing-guide' },
      { label: 'Payroll Automation Software', href: '/finance-automation/payroll-automation-software' },
      { label: 'Financial Reporting Automation', href: '/finance-automation/financial-reporting-automation' },
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
