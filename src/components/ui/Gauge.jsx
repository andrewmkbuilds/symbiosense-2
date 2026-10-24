// Semicircle gauge (0–100) rendered as SVG. Pure presentational component.
export default function Gauge({ value = 0, color = "#438B78", label = "Risk Score", size = 220 }) {
  const v = Math.max(0, Math.min(100, value));
  const r = 90;
  const cx = 110;
  const cy = 110;
  const startAngle = 180;
  const endAngle = 0;
  const valueAngle = startAngle - (v / 100) * (startAngle - endAngle);

  const polar = (angle) => {
    const a = (angle * Math.PI) / 180;
    return { x: cx + r * Math.cos(a), y: cy - r * Math.sin(a) };
  };
  const arc = (a0, a1, segments = 64) => {
    const pts = [];
    for (let i = 0; i <= segments; i++) {
      const angle = a0 + ((a1 - a0) * i) / segments;
      pts.push(polar(angle));
    }
    return "M " + pts.map((p) => `${p.x} ${p.y}`).join(" L ");
  };
  const needle = polar(valueAngle);

  return (
    <div className="flex flex-col items-center" style={{ width: size }}>
      <svg viewBox="0 0 220 130" className="w-full overflow-visible">
        {/* track */}
        <path d={arc(startAngle, endAngle)} fill="none" stroke="#E6E0D2" strokeWidth="14" strokeLinecap="round" />
        {/* value arc */}
        <path
          d={arc(startAngle, valueAngle)}
          fill="none"
          stroke={color}
          strokeWidth="14"
          strokeLinecap="round"
          style={{ transition: "stroke-dasharray 0.6s ease, stroke 0.4s ease" }}
        />
        {/* ticks */}
        {[0, 25, 50, 75, 100].map((t) => {
          const a = startAngle - (t / 100) * 180;
          const outer = polar(a);
          const inner = { x: cx + (r - 10) * Math.cos((a * Math.PI) / 180), y: cy - (r - 10) * Math.sin((a * Math.PI) / 180) };
          return <line key={t} x1={outer.x} y1={outer.y} x2={inner.x} y2={inner.y} stroke="#C9C2B0" strokeWidth="1.5" />;
        })}
        {/* needle */}
        <line x1={cx} y1={cy} x2={needle.x} y2={needle.y} stroke={color} strokeWidth="3" strokeLinecap="round" style={{ transition: "all 0.6s ease" }} />
        <circle cx={cx} cy={cy} r="6" fill={color} />
        {/* value text (centered inside the arc, above the hub) */}
        <text x={cx} y={cy - 22} textAnchor="middle" className="fill-foreground" style={{ fontSize: 32, fontWeight: 700 }}>
          {Math.round(v)}
        </text>
        {/* label (below the arc, clear of the needle hub) */}
        <text x={cx} y={cy + 18} textAnchor="middle" fill="#8A8676" style={{ fontSize: 9, letterSpacing: 1.6, textTransform: "uppercase" }}>
          {label}
        </text>
      </svg>
    </div>
  );
}