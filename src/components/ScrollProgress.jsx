import { motion, useScroll, useSpring } from "framer-motion";

/**
 * Premium scroll progress indicator — a thin gradient bar fixed to the
 * top of the viewport that fills as the user scrolls down the page.
 */
export default function ScrollProgress() {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      style={{ scaleX }}
      className="fixed top-0 left-0 right-0 h-[3px] origin-left z-[60] bg-gradient-to-r from-brand-teal via-accent to-brand-leaf"
    />
  );
}