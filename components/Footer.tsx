import Image from "next/image";

export function Footer() {
  return (
    <footer className="footer">
      <div className="container footer-row">
        <div className="footer-brand"><Image src="/brand/vera-user-logo.png" alt="Vera'nın Pazarı" width={54} height={54} /></div>
        <p>© {new Date().getFullYear()} Vera&apos;nın Pazarı</p>
        <p>Doğal, samimi, Vera onaylı.</p>
      </div>
    </footer>
  );
}
