import { memo } from "react";
import { Table2 } from "lucide-react";
import { formatSimTime, PRIORITY_META } from "@/lib/liveConsole";

const VERIFIED_BADGE = {
  pending: { label: "Pending", color: "#C08552" },
  verified: { label: "Verified", color: "#438B78" },
  rejected: { label: "Rejected", color: "#B5654A" },
  uncertain: { label: "Uncertain", color: "#B5654A" },
  "not-required": { label: "N/A", color: "#9ABF82" },
};

function ObservationTable({ sim }) {
  const rows = sim.observations;
  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono flex items-center gap-1.5"><Table2 className="h-3.5 w-3.5" /> Observation Records</p>
        <span className="text-[10px] font-mono text-muted-foreground">{rows.length} records · all simulated</span>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-[11px]">
          <thead>
            <tr className="text-left text-muted-foreground font-mono border-b border-border/50">
              <th className="py-1.5 pr-3">Station</th>
              <th className="py-1.5 pr-3">Time</th>
              <th className="py-1.5 pr-3">Lichen</th>
              <th className="py-1.5 pr-3">Temp</th>
              <th className="py-1.5 pr-3">Humidity</th>
              <th className="py-1.5 pr-3">Light</th>
              <th className="py-1.5 pr-3">Plant Class</th>
              <th className="py-1.5 pr-3">Conf.</th>
              <th className="py-1.5 pr-3">Verified</th>
              <th className="py-1.5 pr-3">Priority</th>
            </tr>
          </thead>
          <tbody>
            {rows.length === 0 && (
              <tr><td colSpan={10} className="py-6 text-center text-muted-foreground">No records yet. Run the simulation to generate observations.</td></tr>
            )}
            {rows.map((o) => {
              const meta = PRIORITY_META[o.priority.level];
              const v = VERIFIED_BADGE[o.verified];
              return (
                <tr key={o.id} className="border-b border-border/30 hover:bg-secondary/30">
                  <td className="py-1.5 pr-3 font-mono font-bold">{o.stationId}</td>
                  <td className="py-1.5 pr-3 font-mono text-muted-foreground">{formatSimTime(o.simTime)}</td>
                  <td className="py-1.5 pr-3">{o.lichen.present ? `${o.lichen.coverage}%` : "—"}</td>
                  <td className="py-1.5 pr-3 font-mono">{o.env.temp}°</td>
                  <td className="py-1.5 pr-3 font-mono">{o.env.humidity}%</td>
                  <td className="py-1.5 pr-3 font-mono">{o.env.light ?? "N/A"}</td>
                  <td className="py-1.5 pr-3">{o.plant.class}</td>
                  <td className="py-1.5 pr-3 font-mono">{o.plant.confidence}%</td>
                  <td className="py-1.5 pr-3"><span className="font-bold" style={{ color: v.color }}>{v.label}</span></td>
                  <td className="py-1.5 pr-3"><span className="rounded-full px-2 py-0.5 text-[10px] font-bold font-mono" style={{ color: meta.color, background: `${meta.color}1f` }}>{meta.label}</span></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default memo(ObservationTable);