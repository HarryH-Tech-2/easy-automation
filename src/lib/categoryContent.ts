import type { Category } from './constants';

export interface CategoryContent {
  // Short blurb used in meta description and card UI
  shortDescription: string;
  // Multi-paragraph intro shown on the category page (HTML-safe plain prose)
  introParagraphs: string[];
  // Topics covered — rendered as a bulleted list under the intro
  topicsCovered: string[];
  // Category-level FAQs (rendered as UI + FAQPage JSON-LD)
  faqs: { question: string; answer: string }[];
}

export const categoryContent: Record<Category, CategoryContent> = {
  'marketing-automation': {
    shortDescription:
      'Learn how to automate your marketing workflows with practical guides and honest tool comparisons.',
    introParagraphs: [
      'Marketing automation uses software to run repetitive marketing tasks on autopilot — think email sequences, lead scoring, audience segmentation, social scheduling, and cross-channel nurture flows. Done well, it frees marketers to focus on strategy and creative while the platform handles delivery, personalization, and measurement at scale.',
      'Our marketing automation library is written for practitioners. Every guide walks through a concrete workflow you can build this week, compares real tools head-to-head (with pricing, limits, and honest trade-offs), and skips the vendor-speak. Whether you are a solo founder picking your first email platform or a growth lead architecting a multi-touch nurture sequence, you will find actionable playbooks here.',
      'Start with the foundational guides below if you are new to the category, or jump straight to the tool-comparison posts if you already know what you need.',
    ],
    topicsCovered: [
      'Email marketing automation and drip campaigns',
      'Lead scoring, segmentation, and nurture workflows',
      'CRM and marketing-automation integration',
      'Social media scheduling and AI-assisted content',
      'E-commerce automation (abandoned cart, post-purchase, win-back)',
      'Measuring marketing automation ROI',
      'Common pitfalls and how to avoid them',
    ],
    faqs: [
      {
        question: 'What is marketing automation in simple terms?',
        answer:
          'Marketing automation is software that runs repetitive marketing tasks for you based on rules you define — sending emails, segmenting contacts, scoring leads, posting to social, and triggering follow-ups when customers take specific actions.',
      },
      {
        question: 'Do small businesses need marketing automation?',
        answer:
          'If you have a mailing list of more than a few hundred contacts or you are running multi-step customer journeys (onboarding, abandoned cart, re-engagement), automation pays for itself quickly. Entry-level tools start free and scale with you.',
      },
      {
        question: 'Which marketing automation tool should I start with?',
        answer:
          'For most small businesses, start with a tool that combines email, forms, and lightweight CRM — Mailchimp, Brevo, or ActiveCampaign are solid entry points. Upgrade to HubSpot or Customer.io only when you outgrow the basics.',
      },
      {
        question: 'How long before marketing automation shows ROI?',
        answer:
          'Most teams see measurable ROI within 3–6 months. The biggest early wins come from abandoned-cart emails, welcome sequences, and lead-qualification scoring — each of which can recover or convert revenue you would otherwise lose.',
      },
    ],
  },
  'finance-automation': {
    shortDescription:
      'Streamline invoicing, expenses, payroll, and reporting with practical finance-automation guides.',
    introParagraphs: [
      'Finance automation replaces manual data entry, spreadsheet juggling, and approval chasing with software that handles the grind: bill capture, expense categorization, invoice delivery, payroll runs, tax prep, and real-time reporting. The result is fewer errors, tighter cash-flow visibility, and finance teams that spend time on analysis instead of admin.',
      'Our finance automation guides are written for founders, controllers, and finance ops leads who need to ship improvements without a six-month implementation project. We cover the specific tools, workflows, and integration patterns that move the needle — AP automation with Bill.com or Ramp, expense rules in Expensify or Brex, automated invoicing, closing-the-books workflows, and the quiet wins of scheduled reporting.',
      'Browse the guides below to automate the finance processes that drain the most hours in your week.',
    ],
    topicsCovered: [
      'Accounts payable (AP) automation',
      'Expense tracking and corporate cards',
      'Automated invoicing and receivables',
      'Payroll automation for small to mid-market teams',
      'Financial reporting and dashboards',
      'Tax preparation workflows',
      'Budgeting and forecasting automation',
    ],
    faqs: [
      {
        question: 'What does finance automation actually replace?',
        answer:
          'It replaces manual data entry, paper-based approvals, and spreadsheet reconciliations. Common targets: entering bills into your accounting system, categorizing expenses, chasing invoice approvals, generating recurring invoices, and compiling monthly reports.',
      },
      {
        question: 'Is finance automation safe for sensitive data?',
        answer:
          'Reputable platforms use bank-grade encryption, SOC 2 compliance, and role-based access controls. The bigger risk is human error in manual processes — automation typically improves security by standardizing controls and reducing access to raw data.',
      },
      {
        question: 'Which finance processes should I automate first?',
        answer:
          'Start where volume meets pain: accounts payable, expense reports, and recurring invoicing. These three workflows deliver the fastest ROI and are the easiest to implement without disrupting close processes.',
      },
      {
        question: 'Do I still need an accountant if I automate finance?',
        answer:
          'Yes — automation handles the mechanical work, but accountants provide judgment, tax strategy, and controls. Automation actually makes working with your accountant cheaper and faster because the underlying data is cleaner.',
      },
    ],
  },
};
