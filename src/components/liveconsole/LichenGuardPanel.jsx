import { memo } from "react";
import { Thermometer, Droplets, Sun, Leaf } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer, Tooltip } from "recharts";
import { formatSimTime } from "@/lib/liveConsole";

function LichenGuardPanel({ sim }) {
  const env = sim.latestEnv;
  const lichen = sim.latestLichen;
  const points = sim.chartPoints;

  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono">LichenGuard · Environmental</p>
        <span className="text-[9px] font-mono text-muted-foreground">{sim.currentStationId === "base" ? "—" : sim.currentStationId}</span>
      </div>
      {/* live readings */}
      <div className="grid grid-cols-3 gap-2">
        <Reading icon={<Thermometer className="h-3.5 w-3.5" />} label="Temp" value={env ? `${env.temp}°` : "—"} color="#B5654A" />
        <Reading icon={<Droplets className="h-3.5 w-3.5" />} label="Humidity" value={env ? `${env.humidity}%` : "—"} color="#438B78" />
        <Reading icon={<Sun className="h-3.5 w-3.5" />} label="Light" value={env ? (env.light != null ? `${(env.light / 1000).toFixed(1)}k` : "N/A") : "—"} color="#C08552" />
      </div>
      {/* charts */}
      <div className="mt-3 grid grid-cols-1 gap-2">
        <MiniChart data={points} dataKey="temp" color="#B5654A" label="Temperature (°C)" />
        <MiniChart data={points} dataKey="humidity" color="#438B78" label="Humidity (%)" />
        <MiniChart data={points} dataKey="light" color="#C08552" label="Light (lux)" nullOk />
      </div>
      {/* lichen observation */}
      <div className="mt-3 rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-2">
        <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono mb-1 flex items-center gap-1"><Leaf className="h-3 w-3" /> Latest Lichen Observation</p>
        {lichen ? (
          <div className="text-[11px] text-foreground leading-snug">
            <p><span className="font-bold">{lichen.present ? "Present" : "Not observed"}</span>{lichen.present ? ` · ${lichen.coverage}% coverage` : ""}</p>
            <p className="text-muted-foreground">{lichen.forms.join(", ")}</p>
            <p className="text-muted-foreground italic text-[10px] mt-0.5">{lichen.notes}</p>
          </div>
        ) : <p className="text-[11px] text-muted-foreground">No observation yet.</p>}
      </div>
      <p className="mt-2 text-[9px] text-muted-foreground italic">Simulated readings — not physical sensor measurements. Lichen patterns can indicate stress but are also influenced by moisture, shade, habitat and tree type.</p>
    </div>
  );
}

function Reading({ icon, label, value, color }) {
  return (
    <div className="rounded-lg bg-secondary/40 border border-border/50 px-2 py-1.5 text-center">
      <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono flex items-center justify-center gap-1" style={{ color }}>{icon} {label}</p>
      <p className="text-sm font-bold font-mono">{value}</p>
    </div>
  );
}

function MiniChart({ data, dataKey, color, label, nullOk }) {
  const chartData = nullOk ? data.map((d) => ({ ...d, [dataKey]: d[dataKey] == null ? null : d[dataKey] })) : data;
  return (
    <div className="rounded-lg bg-secondary/30 border border-border/40 px-2 py-1.5">
      <p className="text-[9px] font-mono text-muted-foreground mb-0.5">{label}</p>
      <div className="h-12">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData} margin={{ top: 2, right: 4, bottom: 0, left: -28 }}>
            <XAxis dataKey="t" hide />
            <YAxis tick={{ fontSize: 7, fill: "#888" }} width={28} domain={["auto", "auto"]} />
            <Tooltip contentStyle={{ fontSize: 10, borderRadius: 8, padding: "4px 8px" }} labelFormatter={(v) => `t=${formatSimTime(v)}`} />
            <Line type="monotone" dataKey={dataKey} stroke={color} strokeWidth={1.5} dot={false} isAnimationActive={false} connectNulls />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default memo(LichenGuardPanel);