import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ArrowRight, Users, FlaskConical, Bot } from "lucide-react";
import TiltCard from "@/components/TiltCard";
import Beams from "@/components/effects/Beams";
import GradientText from "@/components/effects/GradientText";

const CARDS = [
  {
    icon: FlaskConical,
    title: "Innovation Project",
    desc: "SYMBIOSENSE — our concept for combining biological indicators with AI-assisted detection to help conservation teams prioritise field investigations.",
    to: "/innovation",
    accent: "#438B78",
  },
  {
    icon: Users,
    title: "Our Team",
    desc: "Meet the students behind SYMBIOTIX — coders, builders, researchers, and presenters working together.",
    to: "/team",
    accent: "#9ABF82",
  },
  {
    icon: Bot,
    title: "Robot Game",
    desc: "Our FIRST LEGO League robot — missions, strategy, practice progress, and match results throughout the season.",
    to: "/robot-game",
    accent: "#173F32",
  },
];

export default function FeaturedCards() {
  return (
    <section className="py-20 sm:py-28 relative overflow-hidden">
      <div className="absolute inset-0 -z-10">
        <Beams beamColor="rgba(67,139,120,0.08)" beamCount={5} speed={0.2} />
      </div>
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">What We Do</p>
          <h2 className="mt-3 font-display text-3xl sm:text-4xl lg:text-5xl font-bold leading-tight text-balance text-3d text-glow-soft">
            <GradientText colors={["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"]} duration={5}>
              One team, three pillars
            </GradientText>
          </h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">
            SYMBIOTIX brings together people, ideas, and technology under one identity. Explore each
            pillar of our FIRST LEGO League season.
          </p>
        </div>

        <div className="mt-12 grid md:grid-cols-3 gap-5 perspective-mid">
          {CARDS.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 24, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="[perspective:1000px]"
            >
              <TiltCard
                max={10}
                scale={1.02}
                depth={40}
                className="rounded-2xl border border-border bg-card p-6 h-full depth-shadow-md hover:depth-shadow-xl transition-shadow card-shine card-hover-lift"
                contentClassName="p-0"
              >
                <Link to={c.to} className="block h-full">
                  <span
                    className="flex h-12 w-12 items-center justify-center rounded-2xl mb-5 depth-shadow-sm"
                    style={{ backgroundColor: `${c.accent}22`, color: c.accent }}
                  >
                    <c.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-heading text-xl font-bold text-primary">{c.title}</h3>
                  <p className="mt-2.5 text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                  <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary group-hover:gap-3 transition-all">
                    Learn more <ArrowRight className="h-4 w-4" />
                  </span>
                </Link>
              </TiltCard>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}