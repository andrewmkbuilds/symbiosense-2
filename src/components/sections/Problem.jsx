import { motion } from "framer-motion";
import { AlertTriangle, Unplug, ScanSearch } from "lucide-react";
import { Image } from "@/components/ui/image";
import TiltCard from "@/components/TiltCard";
import Grainient from "@/components/effects/Grainient";
import FadeContent from "@/components/effects/FadeContent";

const POINTS = [
  { icon: AlertTriangle, title: "Environmental stressors", body: "Pollution, disturbance and changing conditions can affect ecosystem health and reduce biodiversity over time." },
  { icon: Unplug, title: "Invasive plant pressure", body: "Invasive species may outcompete native plants, altering habitats and threatening local biodiversity." },
  { icon: ScanSearch, title: "Disconnected evidence", body: "Biological observations and environmental measurements are often assessed separately, making it hard to prioritise where to investigate." },
];

export default function Problem() {
  return (
    <section id="problem" className="py-20 sm:py-28 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Grainient colors={["#173F32", "#438B78", "#9ABF82"]} angle={55} flow={0.3} speed={0.2} grainAmount={0.03} opacity={0.1} />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <div className="rounded-2xl overflow-hidden glass-strong depth-shadow-md mb-7">
              <Image
                src="/images/hero-innovation.png"
                alt="A stressed botanical specimen beside a floating data wireframe"
                fittingType="fill"
                className="w-full aspect-[3/2]"
              />
            </div>
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">01 / The Problem</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance">
              Signals are scattered. Priorities are unclear.
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Conservation teams often work with fragmented evidence. Biological observations and environmental measurements
              sit in separate places, so warning signs can be missed — and limited field time is hard to direct.
            </p>
          </div>

          <div className="lg:col-span-7 grid sm:grid-cols-1 gap-4">
            {POINTS.map((p, i) => (
              <motion.div
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-80px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={6} depth={25} className="group flex gap-4 rounded-2xl glass p-5 hover:depth-shadow-md transition-shadow h-full card-shine" contentClassName="p-0">
                  <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary group-hover:bg-primary group-hover:text-primary-foreground transition-colors">
                    <p.icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <div>
                    <h3 className="font-heading text-lg font-bold text-primary">{p.title}</h3>
                    <p className="mt-1 text-sm text-muted-foreground leading-relaxed">{p.body}</p>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}