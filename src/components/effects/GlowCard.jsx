import { motion } from "framer-motion";

/**
 * GlowCard — card with animated border glow that pulses on hover (inspired by React Bits).
 * A gradient border glow animates around the card perimeter.
 */
export default function GlowCard({
  children,
  className = "",
  glowColor = "rgba(67,139,120,0.3)",
  glowColor2 = "rgba(154,191,130,0.2)",
  intensity = 1,
  ...props
}) {
  return (
    <motion.div
      whileHover="hover"
      className={`group relative rounded-2xl ${className}`}
      {...props}
    >
      {/* Animated glow border */}
      <motion.div
        variants={{
          rest: { opacity: 0 },
          hover: { opacity: 1 },
        }}
        transition={{ duration: 0.4 }}
        className="pointer-events-none absolute -inset-0.5 rounded-2xl blur-sm"
        style={{
          background: `linear-gradient(135deg, ${glowColor}, ${glowColor2}, ${glowColor})`,
          backgroundSize: "200% 200%",
          animation: "gradient-pan 3s ease infinite",
        }}
      />
      {/* Inner content */}
      <div className="relative z-10 rounded-2xl h-full">{children}</div>
    </motion.div>
  );
}