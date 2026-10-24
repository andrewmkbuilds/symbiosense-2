import { motion } from "framer-motion";
import { Bot, Target, ClipboardList, Trophy, Plus, CheckCircle2, Clock, Info, AlertTriangle, ExternalLink, BookOpen, Settings, Zap } from "lucide-react";
import RobotGameHero from "@/components/sections/RobotGameHero";
import MissionTracker from "@/components/MissionTracker";
import OfficialSources from "@/components/OfficialSources";
import { MISSIONS, CHALLENGE_UPDATES, SEASON_INFO, PRECISION_TOKENS, EQUIPMENT_RULES, OFFICIAL_LINKS } from "@/lib/bioglowData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TiltCard from "@/components/TiltCard";
import DotField from "@/components/effects/DotField";
import Grainient from "@/components/effects/Grainient";
import OfficialRulesDetail from "@/components/OfficialRulesDetail";
import { formatPoints } from "@/lib/scoring";

// SYMBIOTIX checklist (our own, not an official FLL list)
const PREP_ITEMS = [
  "Robot fits in one launch area and under 12 in. (305 mm) for inspection",
  "All attachments labelled and organised",
  "Code reviewed and commented",
  "Battery fully charged",
  "Spare parts and tools packed",
  "Mission strategy reviewed",
  "Field reset procedure practised",
  "Team presentation rehearsed",
];

