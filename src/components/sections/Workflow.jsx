import { motion } from "framer-motion";
import { Eye, Camera, BrainCircuit, MapPin, CheckCircle2 } from "lucide-react";
import Grainient from "@/components/effects/Grainient";
import FadeContent from "@/components/effects/FadeContent";

const STEPS = [
  { n: 1, icon: Eye, title: "Observe & record", body: "Observe lichens on bark and record the environmental conditions of the site.", color: "#9ABF82" },
  { n: 2, icon: Camera, title: "Capture & flag", body: "Capture plant images and flag possible invasive species for review.", color: "#438B78" },
  { n: 3, icon: BrainCircuit, title: "Combine evidence", body: "BioRisk AI combines available biological and environmental evidence.", color: "#173F32" },
  { n: 4, icon: MapPin, title: "Prioritise locations", body: "Identify the locations that most warrant further investigation.", color: "#C08552" },
  { n: 5, icon: CheckCircle2, title: "Verify in the field", body: "Confirm findings through human observation and fieldwork.", color: "#B5654A" },
];

export default function Workflow() {
  return (
    <section id="workflow" className="py-20 sm:py-28 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Grainient colors={["#438B78", "#9ABF82", "#F4F0E5"]} angle={125} flow={0.4} speed={0.3} grainAmount={0.04} opacity={0.12} />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">06 / Field-to-Insight Workflow</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance">From forest floor to verified finding</h2>
        </div>

        <div className="mt-12 grid md:grid-cols-5 gap-4 relative">
          <div className="hidden md:block absolute top-12 left-[10%] right-[10%] h-px bg-gradient-to-r from-brand-leaf via-brand-teal to-[#B5654A] opacity-40" />
          {STEPS.map((s, i) => (
            <motion.div key={s.n} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.1 }} className="relative flex flex-col items-center text-center md:items-start md:text-left">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full glass-strong border-2 depth-shadow-sm" style={{ borderColor: s.color, color: s.color }}>
                <s.icon className="h-5 w-5" strokeWidth={1.75} />
                <span className="absolute -top-2 -right-2 flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold text-white" style={{ backgroundColor: s.color }}>{s.n}</span>
              </div>
              <h3 className="mt-4 font-heading text-base font-bold text-primary">{s.title}</h3>
              <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{s.body}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}