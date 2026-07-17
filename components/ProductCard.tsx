import Link from "next/link";
import type { Product } from "@/lib/types";
import { formatPrice, productOrderMessage, whatsappUrl } from "@/lib/format";

/* Product images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export function ProductCard({ product }: { product: Product }) {
  const message = productOrderMessage(product);

  return (
    <article className="product-card">
      <Link href={`/urunler/${product.slug}`} className="product-image-wrap">
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        <span className="category-pill">{product.category.name}</span>
      </Link>
      <div className="product-body">
        <div>
          <h3><Link href={`/urunler/${product.slug}`}>{product.name}</Link></h3>
          <p>{product.description}</p>
        </div>
        <div className="product-bottom">
          <div className="product-price">{product.oldPrice && <del>{formatPrice(product.oldPrice)}</del>}<strong>{formatPrice(product.price)}</strong><span>/ {product.unit}</span></div>
          <a className="button button-small" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            Sipariş ver <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
