import Link from "next/link";
import { ArrowUpRight, MessageCircle } from "lucide-react";
import type { Product } from "@/lib/types";
import { productInfoMessage, whatsappUrl } from "@/lib/format";

/* Product images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export function ProductCard({ product, index }: { product: Product; index?: number }) {
  const message = productInfoMessage(product);
  const summary = product.description.replace(/<[^>]*>/g, " ").replace(/\s+/g, " ").trim();

  return (
    <article className="product-card">
      <Link href={`/urunler/${product.slug}`} className="product-image-wrap" aria-label={`${product.name} ürününü görüntüle`}>
        <img className="product-image" src={product.image} alt={product.name} loading="lazy" />
        <span className="product-image-action">Ürünü incele <ArrowUpRight size={15} aria-hidden="true" /></span>
        <span className="product-index">{String((index ?? 0) + 1).padStart(2, "0")}</span>
      </Link>
      <div className="product-body">
        <div className="product-heading-row"><span className="category-pill">{product.category.name}</span><span className={`stock-label ${product.inStock ? "is-available" : ""}`}>{product.inStock ? "Bilgiye açık" : "Şu an mevcut değil"}</span></div>
        <div>
          <h3><Link href={`/urunler/${product.slug}`}>{product.name}</Link></h3>
          <p>{summary}</p>
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
