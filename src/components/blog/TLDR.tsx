import { Sparkles, CheckCircle2 } from 'lucide-react';

interface TLDRProps {
  tldr?: string;
  keyTakeaways?: string[];
}

/**
 * TL;DR + key takeaways block.
 *
 * Rendered above the article body so AI crawlers (GPTBot, ClaudeBot,
 * PerplexityBot) and human skimmers see a citation-ready summary first.
 *
 * The `.tldr-block` and `.key-takeaways` classes are targeted by the
 * SpeakableSpecification in ArticleJsonLd so voice assistants can read
 * them aloud.
 */
export function TLDR({ tldr, keyTakeaways }: TLDRProps) {
  if (!tldr && (!keyTakeaways || keyTakeaways.length === 0)) return null;

  return (
    <aside
      aria-label="Article summary"
      className="not-prose mb-10 rounded-xl border border-primary/20 bg-primary/5 p-6"
    >
      {tldr && (
        <div className="tldr-block mb-4 last:mb-0">
          <div className="mb-2 flex items-center gap-2 text-sm font-semibold text-primary">
            <Sparkles className="h-4 w-4" aria-hidden="true" />
            <span>TL;DR</span>
          </div>
          <p className="text-base leading-relaxed text-foreground">{tldr}</p>
        </div>
      )}

      {keyTakeaways && keyTakeaways.length > 0 && (
        <div className="key-takeaways">
          <div className="mb-3 flex items-center gap-2 text-sm font-semibold text-primary">
            <CheckCircle2 className="h-4 w-4" aria-hidden="true" />
            <span>Key takeaways</span>
          </div>
          <ul className="space-y-2 text-base leading-relaxed">
            {keyTakeaways.map((item, i) => (
              <li key={i} className="flex gap-2">
                <span aria-hidden="true" className="mt-2 inline-block h-1.5 w-1.5 shrink-0 rounded-full bg-primary" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </aside>
  );
}
