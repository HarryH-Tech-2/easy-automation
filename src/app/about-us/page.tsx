import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { absoluteUrl } from '@/lib/utils';
import { BookOpen, Target, Shield, Users } from 'lucide-react';

export const metadata: Metadata = {
  title: 'About Us — Our Mission & Approach',
  description: 'Learn about Easy Automation — our mission to help businesses and professionals discover the best automation tools and strategies to save time and scale.',
  alternates: { canonical: absoluteUrl('/about-us') },
};

const values = [
  {
    icon: Target,
    title: 'Practical Over Theoretical',
    description: 'Every guide includes real-world workflows and concrete steps you can implement today, not vague advice.',
  },
  {
    icon: Shield,
    title: 'Honest Recommendations',
    description: 'We test and compare tools head-to-head. If something is not worth your money, we will tell you.',
  },
  {
    icon: BookOpen,
    title: 'Depth Over Volume',
    description: 'We publish fewer articles that go deep rather than churning out surface-level content.',
  },
  {
    icon: Users,
    title: 'Built for Practitioners',
    description: 'Our content is written for the people actually doing the work — marketers, founders, and finance teams.',
  },
];

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'About Us', href: '/about-us' }]} />

      {/* Hero */}
      <div className="max-w-4xl mb-16">
        <h1 className="font-heading text-3xl md:text-5xl font-bold mb-6">
          We Help Businesses Automate <span className="text-primary">What Matters</span>
        </h1>
        <p className="text-lg md:text-xl text-muted leading-relaxed">
          Easy Automation is an independent resource for marketing and finance professionals who
          want to work smarter. We research, test, and explain the tools and strategies that
          actually save time — so you can stop guessing and start automating.
        </p>
      </div>

      {/* Main content — wider */}
      <div className="max-w-4xl">
        <div className="prose prose-lg max-w-none">
          <h2>Why We Started Easy Automation</h2>
          <p>
            Automation tools have exploded in number over the past few years. There are now hundreds
            of platforms promising to automate everything from email follow-ups to financial
            reconciliation. That&apos;s great — but it also makes choosing the right solution
            overwhelming.
          </p>
          <p>
            We started Easy Automation because we saw a gap between the marketing hype around
            automation tools and the practical guidance people actually need. Too many &ldquo;best
            of&rdquo; lists are barely disguised ads. Too many tutorials skip the hard parts. We
            wanted to build something better: a resource that respects your time and treats you
            like a professional who needs real answers, not sales pitches.
          </p>

          <h2>What We Cover</h2>
          <p>We focus on two areas where automation delivers the highest return on investment:</p>
          <ul>
            <li>
              <strong>Marketing Automation</strong> — Email sequences, drip campaigns, social media
              scheduling, lead scoring, CRM integration, and AI-powered marketing tools. We cover
              both strategy and implementation so you can build systems that run on autopilot.
            </li>
            <li>
              <strong>Finance Automation</strong> — Invoicing, accounts payable, expense tracking,
              payroll processing, financial reporting, tax preparation, and budget forecasting.
              We help you eliminate the manual grind that slows down your finance operations.
            </li>
          </ul>
        </div>

        {/* Values grid */}
        <div className="mt-16 mb-16">
          <h2 className="font-heading text-2xl md:text-3xl font-bold mb-8">How We Work</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            {values.map((v) => (
              <div key={v.title} className="rounded-xl border border-border bg-surface p-6">
                <v.icon className="h-8 w-8 text-primary mb-3" />
                <h3 className="font-heading font-semibold text-lg mb-2">{v.title}</h3>
                <p className="text-muted text-sm leading-relaxed">{v.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="prose prose-lg max-w-none">
          <h2>Affiliate Disclosure</h2>
          <p>
            Some links on this site are affiliate links. That means if you click through and make
            a purchase, we may earn a small commission at no extra cost to you. This is how we
            fund our research and keep the content free. We only recommend tools we have evaluated
            and believe provide genuine value. Our editorial opinions are never for sale.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have a question, feedback, or want to work together? We&apos;d love to hear from you.
            Head over to our <a href="/contact-us">contact page</a> and drop us a message.
          </p>
        </div>
      </div>
    </Container>
  );
}
