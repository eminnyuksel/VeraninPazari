import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, whatsappUrl } from "@/lib/format";

export function ProductCard({ product }: { product: Product }) {
  const message = `Merhaba, Vera'nın Pazarı'nda gördüğüm “${product.name}” ürünü hakkında bilgi almak istiyorum.`;

  return (
    <article className="product-card">
      <Link href={`/urunler/${product.slug}`} className="product-image-wrap">
        <img className="product-image" src={product.image_url} alt={product.name} loading="lazy" />
        <span className="category-pill">{product.category}</span>
      </Link>
      <div className="product-body">
        <div>
          <h3><Link href={`/urunler/${product.slug}`}>{product.name}</Link></h3>
          <p>{product.description}</p>
        </div>
        <div className="product-bottom">
          <strong>{formatPrice(product.price)}</strong>
          <a className="button button-small" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            WhatsApp
          </a>
        </div>
      </div>
    </article>
  );
}
