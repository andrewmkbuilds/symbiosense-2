import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, BookOpen, FileText, CheckCircle2, Search } from "lucide-react";
import Starfield from "@/components/effects/Starfield";
import Aurora from "@/components/effects/Aurora";
import Grainient from "@/components/effects/Grainient";
import GradientText from "@/components/effects/GradientText";
import ShinyText from "@/components/effects/ShinyText";
import MagneticButton from "@/components/effects/MagneticButton";
import TiltCard from "@/components/TiltCard";

export default function ResourcesHero({ totalCount, availableCount, lastChecked }) {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* 3D background layers */}
      <div className="absolute inset-0 -z-30">
        <Starfield starCount={170} speed={0.014} starColor="#9ABF82" glowColor="#438B78" baseSize={1} />
      </div>
      <div className="absolute inset-0 -z-20">
        <Aurora
          colorStops={["#173F32", "#438B78", "#9ABF82"]}
          amplitude={1.1}
          height={0.55}
          speed={0.4}
          blend={0.5}
          opacity={0.28}
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
          className="lg:col-span-7"
        >
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" />
            </span>
            Resources · FIRST CANOPY 2026–27
          </span>

          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight text-balance text-3d text-glow-soft">
            <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={5}>
              Official FLL Resources
            </GradientText>
          </h1>

          <p className="mt-3 font-display text-xl sm:text-2xl italic text-glow-soft">
            <ShinyText text="Every link. Every document. Official sources only." duration={4} baseColor="hsl(172 35% 38%)" shimmerColor="hsl(95 28% 63%)" />
          </p>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            A searchable library of official BIOGLOW™ season documents, rules, rubrics, and UAE
            resources — all from approved official sources. Plus our team's own documents.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <MagneticButton strength={0.35} radius={110}>
              <a
                href="#library"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground btn-3d btn-glow"
              >
                Browse the Library <ArrowRight className="h-4 w-4" />
              </a>
            </MagneticButton>
            <Link
              to="/about"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all"
            >
              <BookOpen className="h-4 w-4" /> About SYMBIOTIX
            </Link>
          </div>
        </motion.div>

        {/* Library stats visual column */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-5 perspective-mid"
        >
          <TiltCard max={9} depth={40} className="rounded-3xl glass-strong p-6 depth-shadow-xl card-shine" contentClassName="p-0">
            <div className="preserve-3d">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground depth-shadow-sm">
                  <FileText className="h-5 w-5" />
                </span>
                <div>
                  <p className="text-sm font-bold text-primary">Document Library</p>
                  <p className="text-xs text-muted-foreground font-mono">Verified official sources</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="rounded-2xl border border-border/60 bg-card/70 p-3.5 depth-shadow-sm" style={{ transform: "translateZ(20px)" }}>
                  <p className="text-3xl font-bold text-primary font-display">{totalCount}</p>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono mt-1">Total Resources</p>
                </div>
                <div className="rounded-2xl border border-border/60 bg-card/70 p-3.5 depth-shadow-sm flex flex-col" style={{ transform: "translateZ(16px)" }}>
                  <div className="flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                    <p className="text-3xl font-bold text-brand-teal font-display">{availableCount}</p>
                  </div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono mt-1">Available Now</p>
                </div>
              </div>

              <div className="mt-3 rounded-2xl border border-border/60 bg-card/70 p-3.5 depth-shadow-sm flex items-center gap-2.5" style={{ transform: "translateZ(12px)" }}>
                <Search className="h-5 w-5 text-brand-teal" />
                <div>
                  <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono">Last Verified</p>
                  <p className="text-sm font-bold text-primary leading-tight">{lastChecked}</p>
                </div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}