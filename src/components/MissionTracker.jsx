import { useState, useMemo } from "react";
import { RotateCcw, Calculator, Info } from "lucide-react";
import { MISSIONS } from "@/lib/missions";
import { OFFICIAL_LINKS, LAST_CHECKED } from "@/lib/bioglowData";
import { getDefaultState, applyChange, computeScore, TOKEN_POINTS, INSPECTION_POINTS } from "@/lib/scoring";
import ConditionControl from "@/components/tracker/ConditionControl";
import MissionBlock from "@/components/tracker/MissionBlock";

const STORAGE_KEY = "symbionix-practice-tracker-v2";

function loadState() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) return { ...getDefaultState(), ...JSON.parse(saved) };
  } catch {}
  return getDefaultState();
}

export default function MissionTracker() {
  const [state, setState] = useState(loadState);
  const score = useMemo(() => computeScore(state), [state]);

  const save = (next) => {
    setState(next);
    try { localStorage.setItem(STORAGE_KEY, JSON.stringify(next)); } catch {}
  };
  const change = (id, val) => save(applyChange(state, id, val));

  return (
    <div className="rounded-2xl border border-border bg-card p-5 sm:p-6 depth-shadow-md">
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2">
            <Calculator className="h-5 w-5 text-brand-teal" />
            <h3 className="font-heading text-lg font-bold text-primary">SYMBIOTIX Practice Score Tracker</h3>
          </div>
          <p className="mt-1 text-xs text-muted-foreground">
            Our own practice tool — not an official FIRST scoring tool and not a referee score. Built from the official Rulebook and Challenge Update 01. Last checked: {LAST_CHECKED}.
          </p>
        </div>
        <button onClick={() => save(getDefaultState())} className="inline-flex items-center gap-1.5 rounded-full border border-border bg-secondary/50 px-3 py-2 text-xs font-semibold text-primary hover:bg-secondary transition-colors">
          <RotateCcw className="h-3.5 w-3.5" /> Reset
        </button>
      </div>

      <div className="rounded-xl bg-secondary/50 border border-border p-4 mb-5">
        <div className="flex flex-wrap items-end gap-6">
          <div>
            <p className="text-xs uppercase tracking-wide text-muted-foreground font-mono">Practice total</p>
            <p className="text-4xl font-bold text-primary font-mono">{score.total}</p>
          </div>
          <div className="text-xs text-muted-foreground font-mono leading-relaxed">
            <p>Missions: {score.missionTotal}</p>
            <p>Equipment inspection: {score.inspection}</p>
            <p>Precision tokens: {score.tokens}</p>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-border/60 space-y-4">
          <ConditionControl
            condition={{ type: "flag", label: `Equipment inspection: the robot and ALL equipment fit completely in ONE launch area and under 12 in. (305 mm) (+${INSPECTION_POINTS})` }}
            value={state.inspection}
            onChange={(v) => change("inspection", v)}
          />
          <div className="flex flex-wrap items-center gap-3">
            <span className="text-sm text-foreground">Precision tokens remaining at end of match (start with 6; one is removed for each interruption outside home)</span>
            <div className="flex items-center gap-1.5">
              {[6, 5, 4, 3, 2, 1, 0].map((n) => (
                <button key={n} onClick={() => change("precisionTokens", n)} className={`h-8 w-8 rounded-lg text-xs font-bold font-mono transition-colors ${state.precisionTokens === n ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:border-brand-teal/50"}`}>{n}</button>
              ))}
              <span className="ml-2 text-sm font-semibold text-primary font-mono">= {TOKEN_POINTS[state.precisionTokens]} pts</span>
            </div>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        {MISSIONS.map((m) => (
          <MissionBlock key={m.number} mission={m} state={state} result={score.perMission[m.number]} onChange={change} />
        ))}
      </div>

      <div className="mt-5 flex items-start gap-2.5 rounded-xl border border-brand-teal/30 bg-brand-teal/5 p-3.5">
        <Info className="h-4 w-4 shrink-0 mt-0.5 text-brand-teal" />
        <p className="text-xs text-foreground/80 leading-relaxed">
          Mission requirements must be visibly met at the end of the match unless a method was required (Rule 22). Gracious Professionalism points are scored by referees and added to the Core Values score, so they are not included here.
          Always check results with the official scoresheet / Official Score Calculator and the latest{" "}
          <a href={OFFICIAL_LINKS.fiUpdates} target="_blank" rel="noopener noreferrer" className="text-brand-teal underline">Challenge Updates</a>.
        </p>
      </div>
    </div>
  );
}