import { motion } from "framer-motion";

/**
 * FadeContent — scroll-triggered fade with blur (inspired by React Bits).
 * Wraps children in a motion div that fades + unblurs when scrolled into view.
 */
export default function FadeContent({
  children,
  delay = 0,
  duration = 0.6,
  blur = 8,
  y = 20,
  once = true,
  threshold = 0.15,
  className = "",
  as = "div",
}) {
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      initial={{ opacity: 0, filter: `blur(${blur}px)`, y }}
      whileInView={{ opacity: 1, filter: "blur(0px)", y: 0 }}
      viewport={{ once, margin: `-${Math.round(threshold * 100)}px` }}
      transition={{ duration, delay, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </MotionTag>
  );
}