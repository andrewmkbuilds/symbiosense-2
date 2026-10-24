import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Users, FlaskConical, Bot, Leaf } from "lucide-react";
import { Image } from "@/components/ui/image";
import Aurora from "@/components/effects/Aurora";
import Grainient from "@/components/effects/Grainient";
import TextReveal from "@/components/effects/TextReveal";
import GradientText from "@/components/effects/GradientText";
import Beams from "@/components/effects/Beams";
import Starfield from "@/components/effects/Starfield";
import ShinyText from "@/components/effects/ShinyText";
import MagneticButton from "@/components/effects/MagneticButton";

export default function TeamHero({ heroImage }) {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-30">
        <Starfield starCount={180} speed={0.012} starColor="#9ABF82" glowColor="#438B78" baseSize={1} />
      </div>
      <div className="absolute inset-0 -z-25">
        <Aurora
          colorStops={["#173F32", "#438B78", "#9ABF82"]}
          amplitude={1.2}
          height={0.55}
          speed={0.5}
          blend={0.5}
          opacity={0.3}
          layers={2}
          direction="top"
        />
      </div>
      <div className="absolute inset-0 -z-20">
        <Grainient
          colors={["#173F32", "#438B78", "#9ABF82", "#F4F0E5"]}
          angle={55}
          flow={0.4}
          speed={0.3}
          grainAmount={0.04}
          opacity={0.15}
        />
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
      {/* Floating decorative dots */}
      <motion.div
        animate={{ y: [0, -12, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-32 right-[15%] -z-10 h-3 w-3 rounded-full bg-accent/40"
      />
      <motion.div
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-40 left-[10%] -z-10 h-2 w-2 rounded-full bg-brand-teal/40"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
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
            FIRST LEGO League Challenge · 2026–2027
          </span>

          <h1 className="mt-6 font-display text-6xl sm:text-7xl lg:text-8xl font-bold leading-[1.02] tracking-tight text-balance text-3d text-glow-soft">
            <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={5}>
              SYMBIOTIX
            </GradientText>
          </h1>

          <p className="mt-3 font-display text-xl sm:text-2xl italic text-glow-soft">
            <ShinyText text='"Connected by Nature. Driven by Innovation."' duration={4} baseColor="hsl(172 35% 38%)" shimmerColor="hsl(95 28% 63%)" />
          </p>

          <p className="mt-6 text-lg text-muted-foreground leading-relaxed max-w-xl">
            We are a FIRST LEGO League Challenge team competing in the FIRST CANOPY season. We bring
            together nature, robotics, and innovation — building a robot for the season's missions while
            developing <span className="font-semibold text-foreground">SYMBIOSENSE</span>, our environmental
            innovation project.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <MagneticButton strength={0.35} radius={110}>
              <Link
                to="/team"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground btn-3d btn-glow"
              >
                <Users className="h-4 w-4" /> Meet the Team
              </Link>
            </MagneticButton>
            <Link
              to="/innovation"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all"
            >
              <FlaskConical className="h-4 w-4" /> Explore Our Innovation Project
            </Link>
            <Link
              to="/robot-design"
              className="inline-flex items-center justify-center gap-2 rounded-full glass px-6 py-3.5 text-sm font-semibold text-primary hover:bg-white/70 transition-all"
            >
              <Bot className="h-4 w-4" /> Discover Our Robot
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94, rotateY: -8 }}
          animate={{ opacity: 1, scale: 1, rotateY: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1], delay: 0.15 }}
          className="lg:col-span-5 perspective-mid"
        >
          <div className="relative preserve-3d">
            <div className="relative rounded-3xl overflow-hidden border border-border depth-shadow-xl bg-card">
              <div className="aspect-[4/5] w-full bg-secondary">
                {heroImage ? (
                  <Image src={heroImage} alt="SYMBIOTIX — nature meets robotics" fittingType="fill" className="h-full w-full" />
                ) : (
                  <div className="h-full w-full flex items-center justify-center text-muted-foreground">
                    <Bot className="h-24 w-24" strokeWidth={0.5} />
                  </div>
                )}
              </div>
              <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-accent" />
              <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-accent" />
              <div className="absolute left-4 bottom-4 h-8 w-8 border-l-2 border-b-2 border-accent" />
              <div className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-accent" />
            </div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl glass-strong depth-shadow-lg px-4 py-3"
            >
              <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Leaf className="h-5 w-5" />
              </span>
              <div className="leading-tight">
                <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold font-mono">Season</p>
                <p className="text-sm font-bold text-primary">FIRST CANOPY 2026–27</p>
              </div>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}