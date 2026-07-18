import { notFound } from "next/navigation";
import Link from "next/link";
import { getProduct } from "@/lib/products";
import { productInfoMessage, whatsappUrl } from "@/lib/format";
import { ProductGallery } from "@/components/ProductGallery";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const message = productInfoMessage(product);
  const images = [product.image, ...product.galleryImages.filter((image) => image !== product.image)];

  return (
    <main className="detail-page">
      <div className="container">
        <Link href="/#urunler" className="back-link">← Tüm ürünlere dön</Link>
        <div className="detail-grid">
          <ProductGallery images={images} productName={product.name} />
          <div className="detail-copy">
            <span className="category-pill static">{product.category.name}</span>
            <h1>{product.name}</h1>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
            {product.inStock ? <a className="button" href={whatsappUrl(message)} target="_blank" rel="noreferrer">WhatsApp&apos;tan bilgi al</a> : <span className="button detail-disabled">Şu anda stokta yok</span>}
            <div className="detail-notes"><span>✓ Güncel stok bilgisi</span><span>✓ Hızlı yanıt</span><span>✓ Doğrudan iletişim</span></div>
          </div>
        </div>
      </div>
    </main>
  );
}
