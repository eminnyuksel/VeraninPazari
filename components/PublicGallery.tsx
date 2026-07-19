"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ChevronLeft, ChevronRight, Expand, X } from "lucide-react";

type GalleryImage = { id: number; image: string; caption: string | null };

/* Gallery images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export function PublicGallery({ images }: { images: GalleryImage[] }) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const closeButtonRef = useRef<HTMLButtonElement>(null);
  const triggerRefs = useRef<Array<HTMLButtonElement | null>>([]);

  const close = useCallback(() => {
    const previousIndex = activeIndex;
    setActiveIndex(null);
    window.setTimeout(() => {
      if (previousIndex !== null) triggerRefs.current[previousIndex]?.focus();
    }, 0);
  }, [activeIndex]);

  const move = useCallback((direction: number) => {
    setActiveIndex((current) => current === null ? current : (current + direction + images.length) % images.length);
  }, [images.length]);

  useEffect(() => {
    if (activeIndex === null) return;
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    closeButtonRef.current?.focus();
    const handleKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") close();
      if (event.key === "ArrowLeft") move(-1);
      if (event.key === "ArrowRight") move(1);
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [activeIndex, close, move]);

  if (!images.length) return null;
  const active = activeIndex === null ? null : images[activeIndex];

  return (
    <>
      <div className="public-gallery-grid">
        {images.map((item, index) => (
          <button
            className="public-gallery-item"
            type="button"
            key={item.id}
            ref={(node) => { triggerRefs.current[index] = node; }}
            onClick={() => setActiveIndex(index)}
            aria-label={`${item.caption || "Galeri fotoğrafı"} görselini büyüt`}
          >
            <img src={item.image} alt={item.caption || "Vera'nın Pazarı galeri fotoğrafı"} loading="lazy" />
            <span className="gallery-item-index">{String(index + 1).padStart(2, "0")}</span>
            <span className="gallery-item-action"><Expand size={17} aria-hidden="true" /> Büyüt</span>
            {item.caption && <span className="gallery-item-caption">{item.caption}</span>}
          </button>
        ))}
      </div>

      {active && (
        <div className="gallery-lightbox" role="dialog" aria-modal="true" aria-label="Galeri görseli">
          <button className="gallery-lightbox-backdrop" type="button" aria-label="Galeriyi kapat" onClick={close} />
          <div className="gallery-lightbox-panel">
            <div className="gallery-lightbox-toolbar">
              <span>{String((activeIndex ?? 0) + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}</span>
              <button ref={closeButtonRef} type="button" aria-label="Galeriyi kapat" onClick={close}><X size={22} /></button>
            </div>
            <img src={active.image} alt={active.caption || "Vera'nın Pazarı galeri fotoğrafı"} />
            {active.caption && <p>{active.caption}</p>}
            {images.length > 1 && (
              <div className="gallery-lightbox-nav">
                <button type="button" aria-label="Önceki görsel" onClick={() => move(-1)}><ChevronLeft size={22} /> Önceki</button>
                <button type="button" aria-label="Sonraki görsel" onClick={() => move(1)}>Sonraki <ChevronRight size={22} /></button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
