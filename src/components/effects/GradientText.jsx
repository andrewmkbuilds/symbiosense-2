import { motion } from "framer-motion";

/**
 * GradientText — animated flowing gradient text (inspired by React Bits).
 * Colors flow across the text in a continuous loop.
 */
export default function GradientText({
  children,
  colors = ["#173F32", "#438B78", "#9ABF82", "#438B78", "#173F32"],
  className = "",
  duration = 4,
  as: Tag = "span",
}) {
  const gradient = `linear-gradient(90deg, ${colors.join(", ")})`;
  const bgSize = `${colors.length * 100}% 100%`;

  return (
    <Tag
      className={`inline-block bg-clip-text text-transparent ${className}`}
      style={{
        backgroundImage: gradient,
        backgroundSize: bgSize,
        animation: `gradient-pan ${duration}s ease infinite`,
      }}
    >
      {children}
    </Tag>
  );
}