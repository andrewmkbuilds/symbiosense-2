import { useState, useMemo, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Search, X, Target, FileText } from "lucide-react";
import { MISSIONS } from "@/lib/missions";

const PAGES = [
  { label: "SYMBIOSENSE Innovation Project", to: "/innovation", desc: "Our innovation project combining lichens with AI-assisted invasive plant detection." },
  { label: "Our Team", to: "/team", desc: "Meet the SYMBIOTIX team members and mentors." },
  { label: "Our Journey", to: "/journey", desc: "Season timeline, milestones, and field study gallery." },
  { label: "Robot Game", to: "/robot-game", desc: "Mission tracker, scoring, and robot game strategy." },
  { label: "Robot Design", to: "/robot-design", desc: "Engineering design process and robot design judging rubric." },
  { label: "Live Console", to: "/live-console", desc: "Interactive live ecosystem monitoring simulation — robot map, AI plant detection, BioRisk dashboard." },
  { label: "Gallery", to: "/gallery", desc: "Team photos and season highlights." },
  { label: "Resources", to: "/resources", desc: "Official FLL documents, rules, and rubrics library." },
  { label: "About", to: "/about", desc: "About SYMBIOTIX and the FIRST CANOPY season." },
  { label: "Contact", to: "/contact", desc: "Get in touch with the team." },
];

export default function NavSearch() {
  const [q, setQ] = useState("");
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef(null);

  const results = useMemo(() => {
    const query = q.trim().toLowerCase();
    if (!query) return { missions: [], pages: [] };
    const missions = MISSIONS.filter(
      (m) => m.name.toLowerCase().includes(query) || m.objective.toLowerCase().includes(query)
    ).slice(0, 5).map((m) => ({
      label: `Mission ${m.number}: ${m.name}`,
      desc: m.objective,
      to: "/robot-game",
    }));
    const pages = PAGES.filter(
      (p) => p.label.toLowerCase().includes(query) || p.desc.toLowerCase().includes(query)
    ).slice(0, 4).map((p) => ({ label: p.label, desc: p.desc, to: p.to }));
    return { missions, pages };
  }, [q]);

  useEffect(() => {
    const onClick = (e) => {
      if (boxRef.current && !boxRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", onClick);
    return () => document.removeEventListener("mousedown", onClick);
  }, []);

  const go = (to) => {
    setOpen(false);
    setQ("");
    navigate(to);
  };

  const hasResults = results.missions.length > 0 || results.pages.length > 0;

  return (
    <div ref={boxRef} className="relative">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-3.5 w-3.5 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={q}
          onChange={(e) => { setQ(e.target.value); setOpen(true); }}
          onFocus={() => setOpen(true)}
          placeholder="Search missions, rules, project..."
          className="w-44 lg:w-56 rounded-full bg-secondary/60 border border-border/60 pl-8 pr-7 py-1.5 text-xs text-foreground outline-none focus:border-primary focus:bg-card transition-colors placeholder:text-muted-foreground/70"
        />
        {q && (
          <button
            onClick={() => { setQ(""); setOpen(false); }}
            className="absolute right-2 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-primary"
            aria-label="Clear search"
          >
            <X className="h-3.5 w-3.5" />
          </button>
        )}
      </div>

      {open && q.trim() && (
        <div className="absolute right-0 top-full mt-2 w-80 sm:w-96 glass-strong rounded-2xl depth-shadow-xl overflow-hidden z-50">
          {hasResults ? (
            <div className="max-h-80 overflow-y-auto p-2">
              {results.missions.length > 0 && (
                <div className="mb-1">
                  <p className="px-3 py-1.5 text-[10px] uppercase tracking-wide text-brand-teal font-bold font-mono flex items-center gap-1.5">
                    <Target className="h-3 w-3" /> Mission Rules
                  </p>
                  {results.missions.map((r) => (
                    <button
                      key={r.label}
                      onClick={() => go(r.to)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <p className="text-xs font-bold text-primary leading-tight">{r.label}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{r.desc}</p>
                    </button>
                  ))}
                </div>
              )}
              {results.pages.length > 0 && (
                <div>
                  <p className="px-3 py-1.5 text-[10px] uppercase tracking-wide text-brand-teal font-bold font-mono flex items-center gap-1.5">
                    <FileText className="h-3 w-3" /> Project Pages
                  </p>
                  {results.pages.map((r) => (
                    <button
                      key={r.to}
                      onClick={() => go(r.to)}
                      className="w-full text-left px-3 py-2 rounded-lg hover:bg-secondary/60 transition-colors"
                    >
                      <p className="text-xs font-bold text-primary leading-tight">{r.label}</p>
                      <p className="text-[11px] text-muted-foreground line-clamp-2 mt-0.5">{r.desc}</p>
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            <div className="p-4 text-center text-xs text-muted-foreground">
              No results for "{q}"
            </div>
          )}
        </div>
      )}
    </div>
  );
}