import { motion } from "framer-motion";
import { Bot, Wrench, Code, GitBranch, BookOpen, ExternalLink, Award } from "lucide-react";
import RobotDesignHero from "@/components/sections/RobotDesignHero";
import OfficialSources from "@/components/OfficialSources";
import JudgingSessionFlow from "@/components/JudgingSessionFlow";
import { ROBOT_DESIGN_RUBRIC, OFFICIAL_LINKS, SEASON_INFO } from "@/lib/bioglowData";
import { BUILD_ILLUSTRATIONS } from "@/lib/conceptIllustrations";
import { Image } from "@/components/ui/image";
import DotField from "@/components/effects/DotField";
import Grainient from "@/components/effects/Grainient";

const BUILD_IMAGES = BUILD_ILLUSTRATIONS;

// What the official rubrics ask us to document, plus the limits we work within.
const DESIGN_DECISIONS = [
  { title: "Chassis", body: "Official limit: all our equipment must fit inside the launch areas and stay under 12 in. / 305 mm. Our drive base, wheel layout and the reasons behind them are documented here once we settle them." },
  { title: "Attachments", body: "Official limit: up to 4 motors and 1 controller. Each attachment — its purpose, mechanism and the missions it supports — is documented here as our design firms up." },
  { title: "Sensors & code", body: "Official limit: touch/force, colour, distance and gyro sensors only. The sensors and programs we use, and how they support our mission strategy, are documented here." },
  { title: "Testing & improvements", body: "What the judges look for: the changes we made along the way and what we learned from them. Every build change we make is logged in our Project Tracker." },
];

