import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, FlaskConical, Bot, Cpu, Leaf, Wrench } from "lucide-react";
import SymbiosenseHero from "@/components/home/SymbiosenseHero";
import FeaturedCards from "@/components/home/FeaturedCards";
import ContactCTA from "@/components/home/ContactCTA";
import SymbiosenseFeature from "@/components/home/SymbiosenseFeature";
import TiltCard from "@/components/TiltCard";
import DotField from "@/components/effects/DotField";
import Grainient from "@/components/effects/Grainient";
import FadeContent from "@/components/effects/FadeContent";
import TextReveal from "@/components/effects/TextReveal";
import Beams from "@/components/effects/Beams";
import { CORE_VALUES, FOUR_PARTS, SEASON_INFO, OFFICIAL_LINKS } from "@/lib/bioglowData";

const JOURNEY_STEPS = [
  { icon: Users, title: "Team Formation", desc: "Bringing together students with diverse interests in nature, coding, and engineering." },
  { icon: Leaf, title: "Understanding the Theme", desc: "Exploring FIRST CANOPY and the connection between forests, biodiversity, and technology." },
  { icon: FlaskConical, title: "Research & Innovation", desc: "Developing SYMBIOSENSE — our concept for helping conservation teams prioritise field investigations." },
  { icon: Bot, title: "Robot Build & Code", desc: "Designing, building, and coding a robot to tackle the season's missions autonomously." },
  { icon: Cpu, title: "Testing & Iteration", desc: "Practicing runs, refining code, and improving attachments based on real performance." },
  { icon: Wrench, title: "Competition Day", desc: "Presenting our project, running matches, and celebrating the season's journey." },
];

