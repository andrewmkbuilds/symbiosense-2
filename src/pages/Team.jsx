import { useState } from "react";
import { motion } from "framer-motion";
import { Users, Heart, Lightbulb, Wrench, Code, Bot, Camera } from "lucide-react";
import TeamHero from "@/components/sections/TeamHero";
import TiltCard from "@/components/TiltCard";
import DotField from "@/components/effects/DotField";
import Grainient from "@/components/effects/Grainient";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import { avatarFor } from "@/lib/conceptIllustrations";

const DEFAULT_MEMBERS = [
  { id: 1, name: "Advaith", role: "Team Manager", photo: "" },
  { id: 2, name: "Andrew", role: "Material Manager / Project Manager", photo: "" },
  { id: 3, name: "Sai", role: "Creative Designer", photo: "" },
  { id: 4, name: "Ishan", role: "Creative Designer", photo: "" },
  { id: 5, name: "Arnav", role: "Builder", photo: "" },
  { id: 6, name: "Ryan", role: "Builder", photo: "" },
  { id: 7, name: "Dhruv", role: "Builder", photo: "" },
  { id: 8, name: "Veer", role: "Coder", photo: "" },
  { id: 9, name: "Pranav", role: "Communicator", photo: "" },
  { id: 10, name: "Joe", role: "Mission Strategist", photo: "" },
];

const DEFAULT_MENTORS = [
  { id: 1, name: "Pahini", role: "Mentor", bio: "" },
];

const VALUES = [
  { icon: Heart, title: "Collaboration", body: "We solve problems together, combining different perspectives and skills." },
  { icon: Lightbulb, title: "Curiosity", body: "We ask questions, explore ideas, and learn from every experiment." },
  { icon: Wrench, title: "Iteration", body: "We build, test, improve, and repeat — every version teaches us something." },
  { icon: Code, title: "Precision", body: "We value clean code, careful design, and attention to detail." },
];

