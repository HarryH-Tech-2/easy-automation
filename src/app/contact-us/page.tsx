import type { Metadata } from 'next';
import { Container } from '@/components/ui/Container';
import { Breadcrumbs } from '@/components/layout/Breadcrumbs';
import { ContactForm } from './ContactForm';
import { absoluteUrl } from '@/lib/utils';
import { MessageSquare } from 'lucide-react';

export const metadata: Metadata = {
  title: 'Contact Us — Get in Touch',
  description: 'Have a question about automation? Want to suggest a topic or collaborate? Get in touch with the Easy Automation team.',
  alternates: { canonical: absoluteUrl('/contact-us') },
};

export default function ContactPage() {
  return (
    <Container className="py-12 md:py-16">
      <Breadcrumbs items={[{ name: 'Contact Us', href: '/contact-us' }]} />
      <div className="max-w-2xl">
        <h1 className="font-heading text-3xl md:text-4xl font-bold mb-4">Contact Us</h1>
        <p className="text-lg text-muted mb-8">
          Have a question, feedback, or want to collaborate? We&apos;d love to hear from you.
          Fill out the form below and we&apos;ll get back to you as soon as possible.
        </p>

        <div className="flex items-center gap-3 p-4 rounded-lg border border-border mb-10">
          <MessageSquare className="h-5 w-5 text-primary" />
          <div>
            <p className="font-medium text-sm">Response Time</p>
            <p className="text-sm text-muted">We typically reply within 48 hours</p>
          </div>
        </div>

        <ContactForm />
      </div>
    </Container>
  );
}
