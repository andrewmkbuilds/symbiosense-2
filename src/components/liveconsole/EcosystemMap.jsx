import { memo } from "react";
import { motion } from "framer-motion";
import { TREES, ROUTE, STATIONS, MAP_W, MAP_H } from "@/lib/liveConsole";
import RoverIcon from "./RoverIcon";

const STATUS_COLOR = {
  done: "#438B78",
  active: "#C08552",
  upcoming: "#9ABF82",
  base: "#173F32",
};

function EcosystemMap({ roverPos, roverHeading, currentStationId, observations, status, onInspectStation }) {
  const doneIds = new Set(observations.map((o) => o.stationId));
  const activeId = currentStationId;

  const stationState = (id) => {
    if (id === "base") return "base";
    if (doneIds.has(id)) return "done";
    if (id === activeId && status !== "idle") return "active";
    return "upcoming";
  };

  const toX = (x) => (x / MAP_W) * 100;
  const toY = (y) => (y / MAP_H) * 100;

  const roverSvgX = (roverPos.x / MAP_W) * 100;
  const roverSvgY = (roverPos.y / MAP_H) * 100;
  const moving = status === "running" || status === "paused";
  const travelledPts = ROUTE.filter((p) => p.id === "base" || doneIds.has(p.id) || p.id === activeId).map((p) => `${toX(p.x)},${toY(p.y)}`);
  if (moving) travelledPts.push(`${roverSvgX},${roverSvgY}`);

  return (
    <div className="relative w-full aspect-[100/62] rounded-2xl overflow-hidden border border-border/60 bg-[#0f2620] depth-shadow-md">
      {/* subtle grid */}
      <div className="absolute inset-0 opacity-20" style={{ backgroundImage: "linear-gradient(#9ABF8233 1px,transparent 1px),linear-gradient(90deg,#9ABF8233 1px,transparent 1px)", backgroundSize: "8% 8%" }} />
      <svg viewBox="0 0 100 62" className="absolute inset-0 w-full h-full" preserveAspectRatio="none">
        {/* route path */}
        <polyline
          points={ROUTE.map((p) => `${toX(p.x)},${toY(p.y)}`).join(" ")}
          fill="none" stroke="#9ABF82" strokeWidth={0.5} strokeDasharray="1.2 1" opacity={0.55}
        />
        {/* travelled portion — ends at the rover */}
        <polyline
          points={travelledPts.join(" ")}
          fill="none" stroke="#438B78" strokeWidth={0.7} opacity={0.8}
        />
        {/* trees */}
        {TREES.map((t, i) => (
          <g key={i}>
            <circle cx={toX(t.x)} cy={toY(t.y)} r={t.r * 0.5} fill="#173F32" opacity={0.85} />
            <circle cx={toX(t.x)} cy={toY(t.y)} r={t.r * 0.5 * 0.7} fill="#438B78" opacity={0.7} />
          </g>
        ))}
        {/* base */}
        <g>
          <rect x={toX(8) - 2.2} y={toY(54) - 1.4} width={4.4} height={2.8} rx={0.6} fill="#173F32" stroke="#9ABF82" strokeWidth={0.3} />
          <text x={toX(8)} y={toY(54) + 3.4} fontSize={2.1} fill="#9ABF82" textAnchor="middle" className="font-mono">BASE</text>
        </g>
        {/* stations */}
        {STATIONS.map((s, i) => {
          const st = stationState(s.id);
          const col = STATUS_COLOR[st];
          return (
            <g key={s.id} className="cursor-pointer group" onClick={() => onInspectStation?.(s.id)}>
              <title>{s.id} — {s.name}: {s.scenarioLabel}. Click to inspect.</title>
              <circle cx={toX(s.x)} cy={toY(s.y)} r={3.4} fill="transparent" />
              <circle cx={toX(s.x)} cy={toY(s.y)} r={2.6} fill="none" stroke="#F4F0E5" strokeWidth={0.5} opacity={0} className="group-hover:opacity-80 transition-opacity" />
              <circle cx={toX(s.x)} cy={toY(s.y)} r={2.1} fill={col} fillOpacity={0.25} stroke={col} strokeWidth={0.4} className={st === "active" ? "animate-pulse" : ""} />
              <circle cx={toX(s.x)} cy={toY(s.y)} r={1} fill={col} />
              <text x={toX(s.x)} y={toY(s.y) - 3} fontSize={2} fill="#F4F0E5" textAnchor="middle" className="font-mono" opacity={0.9}>{i + 1}</text>
              <text x={toX(s.x)} y={toY(s.y) + 4.2} fontSize={1.6} fill="#9ABF82" textAnchor="middle" className="font-mono">{s.id}</text>
            </g>
          );
        })}
        {/* rover */}
        <g transform={`translate(${roverSvgX} ${roverSvgY})`}>
          <RoverIcon size={3.4} heading={roverHeading} />
        </g>
      </svg>

      {/* legend */}
      <div className="absolute bottom-2 left-2 flex flex-wrap gap-2 text-[9px] font-mono">
        {[["Done", "#438B78"], ["Active", "#C08552"], ["Upcoming", "#9ABF82"]].map(([l, c]) => (
          <span key={l} className="inline-flex items-center gap-1 rounded-full bg-black/40 px-2 py-0.5 text-cream/90">
            <span className="h-2 w-2 rounded-full" style={{ background: c }} /> {l}
          </span>
        ))}
      </div>
      <span className="absolute top-2 right-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-mono text-cream/70">SIMULATED · fictional study area</span>
      <span className="absolute top-2 left-2 rounded-full bg-black/40 px-2 py-0.5 text-[9px] font-mono text-brand-leaf/90 flex items-center gap-1"><span className="h-1.5 w-1.5 rounded-full bg-brand-leaf animate-pulse" /> Click a point to inspect</span>
    </div>
  );
}

export default memo(EcosystemMap);