import { memo } from "react";
import { Camera, Leaf, ScanLine, CheckCircle2, AlertCircle, RefreshCw } from "lucide-react";

const PLANT_STATUS = {
  known: { label: "Known class", color: "#438B78" },
  awaiting: { label: "Awaiting human verification", color: "#C08552" },
  uncertain: { label: "Uncertain — no reliable match", color: "#B5654A" },
};

function CameraViewPanel({ sim, onInspectStation }) {
  const plant = sim.latestPlant;
  const lichen = sim.latestLichen;
  const capturing = sim.cameraState === "capturing";
  const classified = sim.cameraState === "classified";
  const station = sim.currentStationId;

  return (
    <div className="rounded-2xl glass-strong p-4 depth-shadow-md h-full flex flex-col">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs uppercase tracking-wide text-brand-teal font-bold font-mono">Phone Camera View</p>
        <span className="text-[10px] font-mono text-muted-foreground">{station === "base" ? "—" : station}</span>
      </div>
      {/* viewfinder */}
      <div className="relative flex-1 min-h-[140px] rounded-xl overflow-hidden border border-border/60 bg-gradient-to-br from-[#0f2620] to-[#173F32] flex items-center justify-center">
        {/* scanlines */}
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "repeating-linear-gradient(0deg,transparent,transparent 3px,#9ABF8215 3px,#9ABF8215 4px)" }} />
        {capturing && (
          <motion.div initial={{ y: "-100%" }} animate={{ y: "100%" }} transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }} className="absolute inset-x-0 h-8 bg-brand-teal/30 blur-sm" />
        )}
        {classified ? (
          <div className="text-center px-3">
            <Leaf className="h-9 w-9 mx-auto text-brand-leaf mb-1" />
            <p className="text-[10px] font-mono text-cream/80">{plant?.class || "—"}</p>
            <p className="text-[9px] font-mono text-cream/50">simulated classification</p>
          </div>
        ) : (
          <div className="text-center text-cream/40">
            <Camera className="h-8 w-8 mx-auto mb-1" />
            <p className="text-[10px] font-mono">{capturing ? "Capturing image…" : "Camera idle"}</p>
          </div>
        )}
        <span className="absolute top-1.5 left-1.5 rounded bg-black/40 px-1.5 py-0.5 text-[8px] font-mono text-cream/70 flex items-center gap-1"><ScanLine className="h-2.5 w-2.5" /> ILLUSTRATIVE</span>
        <span className="absolute top-1.5 right-1.5 flex items-center gap-1 rounded bg-black/40 px-1.5 py-0.5 text-[8px] font-mono text-cream/70">
          <span className="h-1.5 w-1.5 rounded-full" style={{ background: capturing ? "#C08552" : "#438B78" }} /> {capturing ? "REC" : "LIVE"}
        </span>
      </div>
      {/* detection result */}
      <div className="mt-3 space-y-2">
        <div className="flex items-center justify-between rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-1.5">
          <span className="text-[10px] font-mono text-muted-foreground flex items-center gap-1"><Leaf className="h-3 w-3" /> Plant Detection</span>
          {plant ? (
            <span className="text-[11px] font-bold" style={{ color: PLANT_STATUS[plant.status]?.color }}>{plant.class}</span>
          ) : <span className="text-[11px] text-muted-foreground">—</span>}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">Confidence (simulated)</span>
          <span className="text-[11px] font-bold font-mono">{plant ? `${plant.confidence}%` : "—"}</span>
        </div>
        <div className="flex items-center justify-between rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">Verification</span>
          {plant ? (
            <span className="text-[10px] font-bold flex items-center gap-1" style={{ color: PLANT_STATUS[plant.status]?.color }}>
              {plant.status === "known" ? <CheckCircle2 className="h-3 w-3" /> : <AlertCircle className="h-3 w-3" />} {PLANT_STATUS[plant.status]?.label}
            </span>
          ) : <span className="text-[11px] text-muted-foreground">—</span>}
        </div>
        <div className="flex items-center justify-between rounded-lg bg-secondary/40 border border-border/50 px-2.5 py-1.5">
          <span className="text-[10px] font-mono text-muted-foreground">Lichen Observed</span>
          <span className="text-[11px] font-bold">{lichen ? `${lichen.coverage}%` : "—"}</span>
        </div>
      </div>
      {station !== "base" && onInspectStation && (
        <button onClick={() => onInspectStation(station)} className="mt-3 inline-flex items-center justify-center gap-1.5 rounded-lg bg-brand-teal/15 border border-brand-teal/30 px-3 py-2 text-[11px] font-bold text-brand-teal hover:bg-brand-teal/25 transition-colors w-full">
          <RefreshCw className="h-3.5 w-3.5" /> Re-inspect this point
        </button>
      )}
    </div>
  );
}

import { motion } from "framer-motion";
export default memo(CameraViewPanel);