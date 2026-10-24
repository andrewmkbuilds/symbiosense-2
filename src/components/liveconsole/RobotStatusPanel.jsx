import { memo } from "react";
import { Battery, AlertTriangle, Gauge, Route, Radio } from "lucide-react";
import { formatSimTime } from "@/lib/liveConsole";

const STATE_META = {
  idle: { label: "Idle", color: "#9ABF82" },
  running: { label: "Exploring", color: "#438B78" },
  paused: { label: "Paused", color: "#C08552" },
  complete: { label: "Complete", color: "#438B78" },
};

function RobotStatusPanel({ sim }) {
  const inspecting = sim.cameraState === "capturing" || sim.cameraState === "classified";
  const stateLabel = sim.obstacle ? "Obstacle Detected" : sim.missionComplete ? "Complete" : sim.status === "paused" ? "Paused" : inspecting ? "Inspecting" : sim.status === "running" ? "Exploring" : "Idle";
  const stateColor = sim.obstacle ? "#B5654A" : (sim.status === "paused" ? "#C08552" : "#438B78");
  const batteryColor = sim.battery > 50 ? "#438B78" : sim.battery > 20 ? "#C08552" : "#B5654A";
  const stationName = sim.currentStationId === "base" ? "Base" : sim.currentStationId;

  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono">Robot Status</p>
        <span className="inline-flex items-center gap-1.5 rounded-full px-2 py-0.5 text-[10px] font-bold font-mono" style={{ color: stateColor, background: `${stateColor}1a` }}>
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: stateColor }} /> {stateLabel}
        </span>
      </div>
      <div className="grid grid-cols-2 gap-2.5">
        <Stat icon={<Radio className="h-3.5 w-3.5" />} label="Current Point" value={stationName} />
        <Stat icon={<Gauge className="h-3.5 w-3.5" />} label="Elapsed" value={formatSimTime(sim.simTime)} mono />
        <Stat icon={<Route className="h-3.5 w-3.5" />} label="Distance" value={`${sim.distance} u`} mono />
        <Stat icon={<AlertTriangle className="h-3.5 w-3.5" />} label="Obstacle" value={sim.obstacle ? "Detected" : "Clear"} color={sim.obstacle ? "#B5654A" : "#438B78"} />
      </div>
      {/* battery */}
      <div className="mt-3">
        <div className="flex items-center justify-between text-[10px] font-mono mb-1">
          <span className="inline-flex items-center gap-1 text-muted-foreground"><Battery className="h-3 w-3" /> Simulated Battery</span>
          <span style={{ color: batteryColor }}>{sim.battery.toFixed(0)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-secondary overflow-hidden">
          <div className="h-full rounded-full transition-all duration-300" style={{ width: `${sim.battery}%`, background: batteryColor }} />
        </div>
      </div>
      {/* last event */}
      <div className="mt-3 rounded-lg bg-secondary/50 px-2.5 py-2 border border-border/50">
        <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono mb-0.5">Last Event</p>
        <p className="text-[11px] text-foreground leading-tight line-clamp-2">{sim.lastEventText}</p>
      </div>
    </div>
  );
}

function Stat({ icon, label, value, mono, color }) {
  return (
    <div className="rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-2">
      <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono flex items-center gap-1">{icon} {label}</p>
      <p className={`text-sm font-bold leading-tight ${mono ? "font-mono" : ""}`} style={color ? { color } : undefined}>{value}</p>
    </div>
  );
}

export default memo(RobotStatusPanel);