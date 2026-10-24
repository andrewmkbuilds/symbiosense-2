import { useRef } from "react";

/**
 * ShimmerButton — button with animated shimmer sweep + glow (inspired by React Bits).
 * A light sweep crosses the button on hover, plus a glow pulse.
 */
export default function ShimmerButton({
  children,
  onClick,
  className = "",
  variant = "primary",
  type = "button",
  ...props
}) {
  const ref = useRef(null);

  const base =
    "relative overflow-hidden inline-flex items-center justify-center gap-2 rounded-full font-semibold transition-all duration-300";
  const variants = {
    primary: "bg-primary text-primary-foreground btn-3d",
    secondary: "glass text-primary hover:bg-white/70",
    ghost: "border border-border text-foreground hover:border-primary/50",
  };

  return (
    <button
      ref={ref}
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className} group`}
      {...props}
    >
      {/* Shimmer sweep */}
      <span
        className="pointer-events-none absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-out"
        style={{
          background:
            "linear-gradient(90deg, transparent, rgba(255,255,255,0.25), transparent)",
          width: "50%",
        }}
      />
      {/* Glow ring */}
      <span className="pointer-events-none absolute inset-0 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ boxShadow: "0 0 24px rgba(67,139,120,0.4), inset 0 0 12px rgba(154,191,130,0.15)" }} />
      <span className="relative z-10 inline-flex items-center gap-2">{children}</span>
    </button>
  );
}