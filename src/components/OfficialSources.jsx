import { ExternalLink, ShieldCheck } from "lucide-react";
import { LAST_CHECKED } from "@/lib/bioglowData";

/**
 * Reusable "Official Sources" citation section.
 * Pass an array of { label, url } objects.
 */
export default function OfficialSources({ sources = [], title = "Official Sources" }) {
  return (
    <section className="py-12 bg-secondary/40 border-y border-border/60">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="flex items-center gap-2 mb-4">
          <ShieldCheck className="h-5 w-5 text-brand-teal" />
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">{title}</p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {sources.map((s, i) => (
            <a
              key={i}
              href={s.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-start gap-2.5 rounded-xl border border-border bg-card p-3.5 hover:border-brand-teal/50 hover:shadow-sm transition-all"
            >
              <ExternalLink className="h-4 w-4 shrink-0 mt-0.5 text-brand-teal group-hover:scale-110 transition-transform" />
              <div className="min-w-0">
                <p className="text-sm font-semibold text-primary leading-tight">{s.label}</p>
                <p className="text-xs text-muted-foreground font-mono truncate mt-0.5">{s.url}</p>
              </div>
            </a>
          ))}
        </div>
        <p className="mt-5 text-xs text-muted-foreground">
          Information on this page was last checked on {LAST_CHECKED}. Always refer to the latest official documents and Challenge Updates before your event.
        </p>
      </div>
    </section>
  );
}