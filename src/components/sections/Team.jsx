import { motion } from "framer-motion";
import { Leaf, Cpu, Sparkles } from "lucide-react";
import { avatarFor } from "@/lib/conceptIllustrations";

const MEMBERS = [
  { name: "Advaith", role: "Team Manager" },
  { name: "Andrew", role: "Material Manager / Project Manager" },
  { name: "Sai", role: "Creative Designer" },
  { name: "Ishan", role: "Creative Designer" },
  { name: "Arnav", role: "Builder" },
  { name: "Ryan", role: "Builder" },
  { name: "Dhruv", role: "Builder" },
  { name: "Veer", role: "Coder" },
  { name: "Pranav", role: "Communicator" },
  { name: "Joe", role: "Mission Strategist" },
];

const PILLARS = [
  { icon: Leaf, title: "Nature", body: "Reading the living indicators already present in the ecosystem." },
  { icon: Cpu, title: "Engineering", body: "Building tools that turn scattered observations into structured evidence." },
  { icon: Sparkles, title: "Innovation", body: "Combining biology and AI to help direct limited field time." },
];

export default function Team() {
  return (
    <section id="team" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <div className="lg:col-span-5">
            <p className="text-xs uppercase tracking-[0.22em] text-primary font-semibold">07 / About the Team</p>
            <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold uppercase text-foreground leading-tight tracking-tight text-balance">
              SYMBIOTIX
            </h2>
            <p className="mt-5 text-muted-foreground leading-relaxed">
              A FIRST LEGO League team bringing together nature, engineering and innovation. We wanted to explore
              whether connecting different kinds of evidence could help conservation teams decide where to look first.
            </p>
            <div className="mt-6 rounded-2xl border border-primary/30 bg-primary/5 p-5">
              <p className="text-xs uppercase tracking-[0.18em] text-primary font-semibold">Team motto</p>
              <p className="mt-2 text-xl text-foreground italic">
                “Connected by Nature. Driven by Innovation.”
              </p>
            </div>

            <div className="mt-6 grid sm:grid-cols-3 gap-3">
              {PILLARS.map((p) => (
                <div key={p.title} className="rounded-xl border border-border bg-card p-4">
                  <p.icon className="h-5 w-5 text-primary" strokeWidth={1.75} />
                  <p className="mt-2 text-sm font-bold text-foreground">{p.title}</p>
                  <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{p.body}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-7">
            <p className="text-sm font-bold text-foreground">Team members</p>
            <p className="text-[11px] text-muted-foreground">
              Ten of us, plus our mentor. The portraits are concept illustrations, not photographs.
            </p>
            <div className="mt-4 grid sm:grid-cols-2 gap-4">
              {MEMBERS.map((m, i) => (
                <motion.div
                  key={m.name}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: i * 0.04 }}
                  className="flex items-center gap-3 rounded-2xl border border-border bg-card p-4 depth-shadow-sm"
                >
                  <img
                    src={avatarFor(i)}
                    alt={`${m.name} — concept illustration`}
                    className="h-12 w-12 shrink-0 rounded-full object-cover border border-border"
                  />
                  <div className="min-w-0">
                    <p className="text-sm font-bold text-foreground">{m.name}</p>
                    <p className="text-[11px] text-muted-foreground leading-snug">{m.role}</p>
                  </div>
                </motion.div>
              ))}
            </div>
            <p className="mt-5 text-xs text-muted-foreground leading-relaxed">
              Our mentor is Pahini. We compete in the FIRST LEGO League Challenge BIOGLOW™ 2026–2027 season with the
              SYMBIOSENSE innovation project. Expert feedback, test results and achievements are added here only once
              they are real.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}