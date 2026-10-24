// SYMBIOTIX Live Console — simulation engine.
// ALL values are SIMULATED DEMO DATA. Not real robot telemetry, sensor readings,
// or scientifically validated predictions. See ConsoleInfo "Limitations" panel.

export const MAP_W = 100;
export const MAP_H = 62;

export const BASE = { id: "base", name: "Base Station", x: 8, y: 54, isBase: true };

// Six fictional observation stations, each demonstrating a different scenario.
export const STATIONS = [
  {
    id: "P-01", name: "Canopy Edge", x: 20, y: 38,
    scenario: "native", scenarioLabel: "Known native plant — full data",
    lichen: { present: true, coverage: 68, forms: ["crustose", "foliose"], notes: "Diverse lichen cover on mature oak bark." },
    plant: { class: "Known native plant", confidence: 93, status: "known" },
    env: { tempOffset: 0, humOffset: 0, lightOffset: 0, lightAvailable: true },
  },
  {
    id: "P-02", name: "Forest Clearing", x: 37, y: 16,
    scenario: "invasive-match", scenarioLabel: "Possible invasive species A",
    lichen: { present: true, coverage: 28, forms: ["crustose"], notes: "Sparse lichen; possible stress indicator on this trunk." },
    plant: { class: "Possible invasive species A", confidence: 82, status: "awaiting" },
    env: { tempOffset: 1.8, humOffset: -7, lightOffset: 1600, lightAvailable: true },
  },
  {
    id: "P-03", name: "Shaded Hollow", x: 54, y: 44,
    scenario: "uncertain", scenarioLabel: "Unclassified plant",
    lichen: { present: true, coverage: 52, forms: ["foliose"], notes: "Moderate foliose cover in shaded hollow." },
    plant: { class: "Unclassified plant", confidence: 41, status: "uncertain" },
    env: { tempOffset: -1.2, humOffset: 6, lightOffset: -2200, lightAvailable: true },
  },
  {
    id: "P-04", name: "Rocky Outcrop", x: 71, y: 22,
    scenario: "incomplete", scenarioLabel: "Incomplete environmental record",
    lichen: { present: true, coverage: 44, forms: ["crustose"], notes: "Patchy crustose on rock surface." },
    plant: { class: "Known native plant", confidence: 78, status: "known" },
    env: { tempOffset: 2.4, humOffset: -10, lightOffset: 0, lightAvailable: false },
  },
  {
    id: "P-05", name: "Stream Bank", x: 86, y: 50,
    scenario: "repeat", scenarioLabel: "Poor image — repeat needed",
    lichen: { present: true, coverage: 58, forms: ["foliose", "fruticose"], notes: "Good cover near moist stream bank." },
    plant: { class: "Unclassified plant", confidence: 36, status: "uncertain" },
    env: { tempOffset: -0.6, humOffset: 9, lightOffset: 800, lightAvailable: true },
  },
  {
    id: "P-06", name: "Meadow Border", x: 66, y: 72,
    scenario: "complete", scenarioLabel: "All planned checks completed",
    lichen: { present: true, coverage: 71, forms: ["crustose", "foliose", "fruticose"], notes: "Healthy, diverse cover at forest edge." },
    plant: { class: "Known native plant", confidence: 90, status: "known" },
    env: { tempOffset: 0.8, humOffset: -2, lightOffset: 1200, lightAvailable: true },
  },
];

export const ROUTE = [BASE, ...STATIONS, BASE];

// Decorative map features (trees, vegetation, lichen points) — fictional.
export const TREES = [
  { x: 12, y: 24, r: 3 }, { x: 28, y: 28, r: 2.4 }, { x: 44, y: 30, r: 3.2 },
  { x: 60, y: 34, r: 2.6 }, { x: 78, y: 38, r: 3 }, { x: 30, y: 52, r: 2.8 },
  { x: 48, y: 58, r: 3.4 }, { x: 80, y: 64, r: 2.6 }, { x: 18, y: 66, r: 2.2 },
  { x: 52, y: 12, r: 2.4 }, { x: 90, y: 30, r: 2.2 }, { x: 40, y: 64, r: 2 },
];

// ---- Geometry helpers ----
export const dist = (a, b) => Math.hypot(a.x - b.x, a.y - b.y);
export const lerp = (a, b, t) => a + (b - a) * t;
export function lerpPos(a, b, t) { return { x: lerp(a.x, b.x, t), y: lerp(a.y, b.y, t) }; }
export function angle(a, b) { return (Math.atan2(b.y - a.y, b.x - a.x) * 180) / Math.PI; }
export const easeInOut = (t) => (t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2);

