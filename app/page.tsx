import Image from "next/image";
import { GalleryBackdrop } from "@/components/GalleryBackdrop";
import { ProductCard } from "@/components/ProductCard";
import { getGalleryImages } from "@/lib/gallery";
import { getProducts } from "@/lib/products";
import { whatsappUrl } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, galleryImages] = await Promise.all([getProducts(), getGalleryImages()]);
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || "veraninpazari";
  const location = "Ankara, Türkiye";
  const announcementChannel = "https://whatsapp.com/channel/0029VbCca52GzzKVGDNaAD3P";

  return (
    <main className="storefront-main">
      <GalleryBackdrop images={galleryImages.length > 0 ? galleryImages.map((item) => item.image) : ["/brand/kus-yuvasi.jpg"]} />
      <section className="section catalog-section catalog-first" id="urunler">
        <div className="container">
          <div className="section-heading catalog-heading">
            <div><span className="eyebrow">Pazardaki güzellikler</span><h2>Vera&apos;nın seçtikleri</h2></div>
            <p>Az ama iyi. Mevsiminde, güvenilir ve sofrada gerçekten fark yaratan ürünler.</p>
          </div>
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product) => <ProductCard key={product.id} product={product} />)}
            </div>
          ) : (
            <div className="storefront-empty">
              <h3>Yeni ürünler hazırlanıyor</h3>
              <p>Vera pazarı düzenliyor. Çok yakında burada yeni lezzetler olacak.</p>
            </div>
          )}
        </div>
      </section>

      <section className="hero compact-hero">
        <div className="container hero-shell">
          <Image className="hero-image" src="/brand/kus-yuvasi.jpg" alt="Kuş Yuvası köyü ve doğası" fill sizes="(max-width: 760px) 100vw, 1200px" priority />
          <div className="hero-shade" />
          <div className="hero-copy">
            <Image className="hero-copy-logo" src="/brand/vera-user-logo.png" alt="Vera'nın Pazarı" width={132} height={132} />
            <span className="eyebrow">Vera&apos;nın özenle seçtikleri</span>
            <h1>İyi ürün,<br /><em>güzel sofra.</em></h1>
            <p>Doğal, güvenilir ve lezzetli ürünleri Vera&apos;nın merakıyla buluyor; sofranıza samimiyetle getiriyoruz.</p>
            <div className="hero-actions">
              <a className="button" href={whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Bilgi al <span>↗</span></a>
              <a className="button button-secondary" href="/galeri">Galeriyi gör <span>→</span></a>
            </div>
          </div>
        </div>
      </section>

      <section className="compact-info-section" id="hikayemiz">
        <div className="container compact-info-card">
          <article className="compact-story">
            <span className="eyebrow light">Vera&apos;nın hikâyesi</span>
            <h2>Her şey Vera&apos;nın merakıyla başladı.</h2>
            <p>Vera&apos;nın merakından ilham alıp doğal ürünleri, güvenilir üreticileri ve sıcak sofraları bir araya getirdik.</p>
            <a className="text-link light-link" href={whatsappUrl("Merhaba Vera! Sana selam vermek ve Vera'nın Pazarı'nın hikâyesini biraz daha yakından tanımak istiyorum. 🐾")} target="_blank" rel="noreferrer">Vera&apos;ya selam söyle ↗</a>
          </article>
          <article className="compact-steps">
            <span className="eyebrow light">Nasıl çalışır?</span>
            <h3>Üç adımda bilgi alın</h3>
            <ol><li><b>1</b><span><strong>Ürünü seç</strong>Merak ettiğin ürünü bul.</span></li><li><b>2</b><span><strong>Vera&apos;ya yaz</strong>WhatsApp&apos;tan bilgi sor.</span></li><li><b>3</b><span><strong>Bilgini al</strong>Size hızlıca dönüş yapalım.</span></li></ol>
          </article>
          <article className="compact-contact" id="iletisim">
            <span className="eyebrow light">Bize ulaş</span>
            <h3>Vera burada.</h3>
            <p>Ürün, stok ve teslimat bilgileri için bize yazın.</p>
            <a className="contact-main-button" href={whatsappUrl("Merhaba, Vera'nın Pazarı ile iletişime geçmek istiyorum.")} target="_blank" rel="noreferrer">WhatsApp&apos;tan bilgi al <span>↗</span></a>
            <div className="compact-contact-links"><a href={announcementChannel} target="_blank" rel="noreferrer">Duyuru kanalı ↗</a><a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer">@{instagram}</a><span>{location}</span></div>
          </article>
        </div>
      </section>
    </main>
  );
}