export default function RobotGame() {
  const [matches, setMatches] = useLocalStorage("symbionix-matches-v2", [{ id: 1, date: "", score: 0, notes: "" }]);
  const [prep, setPrep] = useLocalStorage("symbionix-prep-v2", PREP_ITEMS.map(() => false));

  const updateMatch = (id, updates) => setMatches(matches.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  const addMatch = () => setMatches([...matches, { id: Date.now(), date: "", score: 0, notes: "" }]);
  const prepDone = prep.filter(Boolean).length;

  return (
    <div>
      <RobotGameHero
        matchDuration={SEASON_INFO.matchDuration}
        missionCount={MISSIONS.length}
        program={SEASON_INFO.program}
      />

      {/* Official missions */}
      <section className="py-12 relative overflow-hidden" id="missions">
        <div className="absolute inset-0 -z-10">
          <Grainient colors={["#173F32", "#438B78", "#9ABF82"]} angle={55} flow={0.3} speed={0.2} grainAmount={0.03} opacity={0.08} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-brand-teal" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Official Missions</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3 text-3d">All 15 BIOGLOW™ Missions</h2>
          <p className="text-sm text-muted-foreground mb-2 max-w-3xl">
            Official FLL information. Mission names, numbers, descriptions and point values below were checked against the official Robot Game Rulebook (pages 5 and 8–12),
            with Challenge Update 01 applied to Mission 4.
          </p>
          <div className="flex items-start gap-2.5 rounded-xl border border-amber-500/30 bg-amber-500/5 p-3.5 mb-6 max-w-3xl">
            <AlertTriangle className="h-4 w-4 shrink-0 mt-0.5 text-amber-600" />
            <p className="text-xs text-amber-700 leading-relaxed">
              Missions marked "No Equipment" show the Rulebook symbol: the mission model cannot earn points if it is touching equipment at the end of the match.
              Always check the latest Challenge Updates before your event — they supersede the Rulebook.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-4">
            {MISSIONS.map((m, i) => (
              <motion.div
                key={m.number}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={6} depth={25} className="rounded-2xl glass p-5 h-full card-shine" contentClassName="p-0">
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold font-mono">
                    {m.number}
                  </span>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-heading text-base font-bold text-primary">{m.name}</h3>
                    <p className="text-[11px] text-muted-foreground font-mono">Bags: {m.bags}{m.interchangeable ? " · Interchangeable dock" : ""}{m.noEquipment ? " · No Equipment" : ""}</p>
                  </div>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{m.objective}</p>
                {m.update && (
                  <p className="text-xs text-amber-700 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2 mb-3 leading-relaxed">
                    {m.update}
                  </p>
                )}
                <div className="space-y-2">
                  {m.conditions.map((c) => (
                    <div key={c.id} className="flex items-center justify-between gap-3 text-sm border-b border-border/40 pb-1.5 last:border-0">
                      <span className="text-foreground/80 leading-snug">{c.label}</span>
                      <span className="text-xs font-semibold font-mono whitespace-nowrap text-brand-teal">
                        {formatPoints(c)}{c.type === "flag" || c.type === "select" ? "" : " pts"}
                      </span>
                    </div>
                  ))}
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Interactive mission tracker */}
      <section className="py-12 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotField dotRadius={1.2} dotSpacing={28} gradientFrom="#173F32" gradientTo="#9ABF82" glowColor="#438B78" glowRadius={150} glowIntensity={0.4} baseOpacity={0.2} speed={0.25} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Target className="h-5 w-5 text-brand-teal" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">SYMBIOTIX practice tool</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6 text-3d">SYMBIOTIX Practice Score Tracker</h2>
          <div className="max-w-3xl">
            <MissionTracker />
          </div>
        </div>
      </section>

      {/* Official rules */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Settings className="h-5 w-5 text-brand-teal" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Official Rules</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6 text-3d">Match format & rules</h2>
          <div className="grid md:grid-cols-2 gap-5">
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Clock className="h-5 w-5 text-brand-teal" />
                <h3 className="font-heading text-base font-bold text-primary">Match Format</h3>
              </div>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>• Each match lasts <span className="font-semibold text-foreground">2.5 minutes</span></li>
                <li>• Teams participate in <span className="font-semibold text-foreground">three official matches</span></li>
                <li>• Only the team's <span className="font-semibold text-foreground">best score counts</span> toward awards and advancement</li>
                <li>• The robot must operate <span className="font-semibold text-foreground">autonomously</span> after launch</li>
                <li>• Mission requirements must be <span className="font-semibold text-foreground">visibly met at the end of the match</span> unless stated otherwise</li>
              </ul>
            </div>
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="h-5 w-5 text-brand-teal" />
                <h3 className="font-heading text-base font-bold text-primary">Equipment Inspection</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{EQUIPMENT_RULES.inspection}</p>
              <div className="rounded-lg bg-secondary/50 p-3 text-xs text-foreground/80 leading-relaxed">
                <span className="font-semibold">No Equipment Constraint:</span> {EQUIPMENT_RULES.noEquipmentConstraint}
              </div>
            </div>
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Target className="h-5 w-5 text-brand-teal" />
                <h3 className="font-heading text-base font-bold text-primary">Precision Tokens</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed mb-3">{PRECISION_TOKENS.rule}</p>
              <div className="grid grid-cols-7 gap-1 text-center">
                {[0, 1, 2, 3, 4, 5, 6].map((n) => (
                  <div key={n} className="rounded-md bg-secondary/50 p-1.5">
                    <p className="text-[10px] text-muted-foreground font-mono">{n} left</p>
                    <p className="text-sm font-bold text-primary font-mono">{PRECISION_TOKENS.points[n]}</p>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <div className="flex items-center gap-2 mb-3">
                <Info className="h-5 w-5 text-brand-teal" />
                <h3 className="font-heading text-base font-bold text-primary">New This Year</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Missions 13–15 use a new <span className="font-semibold text-foreground">interchangeable dock system</span>.
                The docks are secured with Dual Lock, and teams can choose which mission model to place on each of the
                three docks (mine, city, farm) before the match. Placement of these three models is part of your mission strategy.
              </p>
            </div>
          </div>
          <OfficialRulesDetail />
        </div>
      </section>

      {/* Challenge updates */}
      <section className="py-12 bg-secondary/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-amber-600" />
            <p className="text-xs uppercase tracking-[0.22em] text-amber-600 font-semibold font-mono">Challenge Updates</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3 text-3d">Official Challenge Updates</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            FIRST® LEGO® League-issued updates supersede all other sources. The newest official document we have checked is dated{" "}
            <span className="font-semibold text-foreground">September 2, 2026</span> and contains Update 01 only. Items marked
            "requires verification" are not in that document — check the latest official file before relying on them.
          </p>
          <div className="space-y-4 max-w-4xl">
            {CHALLENGE_UPDATES.map((u) => (
              <div key={u.id} className="rounded-2xl glass p-5 depth-shadow-sm">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <h3 className="font-heading text-base font-bold text-primary">{u.title}</h3>
                  <span className="text-xs text-muted-foreground font-mono whitespace-nowrap">{u.date}</span>
                </div>
                <span className={`inline-block mb-2 text-[10px] uppercase tracking-wide font-semibold font-mono px-2 py-0.5 rounded-full ${u.verified ? "bg-brand-teal/10 text-brand-teal" : "bg-amber-500/10 text-amber-700"}`}>
                  {u.verified ? "Verified in official document" : "Requires verification"}
                </span>
                <p className="text-sm text-muted-foreground leading-relaxed mb-3">{u.body}</p>
                <div className="flex flex-wrap gap-2">
                  {u.affects.map((a) => (
                    <span key={a} className="text-[10px] uppercase tracking-wide text-amber-700 font-semibold font-mono bg-amber-500/10 px-2 py-0.5 rounded-full">
                      Affects: {a}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <a
            href={OFFICIAL_LINKS.fiUpdates}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-brand-teal hover:text-primary transition-colors"
          >
            Download the latest Challenge Updates (PDF) <ExternalLink className="h-4 w-4" />
          </a>
        </div>
      </section>

      {/* ── SYMBIOTIX content (clearly separated) ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-4 mb-6">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-bold font-mono">SYMBIOTIX Team Content</p>
            <p className="text-sm text-muted-foreground mt-1">
              The sections below are our team's practice data — not official FLL information.
            </p>
          </div>

          <div className="flex items-center gap-2 mb-6">
            <ClipboardList className="h-5 w-5 text-brand-teal" />
            <h2 className="font-heading text-2xl font-bold text-primary">Pre-match checklist</h2>
          </div>
          <div className="rounded-2xl glass p-5 max-w-2xl depth-shadow-sm">
            {PREP_ITEMS.map((item, i) => (
              <button
                key={i}
                onClick={() => setPrep(prep.map((v, j) => (j === i ? !v : v)))}
                className="flex items-center gap-3 w-full text-left py-2.5 border-b border-border/60 last:border-0 hover:bg-secondary/30 rounded-md px-2 transition-colors"
              >
                <span className={`flex h-5 w-5 items-center justify-center rounded-md border ${prep[i] ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
                  {prep[i] && <CheckCircle2 className="h-3.5 w-3.5" />}
                </span>
                <span className={`text-sm ${prep[i] ? "text-muted-foreground line-through" : "text-foreground"}`}>{item}</span>
              </button>
            ))}
            <p className="mt-3 text-xs text-muted-foreground font-mono">{prepDone}/{prep.length} completed</p>
          </div>
        </div>
      </section>

      <section className="py-12 bg-secondary/40 border-y border-border/60">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <div className="flex items-center gap-2">
                <Trophy className="h-5 w-5 text-brand-teal" />
                <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">SYMBIOTIX Practice</p>
              </div>
              <h2 className="font-heading text-2xl font-bold text-primary mt-1">Match results</h2>
            </div>
            <button onClick={addMatch} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground btn-3d btn-glow">
              <Plus className="h-4 w-4" /> Add Match
            </button>
          </div>
          <div className="rounded-2xl glass overflow-hidden depth-shadow-sm">
            <div className="grid grid-cols-12 gap-3 px-5 py-3 bg-secondary/50 border-b border-border text-xs uppercase tracking-wide text-muted-foreground font-mono font-semibold">
              <div className="col-span-3">Date</div>
              <div className="col-span-2">Score</div>
              <div className="col-span-6">Notes</div>
              <div className="col-span-1"></div>
            </div>
            {matches.map((m) => (
              <div key={m.id} className="grid grid-cols-12 gap-3 px-5 py-3 border-b border-border/60 last:border-0 items-center">
                <input type="text" value={m.date} onChange={(e) => updateMatch(m.id, { date: e.target.value })} placeholder="Date" className="col-span-3 bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-sm text-foreground" />
                <input type="number" value={m.score} onChange={(e) => updateMatch(m.id, { score: Number(e.target.value) })} placeholder="0" className="col-span-2 bg-secondary/50 border border-border rounded-md px-2 py-1 text-sm font-bold text-primary font-mono outline-none focus:border-primary" />
                <input type="text" value={m.notes} onChange={(e) => updateMatch(m.id, { notes: e.target.value })} placeholder="Notes..." className="col-span-6 bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-sm text-muted-foreground" />
                <button onClick={() => setMatches(matches.filter((x) => x.id !== m.id))} className="col-span-1 text-muted-foreground hover:text-destructive text-xs">✕</button>
              </div>
            ))}
            {matches.length === 0 && (
              <div className="px-5 py-8 text-center text-sm text-muted-foreground">
                <Trophy className="h-8 w-8 mx-auto mb-2 opacity-40" />
                No matches yet. Click "Add Match" to start tracking scores.
              </div>
            )}
          </div>
          <p className="mt-4 text-xs text-muted-foreground">
            These are SYMBIOTIX practice scores — not official event results. We will only record scores our team has actually achieved.
          </p>
        </div>
      </section>

      <OfficialSources
        sources={[
          { label: "Robot Game Rulebook (UAE)", url: OFFICIAL_LINKS.uaeRulebook },
          { label: "Robot Game Rulebook (FIRST® Inspires)", url: OFFICIAL_LINKS.fiRulebook },
          { label: "Robot Game Scoresheet (UAE)", url: OFFICIAL_LINKS.uaeScoresheet },
          { label: "Challenge Updates (latest official file)", url: OFFICIAL_LINKS.fiUpdates },
          { label: "Field Setup Reference Guide (UAE)", url: OFFICIAL_LINKS.uaeFieldSetupGuide },
          { label: "Mission Model Building Instructions (UAE)", url: OFFICIAL_LINKS.uaeBuildingInstructions },
          { label: "Robot Game Missions Video", url: OFFICIAL_LINKS.videoMissions },
          { label: "FLL UAE Resources", url: OFFICIAL_LINKS.fllUaeResources },
          { label: "BIOGLOW Robot Game Page (D-A-CH)", url: OFFICIAL_LINKS.fllDachRobotGame },
        ]}
      />
    </div>
  );
}