import { useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Official SYMBIOTIX team logo.
 *
 * Two official assets are supplied (both square, solid backgrounds):
 *  - "light": black logo on white  → for light backgrounds, documents, print
 *  - "dark" : green logo on black  → for dark sections, banners, high impact
 *
 * The artwork is never stretched, cropped, recoloured or covered: each variant
 * sits on a matching background tile (white / black) so the solid asset
 * background reads as intentional. Aspect ratio is preserved via object-contain.
 */
export const BRAND_LOGO_ALT = "SYMBIOTIX FIRST LEGO League team logo.";

// Both files ship inside the site itself (public/images), so the logo renders
// from the site's own address on any host — no external storage involved.
const ASSETS = {
  light: "/images/symbiotix-logo-light.jpg",
  dark: "/images/symbiotix-logo-dark.jpg",
};

export default function BrandLogo({ variant = "light", className, alt = BRAND_LOGO_ALT }) {
  const isDark = variant === "dark";
  const [failed, setFailed] = useState(false);

  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center justify-center overflow-hidden rounded-2xl depth-shadow-sm",
        isDark ? "bg-black ring-1 ring-brand-leaf/25" : "bg-white ring-1 ring-brand-forest/10",
        className
      )}
    >
      {failed ? (
        <span
          role="img"
          aria-label={alt}
          title="SYMBIOTIX"
          className={cn(
            "flex h-full w-full items-center justify-center leading-none",
            isDark ? "bg-black text-brand-leaf" : "bg-primary text-primary-foreground"
          )}
        >
          <span className="font-heading text-[0.8rem] font-bold tracking-[0.08em] text-balance">SX</span>
        </span>
      ) : (
        <img
          src={isDark ? ASSETS.dark : ASSETS.light}
          alt={alt}
          width={1254}
          height={1254}
          decoding="async"
          onError={() => setFailed(true)}
          className="h-full w-full object-contain"
        />
      )}
    </span>
  );
}