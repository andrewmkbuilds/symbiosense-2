import ConditionControl from "@/components/tracker/ConditionControl";
import { isActive, formatPoints } from "@/lib/scoring";

export default function MissionBlock({ mission, state, result, onChange }) {
  const equipId = `m${mission.number}_equip`;
  return (
    <div className="rounded-xl border border-border p-4">
      <div className="flex items-center gap-2 mb-3 flex-wrap">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary text-primary-foreground text-xs font-bold font-mono">{mission.number}</span>
        <h4 className="font-heading text-sm font-bold text-primary">{mission.name}</h4>
        {mission.interchangeable && (
          <span className="text-[10px] uppercase tracking-wide text-brand-teal font-semibold font-mono bg-brand-teal/10 px-2 py-0.5 rounded-full">Interchangeable dock</span>
        )}
        <span className="ml-auto text-sm font-bold text-primary font-mono">{result.points} pts</span>
      </div>

      <div className="space-y-2.5">
        {mission.conditions.map((c) => {
          const disabled = !isActive(c, state);
          return (
            <div key={c.id} className={disabled ? "opacity-40" : ""}>
              <div className="flex items-start gap-3">
                <ConditionControl condition={c} value={state[c.id]} disabled={disabled} onChange={(v) => onChange(c.id, v)} />
                <span className="text-xs font-semibold text-brand-teal font-mono whitespace-nowrap pt-0.5">{formatPoints(c)}</span>
              </div>
              {c.note && <p className="mt-1 ml-7 text-[11px] text-muted-foreground leading-snug">{c.note}</p>}
            </div>
          );
        })}

        {mission.noEquipment && (
          <div className="pt-2 border-t border-border/60">
            <ConditionControl
              condition={{ type: "flag", label: "No Equipment Constraint: a mission model is touching equipment at the end of the match (this mission scores 0)" }}
              value={state[equipId]}
              onChange={(v) => onChange(equipId, v)}
            />
          </div>
        )}
      </div>

      {result.reason && <p className="mt-3 text-xs text-amber-700 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2">{result.reason}</p>}
      {mission.update && <p className="mt-3 text-xs text-amber-700 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2 leading-relaxed">{mission.update}</p>}
    </div>
  );
}