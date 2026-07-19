"use client";

import { useEffect, useId, useState } from "react";
import { Menu, MessageCircle, X } from "lucide-react";
import Link from "next/link";
import { whatsappUrl } from "@/lib/format";

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuId = useId();
  const infoUrl = whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.");

  useEffect(() => {
    if (!menuOpen) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span className="announcement-desktop">Vera&apos;nın özenle seçtiği doğal lezzetler • WhatsApp&apos;tan kolay bilgi</span>
        <span className="announcement-mobile">Doğal ürünler • WhatsApp&apos;tan kolay bilgi</span>
      </div>
      <header className={`site-header${menuOpen ? " menu-is-open" : ""}`}>
        <div className="container nav-wrap">
          <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls={menuId} onClick={() => setMenuOpen((open) => !open)}>
            {menuOpen ? <X aria-hidden="true" size={20} /> : <Menu aria-hidden="true" size={20} />}
            <span>{menuOpen ? "Kapat" : "Menü"}</span>
          </button>
          <nav id={menuId} className="nav-links" aria-label="Ana menü" data-open={menuOpen}>
            <Link href="/#urunler" onClick={closeMenu}>Ürünler</Link>
            <Link href="/galeri" onClick={closeMenu}>Galeri</Link>
            <Link href="/#hikayemiz" onClick={closeMenu}>Vera&apos;nın hikâyesi</Link>
            <Link href="/#iletisim" onClick={closeMenu}>İletişim</Link>
          </nav>
          <a className="nav-cta" href={infoUrl} target="_blank" rel="noreferrer">
            <MessageCircle aria-hidden="true" size={17} />
            <span className="nav-cta-label">Bilgi al</span>
            <span aria-hidden="true">↗</span>
          </a>
        </div>
      </header>
    </>
  );
}
