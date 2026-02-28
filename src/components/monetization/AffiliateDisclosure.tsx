import { Info } from 'lucide-react';

export function AffiliateDisclosure() {
  return (
    <div className="flex items-start gap-2 rounded-lg border border-border bg-surface p-3 text-xs text-muted my-6 not-prose">
      <Info className="h-4 w-4 shrink-0 mt-0.5" />
      <p>
        <strong>Disclosure:</strong> Some of the links in this article are affiliate links. This means we may
        earn a small commission at no extra cost to you if you make a purchase through these links.
        We only recommend products we genuinely believe in.
      </p>
    </div>
  );
}
