"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { ArrowUpRight, Menu, MessageCircle, X } from "lucide-react";
import { whatsappUrl } from "@/lib/format";

const navigation = [
  { href: "/#urunler", label: "Ürünler", match: "/urunler" },
  { href: "/galeri", label: "Galeri", match: "/galeri" },
  { href: "/#hikayemiz", label: "Hikâyemiz", match: "#hikayemiz" },
  { href: "/#iletisim", label: "İletişim", match: "#iletisim" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const menuId = useId();
  const infoUrl = whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.");

  useEffect(() => {
    document.body.classList.toggle("nav-open", menuOpen);
    const closeOnEscape = (event: KeyboardEvent) => event.key === "Escape" && setMenuOpen(false);
    window.addEventListener("keydown", closeOnEscape);
    return () => {
      document.body.classList.remove("nav-open");
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <div className="announcement">
        <span>Doğadan sofraya, Vera&apos;nın seçtikleri</span>
        <span className="announcement-meta">Ankara · WhatsApp&apos;tan kolay bilgi</span>
      </div>
      <header className={`site-header${menuOpen ? " menu-is-open" : ""}`}>
        <div className="container nav-wrap">
          <Link href="/" className="site-brand" aria-label="Vera'nın Pazarı ana sayfa" onClick={closeMenu}>
            <span><strong>Vera&apos;nın</strong><small>Pazarı</small></span>
          </Link>

          <nav id={menuId} className="nav-links" aria-label="Ana menü" data-open={menuOpen}>
            <div className="mobile-nav-head">
              <span>Menü</span>
              <button type="button" aria-label="Menüyü kapat" onClick={closeMenu}><X size={22} /></button>
            </div>
            {navigation.map((item, index) => {
              const active = item.match.startsWith("/") && pathname.startsWith(item.match);
              return <Link key={item.href} href={item.href} className={active ? "is-active" : ""} onClick={closeMenu}><span>0{index + 1}</span>{item.label}</Link>;
            })}
            <a className="mobile-nav-action" href={infoUrl} target="_blank" rel="noreferrer" onClick={closeMenu}>
              WhatsApp&apos;tan bilgi al <ArrowUpRight size={18} />
            </a>
          </nav>

          <div className="nav-actions">
            <a className="nav-cta" href={infoUrl} target="_blank" rel="noreferrer">
              <MessageCircle aria-hidden="true" size={17} />
              <span>Bilgi al</span>
              <ArrowUpRight aria-hidden="true" size={15} />
            </a>
            <button className="mobile-menu-toggle" type="button" aria-expanded={menuOpen} aria-controls={menuId} aria-label={menuOpen ? "Menüyü kapat" : "Menüyü aç"} onClick={() => setMenuOpen((open) => !open)}>
              {menuOpen ? <X aria-hidden="true" size={21} /> : <Menu aria-hidden="true" size={21} />}
            </button>
          </div>
        </div>
      </header>
      {menuOpen && <button className="nav-backdrop" type="button" aria-label="Menüyü kapat" onClick={closeMenu} />}
    </>
  );
}
