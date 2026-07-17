import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { formatPrice, whatsappUrl } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const message = `Merhaba, “${product.name}” ürünü için sipariş vermek veya bilgi almak istiyorum.`;

  return (
    <main className="detail-page">
      <div className="container">
        <Link href="/#urunler" className="back-link">← Tüm ürünlere dön</Link>
        <div className="detail-grid">
          <div className="detail-image"><img src={product.image_url} alt={product.name} /></div>
          <div className="detail-copy">
            <span className="category-pill static">{product.category}</span>
            <h1>{product.name}</h1>
            <p>{product.description}</p>
            <strong className="detail-price">{formatPrice(product.price)}</strong>
            <a className="button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">WhatsApp&apos;tan Bilgi Al</a>
            <div className="detail-notes"><span>✓ Güncel stok bilgisi</span><span>✓ Hızlı yanıt</span><span>✓ Kolay sipariş</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
