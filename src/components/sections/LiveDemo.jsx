import { motion } from "framer-motion";
import { Play, RotateCcw, MapPin, Gauge as GaugeIcon, Activity, Info } from "lucide-react";
import { ResponsiveContainer, RadarChart, Radar, PolarGrid, PolarAngleAxis, BarChart, Bar, XAxis, YAxis, Tooltip, Cell } from "recharts";
import Gauge from "@/components/ui/Gauge";
import { INPUTS, PRESETS, SITES } from "@/lib/symbiosense";

export default function LiveDemo({ inputs, onChangeInput, onAnalyze, onReset, onPreset, result, site, onSiteChange, activePreset }) {
  const radarData = result.contributions.map((c) => ({ subject: c.short, value: c.stressPct, full: 100 }));
  const barData = result.contributions.map((c) => ({ name: c.short, contribution: c.contribution, color: c.color }));

  return (
    <section id="demo" className="py-20 sm:py-28 bg-primary text-primary-foreground relative overflow-hidden">
      <div className="absolute inset-0 bg-grid opacity-[0.06]" />
      <div className="absolute -top-20 right-10 h-72 w-72 rounded-full bg-brand-teal/20 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold font-mono">03 / Interactive Live Demo</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary-foreground leading-tight text-balance">
            Operate the BioRisk simulator
          </h2>
          <p className="mt-5 text-primary-foreground/70 leading-relaxed">
            Adjust the indicators, choose a scenario, and run the analysis. The score, charts and priority update live.
            This is a hands-on simulation for the presentation — not a connection to real sensors.
          </p>
        </div>

        <div className="mt-8 flex items-center gap-3 rounded-xl border border-accent/40 bg-accent/15 px-4 py-3">
          <Info className="h-5 w-5 shrink-0 text-accent" />
          <p className="text-xs font-bold text-accent tracking-wide uppercase">Simulated Demo · Illustrative Data · Not Live Sensor Data</p>
        </div>

        <div className="mt-6 grid lg:grid-cols-12 gap-5">
          <div className="lg:col-span-5 rounded-2xl bg-card text-card-foreground border border-border p-6 shadow-2xl shadow-black/20">
            <div className="flex items-center gap-2 text-sm font-bold text-primary"><MapPin className="h-4 w-4 text-brand-teal" /> Monitoring site</div>
            <div className="mt-3 grid grid-cols-2 gap-2">
              {SITES.map((s) => (
                <button key={s.id} onClick={() => onSiteChange(s.id)} className={`text-left rounded-lg border px-3 py-2.5 transition-colors ${site === s.id ? "border-primary bg-primary/5" : "border-border hover:border-brand-teal/50 bg-secondary/40"}`}>
                  <p className="text-sm font-semibold text-primary leading-tight">{s.name}</p>
                  <p className="text-[11px] text-muted-foreground">{s.region}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary"><Activity className="h-4 w-4 text-brand-teal" /> Scenario presets</div>
            <div className="mt-3 flex flex-col gap-2">
              {PRESETS.map((p) => (
                <button key={p.id} onClick={() => onPreset(p)} className={`text-left rounded-lg border px-3.5 py-2.5 transition-all ${activePreset === p.id ? "border-brand-teal bg-brand-teal/10" : "border-border hover:border-brand-teal/50 bg-secondary/40"}`}>
                  <p className="text-sm font-semibold text-primary">{p.name}</p>
                  <p className="text-[11px] text-muted-foreground leading-snug">{p.summary}</p>
                </button>
              ))}
            </div>

            <div className="mt-6 flex items-center gap-2 text-sm font-bold text-primary"><GaugeIcon className="h-4 w-4 text-brand-teal" /> Indicators</div>
            <div className="mt-3 space-y-4">
              {INPUTS.map((cfg) => (
                <SliderControl key={cfg.key} cfg={cfg} value={inputs[cfg.key]} onChange={(v) => onChangeInput(cfg.key, v)} />
              ))}
            </div>

            <div className="mt-6 flex gap-2.5">
              <button onClick={onAnalyze} className="flex-1 inline-flex items-center justify-center gap-2 rounded-full bg-primary px-5 py-3 text-sm font-semibold text-primary-foreground hover:bg-primary/90 transition-colors shadow-lg shadow-primary/30">
                <Play className="h-4 w-4" /> Analyze Site
              </button>
              <button onClick={onReset} className="inline-flex items-center justify-center gap-2 rounded-full border border-border bg-secondary/50 px-4 py-3 text-sm font-semibold text-primary hover:bg-secondary transition-colors">
                <RotateCcw className="h-4 w-4" /> Reset
              </button>
            </div>
          </div>

          <div className="lg:col-span-7 grid gap-5">
            <div className="rounded-2xl bg-card text-card-foreground border border-border p-6 shadow-2xl shadow-black/20">
              <div className="grid sm:grid-cols-2 gap-6 items-center">
                <div className="flex flex-col items-center">
                  <Gauge value={result.score} color={result.color} label="Risk Score" />
                  <div className="mt-2 inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-sm font-semibold" style={{ backgroundColor: `${result.color}1a`, color: result.color }}>
                    <span className="h-2 w-2 rounded-full" style={{ backgroundColor: result.color }} />
                    {result.label}
                  </div>
                </div>
                <div>
                  <h3 className="font-heading text-xl font-bold text-primary">Investigation priority</h3>
                  <p className="mt-2 text-sm text-muted-foreground leading-relaxed">{result.guidance}</p>
                  <p className="mt-4 text-xs text-muted-foreground leading-relaxed border-t border-border pt-3">
                    The score is an <span className="font-semibold text-foreground">educational demonstration</span> — a weighted blend of the four illustrative inputs. It is not a validated scientific prediction and does not connect to real sensors.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-5">
              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 shadow-xl shadow-black/10">
                <p className="text-sm font-bold text-primary">Stress profile</p>
                <p className="text-[11px] text-muted-foreground">Each axis: 0 (healthy) → 100 (stressed)</p>
                <div className="h-52 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <RadarChart data={radarData} outerRadius="72%">
                      <PolarGrid stroke="#E6E0D2" />
                      <PolarAngleAxis dataKey="subject" tick={{ fill: "#5a5a4a", fontSize: 11 }} />
                      <Radar dataKey="value" stroke="#438B78" fill="#9ABF82" fillOpacity={0.5} strokeWidth={2} />
                    </RadarChart>
                  </ResponsiveContainer>
                </div>
              </div>

              <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 shadow-xl shadow-black/10">
                <p className="text-sm font-bold text-primary">Score breakdown</p>
                <p className="text-[11px] text-muted-foreground">Weighted contribution to the risk score</p>
                <div className="h-52 mt-2">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={barData} margin={{ top: 8, right: 8, left: -18, bottom: 0 }}>
                      <XAxis dataKey="name" tick={{ fill: "#5a5a4a", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <YAxis tick={{ fill: "#5a5a4a", fontSize: 10 }} axisLine={false} tickLine={false} />
                      <Tooltip cursor={{ fill: "#F4F0E5" }} contentStyle={{ borderRadius: 10, border: "1px solid #E6E0D2", fontSize: 12 }} />
                      <Bar dataKey="contribution" radius={[6, 6, 0, 0]}>
                        {barData.map((d, i) => <Cell key={i} fill={d.color} />)}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </div>
            </div>

            <div className="rounded-2xl bg-card text-card-foreground border border-border p-5 shadow-xl shadow-black/10">
              <p className="text-sm font-bold text-primary">What influenced the score</p>
              <div className="mt-3 space-y-3">
                {result.contributions.map((c) => (
                  <div key={c.key} className="grid grid-cols-12 gap-3 items-center text-sm">
                    <div className="col-span-5 sm:col-span-4">
                      <p className="font-medium text-foreground leading-tight">{c.short}</p>
                      <p className="text-[11px] text-muted-foreground font-mono">input {c.raw}/10 · weight {Math.round(c.weight * 100)}%</p>
                    </div>
                    <div className="col-span-5 sm:col-span-6">
                      <div className="h-2.5 w-full rounded-full bg-secondary overflow-hidden">
                        <motion.div className="h-full rounded-full" style={{ backgroundColor: c.color }} initial={{ width: 0 }} animate={{ width: `${(c.contribution / 35) * 100}%` }} transition={{ duration: 0.5 }} />
                      </div>
                    </div>
                    <div className="col-span-2 text-right font-semibold text-primary font-mono">+{c.contribution}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function SliderControl({ cfg, value, onChange }) {
  return (
    <div>
      <div className="flex items-baseline justify-between">
        <label className="text-sm font-medium text-foreground">{cfg.label}</label>
        <span className="text-sm font-semibold text-primary tabular-nums font-mono">{value}<span className="text-muted-foreground font-normal">/{cfg.max}</span></span>
      </div>
      <input type="range" min={cfg.min} max={cfg.max} step={cfg.step} value={value} onChange={(e) => onChange(Number(e.target.value))} className="mt-2 w-full accent-[#438B78] cursor-pointer" aria-label={cfg.label} />
      <p className="mt-1 text-[11px] text-muted-foreground leading-snug">{cfg.description}</p>
    </div>
  );
}