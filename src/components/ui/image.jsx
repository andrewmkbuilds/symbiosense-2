import * as React from "react"
import { cn } from "@/lib/utils"

const FALLBACK_IMAGE_URL = "/images/placeholder.png"

/**
 * Site image — renders a plain <img>.
 *
 * Images ship with the site in public/images and are referenced by path, so
 * there is no remote image service involved: `fittingType="fill"` (the default)
 * crops the picture to the rendered box, `fittingType="fit"` letterboxes the
 * whole picture inside it.
 */
const Image = React.forwardRef(
  (
    {
      src,
      fittingType = "fill",
      // Accepted so existing callers keep working. These only ever meant
      // something to the remote image service we no longer use.
      originWidth: _originWidth,
      originHeight: _originHeight,
      focalPointX: _focalPointX,
      focalPointY: _focalPointY,
      quality: _quality,
      className,
      onError,
      ...props
    },
    ref
  ) => {
    const handleError = (event) => {
      // A broken picture (for example a pasted URL that no longer resolves)
      // shows the placeholder instead of a raw broken-image icon.
      const img = event.currentTarget
      if (img.getAttribute("src") !== FALLBACK_IMAGE_URL) img.src = FALLBACK_IMAGE_URL
      onError?.(event)
    }

    if (!src) {
      return (
        <img
          ref={ref}
          src={FALLBACK_IMAGE_URL}
          alt=""
          className={className}
          data-empty-image
          {...props}
        />
      )
    }

    return (
      <img
        ref={ref}
        src={src}
        className={cn(fittingType === "fit" ? "object-contain" : "object-cover", className)}
        onError={handleError}
        {...props}
      />
    )
  }
)
Image.displayName = "Image"

export { Image }