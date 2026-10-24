import { motion } from "framer-motion";
import { Plus, Award, Medal } from "lucide-react";
import GalleryHero from "@/components/sections/GalleryHero";
import TiltCard from "@/components/TiltCard";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { illustrationsFor } from "@/lib/conceptIllustrations";
import { Image } from "@/components/ui/image";
import DotField from "@/components/effects/DotField";
import Grainient from "@/components/effects/Grainient";

const CATEGORIES = [
  "Team Photos",
  "Robot Building",
  "Project Research",
  "Prototypes",
  "Competition",
  "Certificates",
];

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useLocalStorage("symbionix-gallery-category", CATEGORIES[0]);
  const [achievements, setAchievements] = useLocalStorage("symbiotix-achievements-v1", []);

  const updateAchievement = (id, updates) => setAchievements(achievements.map((a) => (a.id === id ? { ...a, ...updates } : a)));
  const addAchievement = () => setAchievements([...achievements, { id: Date.now(), title: "", desc: "", date: "" }]);

  return (
    <div>
      <GalleryHero />

      {/* Photo gallery */}
      <section id="gallery" className="pb-12 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotField dotRadius={1.2} dotSpacing={28} gradientFrom="#173F32" gradientTo="#9ABF82" glowColor="#438B78" glowRadius={150} glowIntensity={0.4} baseOpacity={0.18} speed={0.25} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          {/* Category tabs */}
          <div className="flex flex-wrap gap-2 mb-6">
            {CATEGORIES.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-semibold transition-colors ${
                  activeCategory === cat ? "bg-primary text-primary-foreground" : "bg-card border border-border text-muted-foreground hover:text-primary hover:border-primary/50"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-sm text-muted-foreground mb-4">
            {activeCategory} — concept illustrations of our project work, not photographs. We swap in real photos as
            soon as we have them.
          </p>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4">
            {illustrationsFor(activeCategory).map((ill, i) => (
              <motion.div
                key={ill.url}
                initial={{ opacity: 0, y: 16, rotateY: -6 }}
                whileInView={{ opacity: 1, y: 0, rotateY: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={8} depth={25} className="rounded-2xl glass-strong border border-border/60 overflow-hidden hover:border-brand-teal/50 transition-colors card-shine depth-shadow-md" contentClassName="p-0">
                  <figure>
                    <div className="aspect-[4/3] overflow-hidden bg-secondary/40" style={{ transform: "translateZ(12px)" }}>
                      <Image src={ill.url} alt={`${ill.title} — concept illustration`} fittingType="cover" className="h-full w-full" />
                    </div>
                    <figcaption className="p-3">
                      <p className="text-xs font-semibold text-primary leading-snug">{ill.title}</p>
                      <p className="mt-1 text-[10px] uppercase tracking-wide text-muted-foreground font-mono">Concept illustration</p>
                    </figcaption>
                  </figure>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements */}
      <section className="py-16 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Grainient colors={["#173F32", "#438B78", "#9ABF82"]} angle={55} flow={0.3} speed={0.2} grainAmount={0.03} opacity={0.1} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center justify-between mb-6">
            <div>
              <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono mb-2">Achievements</p>
              <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary">Awards & accomplishments</h2>
            </div>
            <button onClick={addAchievement} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors btn-glow">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <p className="text-sm text-muted-foreground mb-6">No awards or accomplishments are listed yet. These will be added as the season progresses — we will not fabricate achievements.</p>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {achievements.map((a, i) => (
              <motion.div
                key={a.id}
                initial={{ opacity: 0, y: 14, rotateX: -4 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={6} depth={20} className="rounded-2xl glass-strong border border-border/60 bg-card p-5 card-shine depth-shadow-md h-full" contentClassName="p-0">
                <div className="preserve-3d">
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <Award className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    value={a.title}
                    onChange={(e) => updateAchievement(a.id, { title: e.target.value })}
                    placeholder="Achievement title"
                    className="flex-1 bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none font-bold text-primary text-sm"
                  />
                </div>
                <textarea
                  value={a.desc}
                  onChange={(e) => updateAchievement(a.id, { desc: e.target.value })}
                  placeholder="Description..."
                  rows={2}
                  className="w-full bg-transparent border border-border/60 rounded-lg p-2.5 hover:border-border focus:border-primary outline-none text-sm text-muted-foreground resize-none transition-colors mb-2"
                />
                <div className="flex items-center justify-between">
                  <input
                    type="text"
                    value={a.date}
                    onChange={(e) => updateAchievement(a.id, { date: e.target.value })}
                    placeholder="Date"
                    className="bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-xs text-brand-teal font-mono"
                  />
                  <button onClick={() => setAchievements(achievements.filter((x) => x.id !== a.id))} className="text-muted-foreground hover:text-destructive text-xs">✕</button>
                </div>
                </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>

          {achievements.length === 0 && (
            <div className="rounded-2xl border-2 border-dashed border-border bg-card p-10 text-center">
              <Medal className="h-10 w-10 mx-auto mb-3 text-muted-foreground/40" />
              <p className="text-sm text-muted-foreground">No achievements yet. Click "Add" to create one.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}