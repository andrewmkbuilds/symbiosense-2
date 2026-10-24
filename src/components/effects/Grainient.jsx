import { useEffect, useRef } from "react";

/**
 * Grainient — animated grainy gradient (inspired by React Bits).
 * Canvas-based with flowing gradient + film grain overlay.
 */
export default function Grainient({
  colors = ["#173F32", "#438B78", "#9ABF82", "#F4F0E5"],
  angle = 55,
  flow = 0.5,
  scale = 1,
  speed = 0.4,
  grainAmount = 0.06,
  grainSize = 1.2,
  grainAnimated = true,
  opacity = 0.4,
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

    // Pre-generate grain noise
    const grainCanvas = document.createElement("canvas");
    const grainCtx = grainCanvas.getContext("2d");
    const grainW = 128, grainH = 128;
    grainCanvas.width = grainW; grainCanvas.height = grainH;

    const generateGrain = () => {
      const imageData = grainCtx.createImageData(grainW, grainH);
      for (let i = 0; i < imageData.data.length; i += 4) {
        const v = Math.random() * 255;
        imageData.data[i] = v;
        imageData.data[i + 1] = v;
        imageData.data[i + 2] = v;
        imageData.data[i + 3] = Math.random() * 255 * grainAmount * 3;
      }
      grainCtx.putImageData(imageData, 0, 0);
    };
    generateGrain();

    const t0 = performance.now();
    const rad = (angle * Math.PI) / 180;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const time = (performance.now() - t0) / 1000;

      // Create flowing gradient
      const cosA = Math.cos(rad), sinA = Math.sin(rad);
      const gradLen = Math.abs(w * cosA) + Math.abs(h * sinA);
      const cx = w / 2, cy = h / 2;

      const grad = ctx.createLinearGradient(
        cx - cosA * gradLen / 2,
        cy - sinA * gradLen / 2,
        cx + cosA * gradLen / 2,
        cy + sinA * gradLen / 2
      );

      colors.forEach((c, i) => {
        const basePos = i / (colors.length - 1);
        const wave = reduced ? 0 : Math.sin(time * speed + i * 0.8) * flow * 0.08;
        grad.addColorStop(Math.max(0, Math.min(1, basePos + wave)), c);
      });

      ctx.globalAlpha = opacity;
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, w, h);

      // Flowing wave overlay
      if (!reduced && flow > 0) {
        ctx.globalCompositeOperation = "soft-light";
        for (let i = 0; i < 3; i++) {
          ctx.beginPath();
          for (let x = 0; x <= w; x += 8) {
            const y = cy + Math.sin(x * 0.005 * scale + time * speed * (1 + i * 0.3) + i) * h * 0.15 * flow;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.lineTo(w, h); ctx.lineTo(0, h); ctx.closePath();
          ctx.fillStyle = colors[Math.min(i + 1, colors.length - 1)];
          ctx.globalAlpha = opacity * 0.15;
          ctx.fill();
        }
      }

      // Grain overlay
      ctx.globalCompositeOperation = "overlay";
      ctx.globalAlpha = 1;
      const pattern = ctx.createPattern(grainCanvas, "repeat");
      ctx.fillStyle = pattern;
      ctx.fillRect(0, 0, w, h);

      ctx.globalCompositeOperation = "source-over";
      ctx.globalAlpha = 1;

      if (!reduced && grainAnimated) {
        generateGrain();
      }

      if (!reduced) rafRef.current = requestAnimationFrame(draw);
    };

    draw();

    return () => {
      cancelAnimationFrame(rafRef.current);
      ro.disconnect();
    };
  }, [colors, angle, flow, scale, speed, grainAmount, grainSize, grainAnimated, opacity]);

  return (
    <canvas
      ref={canvasRef}
      className={`absolute inset-0 w-full h-full pointer-events-none ${className}`}
      style={style}
      aria-hidden="true"
    />
  );
}