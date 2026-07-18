import Link from "next/link";
import type { Product } from "@/lib/types";
import { productInfoMessage, whatsappUrl } from "@/lib/format";

/* Product images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export function ProductCard({ product }: { product: Product }) {
  const message = productInfoMessage(product);

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
          <a className="button button-small" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            Bilgi al <span>↗</span>
          </a>
        </div>
      </div>
    </article>
  );
}
