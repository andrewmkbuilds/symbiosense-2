/**
 * ShinyText — text with a traveling shimmer highlight (React Bits inspired).
 * A linear gradient sheen sweeps across the letters on a loop.
 * Use on a single line of text; inherits font size/weight from parent.
 */
export default function ShinyText({
  text = "",
  duration = 3,
  className = "",
  shimmerColor = "rgba(255,255,255,0.85)",
  baseColor = "hsl(var(--primary))",
}) {
  return (
    <span
      className={`relative inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: `linear-gradient(110deg, ${baseColor} 35%, ${shimmerColor} 50%, ${baseColor} 65%)`,
        backgroundSize: "200% 100%",
        WebkitBackgroundClip: "text",
        backgroundClip: "text",
        WebkitTextFillColor: "transparent",
        animation: `shiny-sweep ${duration}s linear infinite`,
      }}
    >
      {text}
      <style>{`@keyframes shiny-sweep { 0% { background-position: 200% 0; } 100% { background-position: -200% 0; } }`}</style>
    </span>
  );
}