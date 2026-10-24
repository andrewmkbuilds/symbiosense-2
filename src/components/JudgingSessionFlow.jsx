import { Clock } from "lucide-react";
import { JUDGING_FLOW } from "@/lib/bioglowData";

export default function JudgingSessionFlow() {
  return (
    <div className="mt-8 rounded-2xl glass p-5 depth-shadow-sm">
      <div className="flex items-center gap-2 mb-1">
        <Clock className="h-5 w-5 text-brand-teal" />
        <h3 className="font-heading text-base font-bold text-primary">Official judging session flow</h3>
      </div>
      <p className="text-xs text-muted-foreground mb-4">From the Team Meeting Guide (p. 30). Judges then discuss the team and complete the rubrics for about 10 minutes.</p>
      <ol className="space-y-2">
        {JUDGING_FLOW.map((s, i) => (
          <li key={s.step} className="flex items-start gap-3 text-sm">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-md bg-primary text-primary-foreground text-xs font-bold font-mono">{i + 1}</span>
            <div className="flex-1">
              <p className="font-semibold text-primary">{s.step}</p>
              <p className="text-xs text-muted-foreground">{s.detail}</p>
            </div>
            <span className="text-xs font-mono text-brand-teal whitespace-nowrap">{s.time}</span>
          </li>
        ))}
      </ol>
      <p className="mt-4 text-xs text-muted-foreground leading-relaxed">
        Every team member should take part in the presentation. A prototype does not need to be functional but the team should be able to describe how it would work. The Engineering Notebook is a helpful resource to share, but it isn't required.
      </p>
    </div>
  );
}