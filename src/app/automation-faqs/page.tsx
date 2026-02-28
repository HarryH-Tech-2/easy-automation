import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { FAQJsonLd } from '@/components/seo/JsonLd';
import { absoluteUrl } from '@/lib/utils';
import { FAQAccordion } from './FAQAccordion';

const faqs = [
  {
    question: 'What is automation and why does it matter for businesses?',
    answer: 'Automation is the use of technology to perform tasks with minimal human intervention. It matters for businesses because it saves time, reduces errors, cuts costs, and allows teams to focus on high-value strategic work instead of repetitive tasks.',
  },
  {
    question: 'What is marketing automation?',
    answer: 'Marketing automation uses software to automate repetitive marketing tasks such as email campaigns, social media posting, lead nurturing, and customer segmentation. Popular tools include HubSpot, Mailchimp, and ActiveCampaign.',
  },
  {
    question: 'What is finance automation?',
    answer: 'Finance automation uses technology to streamline financial processes like invoice processing, expense tracking, payroll, accounts payable/receivable, and financial reporting. Tools like QuickBooks, Xero, and specialized RPA software help automate these workflows.',
  },
  {
    question: 'How much does marketing automation software cost?',
    answer: 'Marketing automation software ranges from free (limited features) to several thousand dollars per month. Entry-level tools like Mailchimp offer free plans, mid-range options like ActiveCampaign start around $29/month, and enterprise solutions like HubSpot can cost $800-$3,600+ per month.',
  },
  {
    question: 'What is the best marketing automation tool for small businesses?',
    answer: 'For small businesses, we recommend starting with tools that offer good free tiers and easy setup. Mailchimp is great for email marketing, HubSpot offers a comprehensive free CRM with basic automation, and Zapier helps connect different tools together without code.',
  },
  {
    question: 'How do I get started with automation?',
    answer: 'Start by identifying your most time-consuming repetitive tasks. Then, research tools that address those specific needs. Begin with one automation at a time, test it thoroughly, and gradually expand. Our guides walk you through this process step by step for both marketing and finance automation.',
  },
  {
    question: 'What is the difference between automation and AI?',
    answer: 'Automation follows predefined rules to complete tasks (if X happens, do Y). AI can learn from data, make decisions, and handle more complex scenarios without explicit programming. Many modern automation tools now incorporate AI to make automations smarter and more adaptive.',
  },
  {
    question: 'Can automation replace human workers?',
    answer: 'Automation is best used to augment human capabilities, not replace them entirely. It handles repetitive, rule-based tasks so humans can focus on creative, strategic, and relationship-building work. The most successful businesses use automation to empower their teams, not eliminate them.',
  },
  {
    question: 'What is Zapier and how does it work?',
    answer: 'Zapier is a no-code automation platform that connects over 5,000 apps together. It works by creating "Zaps" — automated workflows triggered by events in one app that cause actions in another. For example, when you receive a new email (trigger), automatically save the attachment to Google Drive (action).',
  },
  {
    question: 'How do I measure the ROI of automation?',
    answer: 'Measure automation ROI by tracking: time saved (hours per week/month), error reduction rates, cost savings (labor, resources), revenue impact (faster response times, more leads processed), and employee satisfaction improvements. Most businesses see positive ROI within 3-6 months of implementing automation.',
  },
];

export const metadata: Metadata = {
  title: 'Automation FAQs — Common Questions Answered',
  description: 'Get answers to frequently asked questions about marketing automation, finance automation, tools, costs, and getting started with business automation.',
  alternates: { canonical: absoluteUrl('/automation-faqs') },
};

export default function FAQPage() {
  return (
    <>
      <FAQJsonLd faqs={faqs} />
      <Container className="py-12 md:py-16">
        <Breadcrumbs items={[{ name: 'Automation FAQs', href: '/automation-faqs' }]} />
        <div className="max-w-3xl">
          <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Automation FAQs
          </h1>
          <p className="text-lg text-muted mb-10">
            Got questions about automation? We&apos;ve got answers. Browse our most frequently asked
            questions below.
          </p>
          <FAQAccordion faqs={faqs} />
        </div>
      </Container>
    </>
  );
}
