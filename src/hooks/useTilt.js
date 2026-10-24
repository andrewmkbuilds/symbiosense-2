import { useRef, useState, useCallback } from "react";

/**
 * Cursor-responsive 3D tilt hook.
 * Returns a ref, inline transform string, and glow position (0–100%)
 * for cursor-following lighting effects.
 */
export function useTilt({ max = 8, scale = 1.02, glareOpacity = 0.12 } = {}) {
  const ref = useRef(null);
  const [style, setStyle] = useState({
    transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
    glareX: 50,
    glareY: 50,
    glareOpacity: 0,
  });

  const handleMouseMove = useCallback(
    (e) => {
      const el = ref.current;
      if (!el) return;
      const rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rotateX = (y - 0.5) * -2 * max;
      const rotateY = (x - 0.5) * 2 * max;
      setStyle({
        transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(${scale})`,
        glareX: x * 100,
        glareY: y * 100,
        glareOpacity: glareOpacity,
      });
    },
    [max, scale, glareOpacity]
  );

  const handleMouseLeave = useCallback(() => {
    setStyle({
      transform: "perspective(1000px) rotateX(0deg) rotateY(0deg) scale(1)",
      glareX: 50,
      glareY: 50,
      glareOpacity: 0,
    });
  }, []);

  return { ref, style, handleMouseMove, handleMouseLeave };
}