export default function Team() {
  const [members, setMembers] = useLocalStorage("symbionix-members-v2", DEFAULT_MEMBERS);
  const [mentors, setMentors] = useLocalStorage("symbionix-mentors-v2", DEFAULT_MENTORS);
  const [editingPhoto, setEditingPhoto] = useState(null);

  const updateMember = (id, updates) => setMembers(members.map((m) => (m.id === id ? { ...m, ...updates } : m)));
  const updateMentor = (id, updates) => setMentors(mentors.map((m) => (m.id === id ? { ...m, ...updates } : m)));

  return (
    <div>
      <TeamHero />

      {/* Team intro */}
      <section className="pb-12" id="members">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <TiltCard
            max={3}
            scale={1.005}
            depth={20}
            className="rounded-2xl glass-strong depth-shadow-md p-6 sm:p-8"
            contentClassName="p-0"
          >
            <div className="flex items-center gap-3 mb-4">
              <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary text-primary-foreground depth-shadow-sm">
                <Users className="h-5 w-5" />
              </span>
              <h2 className="font-heading text-xl font-bold text-primary">Who We Are</h2>
            </div>
            <p className="text-muted-foreground leading-relaxed">
              We are a FIRST LEGO League Challenge team competing in the FIRST CANOPY 2026–2027 season.
              Our team brings together students with interests in nature, robotics, coding, and research.
              We believe that connecting different kinds of knowledge — biological and technological — leads
              to better ideas and better solutions. This page will be updated as our team grows.
            </p>
          </TiltCard>
        </div>
      </section>

      {/* Member cards */}
      <section className="pb-20 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <DotField dotRadius={1.2} dotSpacing={30} gradientFrom="#173F32" gradientTo="#9ABF82" glowColor="#438B78" glowRadius={160} glowIntensity={0.4} baseOpacity={0.18} speed={0.25} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono mb-4">Team Members</p>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {members.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 20, rotateX: -8 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="[perspective:1000px]"
              >
                <TiltCard
                  max={10}
                  scale={1.03}
                  depth={40}
                  className="rounded-2xl border border-border bg-card p-5 text-center h-full depth-shadow-sm hover:depth-shadow-lg transition-shadow card-shine"
                  contentClassName="p-0"
                >
                  <div className="mx-auto mb-4 w-fit">
                    <button
                      onClick={() => setEditingPhoto(editingPhoto === m.id ? null : m.id)}
                      className="group relative h-20 w-20 rounded-full overflow-hidden border-2 border-border hover:border-brand-teal/60 transition-colors"
                      aria-label={`Set a photo for ${m.name}`}
                    >
                      <img
                        src={m.photo || avatarFor(i)}
                        alt={m.photo ? m.name : `${m.name} — concept illustration`}
                        onError={(e) => {
                          // A pasted photo URL that fails falls back to the concept
                          // illustration instead of a raw broken-image icon.
                          const img = e.currentTarget;
                          if (img.dataset.fallback) return;
                          img.dataset.fallback = "true";
                          img.src = avatarFor(i);
                        }}
                        className="h-full w-full object-cover"
                      />
                      <span className="absolute inset-0 flex items-center justify-center bg-primary/60 opacity-0 group-hover:opacity-100 transition-opacity">
                        <Camera className="h-6 w-6 text-white" />
                      </span>
                    </button>
                  </div>
                  {editingPhoto === m.id && (
                    <input
                      type="text"
                      value={m.photo || ""}
                      onChange={(e) => updateMember(m.id, { photo: e.target.value })}
                      onBlur={() => setEditingPhoto(null)}
                      onKeyDown={(e) => { if (e.key === "Enter") setEditingPhoto(null); }}
                      placeholder="Paste image URL"
                      autoFocus
                      className="w-full text-xs px-2 py-1.5 mb-2 rounded-md border border-border bg-background text-center outline-none focus:border-primary"
                    />
                  )}
                  <h3 className="font-bold text-primary text-base">{m.name}</h3>
                  <p className="mt-1 text-sm text-brand-teal font-semibold leading-tight">{m.role}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">
            Portraits are concept illustrations — click one and paste an image URL to use a real photo instead.
          </p>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Grainient colors={["#173F32", "#438B78", "#9ABF82"]} angle={55} flow={0.3} speed={0.2} grainAmount={0.03} opacity={0.1} />
        </div>
        <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
          <div className="text-center mb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">How We Work</p>
            <h2 className="mt-3 font-display text-3xl sm:text-4xl font-bold text-primary text-3d">Our Values</h2>
            <p className="mt-4 font-display text-lg text-brand-teal italic">"Connected by Nature. Driven by Innovation."</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {VALUES.map((v, i) => (
              <motion.div
                key={v.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="[perspective:1000px]"
              >
                <TiltCard
                  max={8}
                  depth={25}
                  className="rounded-2xl glass p-5 text-center h-full card-shine"
                  contentClassName="p-0"
                >
                  <span className="inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-primary/10 text-primary mb-3 depth-shadow-sm">
                    <v.icon className="h-6 w-6" strokeWidth={1.6} />
                  </span>
                  <h3 className="font-heading text-base font-bold text-primary">{v.title}</h3>
                  <p className="mt-1.5 text-sm text-muted-foreground leading-relaxed">{v.body}</p>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Mentors */}
      <section className="py-20">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono mb-4">Mentors & Coaches</p>
          <div className="grid sm:grid-cols-2 gap-4 max-w-3xl">
            {mentors.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
                className="[perspective:1000px]"
              >
                <TiltCard
                  max={6}
                  depth={25}
                  className="rounded-2xl glass border-dashed p-5 h-full"
                  contentClassName="p-0"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-card border border-border text-muted-foreground depth-shadow-sm">
                      <Bot className="h-5 w-5" />
                    </span>
                    <div className="flex-1 min-w-0">
                      <input
                        type="text"
                        value={m.name}
                        onChange={(e) => updateMentor(m.id, { name: e.target.value })}
                        placeholder="Mentor name"
                        className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none font-bold text-primary"
                      />
                      <input
                        type="text"
                        value={m.role}
                        onChange={(e) => updateMentor(m.id, { role: e.target.value })}
                        placeholder="Role"
                        className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-sm text-brand-teal font-semibold mt-1"
                      />
                    </div>
                  </div>
                  <textarea
                    value={m.bio}
                    onChange={(e) => updateMentor(m.id, { bio: e.target.value })}
                    placeholder="Short bio..."
                    rows={2}
                    className="w-full bg-transparent border border-border/60 rounded-lg p-2.5 hover:border-border focus:border-primary outline-none text-sm text-muted-foreground resize-none transition-colors"
                  />
                </TiltCard>
              </motion.div>
            ))}
          </div>
          <p className="mt-5 text-xs text-muted-foreground">Mentor details will be updated as the season develops.</p>
        </div>
      </section>
    </div>
  );
}