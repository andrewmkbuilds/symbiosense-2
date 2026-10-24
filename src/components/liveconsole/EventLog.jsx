import { memo, useState, useEffect, useRef } from "react";
import { Terminal, Trash2, Download } from "lucide-react";
import { EVENT_CATEGORIES, formatSimTime, observationsToCSV } from "@/lib/liveConsole";

const CAT_COLOR = {
  Robot: "#438B78",
  LichenGuard: "#9ABF82",
  Plant: "#C08552",
  BioRisk: "#B5654A",
};

function EventLog({ sim, onClear }) {
  const [active, setActive] = useState(["Robot", "LichenGuard", "Plant", "BioRisk"]);
  const toggle = (c) => setActive((a) => (a.includes(c) ? a.filter((x) => x !== c) : [...a, c]));
  const filtered = sim.events.filter((e) => active.includes(e.category));
  const logRef = useRef(null);
  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [filtered.length, sim.events.length]);

  const downloadCSV = () => {
    const csv = observationsToCSV(sim.observations);
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "symbiotix-live-console-simulated-records.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono flex items-center gap-1.5"><Terminal className="h-3.5 w-3.5" /> Live Event Log</p>
        <div className="flex gap-1.5">
          <button onClick={downloadCSV} className="inline-flex items-center gap-1 rounded-lg bg-secondary/60 border border-border/50 px-2 py-1 text-[10px] font-semibold text-foreground hover:bg-secondary transition-colors"><Download className="h-3 w-3" /> CSV</button>
          <button onClick={onClear} className="inline-flex items-center gap-1 rounded-lg bg-secondary/60 border border-border/50 px-2 py-1 text-[10px] font-semibold text-muted-foreground hover:text-destructive transition-colors"><Trash2 className="h-3 w-3" /> Clear</button>
        </div>
      </div>
      {/* filters */}
      <div className="flex flex-wrap gap-1.5 mb-2">
        {EVENT_CATEGORIES.map((c) => (
          <button key={c} onClick={() => toggle(c)} className={`rounded-full px-2 py-0.5 text-[10px] font-mono font-semibold border transition-colors ${active.includes(c) ? "text-primary-foreground border-transparent" : "bg-secondary/40 text-muted-foreground border-border/50"}`} style={active.includes(c) ? { background: CAT_COLOR[c] } : undefined}>{c}</button>
        ))}
      </div>
      <div ref={logRef} className="flex-1 overflow-y-auto rounded-lg bg-[#0f2620] border border-border/40 p-2 font-mono text-[10px] leading-relaxed" style={{ maxHeight: 280 }}>
        {filtered.length === 0 ? (
          <p className="text-cream/40 text-center py-4">No events yet. Start the simulation.</p>
        ) : (
          filtered.map((e) => (
            <div key={e.id} className="flex gap-2 py-0.5 border-b border-white/5">
              <span className="text-cream/50 shrink-0">{formatSimTime(e.time)}</span>
              <span className="shrink-0 font-bold" style={{ color: CAT_COLOR[e.category] }}>{e.category === "LichenGuard" ? "LICHEN" : e.category === "Plant" ? "PLANT" : e.category === "BioRisk" ? "BIORISK" : "ROBOT"}</span>
              <span className="text-cream/80">{e.text}</span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default memo(EventLog);