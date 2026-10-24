import { useTilt } from "@/hooks/useTilt";

/**
 * Premium 3D tilt card with cursor-responsive lighting.
 * Wraps any content; tilts toward cursor on hover with a moving glare highlight.
 *
 * Props:
 *  - max: max tilt degrees (default 8)
 *  - scale: hover scale (default 1.02)
 *  - glare: show cursor-following glare (default true)
 *  - glareColor: radial glare color (default teal-ish)
 *  - className: applied to the outer tilt wrapper
 *  - contentClassName: applied to the inner content wrapper (translateZ depth)
 *  - depth: translateZ in px for inner content (default 30)
 */
export default function TiltCard({
  children,
  className = "",
  contentClassName = "",
  max = 8,
  scale = 1.02,
  glare = true,
  glareColor = "rgba(154, 191, 130, 0.15)",
  depth = 30,
  ...props
}) {
  const { ref, style, handleMouseMove, handleMouseLeave } = useTilt({ max, scale });

  return (
    <div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        transform: style.transform,
        transformStyle: "preserve-3d",
        transition: "transform 0.25s cubic-bezier(0.22, 1, 0.36, 1)",
      }}
      className={`group relative ${className}`}
      {...props}
    >
      {/* cursor-following glare */}
      {glare && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity duration-300"
          style={{
            opacity: style.glareOpacity,
            background: `radial-gradient(circle at ${style.glareX}% ${style.glareY}%, ${glareColor}, transparent 60%)`,
          }}
        />
      )}
      {/* inner content lifted toward viewer */}
      <div
        style={{ transform: `translateZ(${depth}px)`, transformStyle: "preserve-3d" }}
        className={contentClassName}
      >
        {children}
      </div>
    </div>
  );
}