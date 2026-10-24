import { useEffect, useRef } from "react";

/**
 * Starfield — animated 3D starfield background (React Bits inspired).
 * Canvas-based perspective starfield that flies toward the viewer.
 * Respects prefers-reduced-motion (renders a static field).
 */
export default function Starfield({
  starCount = 220,
  speed = 0.012,
  fov = 320,
  starColor = "#9ABF82",
  glowColor = "#438B78",
  baseSize = 1.1,
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

    // stars with 3D z depth
    let stars = Array.from({ length: starCount }, () => ({
      x: (Math.random() - 0.5) * w,
      y: (Math.random() - 0.5) * h,
      z: Math.random() * fov,
    }));

    const reset = (s) => {
      s.x = (Math.random() - 0.5) * w;
      s.y = (Math.random() - 0.5) * h;
      s.z = fov;
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const cx = w / 2, cy = h / 2;

      for (const s of stars) {
        if (!reduced) s.z -= speed * fov;
        if (s.z <= 1) reset(s);

        const k = fov / s.z;
        const px = s.x * k + cx;
        const py = s.y * k + cy;
        if (px < 0 || px > w || py < 0 || py > h) {
          if (!reduced) reset(s);
          continue;
        }
        const size = baseSize * k * 0.5;
        const depth = 1 - s.z / fov; // 0 far → 1 near

        ctx.globalAlpha = Math.min(1, depth * 0.9 + 0.1);
        ctx.fillStyle = depth > 0.7 ? glowColor : starColor;
        ctx.beginPath();
        ctx.arc(px, py, Math.max(0.3, size), 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      stars = null;
    };
  }, [starCount, speed, fov, starColor, glowColor, baseSize]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}