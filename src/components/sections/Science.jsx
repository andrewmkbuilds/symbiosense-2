import { motion } from "framer-motion";
import { Leaf, HelpCircle, FlaskConical } from "lucide-react";
import { Image } from "@/components/ui/image";
import DotField from "@/components/effects/DotField";
import FadeContent from "@/components/effects/FadeContent";

const CAVEATS = [
  "Many lichens are sensitive to air pollution and environmental conditions.",
  "Presence and diversity are also affected by habitat, climate and tree characteristics.",
  "Lichens are not direct acid-rain detectors — they reflect many combined factors.",
];

export default function Science() {
  return (
    <section id="science" className="py-20 sm:py-28 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DotField dotRadius={1.2} dotSpacing={28} gradientFrom="#173F32" gradientTo="#9ABF82" glowColor="#438B78" glowRadius={150} glowIntensity={0.4} baseOpacity={0.2} speed={0.25} />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-14 items-start">
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden glass-strong depth-shadow-lg">
              <Image src="/images/science-lichen.png" alt="Macro study of diverse lichen species on bark" fittingType="fill" className="w-full aspect-[3/2]" />
            </div>
          </div>
          <div className="lg:col-span-6">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">04 / Science Behind the Project</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl font-bold text-primary leading-tight text-balance">Why lichens?</h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              Lichens are tiny but telling. Because they draw nutrients and moisture from the air, many species respond
              to environmental conditions — making their presence, absence and diversity useful as
              <span className="font-semibold text-foreground"> bioindicators</span> of possible ecosystem stress.
            </p>
            <ul className="mt-6 space-y-3">
              {CAVEATS.map((c) => (
                <li key={c} className="flex gap-3 text-sm text-foreground/80 leading-relaxed">
                  <Leaf className="h-4 w-4 shrink-0 mt-0.5 text-brand-teal" strokeWidth={1.75} />
                  <span>{c}</span>
                </li>
              ))}
            </ul>
            <div className="mt-8 rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-5">
              <div className="flex items-center gap-2 text-brand-teal">
                <HelpCircle className="h-5 w-5" />
                <p className="text-xs uppercase tracking-[0.18em] font-semibold font-mono">Research question</p>
              </div>
              <p className="mt-3 font-display text-lg sm:text-xl text-primary italic leading-snug">
                "Can combining biological indicators of environmental stress with AI-based invasive-plant detection improve how conservation teams prioritise areas for investigation?"
              </p>
            </div>
            <div className="mt-5 flex gap-3 rounded-xl glass p-4 depth-shadow-sm">
              <FlaskConical className="h-5 w-5 shrink-0 text-muted-foreground" />
              <p className="text-sm text-muted-foreground leading-relaxed">
                Combining evidence may help guide field investigations, but the concept requires real-world testing and validation before it can support conservation decisions.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}