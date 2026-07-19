import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, Check, MessageCircle } from "lucide-react";
import { ProductGallery } from "@/components/ProductGallery";
import { productInfoMessage, whatsappUrl } from "@/lib/format";
import { getProduct } from "@/lib/products";

export const dynamic = "force-dynamic";

export default async function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const product = await getProduct(slug);
  if (!product) notFound();

  const message = productInfoMessage(product);
  const infoUrl = whatsappUrl(message);
  const images = [product.image, ...product.galleryImages.filter((image) => image !== product.image)];

  return (
    <main className="detail-page">
      <div className="container">
        <Link href="/#urunler" className="back-link"><ArrowLeft size={17} /> Tüm ürünlere dön</Link>
        <div className="detail-grid">
          <ProductGallery images={images} productName={product.name} />
          <div className="detail-copy">
            <div className="detail-meta"><span className="category-pill static">{product.category.name}</span><span>{product.inStock ? "Bilgiye açık" : "Şu an mevcut değil"}</span></div>
            <h1>{product.name}</h1>
            <div className="product-description" dangerouslySetInnerHTML={{ __html: product.description }} />
            {product.inStock ? (
              <a className="button detail-primary-action" href={infoUrl} target="_blank" rel="noreferrer">
                <MessageCircle size={19} /> WhatsApp&apos;tan bilgi al <ArrowUpRight size={17} />
              </a>
            ) : <span className="button detail-disabled">Şu anda mevcut değil</span>}
            <div className="detail-notes">
              <span><Check size={15} /> Güncel ürün bilgisi</span>
              <span><Check size={15} /> Hızlı yanıt</span>
              <span><Check size={15} /> Doğrudan iletişim</span>
            </div>
          </div>
        </div>
      </div>
      {product.inStock && (
        <a className="mobile-detail-cta" href={infoUrl} target="_blank" rel="noreferrer">
          <MessageCircle size={20} /> <span>WhatsApp&apos;tan bilgi al</span> <ArrowUpRight size={17} />
        </a>
      )}
    </main>
  );
}
