import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { absoluteUrl } from '@/lib/utils';

export const metadata: Metadata = {
  title: 'Do Not Sell My Personal Information',
  description: 'Exercise your right to opt out of the sale of personal information under applicable privacy laws.',
  alternates: { canonical: absoluteUrl('/do-not-sell-personal-information') },
};

export default function DoNotSellPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs
        items={[{ name: 'Do Not Sell My Personal Information', href: '/do-not-sell-personal-information' }]}
      />
      <div className="max-w-3xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-6">
          Do Not Sell My Personal Information
        </h1>
        <div className="prose prose-lg max-w-none">
          <p>
            Under the California Consumer Privacy Act (CCPA) and similar state privacy laws, you
            have the right to opt out of the &ldquo;sale&rdquo; of your personal information.
          </p>

          <h2>What This Means</h2>
          <p>
            Easy Automation does not sell your personal information in the traditional sense. However,
            certain uses of cookies and tracking technologies by our advertising partners may
            constitute a &ldquo;sale&rdquo; under California law.
          </p>

          <h2>How to Opt Out</h2>
          <p>You can exercise your right to opt out by:</p>
          <ul>
            <li>Disabling cookies in your browser settings</li>
            <li>Using browser-based opt-out tools or privacy extensions</li>
            <li>Contacting us directly at <a href="mailto:contact@easyautomation.io">contact@easyautomation.io</a></li>
          </ul>

          <h2>What Happens After You Opt Out</h2>
          <p>
            Once we process your request, we will no longer share your personal information with
            third parties for purposes that constitute a &ldquo;sale&rdquo; under applicable law.
            You will still be able to use our website and access all content.
          </p>

          <h2>Contact Us</h2>
          <p>
            If you have questions or wish to exercise your rights, please email us at{' '}
            <a href="mailto:contact@easyautomation.io">contact@easyautomation.io</a>.
          </p>
        </div>
      </div>
    </Container>
  );
}
