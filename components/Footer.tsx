import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-brand"><Image src="/brand/vera-logo.png" alt="" width={44} height={44} /><div><strong>Vera&apos;nın Pazarı</strong><span>İyi ürünlerin peşinde.</span></div></div>
        <p>© {new Date().getFullYear()} Vera&apos;nın Pazarı</p>
        <p>Doğal, samimi, Vera onaylı.</p>
      </div>
    </footer>
  );
}
