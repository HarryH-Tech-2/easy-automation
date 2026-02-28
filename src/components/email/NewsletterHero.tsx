import { Container } from '@/components/ui/Container';
import { EmailForm } from './EmailForm';
import { Mail } from 'lucide-react';

export function NewsletterHero() {
  return (
    <section className="bg-primary-light py-16 md:py-20">
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-full bg-primary/10 mb-6">
            <Mail className="h-7 w-7 text-primary" />
          </div>
          <h2 className="font-heading text-3xl md:text-4xl font-bold mb-4">
            Stay Ahead with Automation Tips
          </h2>
          <p className="text-muted mb-8 text-lg">
            Get weekly insights on the best automation tools, strategies, and workflows
            delivered straight to your inbox.
          </p>
          <EmailForm
            buttonText="Get Free Updates"
            placeholder="you@example.com"
          />
        </div>
      </Container>
    </section>
  );
}