// ---- Live environmental readings (deterministic drift) ----
export function liveEnv(simTime, station) {
  const st = station && !station.isBase ? station : null;
  const temp = +((22 + 3.5 * Math.sin(simTime * 0.12)) + (st?.env.tempOffset || 0)).toFixed(1);
  const humidity = Math.max(0, Math.round(58 + 9 * Math.cos(simTime * 0.09) + (st?.env.humOffset || 0)));
  const lightAvailable = st ? st.env.lightAvailable : true;
  const light = lightAvailable ? Math.max(0, Math.round(8200 + 1800 * Math.sin(simTime * 0.06) + (st?.env.lightOffset || 0))) : null;
  return { temp, humidity, light, lightAvailable };
}

// ---- BioRisk AI: transparent, rule-based investigation priority ----
export const PRIORITY_META = {
  low: { label: "Low", color: "#438B78", text: "text-brand-teal" },
  medium: { label: "Medium", color: "#C08552", text: "text-amber-600" },
  high: { label: "High", color: "#B5654A", text: "text-red-700" },
};

export function computeStationPriority(station, envSnapshot) {
  const plant = station.plant;
  const lichen = station.lichen;
  const evidence = [];
  const concerns = [];
  const missing = [];
  let action = "";
  let level = "low";

  evidence.push(`Lichen: ${lichen.present ? `${lichen.coverage}% visible coverage (${lichen.forms.join(", ")})` : "none observed"}.`);
  evidence.push(`Environment: ${envSnapshot.temp}°C, ${envSnapshot.humidity}% RH${envSnapshot.light != null ? `, ${envSnapshot.light} lux` : ", light unavailable"}.`);
  evidence.push(`Plant image: ${plant.class} (${plant.confidence}% simulated confidence).`);

  if (plant.status === "awaiting") {
    concerns.push("Possible invasive-plant match requires human verification.");
    level = "medium";
    if (lichen.coverage < 40) {
      concerns.push("Low lichen coverage may indicate environmental stress, but lichen alone does not prove a cause.");
      level = "high";
    }
    action = "Have a human review the plant image against a trusted regional reference, then repeat the lichen observation with a consistent field method.";
  } else if (plant.status === "uncertain") {
    concerns.push("Image classification uncertain — no reliable match returned.");
    level = "medium";
    action = "Reposition the rover, recapture the image under better lighting, and compare with reference samples.";
  } else if (!envSnapshot.lightAvailable) {
    missing.push("Light-level reading unavailable for this station.");
    level = "medium";
    action = "Revisit the station with a light meter to complete the environmental record before finalising priority.";
  } else {
    action = "No urgent action. Continue routine monitoring.";
  }
  if (!lichen.present) missing.push("No lichen observed — record habitat context (shade, moisture, tree species).");

  return { level, evidence, concerns, missing, action };
}

// ---- Build the mission plan (ordered list of phases) ----
export function buildPlan() {
  const plan = [];
  for (let i = 0; i < ROUTE.length - 1; i++) {
    const from = ROUTE[i];
    const to = ROUTE[i + 1];
    const d = dist(from, to);
    plan.push({
      kind: "travel",
      from, to,
      stationIndex: i,
      duration: Math.max(4, d * 0.22),
      obstacle: !to.isBase && to.scenario === "incomplete",
    });
    if (!to.isBase) {
      for (const sub of ["capture", "classify", "lichen", "env", "biorisk"]) {
        plan.push({ kind: "inspect", substep: sub, station: to, stationIndex: i, duration: 2.2 });
      }
    }
  }
  plan.push({ kind: "complete", duration: 0.6 });
  return plan;
}

export const PLAN = buildPlan();

// ---- Formatting & CSV ----
export function formatSimTime(sec) {
  const s = Math.max(0, Math.floor(sec));
  const m = Math.floor(s / 60);
  return `${String(m).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
}

export function observationsToCSV(rows) {
  const header = ["# SIMULATED DEMO DATA - SYMBIOTIX Live Console - NOT real sensor/robot telemetry"];
  const cols = ["Station", "SimTime", "LichenPresent", "LichenCoveragePct", "LichenForms", "TempC", "HumidityPct", "LightLux", "PlantClass", "ConfidencePct", "PlantStatus", "Verified", "Priority", "RecommendedAction"];
  const esc = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;
  const lines = rows.map((r) =>
    [r.stationId, formatSimTime(r.simTime), r.lichen.present, r.lichen.coverage, r.lichen.forms.join("; "), r.env.temp, r.env.humidity, r.env.light ?? "N/A", r.plant.class, r.plant.confidence, r.plant.status, r.verified, r.priority.level, r.priority.action]
      .map(esc).join(",")
  );
  return [header.join(","), cols.join(","), ...lines].join("\n");
}

export const EVENT_CATEGORIES = ["Robot", "LichenGuard", "Plant", "BioRisk"];