export default function Home() {
  return (
    <div>
      <SymbiosenseHero />

      {/* SYMBIOSENSE feature — the primary story, right after the hero */}
      <SymbiosenseFeature />

      {/* Featured Cards */}
      <FeaturedCards />

      {/* FIRST CANOPY Season Intro */}
      <section className="py-16 sm:py-24 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotField
            dotRadius={1.3}
            dotSpacing={26}
            gradientFrom="#173F32"
            gradientTo="#9ABF82"
            gradientAngle={135}
            glowColor="#438B78"
            glowRadius={160}
            glowIntensity={0.5}
            baseOpacity={0.25}
            speed={0.3}
          />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="grid lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-7">
              <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">FIRST CANOPY · BIOGLOW</p>
              <TextReveal
                text="The 2026–2027 FIRST LEGO League Challenge"
                as="h2"
                className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance text-3d"
              />
              <p className="mt-5 text-muted-foreground leading-relaxed max-w-2xl">
                This season, FIRST LEGO League explores the world of forests and canopies — the living
                systems that connect every organism from the forest floor to the treetops. SYMBIOTIX is
                diving into this theme with a robotics challenge and an innovation project that bridges
                biology and technology.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-foreground">
                  <Leaf className="h-4 w-4 text-brand-teal" /> Nature & Biodiversity
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-foreground">
                  <Bot className="h-4 w-4 text-brand-teal" /> Robot Game
                </span>
                <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-foreground">
                  <FlaskConical className="h-4 w-4 text-brand-teal" /> Innovation Project
                </span>
              </div>
            </div>
            <div className="lg:col-span-5">
              <div className="rounded-2xl glass-strong p-6 depth-shadow-lg">
                <div className="flex items-center gap-3 mb-4">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground">
                    <Leaf className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-sm font-bold text-primary">FIRST CANOPY</p>
                    <p className="text-xs text-muted-foreground">Season Theme · 2026–2027</p>
                  </div>
                </div>
                <div className="space-y-3">
                  {[
                    { label: "Challenge Program", value: "FIRST LEGO League Challenge" },
                    { label: "Season", value: "2026–2027" },
                    { label: "Theme", value: "FIRST CANOPY · BIOGLOW" },
                    { label: "Our Team", value: "SYMBIOTIX" },
                    { label: "Innovation Project", value: "SYMBIOSENSE" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center justify-between border-b border-border/60 pb-2 last:border-0">
                      <span className="text-xs uppercase tracking-wide text-muted-foreground font-mono">{item.label}</span>
                      <span className="text-sm font-semibold text-foreground">{item.value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FLL Information */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Grainient
            colors={["#173F32", "#438B78", "#9ABF82", "#F4F0E5"]}
            angle={55}
            flow={0.4}
            speed={0.25}
            grainAmount={0.04}
            opacity={0.12}
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">About FIRST® LEGO® League</p>
            <TextReveal
              text="What is FIRST® LEGO® League?"
              as="h2"
              className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance text-3d"
            />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              FIRST® LEGO® League inspires young people to experiment and grow their confidence, critical thinking, and design
              skills through hands-on learning. This season is {SEASON_INFO.umbrella}, with the {SEASON_INFO.name}{" "}
              {SEASON_INFO.edition} challenge. SYMBIOTIX competes in FIRST® LEGO® League {SEASON_INFO.program}, where teams of up to 10 children
              build and code a LEGO® robot for the robot game and also complete an innovation project.
            </p>
          </div>

          <div className="mt-10 grid sm:grid-cols-2 lg:grid-cols-4 gap-4 perspective-mid">
            {FOUR_PARTS.map((p, i) => (
              <motion.div
                key={p.name}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={8} depth={30} className="rounded-2xl glass p-5 h-full card-shine card-hover-lift" contentClassName="p-0">
                  <h3 className="font-heading text-base font-bold text-primary">{p.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-10 rounded-2xl glass-strong p-6 depth-shadow-md">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono mb-4">FIRST® Core Values</p>
            <div className="grid sm:grid-cols-3 lg:grid-cols-6 gap-3">
              {CORE_VALUES.map((v) => (
                <div key={v.name} className="text-center">
                  <p className="font-heading text-sm font-bold text-primary">{v.name}</p>
                  <p className="mt-1 text-xs text-muted-foreground leading-snug">{v.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6 flex flex-wrap gap-3">
            <a href={OFFICIAL_LINKS.fllGlobal} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all btn-glow">
              FIRST® LEGO® League Global
            </a>
            <a href={OFFICIAL_LINKS.fllUae} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all btn-glow">
              FLL UAE Official Site
            </a>
            <a href={OFFICIAL_LINKS.firstinspiresGetStarted} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 rounded-full glass px-4 py-2.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all btn-glow">
              Get Started with FLL
            </a>
          </div>
        </div>
      </section>

      {/* FLL Journey Overview */}
      <section className="py-20 sm:py-28 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Beams beamColor="rgba(67,139,120,0.06)" beamCount={4} speed={0.15} />
        </div>
        <div className="absolute inset-0 -z-10">
          <DotField
            dotRadius={1.2}
            dotSpacing={30}
            gradientFrom="#438B78"
            gradientTo="#9ABF82"
            gradientAngle={135}
            glowColor="#438B78"
            glowRadius={150}
            glowIntensity={0.4}
            baseOpacity={0.18}
            speed={0.25}
          />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="max-w-2xl">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Our FIRST LEGO League Journey</p>
            <TextReveal
              text="From first meeting to competition day"
              as="h2"
              className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance text-3d"
            />
            <p className="mt-5 text-muted-foreground leading-relaxed">
              The FIRST LEGO League season is a journey of discovery, building, and teamwork. Here's an
              overview of the path we're on this year.
            </p>
          </div>

          <div className="mt-12 grid sm:grid-cols-2 lg:grid-cols-3 gap-5 perspective-mid">
            {JOURNEY_STEPS.map((s, i) => (
              <motion.div
                key={s.title}
                initial={{ opacity: 0, y: 20, rotateX: -10 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={8} depth={35} className="rounded-2xl border border-border bg-card p-5 hover:border-brand-teal/50 depth-shadow-md hover:depth-shadow-lg transition-shadow h-full card-shine" contentClassName="p-0">
                <div className="group flex gap-4 h-full">
                <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                  <s.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
                <div>
                  <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-mono mb-1">Step {i + 1}</p>
                  <h3 className="font-heading text-base font-bold text-primary">{s.title}</h3>
                  <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
                </div>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link
              to="/journey"
              className="inline-flex items-center gap-2 text-sm font-semibold text-primary hover:gap-3 transition-all"
            >
              View our full journey timeline <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Contact */}
      <ContactCTA />

    </div>
  );
}