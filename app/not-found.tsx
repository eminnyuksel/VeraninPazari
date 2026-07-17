import Link from "next/link";
export default function NotFound() {
  return <main className="empty-state"><h1>Ürün bulunamadı</h1><p>Aradığınız ürün kaldırılmış veya adresi değişmiş olabilir.</p><Link className="button" href="/">Ana sayfaya dön</Link></main>;
}
