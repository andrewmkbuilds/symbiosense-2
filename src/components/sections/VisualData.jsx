import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip, CartesianGrid, BarChart, Bar, Legend, PieChart, Pie, Cell } from "recharts";

const MONTHS = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
const SITES = ["North Ridge", "Creek Valley", "Old Quarry", "Meadow Border"];

const LICHEN_TREND = MONTHS.map((m, i) => ({ month: m, crustose: 4 + Math.round(Math.sin(i / 2) * 1.5) + (i % 3), foliose: 6 + Math.round(Math.cos(i / 3) * 1.2) + (i % 2) }));
const ENV_BY_SITE = SITES.map((s, i) => ({ site: s, pollution: [2, 5, 8, 4][i], disturbance: [1, 4, 9, 6][i] }));
const INVASIVE_CATS = [
  { name: "Native (no flag)", value: 62, color: "#9ABF82" },
  { name: "Possible invasive", value: 23, color: "#C08552" },
  { name: "High-confidence flag", value: 15, color: "#B5654A" },
];

const tooltipStyle = { borderRadius: 10, border: "1px solid #E6E0D2", fontSize: 12 };

export default function VisualData({ result, inputs }) {
  const lichenOffset = (inputs.lichenDiversity - 5) * 0.6;
  const responsiveTrend = LICHEN_TREND.map((d) => ({ ...d, foliose: Math.max(0, Math.round(d.foliose + lichenOffset)), crustose: Math.max(0, Math.round(d.crustose + lichenOffset * 0.5)) }));
  const envResponsive = ENV_BY_SITE.map((d, i) => ({ ...d, pollution: i === 0 ? inputs.pollution : d.pollution, disturbance: i === 0 ? inputs.disturbance : d.disturbance }));

  return (
    <section id="data" className="py-20 sm:py-28">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="max-w-2xl">
          <p className="text-xs uppercase tracking-[0.22em] text-brand-teal font-semibold font-mono">05 / Visual Data</p>
          <h2 className="mt-3 font-heading text-3xl sm:text-4xl lg:text-5xl font-bold text-primary leading-tight text-balance">Illustrative data, at a glance</h2>
          <p className="mt-5 text-muted-foreground leading-relaxed">All values below are <span className="font-semibold text-foreground">fictional example data</span> for demonstration. Charts marked "live" respond to the current simulation inputs.</p>
        </div>

        <div className="mt-10 grid lg:grid-cols-2 gap-5">
          <ChartCard title="Lichen observations · 12-month trend" note="Illustrative · foliose & crustose cover index" live>
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={responsiveTrend} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#E6E0D2" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="month" tick={{ fill: "#5a5a4a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#5a5a4a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Line type="monotone" dataKey="foliose" stroke="#438B78" strokeWidth={2.5} dot={false} />
                <Line type="monotone" dataKey="crustose" stroke="#9ABF82" strokeWidth={2.5} dot={false} />
              </LineChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Environmental indicators by site" note="Illustrative · pollution & disturbance" live>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={envResponsive} margin={{ top: 8, right: 12, left: -18, bottom: 0 }}>
                <CartesianGrid stroke="#E6E0D2" strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="site" tick={{ fill: "#5a5a4a", fontSize: 10 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#5a5a4a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#F4F0E5" }} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
                <Bar dataKey="pollution" fill="#438B78" radius={[4, 4, 0, 0]} />
                <Bar dataKey="disturbance" fill="#C08552" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Possible invasive-plant flags" note="Illustrative · classification outcomes">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={INVASIVE_CATS} dataKey="value" nameKey="name" innerRadius={48} outerRadius={80} paddingAngle={2}>
                  {INVASIVE_CATS.map((d, i) => <Cell key={i} fill={d.color} />)}
                </Pie>
                <Tooltip contentStyle={tooltipStyle} />
                <Legend wrapperStyle={{ fontSize: 12 }} />
              </PieChart>
            </ResponsiveContainer>
          </ChartCard>

          <ChartCard title="Current simulation · score composition" note="Live · weighted contribution per indicator" live>
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={result.contributions.map((c) => ({ name: c.short, value: c.contribution, color: c.color }))} layout="vertical" margin={{ top: 4, right: 16, left: 10, bottom: 0 }}>
                <CartesianGrid stroke="#E6E0D2" strokeDasharray="3 3" horizontal={false} />
                <XAxis type="number" tick={{ fill: "#5a5a4a", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis type="category" dataKey="name" tick={{ fill: "#5a5a4a", fontSize: 11 }} axisLine={false} tickLine={false} width={70} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "#F4F0E5" }} />
                <Bar dataKey="value" radius={[0, 6, 6, 0]}>
                  {result.contributions.map((c, i) => <Cell key={i} fill={c.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </ChartCard>
        </div>
      </div>
    </section>
  );
}

function ChartCard({ title, note, live, children }) {
  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between gap-3">
        <div>
          <p className="text-sm font-bold text-primary">{title}</p>
          <p className="text-[11px] text-muted-foreground">{note}</p>
        </div>
        {live && (
          <span className="inline-flex items-center gap-1.5 rounded-full bg-brand-teal/10 px-2.5 py-1 text-[10px] font-bold text-brand-teal uppercase tracking-wide">
            <span className="h-1.5 w-1.5 rounded-full bg-brand-teal animate-pulse" /> Live
          </span>
        )}
      </div>
      <div className="h-60 mt-4">{children}</div>
    </div>
  );
}