export default function RobotDesign() {
  return (
    <div>
      <RobotDesignHero technology={SEASON_INFO.technology} />

      {/* Official rubric */}
      <section className="pb-12 relative overflow-hidden" id="rubric">
        <div className="absolute inset-0 -z-10">
          <DotField dotRadius={1.2} dotSpacing={26} gradientFrom="#438B78" gradientTo="#9ABF82" gradientAngle={135} glowColor="#438B78" glowRadius={160} glowIntensity={0.4} baseOpacity={0.18} speed={0.25} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Award className="h-5 w-5 text-brand-teal" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Official Judging Rubric</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3 text-3d">Robot Design Rubric</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Judges evaluate Robot Design across five categories: Identify, Design, Create, Iterate, and Communicate.
            Each row is rated Beginning (1), Developing (2), Accomplished (3), or Exceeds (4). FIRST® LEGO® League is evaluated
            equally in four areas — Core Values, Innovation Project, Robot Design and Robot Game — and Core Values are evaluated in all parts of a team's work.
            In the judging session the team gets five minutes to explain its robot design, programs and strategy, followed by five minutes of questions.
          </p>
          <p className="text-xs text-amber-700 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2.5 mb-6 max-w-3xl leading-relaxed">
            Note: the category names and four rating levels match the official materials we audited. The exact row wording below comes from the official rubric PDF,
            which was shown only as a small picture in the audited files — please read the linked official rubric for the definitive wording.
          </p>

          <div className="space-y-4">
            {ROBOT_DESIGN_RUBRIC.categories.map((cat, i) => (
              <motion.div
                key={cat.name}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl glass p-5 depth-shadow-sm"
              >
                <div className="flex items-center gap-2.5 mb-3">
                  <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary text-primary-foreground text-sm font-bold font-mono">
                    {i + 1}
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.desc}</p>
                  </div>
                </div>
                <div className="space-y-2">
                  {cat.rows.map((row, j) => (
                    <div key={j} className="rounded-xl border border-border/60 bg-secondary/30 p-3">
                      <p className="text-sm font-semibold text-primary mb-2">{row.criterion}</p>
                      <div className="grid sm:grid-cols-4 gap-1.5">
                        {row.levels.map((level, k) => (
                          <div key={k} className={`rounded-lg p-2 text-xs leading-snug ${k === 0 ? "bg-red-500/5 text-red-700" : k === 1 ? "bg-amber-500/5 text-amber-700" : k === 2 ? "bg-brand-teal/5 text-brand-teal" : "bg-primary/5 text-primary"}`}>
                            <span className="font-bold">{ROBOT_DESIGN_RUBRIC.levels[k]}</span>
                            <p className="mt-0.5">{level}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            ))}
          </div>

          <JudgingSessionFlow />

          <div className="mt-6 grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {[
              { label: "Challenge Judging Rubric (PDF)", url: OFFICIAL_LINKS.uaeJudgingRubric },
              { label: "Judging Session Flowchart (PDF)", url: OFFICIAL_LINKS.uaeJudgingFlowchart },
              { label: "Engineering Notebook (PDF)", url: OFFICIAL_LINKS.uaeEngineeringNotebook },
              { label: "Team Meeting Guide (PDF)", url: OFFICIAL_LINKS.uaeTmg },
              { label: "Challenge Overview (PDF)", url: OFFICIAL_LINKS.uaeChallengeOverview },
              { label: "FLL UAE Resources", url: OFFICIAL_LINKS.fllUaeResources },
            ].map((r) => (
              <a key={r.label} href={r.url} target="_blank" rel="noopener noreferrer" className="group flex items-center gap-2.5 rounded-xl glass p-3.5 hover:border-brand-teal/50 hover:shadow-sm transition-all">
                <ExternalLink className="h-4 w-4 shrink-0 text-brand-teal group-hover:scale-110 transition-transform" />
                <span className="text-sm font-semibold text-primary leading-tight">{r.label}</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* SYMBIOTIX practice tips */}
      <section className="py-12 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Grainient colors={["#438B78", "#9ABF82", "#F4F0E5"]} angle={125} flow={0.4} speed={0.3} grainAmount={0.04} opacity={0.1} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-4 mb-6">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-bold font-mono">Optional advice · Team Meeting Guide</p>
            <p className="text-sm text-muted-foreground mt-1">
              These tips come from the official Team Meeting Guide's session tips. They are suggestions, not judging requirements or Robot Game rules.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-4">
            {[
              { icon: BookOpen, title: "Record your changes", body: "Judges will want to hear what changes you made along the way to understand your design and testing process (TMG Session 8 tip)." },
              { icon: Wrench, title: "Test repeatedly, change one thing", body: "Test missions multiple times and change one thing at a time to see what caused an improvement (TMG Session 8 tips)." },
              { icon: Code, title: "Name and back up programs", body: "Clearly name and organize programs so they can be found quickly, and keep a backup on an external drive or online storage (TMG Sessions 8–9 tips)." },
            ].map((t) => (
              <div key={t.title} className="rounded-2xl glass p-5 depth-shadow-sm">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                  <t.icon className="h-5 w-5" />
                </span>
                <h3 className="font-heading text-base font-bold text-primary">{t.title}</h3>
                <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{t.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── SYMBIOTIX robot content (clearly separated) ── */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-4 mb-6">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-bold font-mono">SYMBIOTIX Team Content</p>
            <p className="text-sm text-muted-foreground mt-1">
              The sections below document our robot build — not official FLL information. Concept illustrations show how
              the build works; real photos and specifications go in as our robot develops.
            </p>
          </div>

          <div className="flex items-center gap-3 mb-6">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
              <Bot className="h-5 w-5" />
            </span>
            <h2 className="font-heading text-xl font-bold text-primary">Our Robot Overview</h2>
          </div>
          <p className="text-muted-foreground leading-relaxed mb-6 max-w-3xl">
            Officially, teams build and code a LEGO® robot with LEGO Education sets ({SEASON_INFO.technology}) and use
            the Engineering Design Process: Identify, Design, Create, Iterate, Communicate. Our own specification is
            documented below as we settle it, and every build change is logged in our Project Tracker.
          </p>

          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono mb-2">Build Gallery</p>
          <p className="text-sm text-muted-foreground mb-4">
            Concept illustrations of our robot build — artwork, not photographs of our actual robot. Real build photos
            replace these as the season goes on.
          </p>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            {BUILD_IMAGES.map((img) => (
              <figure key={img.url} className="rounded-2xl glass-strong border border-border/60 overflow-hidden depth-shadow-sm">
                <div className="aspect-square overflow-hidden bg-secondary/40">
                  <Image src={img.url} alt={`${img.caption} — concept illustration`} fittingType="cover" className="h-full w-full" />
                </div>
                <figcaption className="p-3">
                  <p className="text-xs font-semibold text-primary leading-snug">{img.caption}</p>
                  <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground font-mono">Concept illustration</p>
                </figcaption>
              </figure>
            ))}
          </div>

          <div className="grid md:grid-cols-2 gap-5 mb-8">
            <div className="rounded-2xl glass p-6 depth-shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <Wrench className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-lg font-bold text-primary">Chassis</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Official limit: all our equipment must fit inside the launch areas and stay under 12 in. / 305 mm. Our
                drive base, wheel configuration and structural choices are documented here once the team settles them.
              </p>
            </div>
            <div className="rounded-2xl glass p-6 depth-shadow-sm">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary mb-3">
                <GitBranch className="h-5 w-5" />
              </span>
              <h3 className="font-heading text-lg font-bold text-primary">Attachments</h3>
              <p className="mt-2 text-sm text-muted-foreground leading-relaxed">
                Each attachment is documented here with its purpose, mechanism and the missions it supports, as soon
                as we settle on our final design.
              </p>
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-4">
            {DESIGN_DECISIONS.map((d, i) => (
              <div key={d.title} className="rounded-2xl glass p-5 depth-shadow-sm">
                <div className="flex items-center gap-2 mb-2">
                  <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-primary/10 text-primary text-xs font-bold font-mono">{i + 1}</span>
                  <h3 className="font-heading text-base font-bold text-primary">{d.title}</h3>
                </div>
                <p className="text-sm text-muted-foreground leading-relaxed">{d.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <OfficialSources
        sources={[
          { label: "Challenge Judging Rubric (UAE)", url: OFFICIAL_LINKS.uaeJudgingRubric },
          { label: "Judging Session Flowchart (UAE)", url: OFFICIAL_LINKS.uaeJudgingFlowchart },
          { label: "Engineering Notebook (UAE)", url: OFFICIAL_LINKS.uaeEngineeringNotebook },
          { label: "Team Meeting Guide (UAE)", url: OFFICIAL_LINKS.uaeTmg },
          { label: "Challenge Overview (UAE)", url: OFFICIAL_LINKS.uaeChallengeOverview },
          { label: "FLL UAE Resources", url: OFFICIAL_LINKS.fllUaeResources },
          { label: "FIRST® Inspires Season Materials", url: OFFICIAL_LINKS.firstinspiresSeasonMaterials },
        ]}
      />
    </div>
  );
}