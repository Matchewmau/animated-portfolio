"use client";

import { useState } from "react";
import Image from "next/image";

interface SafeImageProps {
  src: string;
  alt: string;
  sizes?: string;
  priority?: boolean;
  className?: string;
  fallbackTitle?: string;
  fallbackMetric?: string;
}

export default function SafeImage({
  src,
  alt,
  sizes,
  priority,
  className,
  fallbackTitle,
  fallbackMetric,
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed) {
    return (
      <div
        role="img"
        aria-label={alt}
        className="safe-image-fallback absolute inset-0 flex flex-col items-start justify-end gap-1 p-5"
      >
        {fallbackTitle ? (
          <p className="font-display text-lg font-bold leading-tight">{fallbackTitle}</p>
        ) : null}
        {fallbackMetric ? <p className="text-xs font-semibold muted-copy">{fallbackMetric}</p> : null}
      </div>
    );
  }

  return (
    <Image
      src={src}
      alt={alt}
      fill
      sizes={sizes}
      priority={priority}
      className={className}
      onError={() => setFailed(true)}
    />
  );
}
