import { motion } from "framer-motion";
import Aurora from "@/components/effects/Aurora";
import DotField from "@/components/effects/DotField";
import Beams from "@/components/effects/Beams";

export default function PageHero({ label, title, subtitle }) {
  return (
    <section className="relative pt-28 pb-10 sm:pt-36 sm:pb-14 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 -z-30">
        <Aurora
          colorStops={["#173F32", "#438B78", "#9ABF82"]}
          amplitude={0.8}
          height={0.5}
          speed={0.4}
          blend={0.6}
          opacity={0.25}
          layers={2}
          direction="top"
        />
      </div>
      <div className="absolute inset-0 -z-20">
        <DotField
          dotRadius={1.2}
          dotSpacing={28}
          gradientFrom="#173F32"
          gradientTo="#9ABF82"
          gradientAngle={135}
          glowColor="#438B78"
          glowRadius={180}
          glowIntensity={0.5}
          baseOpacity={0.2}
          speed={0.3}
        />
      </div>
      <motion.div
        animate={{ y: [0, -15, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 -right-20 -z-10 h-72 w-72 rounded-full bg-accent/15 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 12, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 -left-20 -z-10 h-64 w-64 rounded-full bg-brand-teal/10 blur-3xl"
      />

      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        {label && (
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center rounded-full glass px-3 py-1 text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono"
          >
            {label}
          </motion.span>
        )}
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 font-display text-4xl sm:text-5xl lg:text-6xl font-bold text-primary leading-tight text-balance text-3d text-glow-soft"
        >
          {title}
        </motion.h1>
        {subtitle && (
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-4 text-lg text-muted-foreground leading-relaxed max-w-2xl"
          >
            {subtitle}
          </motion.p>
        )}
      </div>
    </section>
  );
}