import { useRef } from "react";

/**
 * MagneticButton — wraps a child element so it is pulled toward the cursor
 * on hover, like a magnetic field (React Bits inspired).
 * Pointer-events pass through to the child; only the transform is applied.
 *
 * Props:
 *  - strength: 0–1, how strongly the element follows the cursor (default 0.4)
 *  - radius: px hover detection radius around the element (default 120)
 */
export default function MagneticButton({
  children,
  strength = 0.4,
  radius = 120,
  className = "",
  ...props
}) {
  const ref = useRef(null);

  const handleMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const cx = rect.left + rect.width / 2;
    const cy = rect.top + rect.height / 2;
    const dx = e.clientX - cx;
    const dy = e.clientY - cy;
    const dist = Math.sqrt(dx * dx + dy * dy);
    if (dist > radius) { el.style.transform = "translate3d(0,0,0)"; return; }
    const pull = (1 - dist / radius) * strength;
    el.style.transform = `translate3d(${dx * pull}px, ${dy * pull}px, 0)`;
  };

  const handleLeave = () => {
    const el = ref.current;
    if (el) el.style.transform = "translate3d(0,0,0)";
  };

  return (
    <span
      ref={ref}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className={`inline-block transition-transform duration-200 ease-out will-change-transform ${className}`}
      style={{ transitionTimingFunction: "cubic-bezier(0.22, 1, 0.36, 1)" }}
      {...props}
    >
      {children}
    </span>
  );
}