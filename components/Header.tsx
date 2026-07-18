import Link from "next/link";
import Image from "next/image";
import { whatsappUrl } from "@/lib/format";

export function Header() {
  return (
    <>
      <div className="announcement">Vera&apos;nın özenle seçtiği doğal lezzetler • WhatsApp&apos;tan kolay bilgi</div>
      <header className="site-header">
        <div className="container nav-wrap">
          <Link href="/" className="brand" aria-label="Vera'nın Pazarı ana sayfa">
            <span className="brand-mark">
              <Image src="/brand/vera-user-logo.png" alt="Vera" width={58} height={58} priority />
            </span>
          </Link>
          <nav className="nav-links" aria-label="Ana menü">
            <Link href="/#urunler">Ürünler</Link>
            <Link href="/galeri">Galeri</Link>
            <Link href="/#hikayemiz">Vera&apos;nın hikâyesi</Link>
            <Link href="/#iletisim">İletişim</Link>
          </nav>
          <a className="nav-cta" href={whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Bilgi al <span>↗</span></a>
        </div>
      </header>
    </>
  );
}
