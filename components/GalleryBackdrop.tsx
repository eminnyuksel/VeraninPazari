"use client";

import { useEffect, useState } from "react";

export function GalleryBackdrop({ images }: { images: string[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % images.length), 8000);
    return () => window.clearInterval(timer);
  }, [images.length]);

  return (
    <div className="gallery-backdrop" aria-hidden="true">
      {images.map((image, index) => <div key={`${image}-${index}`} className={index === activeIndex ? "is-active" : ""} style={{ backgroundImage: `url("${image.replaceAll('"', '\\"')}")` }} />)}
      <span />
    </div>
  );
}
