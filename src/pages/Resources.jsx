import { useState } from "react";
import { motion } from "framer-motion";
import { FileText, Link as LinkIcon, Mail, MapPin, ExternalLink, Plus, Search, CheckCircle2, XCircle, BookOpen } from "lucide-react";
import ResourcesHero from "@/components/sections/ResourcesHero";
import OfficialSources from "@/components/OfficialSources";
import { RESOURCES, OFFICIAL_LINKS, LAST_CHECKED } from "@/lib/bioglowData";
import { useLocalStorage } from "@/hooks/useLocalStorage";
import TiltCard from "@/components/TiltCard";
import DotField from "@/components/effects/DotField";
import Grainient from "@/components/effects/Grainient";

const CATEGORIES = ["All", "Audited copies", "Robot Game", "Judging", "Season", "Registration", "General"];

const DEFAULT_TEAM_RESOURCES = [
  { id: 1, title: "Project Presentation", url: "", desc: "Our innovation project presentation slides" },
  { id: 2, title: "Robot Design Journal", url: "", desc: "Documentation of our engineering design process" },
  { id: 3, title: "Project Research Notes", url: "", desc: "Research notes and references for SYMBIOSENSE" },
];

export default function Resources() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [teamResources, setTeamResources] = useLocalStorage("symbionix-resources-v2", DEFAULT_TEAM_RESOURCES);

  const filtered = RESOURCES.filter((r) => {
    const matchCat = category === "All" || r.category === category;
    const matchSearch = !search || r.title.toLowerCase().includes(search.toLowerCase()) || r.source.toLowerCase().includes(search.toLowerCase());
    return matchCat && matchSearch;
  });

  const updateResource = (id, updates) => setTeamResources(teamResources.map((r) => (r.id === id ? { ...r, ...updates } : r)));
  const addResource = () => setTeamResources([...teamResources, { id: Date.now(), title: "", url: "", desc: "" }]);

  return (
    <div>
      <ResourcesHero
        totalCount={RESOURCES.length}
        availableCount={RESOURCES.filter((r) => r.available).length}
        lastChecked={LAST_CHECKED}
      />

      {/* Official resources library */}
      <section className="pb-12 relative overflow-hidden" id="library">
        <div className="absolute inset-0 -z-10">
          <DotField dotRadius={1.2} dotSpacing={28} gradientFrom="#438B78" gradientTo="#9ABF82" gradientAngle={135} glowColor="#438B78" glowRadius={160} glowIntensity={0.4} baseOpacity={0.18} speed={0.25} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <BookOpen className="h-5 w-5 text-brand-teal" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Official Resources</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-3 text-3d">BIOGLOW™ Season Document Library</h2>
          <p className="text-sm text-muted-foreground mb-6 max-w-3xl">
            Every resource below links directly to an official FIRST® LEGO® League source. Last checked: {LAST_CHECKED}.
            If a document is unavailable, it is labelled accordingly — no fabricated links.
          </p>

          {/* Search & filters */}
          <div className="flex flex-col sm:flex-row gap-3 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search resources..."
                className="w-full rounded-xl border border-border bg-card pl-10 pr-4 py-2.5 text-sm outline-none focus:border-primary"
              />
            </div>
            <div className="flex flex-wrap gap-2">
              {CATEGORIES.map((c) => (
                <button
                  key={c}
                  onClick={() => setCategory(c)}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-colors ${
                    category === c
                      ? "bg-primary text-primary-foreground"
                      : "bg-card border border-border text-muted-foreground hover:border-brand-teal/50"
                  }`}
                >
                  {c}
                </button>
              ))}
            </div>
          </div>

          {/* Resource cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.3, delay: i * 0.03 }}
                className="[perspective:1000px]"
              >
                <TiltCard max={6} depth={25} className="rounded-2xl glass p-5 h-full card-shine" contentClassName="p-0">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  {r.available ? (
                    <CheckCircle2 className="h-4 w-4 text-brand-teal" />
                  ) : (
                    <XCircle className="h-4 w-4 text-amber-500" />
                  )}
                </div>
                <p className="text-[10px] uppercase tracking-wide text-brand-teal font-semibold font-mono mb-1">{r.category}</p>
                <h3 className="font-heading text-sm font-bold text-primary leading-tight mb-1">{r.title}</h3>
                <p className="text-xs text-muted-foreground mb-3">{r.source}</p>
                {r.available ? (
                  <a href={r.url} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-xs font-semibold text-brand-teal hover:text-primary transition-colors">
                    Open resource <ExternalLink className="h-3.5 w-3.5" />
                  </a>
                ) : (
                  <span className="text-xs font-semibold text-amber-600">{r.note || "Not currently available from the approved sources."}</span>
                )}
                </TiltCard>
              </motion.div>
            ))}
          </div>
          {filtered.length === 0 && (
            <div className="text-center py-12 text-sm text-muted-foreground">
              No resources found matching your search.
            </div>
          )}
        </div>
      </section>

      {/* SYMBIOTIX team resources */}
      <section className="py-12 bg-secondary/40 border-y border-border/60 relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <Grainient colors={["#173F32", "#438B78", "#9ABF82"]} angle={55} flow={0.3} speed={0.2} grainAmount={0.03} opacity={0.1} />
        </div>
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="rounded-2xl border border-brand-teal/30 bg-brand-teal/5 p-4 mb-6">
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-bold font-mono">SYMBIOTIX Team Content</p>
            <p className="text-sm text-muted-foreground mt-1">
              These are our team's own documents — not official FLL resources. All fields are editable.
            </p>
          </div>
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <FileText className="h-5 w-5 text-brand-teal" />
              <h2 className="font-heading text-2xl font-bold text-primary">Team documents</h2>
            </div>
            <button onClick={addResource} className="inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground btn-3d btn-glow">
              <Plus className="h-4 w-4" /> Add
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {teamResources.map((r, i) => (
              <motion.div
                key={r.id}
                initial={{ opacity: 0, y: 14 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="rounded-2xl glass p-5 depth-shadow-sm"
              >
                <div className="flex items-center gap-3 mb-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <FileText className="h-5 w-5" />
                  </span>
                  <input
                    type="text"
                    value={r.title}
                    onChange={(e) => updateResource(r.id, { title: e.target.value })}
                    placeholder="Resource title"
                    className="flex-1 bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none font-bold text-primary text-sm"
                  />
                </div>
                <input
                  type="text"
                  value={r.desc}
                  onChange={(e) => updateResource(r.id, { desc: e.target.value })}
                  placeholder="Description..."
                  className="w-full bg-transparent border-b border-transparent hover:border-border focus:border-primary outline-none text-sm text-muted-foreground mb-2"
                />
                <div className="flex items-center gap-2">
                  <input
                    type="text"
                    value={r.url}
                    onChange={(e) => updateResource(r.id, { url: e.target.value })}
                    placeholder="Link URL..."
                    className="flex-1 bg-secondary/50 border border-border rounded-md px-2.5 py-1.5 text-xs text-foreground outline-none focus:border-primary font-mono"
                  />
                  <button onClick={() => setTeamResources(teamResources.filter((x) => x.id !== r.id))} className="text-muted-foreground hover:text-destructive text-xs">✕</button>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="h-5 w-5 text-brand-teal" />
            <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">Contact</p>
          </div>
          <h2 className="font-heading text-2xl sm:text-3xl font-bold text-primary mb-6 text-3d">Get in touch</h2>
          <div className="grid sm:grid-cols-3 gap-4 max-w-3xl">
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <Mail className="h-5 w-5 text-brand-teal mb-3" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-mono mb-1">Email</p>
              <a href="mailto:teamsymbiotix@gmail.com" className="text-sm font-semibold text-primary hover:text-brand-teal transition-colors">teamsymbiotix@gmail.com</a>
            </div>
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <MapPin className="h-5 w-5 text-brand-teal mb-3" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-mono mb-1">Location</p>
              <p className="text-sm font-semibold text-primary">United Arab Emirates</p>
              <p className="mt-1 text-xs text-muted-foreground">Competing in the FLL UAE regional programme.</p>
            </div>
            <div className="rounded-2xl glass p-5 depth-shadow-sm">
              <FileText className="h-5 w-5 text-brand-teal mb-3" />
              <p className="text-xs uppercase tracking-wide text-muted-foreground font-mono mb-1">Team Info</p>
              <p className="text-sm font-semibold text-primary">SYMBIOTIX · FIRST LEGO League Challenge</p>
              <p className="mt-1 text-xs text-muted-foreground">BIOGLOW™ 2026–2027 season · Innovation project: SYMBIOSENSE</p>
            </div>
          </div>
          <p className="mt-6 text-xs text-muted-foreground">
            Email is our official contact channel. We will not invent other contact information.
          </p>
        </div>
      </section>

      <OfficialSources
        sources={[
          { label: "FLL UAE Resources Page", url: OFFICIAL_LINKS.fllUaeResources },
          { label: "FIRST® Inspires Season Materials", url: OFFICIAL_LINKS.firstinspiresSeasonMaterials },
          { label: "BIOGLOW Robot Game Page (D-A-CH)", url: OFFICIAL_LINKS.fllDachRobotGame },
          { label: "FIRST® LEGO® League Global", url: OFFICIAL_LINKS.fllGlobal },
          { label: "FLL UAE Official Site", url: OFFICIAL_LINKS.fllUae },
          { label: "FIRST® Inspires FLL Get Started", url: OFFICIAL_LINKS.firstinspiresGetStarted },
        ]}
      />
    </div>
  );
}