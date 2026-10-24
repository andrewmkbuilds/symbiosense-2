import { motion } from "framer-motion";
import { TrendingUp } from "lucide-react";
import TiltCard from "@/components/TiltCard";

export default function JourneyProgress({ doneCount, total, progress, nextUp }) {
  const stats = [
    { label: "Done", value: doneCount, color: "text-brand-teal" },
    { label: "Pending", value: total - doneCount, color: "text-amber-600" },
    { label: "Total", value: total, color: "text-primary" },
    { label: "Next Up", value: nextUp || "—", color: "text-muted-foreground" },
  ];

  return (
    <section className="pb-10" id="timeline">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <TiltCard max={3} scale={1.005} depth={20} className="rounded-2xl glass-strong depth-shadow-md p-6 sm:p-8" contentClassName="p-0">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-5">
            <div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-brand-teal" />
                <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Season Progress</p>
              </div>
              <h2 className="mt-2 font-heading text-2xl font-bold text-primary text-3d">{doneCount} of {total} milestones complete</h2>
            </div>
            <div className="text-right">
              <p className="text-4xl font-bold text-primary font-mono">{progress}%</p>
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-mono">Complete</p>
            </div>
          </div>

          <div className="h-4 w-full rounded-full bg-secondary/60 overflow-hidden depth-shadow-sm">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full bg-gradient-to-r from-brand-leaf via-brand-teal to-primary relative overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
            </motion.div>
          </div>

          <div className="mt-4 grid grid-cols-4 gap-2 text-center">
            {stats.map((s) => (
              <div key={s.label} className="rounded-lg bg-secondary/30 p-2">
                <p className={`text-lg font-bold font-mono ${s.color}`}>{s.value}</p>
                <p className="text-[10px] uppercase tracking-wide text-muted-foreground font-mono">{s.label}</p>
              </div>
            ))}
          </div>
        </TiltCard>
      </div>
    </section>
  );
}