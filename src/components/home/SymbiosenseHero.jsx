import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, Bot, Leaf, ScanLine, Activity, Cpu } from "lucide-react";
import Starfield from "@/components/effects/Starfield";
import Aurora from "@/components/effects/Aurora";
import Grainient from "@/components/effects/Grainient";
import GradientText from "@/components/effects/GradientText";
import ShinyText from "@/components/effects/ShinyText";
import ScrambleText from "@/components/effects/ScrambleText";
import MagneticButton from "@/components/effects/MagneticButton";
import TiltCard from "@/components/TiltCard";
import BrandLogo from "@/components/BrandLogo";

const MODULES = [
  { icon: Leaf, name: "LichenGuard", tag: "Bioindicator" },
  { icon: ScanLine, name: "Invasive Firewall", tag: "AI-assisted" },
  { icon: Activity, name: "BioRisk AI", tag: "Integration" },
];

export default function SymbiosenseHero() {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* 3D background layers */}
      <div className="absolute inset-0 -z-30">
        <Starfield starCount={200} speed={0.014} starColor="#9ABF82" glowColor="#438B78" baseSize={1} />
      </div>
      <div className="absolute inset-0 -z-20">
        <Aurora
          colorStops={["#173F32", "#438B78", "#9ABF82"]}
          amplitude={1.3}
          height={0.6}
          speed={0.45}
          blend={0.5}
          opacity={0.32}
          layers={2}
          direction="top"
        />
      </div>
      <div className="absolute inset-0 -z-10">
        <Grainient
          colors={["#173F32", "#438B78", "#9ABF82", "#F4F0E5"]}
          angle={55}
          flow={0.4}
          speed={0.3}
          grainAmount={0.04}
          opacity={0.14}
        />
      </div>
      {/* Floating glows */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0], rotate: [0, -2, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-40 -left-32 -z-10 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        {/* Headline column */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          className="lg:col-span-7"
        >
          <BrandLogo variant="light" className="h-16 w-16 sm:h-20 sm:w-20" />

          <div className="mt-5">
            <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
              </span>
              SYMBIOTIX · Innovation Project · FIRST CANOPY 2026–27
            </span>
          </div>

          <h1 className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-balance text-3d text-glow-soft">
            <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={5}>
              SYMBIOSENSE
            </GradientText>
          </h1>

          <p className="mt-3 font-display text-xl sm:text-2xl italic text-glow-soft">
            <ShinyText text="Detect the warning. Protect the ecosystem." duration={4} baseColor="hsl(172 35% 38%)" shimmerColor="hsl(95 28% 63%)" />
          </p>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Our FIRST LEGO League innovation project combines biological indicators of environmental stress with
            AI-assisted invasive-species detection — a concept for helping conservation teams decide{" "}
            <span className="font-semibold text-foreground">where to investigate next</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <MagneticButton strength={0.35} radius={110}>
              <Link
                to="/innovation"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground btn-3d btn-glow"
              >
                Explore the Innovation Project <ArrowRight className="h-4 w-4" />
              </Link>
            </MagneticButton>
            <Link
              to="/team"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all"
            >
              <Users className="h-4 w-4" /> Meet the Team
            </Link>
            <Link
              to="/robot-game"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all"
            >
              <Bot className="h-4 w-4" /> Robot Game
            </Link>
          </div>
        </motion.div>

        {/* Concept visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-5 perspective-mid"
        >
          <TiltCard max={10} depth={40} className="rounded-3xl glass-strong p-6 depth-shadow-xl card-shine" contentClassName="p-0">
            <div className="preserve-3d">
              <p className="text-xs uppercase tracking-[0.18em] text-brand-teal font-semibold font-mono mb-4">
                <ScrambleText text="Evidence → Priority" duration={1.4} />
              </p>

              {/* Three module nodes feeding a central priority */}
              <div className="space-y-3">
                {MODULES.map((m, i) => (
                  <div
                    key={m.name}
                    className="flex items-center gap-3 rounded-2xl border border-border/60 bg-card/70 p-3 depth-shadow-sm"
                    style={{ transform: `translateZ(${24 - i * 6}px)` }}
                  >
                    <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-brand-teal/10 text-brand-teal">
                      <m.icon className="h-5 w-5" strokeWidth={1.6} />
                    </span>
                    <div className="flex-1">
                      <p className="font-heading text-sm font-bold text-primary">{m.name}</p>
                      <p className="text-[11px] text-muted-foreground font-mono">{m.tag}</p>
                    </div>
                    <Cpu className="h-4 w-4 text-muted-foreground/40" />
                  </div>
                ))}
              </div>

              {/* Connector + priority node */}
              <div className="flex justify-center my-3">
                <div className="h-6 w-px bg-gradient-to-b from-brand-teal/60 to-accent/60" />
              </div>
              <div
                className="rounded-2xl bg-primary text-primary-foreground p-4 text-center depth-shadow-md"
                style={{ transform: "translateZ(30px)" }}
              >
                <p className="text-[10px] uppercase tracking-[0.2em] text-accent font-semibold font-mono">Output</p>
                <p className="font-heading text-base font-bold mt-0.5">Investigation Priority</p>
              </div>

              <p className="mt-4 text-[10px] text-amber-700 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2 text-center font-mono leading-snug">
                SIMULATED DEMO · ILLUSTRATIVE DATA · NOT LIVE SENSOR DATA
              </p>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}