import { memo, useState } from "react";
import { Brain, AlertTriangle, FileQuestion, ArrowRight, Filter } from "lucide-react";
import { PRIORITY_META, STATIONS } from "@/lib/liveConsole";

const FILTERS = [
  { id: "all", label: "All Points" },
  { id: "high", label: "High" },
  { id: "medium", label: "Medium" },
  { id: "low", label: "Low" },
  { id: "pending", label: "Awaiting Verification" },
];

function BioRiskPanel({ sim }) {
  const [filter, setFilter] = useState("all");
  const rows = sim.observations.filter((o) => {
    if (filter === "all") return true;
    if (filter === "pending") return o.verified === "pending" || o.verified === "uncertain";
    return o.priority.level === filter;
  });

  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono flex items-center gap-1.5"><Brain className="h-3.5 w-3.5" /> BioRisk AI · Investigation Dashboard</p>
        <span className="text-[9px] font-mono text-muted-foreground">{sim.observations.length}/{STATIONS.length} points</span>
      </div>

      {/* filters */}
      <div className="flex flex-wrap gap-1.5 mb-3">
        {FILTERS.map((f) => (
          <button key={f.id} onClick={() => setFilter(f.id)} className={`rounded-full px-2.5 py-1 text-[10px] font-semibold transition-colors ${filter === f.id ? "bg-primary text-primary-foreground" : "bg-secondary/60 text-muted-foreground hover:text-primary border border-border/50"}`}>{f.label}</button>
        ))}
      </div>

      <div className="space-y-2 overflow-y-auto pr-1" style={{ maxHeight: 340 }}>
        {rows.length === 0 && (
          <div className="text-center text-muted-foreground py-6">
            <Filter className="h-7 w-7 mx-auto mb-2 opacity-40" />
            <p className="text-xs">No points match this filter yet.</p>
          </div>
        )}
        {rows.map((o) => {
          const meta = PRIORITY_META[o.priority.level];
          return (
            <div key={o.id} className="rounded-xl border bg-card/70 overflow-hidden" style={{ borderColor: `${meta.color}55` }}>
              <div className="flex items-center justify-between px-3 py-2" style={{ background: `${meta.color}14` }}>
                <div>
                  <span className="text-sm font-bold text-primary">{o.stationId}</span>
                  <span className="text-[10px] text-muted-foreground ml-2">{o.stationName}</span>
                </div>
                <span className="rounded-full px-2 py-0.5 text-[10px] font-bold font-mono" style={{ color: meta.color, background: `${meta.color}1f` }}>{meta.label} Priority</span>
              </div>
              <div className="px-3 py-2 space-y-1.5 text-[11px]">
                <Section label="Evidence" color="#438B78" items={o.priority.evidence} />
                {o.priority.concerns.length > 0 && <Section label="Concerns" color="#B5654A" items={o.priority.concerns} icon={<AlertTriangle className="h-2.5 w-2.5" />} />}
                {o.priority.missing.length > 0 && <Section label="Missing Info" color="#C08552" items={o.priority.missing} icon={<FileQuestion className="h-2.5 w-2.5" />} />}
                <div className="flex items-start gap-1.5 pt-1 border-t border-border/40">
                  <ArrowRight className="h-3 w-3 text-brand-teal mt-0.5 shrink-0" />
                  <p className="text-foreground"><span className="font-bold">Next: </span>{o.priority.action}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground italic">Priority means "investigate this location sooner" — not a validated ecological risk score. Every flag is explained and traceable to its source observation.</p>
    </div>
  );
}

function Section({ label, color, items, icon }) {
  if (!items || items.length === 0) return null;
  return (
    <div>
      <p className="text-[9px] uppercase tracking-wide font-mono mb-0.5 flex items-center gap-1" style={{ color }}>{icon} {label}</p>
      <ul className="space-y-0.5 pl-3">
        {items.map((it, i) => <li key={i} className="text-muted-foreground leading-snug list-disc">{it}</li>)}
      </ul>
    </div>
  );
}

export default memo(BioRiskPanel);