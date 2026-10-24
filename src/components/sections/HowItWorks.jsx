import { motion } from "framer-motion";
import { Leaf, ScanLine, BrainCircuit, ArrowRight } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import DotField from "@/components/effects/DotField";
import FadeContent from "@/components/effects/FadeContent";

const MODULES = [
  { id: "lichenguard", name: "LichenGuard", icon: Leaf, accent: "#9ABF82", tag: "Bioindicator module", body: "Combines observations of lichen presence, diversity and growth patterns with environmental measurements to help assess possible ecosystem stress.", points: ["Lichen diversity & cover", "Growth-form patterns", "Paired environmental data"] },
  { id: "firewall", name: "Invasive Firewall", icon: ScanLine, accent: "#438B78", tag: "AI-assisted module", body: "Uses AI-assisted image classification to flag plants that may be invasive — every flag is a prompt for human verification, not a confirmed identification.", points: ["Image classification", "Confidence scoring", "Flags for human review"] },
  { id: "biorisk", name: "BioRisk AI", icon: BrainCircuit, accent: "#173F32", tag: "Integration module", body: "Combines available biological observations, environmental measurements and possible invasive-plant detections to help prioritise locations for further investigation.", points: ["Evidence fusion", "Priority scoring", "Investigation guidance"] },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DotField dotRadius={1.3} dotSpacing={24} gradientFrom="#438B78" gradientTo="#9ABF82" gradientAngle={135} glowColor="#438B78" glowRadius={170} glowIntensity={0.5} baseOpacity={0.22} speed={0.3} />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">02 / How SYMBIOSENSE Works</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance">
            Three modules, one connected picture
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            Each module focuses on one kind of evidence. Together they feed BioRisk AI, which combines the signals to
            suggest where a conservation team should look first.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5">
          {MODULES.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="[perspective:1000px]"
            >
            <TiltCard max={8} depth={35} className="group relative flex flex-col rounded-2xl glass p-6 hover:depth-shadow-lg transition-shadow h-full card-shine" contentClassName="p-0">
              <div className="flex items-center justify-between">
                <span className="flex h-12 w-12 items-center justify-center rounded-2xl" style={{ backgroundColor: `${m.accent}22`, color: m.accent }}>
                  <m.icon className="h-6 w-6" strokeWidth={1.6} />
                </span>
                <span className="text-[10px] uppercase tracking-[0.18em] text-muted-foreground font-medium font-mono">{m.tag}</span>
              </div>
              <h3 className="mt-5 font-heading text-2xl font-bold text-primary">{m.name}</h3>
              <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{m.body}</p>
              <ul className="mt-5 space-y-2">
                {m.points.map((pt) => (
                  <li key={pt} className="flex items-center gap-2 text-sm text-foreground/80">
                    <span className="h-1.5 w-1.5 rounded-full" style={{ backgroundColor: m.accent }} />
                    {pt}
                  </li>
                ))}
              </ul>
            </TiltCard>
            </motion.div>
          ))}
        </div>

        <div className="mt-10 rounded-2xl glass p-6 sm:p-8 depth-shadow-md">
          <div className="flex flex-col md:flex-row items-stretch md:items-center gap-4 md:gap-2 text-center">
            {["LichenGuard", "Invasive Firewall", "BioRisk AI", "Investigation priority"].map((step, i) => (
              <div key={step} className="flex flex-1 flex-col md:flex-row items-center gap-4 md:gap-2">
                <div className="flex-1">
                  <span className="inline-flex items-center gap-2 rounded-full bg-card border border-border px-4 py-2 text-sm font-medium text-primary">
                    {step}
                  </span>
                </div>
                {i < 3 && <ArrowRight className="h-5 w-5 text-brand-teal rotate-90 md:rotate-0" />}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}