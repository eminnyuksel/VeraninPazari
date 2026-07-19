import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { productInfoMessage, whatsappUrl } from "@/lib/format";

/* Product images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const message = productInfoMessage(product);

  return (
    <article className="product-card">
      <Link href={`/urunler/${product.slug}`} className="product-image-wrap" aria-label={`${product.name} ürününü görüntüle`}>
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        <span className="product-index">{String((index ?? 0) + 1).padStart(2, "0")}</span>
      </Link>
      <div className="product-body">
        <div className="product-heading-row"><span className="category-pill">{product.category.name}</span><ArrowUpRight size={17} aria-hidden="true" /></div>
        <div>
          <h3><Link href={`/urunler/${product.slug}`}>{product.name}</Link></h3>
          <p>{product.description}</p>
        </div>
        <div className="product-bottom">
          <a className="button button-small button-dark" href={whatsappUrl(message)} target="_blank" rel="noreferrer">
            <MessageCircle size={16} aria-hidden="true" /> Bilgi al <ArrowUpRight size={15} aria-hidden="true" />
          </a>
          <Link className="product-detail-link" href={`/urunler/${product.slug}`}>İncele</Link>
        </div>
      </div>
    </article>
  );
}
