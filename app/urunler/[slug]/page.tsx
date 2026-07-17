import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { formatPrice, productOrderMessage, whatsappUrl } from "@/lib/format";

/* Product images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const message = productOrderMessage(product);
  const images = [product.image, ...product.galleryImages.filter((image) => image !== product.image)];

  return (
    <main className="detail-page">
      <div className="container">
        <Link href="/#urunler" className="back-link">← Tüm ürünlere dön</Link>
        <div className="detail-grid">
          <div className="detail-media"><div className="detail-image"><img src={product.image} alt={product.name} /></div>{images.length > 1 && <div className="detail-gallery">{images.slice(1).map((image, index) => <img key={image} src={image} alt={`${product.name} galeri görseli ${index + 1}`} />)}</div>}</div>
          <div className="detail-copy">
            <span className="category-pill static">{product.category.name}</span>
            <h1>{product.name}</h1>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
            <div className="detail-pricing">{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<div><strong className="detail-price">{formatPrice(product.price)}</strong><span>/ {product.unit}</span></div></div>
            {product.inStock ? <a className="button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">WhatsApp&apos;tan Sipariş Ver</a> : <span className="button detail-disabled">Şu anda stokta yok</span>}
            <div className="detail-notes"><span>✓ Güncel stok bilgisi</span><span>✓ Hızlı yanıt</span><span>✓ Kolay sipariş</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
