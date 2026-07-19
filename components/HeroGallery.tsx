"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useState } from "react";

type HeroImage = { id: number; image: string; caption: string | null };

function imageTitle(item: HeroImage, index: number) {
  if (item.caption?.trim()) return item.caption.trim();

  try {
    const filename = decodeURIComponent(new URL(item.image, "https://veranin-pazari.local").pathname.split("/").pop() ?? "")
      .replace(/\.[^.]+$/, "")
      .replace(/[-_]+/g, " ")
      .trim();
    if (filename && !/^[a-f\d]{12,}$/i.test(filename)) return filename;
  } catch {
    // The friendly fallback below also covers malformed legacy image URLs.
  }

  return `Galeriden kare ${index + 1}`;
}

export function HeroGallery({ images }: { images: HeroImage[] }) {
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (images.length < 2 || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setInterval(() => setActiveIndex((current) => (current + 1) % images.length), 6500);
    return () => window.clearInterval(timer);
  }, [images.length]);

  const activeImage = images[activeIndex] ?? images[0];
  if (!activeImage) return null;

  return (
    <div className="hero-media">
      <div className="hero-slides">
        {images.map((item, index) => (
          <Image
            key={item.id}
            className={`hero-image hero-slide${index === activeIndex ? " is-active" : ""}`}
            src={item.image}
            alt={imageTitle(item, index)}
            fill
            sizes="(max-width: 760px) 100vw, 1200px"
            priority={index === 0}
          />
        ))}
      </div>
      <div className="hero-image-caption">
        <span>{imageTitle(activeImage, activeIndex)}</span>
        <p>Ürünün hikâyesi yetiştiği yerde başlar.</p>
        <Link href="/galeri" aria-label="Galeriyi gör"><ArrowUpRight size={19} /></Link>
      </div>
      {images.length > 1 && (
        <div className="hero-slide-status" aria-hidden="true">
          <span>{String(activeIndex + 1).padStart(2, "0")}</span>
          <i><b style={{ width: `${((activeIndex + 1) / images.length) * 100}%` }} /></i>
          <span>{String(images.length).padStart(2, "0")}</span>
        </div>
      )}
    </div>
  );
}
