import { useEffect, useRef } from "react";

/**
 * Aurora — animated flowing aurora light curtains (inspired by React Bits).
 * Canvas-based, performant, respects prefers-reduced-motion.
 */
export default function Aurora({
  colorStops = ["#173F32", "#438B78", "#9ABF82"],
  amplitude = 1,
  blend = 0.5,
  height = 0.45,
  speed = 0.6,
  scale = 1,
  glow = 0.6,
  layers = 1,
  direction = "top",
  mouseInteraction = true,
  opacity = 0.5,
  className = "",
  style = {},
}) {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: 0, y: 0, active: false });
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
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top, active: true };
    };
    if (mouseInteraction) {
      window.addEventListener("mousemove", onMove, { passive: true });
    }

    const layerCount = Math.min(Math.max(layers, 1), 3);
    const t0 = performance.now();

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const time = (performance.now() - t0) / 1000;

      for (let l = 0; l < layerCount; l++) {
        const layerOpacity = opacity * (1 - l * 0.3);
        const layerAmp = amplitude * (1 + l * 0.2);
        const layerSpeed = speed * (1 - l * 0.15);
        const reach = h * height;

        ctx.save();
        ctx.globalCompositeOperation = "lighter";

        const segments = 80;
        ctx.beginPath();
        for (let i = 0; i <= segments; i++) {
          const x = (i / segments) * w;
          const wave1 = Math.sin(i * 0.08 * scale + time * layerSpeed * 1.5) * 30 * layerAmp;
          const wave2 = Math.sin(i * 0.05 * scale + time * layerSpeed * 0.8) * 50 * layerAmp;
          const wave3 = Math.cos(i * 0.03 * scale + time * layerSpeed * 0.5) * 20 * layerAmp;

          let mouseInfluence = 0;
          if (mouseInteraction && mouseRef.current.active) {
            const dx = x - mouseRef.current.x;
            const dist = Math.abs(dx) / (w * 0.3);
            mouseInfluence = Math.max(0, 1 - dist) * 40 * layerAmp;
          }

          const yBase = direction === "top" ? reach : h - reach;
          const y = yBase + wave1 + wave2 + wave3 + mouseInfluence;

          if (i === 0) ctx.moveTo(x, y);
          else ctx.lineTo(x, y);
        }

        // Close path along the edge
        if (direction === "top") {
          ctx.lineTo(w, 0); ctx.lineTo(0, 0);
        } else {
          ctx.lineTo(w, h); ctx.lineTo(0, h);
        }
        ctx.closePath();

        // Gradient fill
        const grad = ctx.createLinearGradient(0, 0, w, 0);
        colorStops.forEach((c, i) => {
          const pos = i / (colorStops.length - 1);
          grad.addColorStop(pos, c);
        });

        // Vertical fade
        const vGrad = ctx.createLinearGradient(0, direction === "top" ? 0 : h, 0, direction === "top" ? reach : h - reach);
        vGrad.addColorStop(0, `rgba(0,0,0,0)`);
        vGrad.addColorStop(blend, `rgba(0,0,0,0)`);

        ctx.globalAlpha = layerOpacity;
        ctx.fillStyle = grad;
        ctx.shadowColor = colorStops[0];
        ctx.shadowBlur = glow * 60;
        ctx.fill();
        ctx.restore();
      }

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    draw();
    if (reduced) {
      // Single frame for reduced motion
      ctx.clearRect(0, 0, w, h);
    }

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
      window.removeEventListener("mousemove", onMove);
    };
  }, [colorStops, amplitude, blend, height, speed, scale, glow, layers, direction, mouseInteraction, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}