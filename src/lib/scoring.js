import { MISSIONS } from "@/lib/missions";

// Official values: Rulebook p.8 (Precision Tokens, Equipment Inspection) and Rule 8.
export const INSPECTION_POINTS = 20;
export const TOKEN_POINTS = { 0: 0, 1: 10, 2: 15, 3: 25, 4: 35, 5: 50, 6: 50 };

const ALL = MISSIONS.flatMap((m) => m.conditions);

const defaultFor = (c) => (c.type === "count" || c.type === "tier" ? 0 : c.type === "select" ? "" : false);

export function getDefaultState() {
  const s = { precisionTokens: 6, inspection: false };
  MISSIONS.forEach((m) => {
    if (m.noEquipment) s[`m${m.number}_equip`] = false;
    m.conditions.forEach((c) => { s[c.id] = defaultFor(c); });
  });
  return s;
}

// A condition can only count if its prerequisite is met and nothing voids it.
export function isActive(c, s) {
  if (c.requires && !s[c.requires]) return false;
  if (c.voidIf && s[c.voidIf]) return false;
  return true;
}

// Apply a change and clear anything that is no longer allowed (prevents impossible combos).
export function applyChange(state, id, value) {
  const next = { ...state, [id]: value };
  const changed = ALL.find((c) => c.id === id);
  if (changed?.implies && value) next[changed.implies] = true;
  let again = true;
  while (again) {
    again = false;
    ALL.forEach((c) => {
      if (!isActive(c, next) && next[c.id] !== defaultFor(c)) { next[c.id] = defaultFor(c); again = true; }
      if (c.cap && next[c.id] > (next[c.cap] || 0)) { next[c.id] = next[c.cap] || 0; again = true; }
    });
  }
  return next;
}

export function missionResult(m, s) {
  if (m.noEquipment && s[`m${m.number}_equip`]) return { points: 0, reason: "A mission model is touching equipment at the end of the match (No Equipment Constraint)." };
  if (m.zeroIf && s[m.zeroIf]) return { points: 0, reason: "Katydid is completely outside the leaf habitat at the end of the match (Update 01)." };
  let pts = 0;
  m.conditions.forEach((c) => {
    if (!isActive(c, s)) return;
    const v = s[c.id];
    if (c.type === "boolean" || c.type === "bonus") { if (v) pts += c.points; }
    else if (c.type === "count") {
      let n = Math.min(v || 0, c.max);
      if (c.cap) n = Math.min(n, s[c.cap] || 0);
      pts += n * c.points;
    } else if (c.type === "tier") pts += c.tierPoints[v] || 0;
  });
  if (m.envBonus) {
    const needed = m.envBonus.map[s[m.envBonus.select]];
    if (needed && s[needed]) pts += m.envBonus.points;
  }
  return { points: pts, reason: "" };
}

export function computeScore(s) {
  const perMission = {};
  let missionTotal = 0;
  MISSIONS.forEach((m) => {
    const r = missionResult(m, s);
    perMission[m.number] = r;
    missionTotal += r.points;
  });
  const inspection = s.inspection ? INSPECTION_POINTS : 0;
  const tokens = TOKEN_POINTS[s.precisionTokens] ?? 0;
  return { total: missionTotal + inspection + tokens, missionTotal, inspection, tokens, perMission };
}

export function formatPoints(c) {
  if (c.type === "tier") return `${c.tierPoints[1]} or ${c.tierPoints[2]}`;
  if (c.type === "count") return `+${c.points} each`;
  if (c.type === "flag" || c.type === "select") return "Rule";
  return `+${c.points}`;
}