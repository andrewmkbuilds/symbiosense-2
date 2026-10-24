const pill = (active) =>
  `rounded-md text-xs font-semibold transition-colors ${
    active ? "bg-primary text-primary-foreground" : "bg-secondary/50 border border-border text-muted-foreground hover:border-brand-teal/50"
  }`;

export default function ConditionControl({ condition, value, onChange, disabled }) {
  const { type, label, options, max } = condition;

  if (type === "boolean" || type === "bonus" || type === "flag") {
    return (
      <button type="button" onClick={() => !disabled && onChange(!value)} disabled={disabled} className="flex items-start gap-2.5 text-left flex-1">
        <span className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-md border transition-colors ${value ? "bg-primary border-primary text-primary-foreground" : "border-border"}`}>
          {value && <span className="text-xs">✓</span>}
        </span>
        <span className="text-sm text-foreground leading-snug">{label}</span>
      </button>
    );
  }

  if (type === "count") {
    return (
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        <span className="text-sm text-foreground leading-snug flex-1 min-w-[10rem]">{label}</span>
        <div className="flex items-center gap-1">
          {Array.from({ length: max + 1 }, (_, i) => (
            <button key={i} type="button" disabled={disabled} onClick={() => onChange(i)} className={`h-7 w-7 font-mono ${pill(value === i)}`}>{i}</button>
          ))}
        </div>
      </div>
    );
  }

  if (type === "tier") {
    return (
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        <span className="text-sm text-foreground leading-snug flex-1 min-w-[10rem]">{label}</span>
        <div className="flex items-center gap-1 flex-wrap">
          {options.map((opt, i) => (
            <button key={opt} type="button" disabled={disabled} onClick={() => onChange(i)} className={`px-2.5 py-1 ${pill(value === i)}`}>{opt}</button>
          ))}
        </div>
      </div>
    );
  }

  if (type === "select") {
    return (
      <div className="flex items-center gap-3 flex-1 flex-wrap">
        <span className="text-sm text-foreground leading-snug flex-1 min-w-[10rem]">{label}</span>
        <div className="flex items-center gap-1">
          {options.map((opt) => (
            <button key={opt} type="button" disabled={disabled} onClick={() => onChange(value === opt ? "" : opt)} className={`px-2.5 py-1 ${pill(value === opt)}`}>{opt}</button>
          ))}
        </div>
      </div>
    );
  }

  return null;
}