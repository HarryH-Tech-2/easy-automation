import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'Easy Automation privacy policy — how we collect, use, and protect your personal information.',
  alternates: { canonical: absoluteUrl('/privacy-policy') },
};

export default function PrivacyPolicyPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Privacy Policy', href: '/privacy-policy' }]} />
      <div className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">Privacy Policy</h1>
        <div className="prose prose-lg max-w-none">
          <p><em>Last updated: February 2025</em></p>

          <p>
            Easy Automation (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;) operates the website easyautomation.io.
            This page informs you of our policies regarding the collection, use, and disclosure of
            personal information when you use our website.
          </p>

          <h2>Information We Collect</h2>
          <p>We may collect the following types of information:</p>
          <ul>
            <li><strong>Email Address:</strong> When you subscribe to our newsletter or submit our contact form.</li>
            <li><strong>Usage Data:</strong> We collect information about how you access and use our website, including your IP address, browser type, pages visited, and time spent on pages.</li>
            <li><strong>Cookies:</strong> We use cookies and similar tracking technologies to track activity on our website and hold certain information.</li>
          </ul>

          <h2>How We Use Your Information</h2>
          <ul>
            <li>To provide and maintain our website</li>
            <li>To send you newsletters and marketing communications (with your consent)</li>
            <li>To respond to your inquiries</li>
            <li>To analyze website usage and improve our content</li>
            <li>To detect and prevent technical issues</li>
          </ul>

          <h2>Third-Party Services</h2>
          <p>
            We may use third-party services such as analytics providers, email service providers,
            and advertising partners. These services may collect information about your browsing
            activity across websites.
          </p>

          <h2>Affiliate Links</h2>
          <p>
            Our website contains affiliate links to third-party products and services. When you click
            these links and make a purchase, we may earn a commission. These third-party sites have
            their own privacy policies.
          </p>

          <h2>Your Rights</h2>
          <p>You have the right to:</p>
          <ul>
            <li>Access, update, or delete your personal information</li>
            <li>Opt out of marketing communications at any time</li>
            <li>Request a copy of the data we hold about you</li>
          </ul>

          <h2>Contact Us</h2>
          <p>
            If you have questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:contact@easyautomation.io">contact@easyautomation.io</a>.
          </p>
        </div>
      </div>
    </Container>
  );
}
