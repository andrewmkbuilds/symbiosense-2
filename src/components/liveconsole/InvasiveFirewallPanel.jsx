import { memo } from "react";
import { ShieldAlert, CheckCircle2, XCircle, HelpCircle, History } from "lucide-react";
import { STATIONS } from "@/lib/liveConsole";

const STATUS_META = {
  known: { label: "Known class — preliminary", color: "#438B78" },
  awaiting: { label: "Awaiting human verification", color: "#C08552" },
  uncertain: { label: "Uncertain — no reliable match", color: "#B5654A" },
};
const VERIFIED_META = {
  pending: { label: "Pending review", color: "#C08552" },
  verified: { label: "Marked verified", color: "#438B78" },
  rejected: { label: "Rejected", color: "#B5654A" },
  uncertain: { label: "Marked uncertain", color: "#B5654A" },
  "not-required": { label: "Not required", color: "#438B78" },
};

function InvasiveFirewallPanel({ sim, onVerify }) {
  const latest = sim.observations[sim.observations.length - 1];
  const history = sim.observations;

  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono flex items-center gap-1.5"><ShieldAlert className="h-3.5 w-3.5" /> Invasive Firewall</p>
        <span className="text-[9px] font-mono text-muted-foreground">AI-assisted screening</span>
      </div>

      {latest ? (
        <>
          <div className="rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-2 mb-2">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-mono text-muted-foreground">{latest.stationId}</span>
              <span className="text-[10px] font-bold" style={{ color: STATUS_META[latest.plant.status]?.color }}>{STATUS_META[latest.plant.status]?.label}</span>
            </div>
            <p className="text-sm font-bold text-primary leading-tight mt-0.5">{latest.plant.class}</p>
            <div className="mt-1.5">
              <div className="flex items-center justify-between text-[10px] font-mono mb-0.5">
                <span className="text-muted-foreground">Simulated confidence</span>
                <span className="font-bold">{latest.plant.confidence}%</span>
              </div>
              <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
                <div className="h-full rounded-full" style={{ width: `${latest.plant.confidence}%`, background: STATUS_META[latest.plant.status]?.color }} />
              </div>
            </div>
            <p className="mt-1.5 text-[10px] text-muted-foreground italic">
              {latest.plant.status === "awaiting" ? "Possible match — a confidence value is a model output, not proof of identity." : latest.plant.status === "uncertain" ? "No reliable match — recapture and compare with references." : "Known class — subject to model limitations."}
            </p>
          </div>

          {/* verification controls */}
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-muted-foreground">Human review</span>
            <span className="text-[10px] font-bold" style={{ color: VERIFIED_META[latest.verified]?.color }}>{VERIFIED_META[latest.verified]?.label}</span>
          </div>
          <div className="grid grid-cols-3 gap-1.5">
            <button onClick={() => onVerify(latest.stationId, "verified")} className="inline-flex items-center justify-center gap-1 rounded-lg bg-brand-teal/15 border border-brand-teal/30 px-2 py-1.5 text-[10px] font-bold text-brand-teal hover:bg-brand-teal/25 transition-colors"><CheckCircle2 className="h-3 w-3" /> Verify</button>
            <button onClick={() => onVerify(latest.stationId, "rejected")} className="inline-flex items-center justify-center gap-1 rounded-lg bg-red-500/10 border border-red-500/30 px-2 py-1.5 text-[10px] font-bold text-red-700 hover:bg-red-500/20 transition-colors"><XCircle className="h-3 w-3" /> Reject</button>
            <button onClick={() => onVerify(latest.stationId, "uncertain")} className="inline-flex items-center justify-center gap-1 rounded-lg bg-amber-500/10 border border-amber-500/30 px-2 py-1.5 text-[10px] font-bold text-amber-600 hover:bg-amber-500/20 transition-colors"><HelpCircle className="h-3 w-3" /> Uncertain</button>
          </div>
          <p className="mt-1.5 text-[9px] text-muted-foreground italic">Simulated user action — not expert or scientific confirmation.</p>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-center text-muted-foreground py-6">
          <div><ShieldAlert className="h-8 w-8 mx-auto mb-2 opacity-40" /><p className="text-xs">No classifications yet. Start the simulation.</p></div>
        </div>
      )}

      {/* history */}
      <div className="mt-3 border-t border-border/50 pt-2">
        <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono mb-1 flex items-center gap-1"><History className="h-3 w-3" /> Observation History</p>
        <div className="space-y-1 max-h-24 overflow-y-auto">
          {history.length === 0 && <p className="text-[10px] text-muted-foreground">No records.</p>}
          {history.map((o) => (
            <div key={o.id} className="flex items-center justify-between text-[10px]">
              <span className="font-mono text-muted-foreground">{o.stationId}</span>
              <span className="text-foreground truncate ml-2 flex-1">{o.plant.class}</span>
              <span className="font-mono ml-2" style={{ color: VERIFIED_META[o.verified]?.color }}>{o.plant.confidence}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default memo(InvasiveFirewallPanel);