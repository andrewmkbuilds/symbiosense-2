import { ROBOT_GAME_RULES } from "@/lib/bioglowData";

export default function OfficialRulesDetail() {
  return (
    <div className="mt-8">
      <h3 className="font-heading text-lg font-bold text-primary mb-1">Detailed rules (Robot Game Rulebook)</h3>
      <p className="text-xs text-muted-foreground mb-4">
        Summarised from the official Rulebook, pages 13–18. The Rulebook and Challenge Updates are the only authority; the head referee makes the final decision at an event.
      </p>
      <div className="grid md:grid-cols-2 gap-5">
        {ROBOT_GAME_RULES.map((g) => (
          <div key={g.group} className="rounded-2xl glass p-5 depth-shadow-sm">
            <h4 className="font-heading text-base font-bold text-primary mb-3">{g.group}</h4>
            <ul className="space-y-2 text-sm text-muted-foreground leading-relaxed">
              {g.items.map((t) => (<li key={t}>• {t}</li>))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}