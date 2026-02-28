import { AffiliateTool } from '@/lib/types';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface RecommendedToolsProps {
  tools: AffiliateTool[];
  title?: string;
}

export function RecommendedTools({ tools, title = 'Recommended Tools' }: RecommendedToolsProps) {
  return (
    <div className="rounded-xl border border-border bg-surface p-5">
      <h3 className="font-heading font-semibold text-sm mb-4 uppercase tracking-wider">{title}</h3>
      <div className="space-y-3">
        {tools.map((tool) => (
          <a
            key={tool.name}
            href={tool.url}
            target="_blank"
            rel="nofollow sponsored noopener"
            className="flex items-center justify-between p-3 rounded-lg hover:bg-surface-alt transition-colors group"
          >
            <div>
              <div className="flex items-center gap-2">
                <span className="font-medium text-sm group-hover:text-primary transition-colors">
                  {tool.name}
                </span>
                {tool.badge && <Badge variant="primary">{tool.badge}</Badge>}
              </div>
              <span className="text-xs text-muted">{tool.pricing}</span>
            </div>
            {tool.rating && (
              <div className="flex items-center gap-1 text-sm">
                <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                <span>{tool.rating}</span>
              </div>
            )}
          </a>
        ))}
      </div>
    </div>
  );
}
