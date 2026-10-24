import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Images, Trophy, Camera } from "lucide-react";
import Starfield from "@/components/effects/Starfield";
import Aurora from "@/components/effects/Aurora";
import Grainient from "@/components/effects/Grainient";
import GradientText from "@/components/effects/GradientText";
import ShinyText from "@/components/effects/ShinyText";
import MagneticButton from "@/components/effects/MagneticButton";
import TiltCard from "@/components/TiltCard";

export default function GalleryHero() {
  return (
    <section id="top" className="relative pt-28 pb-16 sm:pt-36 sm:pb-24 overflow-hidden">
      <div className="absolute inset-0 -z-30">
        <Starfield starCount={160} speed={0.013} starColor="#9ABF82" glowColor="#438B78" baseSize={1} />
      </div>
      <div className="absolute inset-0 -z-20">
        <Aurora colorStops={["#173F32", "#438B78", "#9ABF82"]} amplitude={1} height={0.5} speed={0.35} blend={0.5} opacity={0.26} layers={2} direction="top" />
      </div>
      <div className="absolute inset-0 -z-10">
        <Grainient colors={["#173F32", "#438B78", "#9ABF82", "#F4F0E5"]} angle={55} flow={0.4} speed={0.3} grainAmount={0.04} opacity={0.13} />
      </div>
      <motion.div animate={{ y: [0, -18, 0], rotate: [0, 2, 0] }} transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }} className="absolute -top-20 -right-20 -z-10 h-96 w-96 rounded-full bg-accent/20 blur-3xl" />
      <motion.div animate={{ y: [0, 14, 0], rotate: [0, -2, 0] }} transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }} className="absolute top-44 -left-28 -z-10 h-80 w-80 rounded-full bg-brand-teal/15 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }} className="lg:col-span-7">
          <span className="inline-flex items-center gap-2 rounded-full glass px-3.5 py-1.5 text-xs font-semibold text-muted-foreground">
            <span className="relative flex h-2 w-2"><span className="absolute inline-flex h-full w-full rounded-full bg-brand-teal opacity-60 animate-ping" /><span className="relative inline-flex h-2 w-2 rounded-full bg-brand-teal" /></span>
            Gallery & Achievements · FIRST CANOPY 2026–27
          </span>
          <h1 className="mt-6 font-display text-5xl sm:text-6xl lg:text-7xl font-bold leading-[1.04] tracking-tight text-balance text-3d text-glow-soft">
            <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={5}>Season in Pictures</GradientText>
          </h1>
          <p className="mt-3 font-display text-xl sm:text-2xl italic text-glow-soft">
            <ShinyText text="Every build session, every prototype, every moment." duration={4} baseColor="hsl(172 35% 38%)" shimmerColor="hsl(95 28% 63%)" />
          </p>
          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            A visual record of the SYMBIOTIX season — team meetings, robot build sessions, research, prototypes, and competition memories. Photos and awards will be added as the season unfolds.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <MagneticButton strength={0.35} radius={110}>
              <a href="#gallery" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground btn-3d btn-glow">
                Browse the Gallery <ArrowRight className="h-4 w-4" />
              </a>
            </MagneticButton>
            <Link to="/journey" className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all">
              <Camera className="h-4 w-4" /> Field Study Gallery
            </Link>
          </div>
        </motion.div>

        <motion.div initial={{ opacity: 0, scale: 0.94, rotateY: -8 }} animate={{ opacity: 1, scale: 1, rotateY: 0 }} transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }} className="lg:col-span-5 perspective-mid">
          <TiltCard max={9} depth={40} className="rounded-3xl glass-strong p-6 depth-shadow-xl card-shine" contentClassName="p-0">
            <div className="preserve-3d">
              <div className="flex items-center gap-3 mb-5">
                <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground depth-shadow-sm"><Images className="h-5 w-5" /></span>
                <div><p className="text-sm font-bold text-primary">Season Album</p><p className="text-xs text-muted-foreground font-mono">Updated as the season progresses</p></div>
              </div>
              <div className="grid grid-cols-3 gap-2.5" style={{ transform: "translateZ(18px)" }}>
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <div key={i} className="aspect-square rounded-xl border border-border/60 bg-gradient-to-br from-brand-teal/20 to-accent/30 flex items-center justify-center depth-shadow-sm">
                    <Camera className="h-5 w-5 text-brand-teal/60" />
                  </div>
                ))}
              </div>
              <div className="mt-3 rounded-2xl border border-border/60 bg-card/70 p-3.5 depth-shadow-sm flex items-center gap-2.5" style={{ transform: "translateZ(12px)" }}>
                <Trophy className="h-5 w-5 text-brand-teal" />
                <div><p className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono">Achievements</p><p className="text-sm font-bold text-primary leading-tight">Added as they happen</p></div>
              </div>
            </div>
          </TiltCard>
        </motion.div>
      </div>
    </section>
  );
}