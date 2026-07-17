"use client";

import { useEffect, useState } from "react";
import { X, ZoomIn } from "lucide-react";

/* Product images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export function ProductGallery({ images, productName }: { images: string[]; productName: string }) {
  const [selected, setSelected] = useState(images[0]);
  const [lightboxOpen, setLightboxOpen] = useState(false);

  useEffect(() => {
    if (!lightboxOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setLightboxOpen(false);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [lightboxOpen]);

  return (
    <div className="detail-media">
      <button type="button" className="detail-image detail-image-button" onClick={() => setLightboxOpen(true)} aria-label={`${productName} görselini büyüt`}>
        <img src={selected} alt={productName} />
        <span className="image-zoom-hint"><ZoomIn size={17} /> Büyüt</span>
      </button>

      {images.length > 1 && (
        <div className="detail-gallery" aria-label="Ürün galerisi">
          {images.map((image, index) => (
            <button key={`${image}-${index}`} type="button" className={image === selected ? "is-active" : ""} onClick={() => setSelected(image)} aria-label={`${productName} görsel ${index + 1}`} aria-pressed={image === selected}>
              <img src={image} alt="" />
            </button>
          ))}
        </div>
      )}

      {lightboxOpen && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label={`${productName} büyük görsel`} onClick={() => setLightboxOpen(false)}>
          <button type="button" className="lightbox-close" onClick={() => setLightboxOpen(false)} aria-label="Görseli kapat"><X size={22} /></button>
          <img src={selected} alt={productName} onClick={(event) => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}
