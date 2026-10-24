import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Activity, Leaf, ScanLine } from "lucide-react";

export default function SymbiosenseFeature() {
  return (
    <section className="py-20 sm:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-mesh opacity-30" />
      <div className="absolute inset-0 bg-grid opacity-[0.04]" />
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl"
      />
      <motion.div
        animate={{ y: [0, 15, 0] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-0 left-0 h-64 w-64 rounded-full bg-accent/10 blur-3xl"
      />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-7"
          >
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold font-mono">Featured Innovation Project</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight text-balance text-3d-light">
              SYMBIOSENSE
            </h2>
            <p className="mt-3 font-display text-lg text-accent italic">
              Detect the warning. Protect the ecosystem.
            </p>
            <p className="mt-5 text-primary-foreground/70 leading-relaxed max-w-xl">
              Our innovation project combines biological indicators of environmental stress with
              AI-assisted invasive-plant detection — helping conservation teams prioritise where to
              investigate next. Explore the science, the modules, and the interactive simulation.
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-medium">
                <Leaf className="h-3.5 w-3.5 text-accent" /> Lichen bioindicators
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-medium">
                <ScanLine className="h-3.5 w-3.5 text-accent" /> AI-assisted detection
              </span>
              <span className="inline-flex items-center gap-2 rounded-full glass-dark px-3 py-1.5 text-xs font-medium">
                <Activity className="h-3.5 w-3.5 text-accent" /> Evidence-based priority
              </span>
            </div>

            <Link
              to="/innovation"
              className="mt-8 inline-flex items-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-bold text-primary btn-3d"
            >
              Explore the Innovation Project <ArrowRight className="h-4 w-4" />
            </Link>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94, rotateY: 8 }}
            whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-5 perspective-mid"
          >
            <div className="rounded-2xl glass-dark p-6 preserve-3d">
              <p className="text-xs uppercase tracking-[0.18em] text-accent font-semibold font-mono mb-4">The Three Modules</p>
              <div className="space-y-4">
                {[
                  { name: "LichenGuard", desc: "Bioindicator module — lichen diversity, growth patterns, and paired environmental data." },
                  { name: "Invasive Firewall", desc: "AI-assisted module — image classification with confidence scoring and flags for human review." },
                  { name: "BioRisk AI", desc: "Integration module — combines evidence to suggest investigation priority." },
                ].map((m, i) => (
                  <div key={m.name} className="flex gap-3 rounded-xl p-2 hover:bg-white/5 transition-colors" style={{ transform: `translateZ(${20 - i * 5}px)` }}>
                    <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-accent/20 text-accent text-sm font-bold font-mono depth-shadow-sm">
                      {i + 1}
                    </span>
                    <div>
                      <p className="text-sm font-bold text-primary-foreground">{m.name}</p>
                      <p className="text-xs text-primary-foreground/60 leading-relaxed mt-0.5">{m.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}