import { useEffect, useRef, useState } from "react";

/**
 * BlobCursor — gooey cursor blob with trail (inspired by React Bits).
 * Uses SVG gooey filter + CSS for a lightweight cursor effect.
 * Respects prefers-reduced-motion and touch devices.
 */
export default function BlobCursor({
  color = "#438B78",
  size = 24,
  trailCount = 5,
  lag = 0.15,
  className = "",
}) {
  const containerRef = useRef(null);
  const blobsRef = useRef([]);
  const mouseRef = useRef({ x: 0, y: 0 });
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    // Disable on touch devices and reduced motion
    const isTouch = window.matchMedia("(pointer: coarse)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouch || reduced) return;
    setEnabled(true);

    const total = trailCount + 1;
    blobsRef.current = new Array(total).fill(0).map(() => ({ x: 0, y: 0 }));

    const onMove = (e) => {
      mouseRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove, { passive: true });

    let raf;
    const animate = () => {
      const blobs = blobsRef.current;
      if (!blobs.length) return;

      blobs[0].x += (mouseRef.current.x - blobs[0].x) * lag;
      blobs[0].y += (mouseRef.current.y - blobs[0].y) * lag;

      for (let i = 1; i < blobs.length; i++) {
        blobs[i].x += (blobs[i - 1].x - blobs[i].x) * lag * 1.2;
        blobs[i].y += (blobs[i - 1].y - blobs[i].y) * lag * 1.2;
      }

      const els = containerRef.current?.querySelectorAll(".blob-dot");
      if (els) {
        els.forEach((el, i) => {
          const scale = 1 - (i / total) * 0.6;
          const opacity = 1 - (i / total) * 0.8;
          el.style.transform = `translate3d(${blobs[i].x - size / 2}px, ${blobs[i].y - size / 2}px, 0) scale(${scale})`;
          el.style.opacity = opacity;
        });
      }

      raf = requestAnimationFrame(animate);
    };
    animate();

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", onMove);
    };
  }, [trailCount, lag, size]);

  if (!enabled) return null;

  return (
    <div ref={containerRef} className={`fixed inset-0 pointer-events-none z-[9999] ${className}`} aria-hidden="true">
      <svg className="absolute w-0 h-0" aria-hidden="true">
        <defs>
          <filter id="blob-goo">
            <feGaussianBlur in="SourceGraphic" stdDeviation="6" result="blur" />
            <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7" result="goo" />
            <feBlend in="SourceGraphic" in2="goo" />
          </filter>
        </defs>
      </svg>
      <div style={{ filter: "url(#blob-goo)" }}>
        {Array.from({ length: trailCount + 1 }).map((_, i) => (
          <div
            key={i}
            className="blob-dot absolute rounded-full will-change-transform"
            style={{
              width: size,
              height: size,
              backgroundColor: color,
              top: 0,
              left: 0,
              opacity: 0,
            }}
          />
        ))}
      </div>
    </div>
  );
}