import { AffiliateTool } from './types';

// Centralized affiliate link registry
// Update URLs here when affiliate links change
export const affiliateTools: Record<string, AffiliateTool> = {
  hubspot: {
    name: 'HubSpot',
    url: '#',
    description: 'All-in-one marketing, sales, and service platform with powerful automation features.',
    pros: ['Free tier available', 'Comprehensive feature set', 'Excellent support'],
    cons: ['Expensive at scale', 'Learning curve'],
    pricing: 'Free - $3,600/mo',
    rating: 4.5,
    badge: 'Best Overall',
  },
  mailchimp: {
    name: 'Mailchimp',
    url: '#',
    description: 'Popular email marketing platform with built-in automation workflows.',
    pros: ['Easy to use', 'Good free plan', 'Great templates'],
    cons: ['Limited automation on free plan', 'Pricing increases quickly'],
    pricing: 'Free - $350/mo',
    rating: 4.3,
  },
  activecampaign: {
    name: 'ActiveCampaign',
    url: '#',
    description: 'Advanced email marketing and automation platform for growing businesses.',
    pros: ['Powerful automation', 'CRM included', 'Great deliverability'],
    cons: ['No free plan', 'Complex for beginners'],
    pricing: '$29 - $259/mo',
    rating: 4.6,
    badge: 'Best Automation',
  },
  zapier: {
    name: 'Zapier',
    url: '#',
    description: 'Connect your apps and automate workflows without code.',
    pros: ['5,000+ integrations', 'No-code setup', 'Reliable'],
    cons: ['Can get expensive', 'Limited on free plan'],
    pricing: 'Free - $599/mo',
    rating: 4.5,
  },
  quickbooks: {
    name: 'QuickBooks',
    url: '#',
    description: 'Leading accounting software with powerful automation features for small businesses.',
    pros: ['Industry standard', 'Great integrations', 'Mobile app'],
    cons: ['Subscription cost', 'Occasional sync issues'],
    pricing: '$30 - $200/mo',
    rating: 4.4,
    badge: 'Best for Small Business',
  },
  xero: {
    name: 'Xero',
    url: '#',
    description: 'Cloud-based accounting software with beautiful interface and automation tools.',
    pros: ['Clean interface', 'Unlimited users', 'Strong API'],
    cons: ['Limited reporting on basic plan', 'US payroll is extra'],
    pricing: '$15 - $78/mo',
    rating: 4.3,
  },
};

export function getAffiliateTool(key: string): AffiliateTool | undefined {
  return affiliateTools[key];
}

export function getAffiliateTools(keys: string[]): AffiliateTool[] {
  return keys.map((key) => affiliateTools[key]).filter(Boolean) as AffiliateTool[];
}
