import { useEffect, useRef } from "react";

/**
 * Beams — animated light beams background (inspired by React Bits).
 * Canvas-based rotating light beams from a central point.
 */
export default function Beams({
  beamColor = "rgba(67,139,120,0.12)",
  beamCount = 6,
  speed = 0.3,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
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

    const t0 = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const time = (performance.now() - t0) / 1000;
      const cx = w / 2, cy = h * 0.3;

      for (let i = 0; i < beamCount; i++) {
        const angle = (i / beamCount) * Math.PI * 2 + time * speed;
        const len = Math.max(w, h) * 0.8;
        const x2 = cx + Math.cos(angle) * len;
        const y2 = cy + Math.sin(angle) * len;

        const grad = ctx.createLinearGradient(cx, cy, x2, y2);
        grad.addColorStop(0, beamColor);
        grad.addColorStop(1, "transparent");

        ctx.beginPath();
        ctx.moveTo(cx, cy);
        const perpAngle = angle + Math.PI / 2;
        const halfWidth = 60 + Math.sin(time * 0.5 + i) * 20;
        ctx.lineTo(cx + Math.cos(perpAngle) * halfWidth, cy + Math.sin(perpAngle) * halfWidth);
        ctx.lineTo(x2 + Math.cos(perpAngle) * halfWidth * 0.3, y2 + Math.sin(perpAngle) * halfWidth * 0.3);
        ctx.lineTo(x2 - Math.cos(perpAngle) * halfWidth * 0.3, y2 - Math.sin(perpAngle) * halfWidth * 0.3);
        ctx.lineTo(cx - Math.cos(perpAngle) * halfWidth, cy - Math.sin(perpAngle) * halfWidth);
        ctx.closePath();

        ctx.fillStyle = grad;
        ctx.fill();
      }

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [beamColor, beamCount, speed]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}