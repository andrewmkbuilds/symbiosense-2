import { useEffect, useRef } from "react";

/**
 * DotField — interactive dot grid with cursor glow (inspired by React Bits).
 * Canvas-based, performant, respects prefers-reduced-motion.
 */
export default function DotField({
  dotRadius = 1.5,
  dotSpacing = 22,
  gradientFrom = "#173F32",
  gradientTo = "#9ABF82",
  gradientAngle = 135,
  cursorRadius = 200,
  glowColor = "#438B78",
  glowRadius = 140,
  glowIntensity = 0.7,
  baseOpacity = 0.35,
  speed = 0.5,
  interactive = true,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0, h = 0, dpr = Math.min(window.devicePixelRatio || 1, 2);
    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    const onMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
    };
    const onLeave = () => { mouseRef.current = { x: -9999, y: -9999 }; };
    if (interactive) {
      window.addEventListener("mousemove", onMove, { passive: true });
      window.addEventListener("mouseout", onLeave, { passive: true });
    }

    const t0 = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const time = (performance.now() - t0) / 1000;

      const cols = Math.ceil(w / dotSpacing) + 1;
      const rows = Math.ceil(h / dotSpacing) + 1;
      const rad = (gradientAngle * Math.PI) / 180;
      const cosR = Math.cos(rad), sinR = Math.sin(rad);

      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const baseX = c * dotSpacing;
          const baseY = r * dotSpacing;

          // Gentle wave drift
          const wave = reduced ? 0 : Math.sin(time * speed + (baseX + baseY) * 0.01) * 2;
          const x = baseX + wave;
          const y = baseY + wave;

          // Gradient color based on position
          const projX = (x * cosR + y * sinR) / (w + h);
          const t = Math.max(0, Math.min(1, projX));
          const color = lerpColor(gradientFrom, gradientTo, t);

          // Cursor glow
          const dx = x - mouseRef.current.x;
          const dy = y - mouseRef.current.y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          const glowFactor = Math.max(0, 1 - dist / glowRadius);
          const cursorFactor = Math.max(0, 1 - dist / cursorRadius);

          const opacity = baseOpacity + glowFactor * glowIntensity;
          const radius = dotRadius * (1 + glowFactor * 1.5 + cursorFactor * 0.5);

          ctx.beginPath();
          ctx.arc(x, y, Math.max(0.3, radius), 0, Math.PI * 2);

          if (glowFactor > 0.05) {
            ctx.fillStyle = blendColor(color, glowColor, glowFactor);
            ctx.globalAlpha = Math.min(1, opacity);
          } else {
            ctx.fillStyle = color;
            ctx.globalAlpha = opacity;
          }
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
      window.removeEventListener("mouseout", onLeave);
    };
  }, [dotRadius, dotSpacing, gradientFrom, gradientTo, gradientAngle, cursorRadius, glowColor, glowRadius, glowIntensity, baseOpacity, speed, interactive]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}

function hexToRgb(hex) {
  const m = hex.replace("#", "").match(/.{2}/g);
  return m ? m.map((v) => parseInt(v, 16)) : [0, 0, 0];
}
function lerpColor(a, b, t) {
  const ca = hexToRgb(a), cb = hexToRgb(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r},${g},${bl})`;
}
function blendColor(a, b, t) {
  const parse = (c) => {
    if (c.startsWith("#")) return hexToRgb(c);
    const m = c.match(/\d+/g);
    return m ? m.map(Number) : [0, 0, 0];
  };
  const ca = parse(a), cb = parse(b);
  const r = Math.round(ca[0] + (cb[0] - ca[0]) * t);
  const g = Math.round(ca[1] + (cb[1] - ca[1]) * t);
  const bl = Math.round(ca[2] + (cb[2] - ca[2]) * t);
  return `rgb(${r},${g},${bl})`;
}