import { motion } from "framer-motion";

/**
 * TextReveal — word-by-word text reveal animation (inspired by React Bits).
 * Splits text into words and reveals them sequentially on scroll.
 */
export default function TextReveal({
  text,
  className = "",
  delay = 0,
  stagger = 0.04,
  duration = 0.5,
  once = true,
  as = "p",
}) {
  const words = text.split(" ");
  const MotionTag = motion[as] || motion.p;

  return (
    <MotionTag
      initial="hidden"
      whileInView="visible"
      viewport={{ once, margin: "-50px" }}
      transition={{ staggerChildren: stagger, delayChildren: delay }}
      className={className}
      aria-label={text}
    >
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden align-bottom">
          <motion.span
            className="inline-block"
            variants={{
              hidden: { y: "100%", opacity: 0 },
              visible: { y: 0, opacity: 1 },
            }}
            transition={{ duration, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </MotionTag>
  );
}