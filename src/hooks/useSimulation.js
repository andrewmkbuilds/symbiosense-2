import { useState, useEffect, useRef, useCallback } from "react";
import {
  BASE, PLAN, STATIONS, ROUTE, liveEnv, computeStationPriority,
  lerpPos, angle, easeInOut, dist,
} from "@/lib/liveConsole";

const initialSim = () => ({
  status: "idle", // idle | running | paused | complete
  speed: 1,
  simTime: 0,
  phaseIndex: 0,
  phaseStart: 0,
  roverPos: { ...BASE },
  roverHeading: 0,
  battery: 100,
  distance: 0,
  obstacle: false,
  currentStationId: "base",
  cameraState: "idle", // idle | capturing | classified
  latestPlant: null,
  latestLichen: null,
  latestEnv: null,
  latestPriority: null,
  lastEventText: "Ready. Press Start Simulation to begin the demo mission.",
  missionComplete: false,
  events: [],
  observations: [],
  chartPoints: [],
  lastChart: 0,
  pendingEnv: null,
  singleStep: false,
});

export function useSimulation() {
  const [sim, setSim] = useState(initialSim);
  const r = useRef(sim);
  r.current = sim;
  const rafRef = useRef(null);
  const prevFrameRef = useRef(0);

  const pushEvent = (simObj, category, text) => {
    simObj.events = [...simObj.events, { id: Date.now() + Math.random(), time: simObj.simTime, category, text }];
    simObj.lastEventText = text;
  };

  const enterPhase = (simObj, i) => {
    simObj.phaseIndex = i;
    simObj.phaseStart = simObj.simTime;
    const phase = PLAN[i];
    if (!phase) return;
    if (phase.kind === "travel") {
      simObj.currentStationId = phase.to.id;
      simObj.cameraState = "idle";
      simObj.obstacle = false;
      pushEvent(simObj, "Robot", `Rover departed for ${phase.to.id}${phase.to.isBase ? "" : " — " + phase.to.name}.`);
    } else if (phase.kind === "inspect") {
      const st = phase.station;
      if (phase.substep === "capture") {
        simObj.cameraState = "capturing";
        pushEvent(simObj, "Plant", `Image captured at ${st.id} (${st.name}).`);
      } else if (phase.substep === "classify") {
        simObj.latestPlant = { ...st.plant };
        simObj.cameraState = "classified";
        pushEvent(simObj, "Plant", `Image classification complete: ${st.plant.class} (${st.plant.confidence}% simulated confidence).`);
        if (st.plant.status === "awaiting") pushEvent(simObj, "Plant", `Possible match flagged for human verification at ${st.id}.`);
      } else if (phase.substep === "lichen") {
        simObj.latestLichen = { ...st.lichen };
        pushEvent(simObj, "LichenGuard", `Lichen observation saved at ${st.id} — ${st.lichen.coverage}% coverage.`);
      } else if (phase.substep === "env") {
        const env = liveEnv(simObj.simTime, st);
        simObj.latestEnv = env;
        simObj.pendingEnv = { ...env };
        pushEvent(simObj, "LichenGuard", `Environmental readings recorded at ${st.id} — ${env.temp}°C, ${env.humidity}% RH${env.light != null ? `, ${env.light} lux` : "."}`);
      } else if (phase.substep === "biorisk") {
        const st2 = phase.station;
        const envSnap = simObj.pendingEnv || liveEnv(simObj.simTime, st2);
        const priority = computeStationPriority(st2, envSnap);
        simObj.latestPriority = { ...priority, stationId: st2.id };
        const verified = st2.plant.status === "known" ? "not-required" : "pending";
        const obs = {
          id: st2.id, stationId: st2.id, stationName: st2.name, simTime: simObj.simTime,
          lichen: { ...st2.lichen }, env: { ...envSnap }, plant: { ...st2.plant },
          verified, priority,
        };
        simObj.observations = [...simObj.observations, obs];
        pushEvent(simObj, "BioRisk", `Investigation priority for ${st2.id} updated → ${priority.level.toUpperCase()}.`);
        if (simObj.singleStep) {
          simObj.singleStep = false;
          simObj.status = "paused";
        }
      }
    } else if (phase.kind === "complete") {
      simObj.missionComplete = true;
      simObj.status = "complete";
      simObj.currentStationId = "base";
      pushEvent(simObj, "Robot", "Rover returned to base. Demo mission complete.");
    }
  };

  const step = (dt) => {
    const next = { ...r.current };
    next.simTime += dt;
    next.battery = Math.max(0, +(next.battery - dt * 0.12).toFixed(1));
    const phase = PLAN[next.phaseIndex];
    if (!phase) { next.status = "complete"; next.missionComplete = true; setSim(next); return; }

    if (phase.kind === "travel") {
      const dur = phase.duration;
      const prog = Math.min(1, (next.simTime - next.phaseStart) / dur);
      next.roverPos = lerpPos(phase.from, phase.to, easeInOut(prog));
      next.roverHeading = angle(phase.from, phase.to);
      next.currentStationId = phase.to.id;
      next.distance = +(next.distance + dt * 8).toFixed(1);
      if (phase.obstacle && prog >= 0.5 && prog < 0.62 && !next.obstacle) {
        next.obstacle = true;
        pushEvent(next, "Robot", `Obstacle detected en route to ${phase.to.id} — rover adjusting course.`);
      }
      if (next.obstacle && prog >= 0.62) next.obstacle = false;
    } else if (phase.kind === "inspect") {
      next.latestEnv = liveEnv(next.simTime, phase.station);
      if (next.simTime - next.lastChart >= 1) {
        next.lastChart = next.simTime;
        next.chartPoints = [...next.chartPoints, { t: next.simTime, ...next.latestEnv }];
      }
    }

    const prog = (next.simTime - next.phaseStart) / phase.duration;
    if (prog >= 1) {
      enterPhase(next, next.phaseIndex + 1);
    }
    setSim(next);
  };

  // Animation loop
  useEffect(() => {
    const loop = (now) => {
      rafRef.current = requestAnimationFrame(loop);
      if (r.current.status !== "running") { prevFrameRef.current = now; return; }
      const raw = prevFrameRef.current ? (now - prevFrameRef.current) / 1000 : 0.016;
      prevFrameRef.current = now;
      const dt = Math.min(0.05, raw) * r.current.speed;
      if (dt > 0) step(dt);
    };
    rafRef.current = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(rafRef.current);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // ---- Controls ----
  const start = useCallback(() => {
    setSim((prev) => {
      if (prev.status === "running") return prev;
      let next = { ...prev, status: "running", singleStep: false };
      if (prev.status === "complete") next = { ...initialSim(), status: "running" };
      if (next.phaseIndex === 0 && next.events.length === 0) enterPhase(next, 0);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const pause = useCallback(() => {
    setSim((prev) => (prev.status === "running" ? { ...prev, status: "paused" } : prev));
  }, []);

  const resume = useCallback(() => {
    setSim((prev) => (prev.status === "paused" ? { ...prev, status: "running" } : prev));
  }, []);

  const reset = useCallback(() => {
    setSim(initialSim());
  }, []);

  const runOne = useCallback(() => {
    setSim((prev) => {
      if (prev.status === "complete") return prev;
      const next = { ...prev, singleStep: true, status: "running" };
      if (next.phaseIndex === 0 && next.events.length === 0) enterPhase(next, 0);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const setSpeed = useCallback((v) => {
    setSim((prev) => ({ ...prev, speed: v }));
  }, []);

  const setVerified = useCallback((stationId, status) => {
    setSim((prev) => {
      const next = { ...prev };
      next.observations = prev.observations.map((o) =>
        o.stationId === stationId ? { ...o, verified: status } : o
      );
      const label = status === "verified" ? "verified" : status === "rejected" ? "rejected" : "marked uncertain";
      next.events = [...prev.events, { id: Date.now() + Math.random(), time: prev.simTime, category: "Plant", text: `Human review: ${stationId} ${label}. (Simulated user action — not expert confirmation.)` }];
      next.lastEventText = `Human review: ${stationId} ${label}.`;
      return next;
    });
  }, []);

  const clearLog = useCallback(() => {
    setSim((prev) => ({ ...prev, events: [], lastEventText: "Event log cleared." }));
  }, []);

  // Jump the rover to a station and run its inspection sequence (user-initiated).
  const inspectStation = useCallback((stationId) => {
    setSim((prev) => {
      if (prev.status === "complete") return prev;
      const station = STATIONS.find((s) => s.id === stationId);
      if (!station) return prev;
      const phaseIdx = PLAN.findIndex((p) => p.kind === "inspect" && p.substep === "capture" && p.station && p.station.id === stationId);
      if (phaseIdx < 0) return prev;
      const next = { ...prev, status: "running", singleStep: false };
      next.phaseIndex = phaseIdx;
      next.phaseStart = next.simTime;
      next.roverPos = { x: station.x, y: station.y };
      next.roverHeading = 0;
      next.currentStationId = stationId;
      next.cameraState = "idle";
      next.obstacle = false;
      next.events = [...prev.events, { id: Date.now() + Math.random(), time: next.simTime, category: "Robot", text: `Manual inspection requested at ${stationId} — ${station.name}.` }];
      next.lastEventText = `Manual inspection requested at ${stationId}.`;
      enterPhase(next, phaseIdx);
      return next;
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return { sim, stations: STATIONS, route: ROUTE, start, pause, resume, reset, runOne, setSpeed, setVerified, clearLog, inspectStation };
}