import { FileText, ArrowRight } from 'lucide-react';
import { EmailForm } from './EmailForm';
import { Card } from '@/components/ui/Card';

interface LeadMagnetCardProps {
  title?: string;
  description?: string;
}

export function LeadMagnetCard({
  title = 'Free Automation Starter Guide',
  description = 'Download our comprehensive guide to getting started with marketing and finance automation. Includes tool comparisons, workflow templates, and step-by-step setup instructions.',
}: LeadMagnetCardProps) {
  return (
    <Card className="not-prose border-primary/20">
      <div className="flex items-center gap-3 mb-3">
        <div className="rounded-lg bg-primary-light p-2">
          <FileText className="h-5 w-5 text-primary" />
        </div>
        <div className="flex items-center gap-2 text-xs text-primary font-semibold uppercase tracking-wider">
          <span>Free Download</span>
          <ArrowRight className="h-3 w-3" />
        </div>
      </div>
      <h3 className="font-heading font-semibold text-lg mb-2">{title}</h3>
      <p className="text-sm text-muted mb-4">{description}</p>
      <EmailForm buttonText="Get Free Guide" placeholder="Enter your email for instant access" />
    </Card>
  );
}
