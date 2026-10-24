import { motion } from "framer-motion";
import { Users, Leaf, FlaskConical, Bot, Cpu, Wrench, Calendar, Circle, CheckCircle2, Trophy } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import DotField from "@/components/effects/DotField";

const ICON_MAP = { Users, Leaf, FlaskConical, Bot, Cpu, Wrench, Calendar, Circle };
const getIcon = (name) => ICON_MAP[name] || Circle;

export default function JourneyTimeline({ milestones, progress }) {
  return (
    <section className="pb-20 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <DotField dotRadius={1.2} dotSpacing={30} gradientFrom="#173F32" gradientTo="#9ABF82" glowColor="#438B78" glowRadius={150} glowIntensity={0.4} baseOpacity={0.18} speed={0.25} />
      </div>

      <div className="mx-auto max-w-5xl px-5 sm:px-8">
        <div className="mb-6">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Our Season</p>
          <h2 className="mt-1 font-heading text-2xl font-bold text-primary text-3d">Season Milestones</h2>
        </div>

        <div className="relative">
          {/* Vertical gradient line */}
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-brand-leaf via-brand-teal to-primary opacity-30" />

          <div className="space-y-6">
            {milestones.map((m, i) => {
              const Icon = getIcon(m.icon);
              return (
                <motion.div
                  key={m.id}
                  initial={{ opacity: 0, x: -20, rotateY: -10 }}
                  whileInView={{ opacity: 1, x: 0, rotateY: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.05 }}
                  className="relative pl-16 [perspective:1000px]"
                >
                  {/* Node */}
                  <span
                    className={`absolute left-0 z-10 flex h-12 w-12 items-center justify-center rounded-full border-2 depth-shadow-sm ${
                      m.done ? "bg-primary border-primary text-primary-foreground" : "glass-strong border-brand-teal/40 text-muted-foreground"
                    }`}
                  >
                    {m.done ? <CheckCircle2 className="h-5 w-5" /> : <Icon className="h-5 w-5" strokeWidth={1.75} />}
                  </span>

                  {/* Connector dot on the line */}
                  <span className={`absolute left-[22px] top-5 h-2 w-2 rounded-full ${m.done ? "bg-brand-teal" : "bg-border"} z-0`} />

                  <TiltCard
                    max={6}
                    scale={1.01}
                    depth={25}
                    className={`rounded-2xl p-5 card-shine ${m.done ? "glass border-brand-teal/30" : "glass-strong"}`}
                    contentClassName="p-0"
                  >
                    <div className="flex items-start justify-between gap-3 mb-2">
                      <div className="flex items-center gap-2">
                        <span className={`flex h-6 w-6 items-center justify-center rounded-lg text-xs font-bold font-mono ${m.done ? "bg-brand-teal text-white" : "bg-primary/10 text-primary"}`}>
                          {i + 1}
                        </span>
                        <h3 className="font-heading text-lg font-bold text-primary leading-tight">{m.title}</h3>
                      </div>
                      <span className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold whitespace-nowrap ${m.done ? "bg-brand-teal/15 text-brand-teal" : "bg-secondary/50 text-muted-foreground"}`}>
                        {m.done ? <CheckCircle2 className="h-3 w-3" /> : <Circle className="h-3 w-3" />}
                        {m.done ? "Complete" : "Planned"}
                      </span>
                    </div>

                    {m.date && <p className="text-sm text-brand-teal font-semibold font-mono mb-2">{m.date}</p>}
                    <p className="text-sm text-muted-foreground leading-relaxed">{m.desc}</p>
                  </TiltCard>
                </motion.div>
              );
            })}
          </div>
        </div>

        {progress === 100 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="mt-8 rounded-2xl glass-strong p-6 text-center depth-shadow-lg"
          >
            <Trophy className="h-10 w-10 mx-auto mb-3 text-brand-teal" />
            <h3 className="font-heading text-xl font-bold text-primary">Season Complete!</h3>
            <p className="mt-2 text-sm text-muted-foreground">All milestones achieved. Great work, SYMBIOTIX!</p>
          </motion.div>
        )}
      </div>
    </section>
  );
}