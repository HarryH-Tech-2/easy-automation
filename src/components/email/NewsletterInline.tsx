import { EmailForm } from './EmailForm';
import { Sparkles } from 'lucide-react';

export function NewsletterInline() {
  return (
    <div className="my-10 rounded-xl border border-primary/20 bg-primary-light p-6 not-prose">
      <div className="flex items-center gap-2 mb-3">
        <Sparkles className="h-5 w-5 text-primary" />
        <h3 className="font-heading font-semibold text-lg">Enjoying this article?</h3>
      </div>
      <p className="text-sm text-muted mb-4">
        Subscribe to get more automation tips and tool recommendations delivered to your inbox weekly.
      </p>
      <EmailForm buttonText="Subscribe Free" />
    </div>
  );
}
