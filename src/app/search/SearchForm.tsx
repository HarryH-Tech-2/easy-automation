import { Search } from 'lucide-react';

interface SearchFormProps {
  defaultValue?: string;
}

/**
 * Server-rendered GET form so the canonical /search?q=... URL works for
 * crawlers, AI agents, and browsers with JS disabled. Submitting navigates
 * to /search?q=<term>, which the server page filters.
 */
export function SearchForm({ defaultValue = '' }: SearchFormProps) {
  return (
    <form
      action="/search"
      method="get"
      role="search"
      className="mb-8 flex flex-col sm:flex-row gap-3"
    >
      <div className="relative flex-1">
        <Search
          className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted"
          aria-hidden="true"
        />
        <input
          type="search"
          name="q"
          defaultValue={defaultValue}
          placeholder="Search guides, tools, and workflows…"
          aria-label="Search query"
          className="w-full pl-11 pr-4 py-3 rounded-lg border border-border bg-surface text-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          autoFocus
        />
      </div>
      <button
        type="submit"
        className="px-6 py-3 rounded-lg bg-primary text-white font-semibold hover:bg-primary/90 transition-colors"
      >
        Search
      </button>
    </form>
  );
}
