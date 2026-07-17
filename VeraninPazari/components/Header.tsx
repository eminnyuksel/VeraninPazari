import Link from "next/link";

export function Header() {
  return (
    <header className="site-header">
      <div className="container nav-wrap">
        <Link href="/" className="brand" aria-label="Vera'nın Pazarı ana sayfa">
          <span className="brand-mark">V</span>
          <span>Vera&apos;nın Pazarı</span>
        </Link>
        <nav className="nav-links" aria-label="Ana menü">
          <Link href="/#urunler">Ürünler</Link>
          <Link href="/#hakkimizda">Hakkımızda</Link>
          <Link href="/#iletisim">İletişim</Link>
        </nav>
      </div>
    </header>
  );
}
