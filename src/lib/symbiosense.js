// Shared scoring engine and configuration for the SYMBIOSENSE interactive demo.
// All values are illustrative — this is an educational simulation, not a validated model.

export const INPUTS = [
  {
    key: "lichenDiversity",
    label: "Lichen Diversity",
    short: "Lichen",
    description: "Observed variety and growth of lichen on bark. Low diversity can signal environmental stress.",
    min: 0,
    max: 10,
    step: 1,
    // higher value = healthier = LESS risk; stress = (max - value)
    inverse: true,
    weight: 0.2,
    color: "#9ABF82",
  },
  {
    key: "pollution",
    label: "Environmental Pollution Indicator",
    short: "Pollution",
    description: "Illustrative air / water pollution reading. Higher values suggest greater environmental load.",
    min: 0,
    max: 10,
    step: 1,
    inverse: false,
    weight: 0.2,
    color: "#438B78",
  },
  {
    key: "disturbance",
    label: "Habitat Disturbance",
    short: "Disturbance",
    description: "Degree of habitat disruption (e.g. clearing, fragmentation, human activity).",
    min: 0,
    max: 10,
    step: 1,
    inverse: false,
    weight: 0.25,
    color: "#C08552",
  },
  {
    key: "invasiveConfidence",
    label: "Invasive-Plant Detection Confidence",
    short: "Invasive",
    description: "AI-assisted image-classification confidence that a flagged plant may be invasive. A flag for human verification.",
    min: 0,
    max: 10,
    step: 1,
    inverse: false,
    weight: 0.35,
    color: "#B5654A",
  },
];

export const DEFAULT_INPUTS = {
  lichenDiversity: 5,
  pollution: 5,
  disturbance: 5,
  invasiveConfidence: 5,
};

export const PRESETS = [
  {
    id: "healthy",
    name: "Healthy Woodland",
    summary: "Diverse lichen, low pollution, minimal disturbance, no invasive flags.",
    inputs: { lichenDiversity: 9, pollution: 1, disturbance: 1, invasiveConfidence: 1 },
  },
  {
    id: "stress",
    name: "Possible Environmental Stress",
    summary: "Low lichen diversity and elevated pollution suggest ecosystem stress.",
    inputs: { lichenDiversity: 3, pollution: 8, disturbance: 6, invasiveConfidence: 2 },
  },
  {
    id: "invasive",
    name: "Possible Invasive Plants",
    summary: "High AI confidence on a flagged plant species; other indicators moderate.",
    inputs: { lichenDiversity: 5, pollution: 4, disturbance: 7, invasiveConfidence: 10 },
  },
];

export const SITES = [
  { id: "north-ridge", name: "North Ridge Woodland", region: "Upland oak–birch" },
  { id: "creek-valley", name: "Creek Valley Riparian", region: "Streamside habitat" },
  { id: "old-quarry", name: "Old Quarry Edge", region: "Disturbed ground" },
  { id: "meadow-border", name: "Meadow Border", region: "Grassland–forest transition" },
];

export function computeRisk(inputs) {
  const contributions = INPUTS.map((cfg) => {
    const raw = inputs[cfg.key] ?? 0;
    // normalise to 0–100 stress score (inverse inputs flip direction)
    const stress = cfg.inverse ? (cfg.max - raw) : raw;
    const stressPct = (stress / cfg.max) * 100;
    const contribution = +(stressPct * cfg.weight).toFixed(1);
    return {
      key: cfg.key,
      label: cfg.label,
      short: cfg.short,
      weight: cfg.weight,
      raw,
      stressPct: +stressPct.toFixed(0),
      contribution,
      color: cfg.color,
      inverse: cfg.inverse,
    };
  });

  const score = +contributions.reduce((s, c) => s + c.contribution, 0).toFixed(0);

  let level, color, label, guidance;
  if (score <= 40) {
    level = "low";
    color = "#438B78";
    label = "Low Priority";
    guidance = "Indicators are broadly stable. Routine monitoring recommended; no urgent investigation needed.";
  } else if (score <= 70) {
    level = "moderate";
    color = "#C08552";
    label = "Moderate Priority";
    guidance = "Suggestive indicators detected. Schedule a closer field check and continue monitoring.";
  } else {
    level = "high";
    color = "#B5654A";
    label = "High Priority";
    guidance = "Multiple stress signals align. Prioritise this location for human field verification.";
  }

  return { score, level, color, label, guidance, contributions, inputs: { ...inputs } };
}