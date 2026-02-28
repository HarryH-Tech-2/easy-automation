import { AffiliateTool } from '@/lib/types';
import { Star } from 'lucide-react';
import { Badge } from '@/components/ui/Badge';

interface ToolComparisonTableProps {
  tools: AffiliateTool[];
}

export function ToolComparisonTable({ tools }: ToolComparisonTableProps) {
  return (
    <div className="my-8 overflow-x-auto not-prose">
      <table className="w-full border-collapse text-sm">
        <thead>
          <tr className="border-b-2 border-border">
            <th className="text-left py-3 px-4 font-heading font-semibold">Tool</th>
            <th className="text-left py-3 px-4 font-heading font-semibold">Pricing</th>
            <th className="text-left py-3 px-4 font-heading font-semibold">Rating</th>
            <th className="text-left py-3 px-4 font-heading font-semibold hidden md:table-cell">Best For</th>
            <th className="text-right py-3 px-4 font-heading font-semibold">Action</th>
          </tr>
        </thead>
        <tbody>
          {tools.map((tool) => (
            <tr key={tool.name} className="border-b border-border hover:bg-surface-alt transition-colors">
              <td className="py-4 px-4">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">{tool.name}</span>
                  {tool.badge && <Badge variant="primary">{tool.badge}</Badge>}
                </div>
              </td>
              <td className="py-4 px-4 text-muted">{tool.pricing}</td>
              <td className="py-4 px-4">
                <div className="flex items-center gap-1">
                  <Star className="h-4 w-4 fill-primary text-primary" />
                  <span>{tool.rating}</span>
                </div>
              </td>
              <td className="py-4 px-4 text-muted hidden md:table-cell">{tool.description}</td>
              <td className="py-4 px-4 text-right">
                <a
                  href={tool.url}
                  target="_blank"
                  rel="nofollow sponsored noopener"
                  className="inline-flex items-center rounded-lg bg-primary px-3 py-1.5 text-xs font-medium text-white hover:bg-primary-dark transition-colors"
                >
                  Try Free
                </a>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
