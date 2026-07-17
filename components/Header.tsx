import Link from "next/link";
import Image from "next/image";
import { whatsappUrl } from "@/lib/format";

export function Header() {
  return (
    <>
      <div className="announcement">Vera&apos;nın özenle seçtiği doğal lezzetler • WhatsApp&apos;tan kolay sipariş</div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="Vera'nın Pazarı ana sayfa">
            <span className="brand-mark">
              <Image src="/brand/vera-logo.png" alt="Vera" width={58} height={58} priority />
            </span>
            <span className="brand-copy"><strong>Vera&apos;nın Pazarı</strong><small>Doğal • Samimi • İyi</small></span>
          </Link>
          <nav className="nav-links" aria-label="Ana menü">
            <Link href="/#urunler">Ürünler</Link>
            <Link href="/#hikayemiz">Vera&apos;nın hikâyesi</Link>
            <Link href="/#iletisim">İletişim</Link>
          </nav>
          <a className="nav-cta" href={whatsappUrl("Merhaba, Vera'nın Pazarı'ndan sipariş vermek istiyorum.")} target="_blank" rel="noreferrer">Sipariş ver <span>↗</span></a>
        </div>
      </header>
    </>
  );
}
