import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div className="footer-signature">
          <Image src="/brand/vera-user-logo.png" alt="Vera'nın Pazarı" width={82} height={82} />
          <div><strong>İyi ürün,<br /><em>güzel sofra.</em></strong><p>Doğal, samimi, Vera onaylı.</p></div>
        </div>
        <nav aria-label="Alt menü">
          <span>Keşfet</span>
          <Link href="/#urunler">Ürünler</Link>
          <Link href="/galeri">Galeri</Link>
          <Link href="/#hikayemiz">Hikâyemiz</Link>
        </nav>
        <div className="footer-contact">
          <span>İletişim</span>
          <a href="https://wa.me/905358431803" target="_blank" rel="noreferrer">WhatsApp&apos;tan yazın <ArrowUpRight size={16} /></a>
          <p>Ankara, Türkiye</p>
        </div>
      </div>
      <div className="container footer-bottom"><p>© {new Date().getFullYear()} Vera&apos;nın Pazarı</p><p>Doğadan sofraya özenle.</p></div>
    </footer>
  );
}
