import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'About Us — Our Mission & Approach',
  description: 'Learn about Easy Automation — our mission to help businesses and professionals discover the best automation tools and strategies.',
  alternates: { canonical: absoluteUrl('/about-us') },
};

export default function AboutPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'About Us', href: '/about-us' }]} />
      <div className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">About Easy Automation</h1>

        <div className="prose prose-lg max-w-none">
          <p>
            At Easy Automation, we believe the future will be automated — and we want to make that
            transition easy for everyone. Whether you&apos;re a solopreneur looking to save time on
            repetitive tasks or a growing business ready to scale your operations, we&apos;re here to help.
          </p>

          <h2>Our Mission</h2>
          <p>
            Our mission is simple: to demystify automation and make it accessible to businesses of
            all sizes. We cut through the noise of hundreds of automation tools to bring you
            honest, practical guides that actually help you get things done.
          </p>

          <h2>What We Cover</h2>
          <p>We focus on two key areas where automation has the biggest impact:</p>
          <ul>
            <li>
              <strong>Marketing Automation</strong> — From email sequences to social media scheduling,
              we cover the tools and strategies that help you reach more customers with less effort.
            </li>
            <li>
              <strong>Finance Automation</strong> — From invoice processing to expense tracking,
              we help you streamline the financial side of your business so you can focus on growth.
            </li>
          </ul>

          <h2>Our Approach</h2>
          <p>
            Every article we publish is researched thoroughly and written with practitioners in mind.
            We don&apos;t just list features — we explain how tools work in real-world scenarios,
            compare alternatives head-to-head, and provide step-by-step guides you can follow today.
          </p>
          <p>
            When we recommend a tool, it&apos;s because we genuinely believe it provides value. Some
            links on our site are affiliate links, which means we may earn a commission at no extra
            cost to you. This helps us keep creating free content while maintaining our editorial
            independence.
          </p>

          <h2>Get in Touch</h2>
          <p>
            Have a question, suggestion, or want to collaborate? We&apos;d love to hear from you.
            Visit our <a href="/contact-us">contact page</a> to get in touch.
          </p>
        </div>
      </div>
    </Container>
  );
}
