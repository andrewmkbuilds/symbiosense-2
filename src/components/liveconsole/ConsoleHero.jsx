import { Link } from "react-router-dom";
import { Play, Pause, RotateCcw, Zap, StepForward, Gauge, ArrowLeft, Activity, Radio } from "lucide-react";
import Starfield from "@/components/effects/Starfield";
import Aurora from "@/components/effects/Aurora";
import Grainient from "@/components/effects/Grainient";
import GradientText from "@/components/effects/GradientText";
import { formatSimTime, STATIONS } from "@/lib/liveConsole";

const SPEEDS = [1, 2, 4];

export default function ConsoleHero({ sim, controls }) {
  const { start, pause, resume, reset, runOne, setSpeed } = controls;
  const running = sim.status === "running";
  const paused = sim.status === "paused";
  const idle = sim.status === "idle";
  const complete = sim.status === "complete";

  return (
    <section id="top" className="relative pt-24 pb-6 overflow-hidden">
      <div className="absolute inset-0 -z-30"><Starfield starCount={120} speed={0.01} starColor="#9ABF82" glowColor="#438B78" baseSize={0.9} /></div>
      <div className="absolute inset-0 -z-20"><Aurora colorStops={["#173F32", "#438B78", "#9ABF82"]} amplitude={0.8} height={0.4} speed={0.3} blend={0.5} opacity={0.22} layers={2} direction="top" /></div>
      <div className="absolute inset-0 -z-10"><Grainient colors={["#173F32", "#438B78", "#9ABF82", "#F4F0E5"]} angle={55} flow={0.3} speed={0.25} grainAmount={0.03} opacity={0.1} /></div>

      <div className="mx-auto max-w-7xl px-4 sm:px-8">
        {/* Title row */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-4">
          <div>
            <Link to="/innovation" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:text-primary transition-colors mb-2">
              <ArrowLeft className="h-3.5 w-3.5" /> Back to SYMBIOSENSE Project
            </Link>
            <h1 className="font-display text-3xl sm:text-5xl font-bold tracking-tight text-3d text-glow-soft">
              <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={6}>SYMBIOSENSE Live Console</GradientText>
            </h1>
            <p className="mt-1 text-sm text-muted-foreground">Interactive ecosystem-monitoring simulation · FIRST CANOPY 2026–27</p>
            <p className="mt-1 text-xs font-semibold text-amber-700">
              Simulated demo — no real robots, cameras or sensors are connected.
            </p>
          </div>
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-bold text-amber-700 self-start">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-amber-500 opacity-60 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-amber-500" /></span>
            DEMO SIMULATION · NOT REAL DATA
          </span>
        </div>

        {/* Control bar */}
        <div className="rounded-2xl glass-strong depth-shadow-lg p-3 sm:p-4">
          <div className="flex flex-wrap items-center gap-3">
            {/* status pills */}
            <div className="flex flex-wrap items-center gap-2">
              <StatusPill icon={<Activity className="h-3.5 w-3.5" />} label="Status" value={complete ? "Complete" : idle ? "Idle" : paused ? "Paused" : running ? "Exploring" : "Idle"} color={complete ? "#438B78" : paused ? "#C08552" : running ? "#438B78" : "#9ABF82"} />
              <StatusPill icon={<Radio className="h-3.5 w-3.5" />} label="Point" value={sim.currentStationId === "base" ? "Base" : sim.currentStationId} />
              <StatusPill icon={<Gauge className="h-3.5 w-3.5" />} label="Elapsed" value={formatSimTime(sim.simTime)} mono />
            </div>

            {/* controls */}
            <div className="flex flex-wrap items-center gap-1.5 ml-auto">
              {(idle || complete) && (
                <button onClick={start} className="inline-flex items-center gap-1.5 rounded-full bg-primary px-3.5 py-2 text-xs font-bold text-primary-foreground btn-3d btn-glow"><Play className="h-3.5 w-3.5" /> {complete ? "Restart" : "Start Simulation"}</button>
              )}
              {running && (
                <button onClick={pause} className="inline-flex items-center gap-1.5 rounded-full bg-amber-600 px-3.5 py-2 text-xs font-bold text-white btn-3d"><Pause className="h-3.5 w-3.5" /> Pause</button>
              )}
              {paused && (
                <button onClick={resume} className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal px-3.5 py-2 text-xs font-bold text-white btn-3d btn-glow"><Play className="h-3.5 w-3.5" /> Resume</button>
              )}
              <button onClick={runOne} disabled={complete} className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-2 text-xs font-bold text-primary hover:bg-white/70 transition-colors disabled:opacity-40"><StepForward className="h-3.5 w-3.5" /> Run One Inspection</button>
              <button onClick={reset} className="inline-flex items-center gap-1.5 rounded-full glass px-3.5 py-2 text-xs font-bold text-muted-foreground hover:text-destructive transition-colors"><RotateCcw className="h-3.5 w-3.5" /> Reset</button>
              {/* speed */}
              <div className="inline-flex items-center gap-1 rounded-full glass px-1.5 py-1">
                <Zap className="h-3.5 w-3.5 text-brand-teal" />
                {SPEEDS.map((s) => (
                  <button key={s} onClick={() => setSpeed(s)} className={`rounded-full px-2 py-1 text-[10px] font-bold font-mono transition-colors ${sim.speed === s ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-primary"}`}>{s}×</button>
                ))}
              </div>
            </div>
          </div>
          {/* mission progress */}
          <div className="mt-3">
            <div className="flex items-center justify-between text-[10px] font-mono mb-1">
              <span className="text-muted-foreground">Mission progress</span>
              <span className="font-bold text-brand-teal">{sim.observations.length}/{STATIONS.length} points inspected</span>
            </div>
            <div className="h-1.5 rounded-full bg-secondary/60 overflow-hidden">
              <div className="h-full rounded-full bg-brand-teal transition-all duration-500" style={{ width: `${(sim.observations.length / STATIONS.length) * 100}%` }} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatusPill({ icon, label, value, color, mono }) {
  return (
    <div className="inline-flex items-center gap-2 rounded-full bg-secondary/50 border border-border/50 px-3 py-1.5">
      <span className="text-brand-teal">{icon}</span>
      <div className="leading-none">
        <p className="text-[9px] uppercase tracking-wide text-muted-foreground font-mono">{label}</p>
        <p className={`text-xs font-bold ${mono ? "font-mono" : ""}`} style={color ? { color } : undefined}>{value}</p>
      </div>
    </div>
  );
}