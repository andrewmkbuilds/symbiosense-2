import { motion } from "framer-motion";
import { ArrowRight, Play, Activity, Leaf, ScanLine, ShieldCheck } from "lucide-react";
import { Image } from "@/components/ui/image";

export default function Hero({ heroImage }) {
  return (
    <section id="top" className="relative pt-28 pb-20 sm:pt-36 sm:pb-28 overflow-hidden">
      {/* ambient background */}
      <div className="absolute inset-0 -z-10 bg-grid opacity-50" />
      <div className="absolute inset-0 -z-10 bg-dots opacity-60" />
      <div className="absolute -top-24 -right-24 -z-10 h-96 w-96 rounded-full bg-primary/10 blur-3xl" />
      <div className="absolute top-40 -left-32 -z-10 h-80 w-80 rounded-full bg-brand-teal/10 blur-3xl" />

      <div className="mx-auto max-w-7xl px-5 sm:px-8 grid lg:grid-cols-12 gap-10 lg:gap-14 items-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="lg:col-span-6"
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-border bg-card/70 px-3.5 py-1.5 text-[11px] font-semibold uppercase tracking-wide text-muted-foreground backdrop-blur">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full rounded-full bg-primary opacity-60 animate-ping" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
            </span>
            Innovation Project · FIRST LEGO League
          </span>

          <h1 className="mt-6 font-heading text-5xl sm:text-6xl lg:text-7xl font-bold uppercase leading-[1.02] tracking-tight text-foreground text-balance">
            Detect the
            <br />
            <span className="text-primary">warning.</span> Protect the
            <br />
            <span className="text-primary">ecosystem.</span>
          </h1>

          <p className="mt-6 text-base sm:text-lg text-muted-foreground leading-relaxed max-w-xl">
            <span className="font-semibold text-foreground">SYMBIOSENSE</span> combines biological indicators of
            environmental stress with AI-assisted invasive-plant detection — helping conservation teams prioritise
            where to investigate next.
          </p>

          <div className="mt-8 flex flex-col sm:flex-row gap-3">
            <a
              href="#how-it-works"
              className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/20"
            >
              Explore the System <ArrowRight className="h-4 w-4" />
            </a>
            <a
              href="#demo"
              className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-card/50 px-6 py-3.5 text-xs font-bold uppercase tracking-wide text-foreground hover:border-primary/50 hover:text-primary backdrop-blur transition-colors"
            >
              <Play className="h-4 w-4" /> Launch Live Demo
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-x-7 gap-y-3 text-[11px] uppercase tracking-wide text-muted-foreground font-medium">
            <span className="inline-flex items-center gap-1.5"><Leaf className="h-4 w-4 text-primary" /> Lichen bioindicators</span>
            <span className="inline-flex items-center gap-1.5"><ScanLine className="h-4 w-4 text-primary" /> AI-assisted detection</span>
            <span className="inline-flex items-center gap-1.5"><Activity className="h-4 w-4 text-primary" /> Evidence-based priority</span>
            <span className="inline-flex items-center gap-1.5"><ShieldCheck className="h-4 w-4 text-primary" /> Human verification</span>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: "easeOut", delay: 0.15 }}
          className="lg:col-span-6"
        >
          <HeroVisual heroImage={heroImage} />
        </motion.div>
      </div>
    </section>
  );
}

function HeroVisual({ heroImage }) {
  return (
    <div className="relative">
      <div className="relative rounded-2xl overflow-hidden border border-border shadow-2xl shadow-black/40 bg-card">
        <div className="aspect-[4/3] w-full bg-secondary">
          <Image
            src={heroImage}
            alt="Macro view of lichen on tree bark with digital detection overlays"
            fittingType="fill"
            className="h-full w-full"
          />
        </div>

        {/* detection overlay frame */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute left-4 top-4 h-8 w-8 border-l-2 border-t-2 border-primary" />
          <div className="absolute right-4 top-4 h-8 w-8 border-r-2 border-t-2 border-primary" />
          <div className="absolute left-4 bottom-4 h-8 w-8 border-l-2 border-b-2 border-primary" />
          <div className="absolute right-4 bottom-4 h-8 w-8 border-r-2 border-b-2 border-primary" />
        </div>

        {/* floating data chips */}
        <div className="absolute left-4 bottom-4 right-4 flex flex-wrap gap-2">
          <Chip label="Lichen diversity" value="Moderate" tone="lime" />
          <Chip label="Detection confidence" value="86%" tone="teal" />
          <Chip label="Stress signal" value="Flagged" tone="amber" />
        </div>
      </div>

      <div className="absolute -bottom-5 -left-5 hidden sm:flex items-center gap-3 rounded-2xl bg-card border border-border px-4 py-3 shadow-xl shadow-black/40">
        <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/15 text-primary">
          <Activity className="h-5 w-5" />
        </span>
        <div className="leading-tight">
          <p className="text-[10px] uppercase tracking-wider text-muted-foreground font-semibold">BioRisk AI</p>
          <p className="text-sm font-bold text-foreground">Priority · Moderate</p>
        </div>
      </div>
    </div>
  );
}

function Chip({ label, value, tone }) {
  const tones = {
    lime: "bg-primary/15 text-primary border-primary/40",
    teal: "bg-brand-teal/15 text-brand-teal border-brand-teal/40",
    amber: "bg-amber-500/15 text-amber-400 border-amber-500/40",
  };
  return (
    <span className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-[11px] font-semibold backdrop-blur-md bg-card/80 ${tones[tone]}`}>
      <span className="text-muted-foreground">{label}</span>
      <span>{value}</span>
    </span>
  );
}