import { Star, Check, X } from 'lucide-react';
import { AffiliateTool } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Card } from '@/components/ui/Card';

interface ToolReviewCardProps {
  tool: AffiliateTool;
}

export function ToolReviewCard({ tool }: ToolReviewCardProps) {
  return (
    <Card className="not-prose">
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="font-heading font-semibold text-lg">{tool.name}</h3>
          {tool.badge && <Badge variant="primary" className="mt-1">{tool.badge}</Badge>}
        </div>
        {tool.rating && (
          <div className="flex items-center gap-1">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold">{tool.rating}</span>
          </div>
        )}
      </div>
      <p className="text-sm text-muted mb-4">{tool.description}</p>
      {tool.pricing && (
        <p className="text-sm mb-4">
          <span className="font-medium">Pricing:</span> <span className="text-muted">{tool.pricing}</span>
        </p>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
        {tool.pros && tool.pros.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-green-600 mb-2">Pros</h4>
            <ul className="space-y-1">
              {tool.pros.map((pro) => (
                <li key={pro} className="flex items-start gap-1.5 text-sm">
                  <Check className="h-4 w-4 text-green-500 shrink-0 mt-0.5" />
                  <span>{pro}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
        {tool.cons && tool.cons.length > 0 && (
          <div>
            <h4 className="text-xs font-semibold uppercase tracking-wider text-red-600 mb-2">Cons</h4>
            <ul className="space-y-1">
              {tool.cons.map((con) => (
                <li key={con} className="flex items-start gap-1.5 text-sm">
                  <X className="h-4 w-4 text-red-500 shrink-0 mt-0.5" />
                  <span>{con}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
      <a
        href={tool.url}
        target="_blank"
        rel="nofollow sponsored noopener"
        className="inline-flex items-center justify-center w-full rounded-lg bg-primary px-4 py-2.5 text-sm font-medium text-white hover:bg-primary-dark transition-colors"
      >
        Try {tool.name} Free
      </a>
    </Card>
  );
}
