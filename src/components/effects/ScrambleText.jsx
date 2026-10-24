import { useEffect, useRef, useState } from "react";

/**
 * ScrambleText — decrypt/scramble text reveal (React Bits inspired).
 * Letters scramble through random characters then resolve into the target text
 * when the element scrolls into view. Respects prefers-reduced-motion (shows text).
 */
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ!<>-_/[]{}=+*?#";

export default function ScrambleText({
  text = "",
  as: Tag = "span",
  className = "",
  duration = 1.2, // seconds to resolve
  frameInterval = 38, // ms between scramble frames
  scrambleChars = CHARS,
  once = true,
}) {
  const ref = useRef(null);
  const [display, setDisplay] = useState(text);
  const [done, setDone] = useState(false);
  const reduced = typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  useEffect(() => {
    if (reduced) { setDisplay(text); setDone(true); return; }
    const el = ref.current;
    if (!el) return;

    let raf;
    const run = () => {
      if (done && once) return;
      const total = text.length;
      const start = performance.now();
      const queue = text.split("").map((c, i) => ({ c, i, start: (i / total) * duration * 1000 * 0.6, end: (i / total) * duration * 1000 * 0.6 + 400 }));

      const tick = (now) => {
        const elapsed = now - start;
        let out = "";
        let allDone = true;
        for (const q of queue) {
          if (q.c === " ") { out += " "; continue; }
          if (elapsed < q.start) { out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)]; allDone = false; }
          else if (elapsed < q.end) { out += scrambleChars[Math.floor(Math.random() * scrambleChars.length)]; allDone = false; }
          else { out += q.c; }
        }
        setDisplay(out);
        if (!allDone) raf = requestAnimationFrame(tick);
        else { setDisplay(text); setDone(true); }
      };
      raf = requestAnimationFrame(tick);
    };

    const io = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) { run(); if (once) io.disconnect(); }
    }, { threshold: 0.4 });
    io.observe(el);

    return () => { cancelAnimationFrame(raf); io.disconnect(); };
  }, [text, duration, frameInterval, scrambleChars, once, reduced]);

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {display}
    </Tag>
  );
}