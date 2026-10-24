import { motion } from "framer-motion";
import { ArrowRight, Play, Activity, Leaf, ScanLine, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";
import Starfield from "@/components/effects/Starfield";
import Aurora from "@/components/effects/Aurora";
import Grainient from "@/components/effects/Grainient";
import GradientText from "@/components/effects/GradientText";
import ShinyText from "@/components/effects/ShinyText";
import MagneticButton from "@/components/effects/MagneticButton";
import TiltCard from "@/components/TiltCard";

const HERO_IMAGE = "/images/hero-innovation.png";

const CHIPS = [
  { label: "Lichen diversity", value: "Moderate", tone: "lime" },
  { label: "Detection confidence", value: "86%", tone: "teal" },
  { label: "Stress signal", value: "Flagged", tone: "amber" },
];

const TONES = {
  lime: "bg-primary/15 text-primary border-primary/40",
  teal: "bg-brand-teal/15 text-brand-teal border-brand-teal/40",
  amber: "bg-amber-500/15 text-amber-700 border-amber-500/40",
};

export default function InnovationHero() {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* 3D background layers */}
      <div className="absolute inset-0 -z-30">
        <Starfield starCount={180} speed={0.014} starColor="#9ABF82" glowColor="#438B78" baseSize={1} />
      </div>
      <div className="absolute inset-0 -z-20">
        <Aurora
          colorStops={["#173F32", "#438B78", "#9ABF82"]}
          amplitude={1.2}
          height={0.55}
          speed={0.4}
          blend={0.5}
          opacity={0.3}
          layers={2}
          direction="top"
        />
      </div>
      <div className="absolute inset-0 -z-10">
        <Grainient colors={["#173F32", "#438B78", "#9ABF82", "#F4F0E5"]} angle={55} flow={0.4} speed={0.3} grainAmount={0.04} opacity={0.14} />
      </div>
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
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
            </span>
            Innovation Project · FIRST CANOPY 2026–27
          </span>

          <h1 className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-balance text-3d text-glow-soft">
            <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={5}>
              SYMBIOSENSE
            </GradientText>
          </h1>

          <p className="mt-3 font-display text-xl sm:text-2xl italic text-glow-soft">
            <ShinyText text="Detect the warning. Protect the ecosystem." duration={4} baseColor="hsl(172 35% 38%)" shimmerColor="hsl(95 28% 63%)" />
          </p>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            Our concept for combining biological indicators of environmental stress with AI-assisted
            invasive-plant detection — helping conservation teams decide{" "}
            <span className="font-semibold text-foreground">where to investigate next</span>.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <MagneticButton strength={0.35} radius={110}>
              <a
                href="#how-it-works"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground btn-3d btn-glow"
              >
                Explore the System <ArrowRight className="h-4 w-4" />
              </a>
            </MagneticButton>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all"
            >
              <Play className="h-4 w-4" /> Launch Live Demo
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1.5"><Leaf className="h-4 w-4 text-brand-teal" /> Lichen bioindicators</span>
            <span className="inline-flex items-center gap-1.5"><ScanLine className="h-4 w-4 text-brand-teal" /> AI-assisted detection</span>
            <span className="inline-flex items-center gap-1.5"><Activity className="h-4 w-4 text-brand-teal" /> Evidence-based priority</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-brand-teal" /> Human verification</span>
          </div>
        </motion.div>

        {/* Detection visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-6 perspective-mid"
        >
          <TiltCard max={9} depth={40} className="rounded-3xl depth-shadow-xl card-shine" contentClassName="p-0">
            <div className="relative rounded-3xl overflow-hidden border border-border bg-card preserve-3d">
              <div className="aspect-[4/3] w-full bg-secondary">
                <Image src={HERO_IMAGE} alt="Macro view of lichen on bark with digital detection overlays" fittingType="fill" className="h-full w-full" />
              </div>
              {/* detection overlay frame */}
              <div className="pointer-events-none absolute inset-0">
                <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-brand-teal" />
                <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-brand-teal" />
                <div className="absolute left-4 bottom-4 h-8 w-8 border-l-2 border-b-2 border-brand-teal" />
                <div className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-brand-teal" />
              </div>
              {/* floating data chips */}
              <div className="absolute left-4 bottom-4 right-4 flex flex-wrap gap-2" style={{ transform: "translateZ(30px)" }}>
                {CHIPS.map((c) => (
                  <span key={c.label} className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md bg-card/80 ${TONES[c.tone]}`}>
                    <span className="text-muted-foreground">{c.label}</span>
                    <span>{c.value}</span>
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>

          {/* BioRisk AI badge */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl glass-strong px-4 py-3 depth-shadow-lg"
          >
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-brand-teal/15 text-brand-teal">
              <Activity className="h-5 w-5" />
            </span>
            <div className="leading-tight">
              <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">BioRisk AI</p>
              <p className="text-sm font-bold text-foreground">Priority · Moderate</p>
            </div>
          </motion.div>

          <p className="mt-4 text-[10px] text-amber-700 bg-amber-500/5 border border-amber-500/20 rounded-lg p-2 text-center font-mono leading-snug">
            SIMULATED DEMO · ILLUSTRATIVE DATA · NOT LIVE SENSOR DATA
          </p>
        </motion.div>
      </div>
    </section>
  );
}