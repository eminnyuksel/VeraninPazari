import Image from "next/image";
import { GalleryBackdrop } from "@/components/GalleryBackdrop";
import { ProductCard } from "@/components/ProductCard";
import { getGalleryImages } from "@/lib/gallery";
import { getProducts } from "@/lib/products";
import { whatsappUrl } from "@/lib/format";
import { ArrowDown, ArrowRight, ArrowUpRight, MessageCircle } from "lucide-react";

export const dynamic = "force-dynamic";

export default async function Home() {
  const [products, galleryImages] = await Promise.all([getProducts(), getGalleryImages()]);
  const location = "Ankara, Türkiye";
  const announcementChannel = "https://whatsapp.com/channel/0029VbCca52GzzKVGDNaAD3P";

  return (
    <main className="storefront-main">
      <GalleryBackdrop images={galleryImages.length > 0 ? galleryImages.map((item) => item.image) : ["/brand/kus-yuvasi.jpg"]} />
      <section className="hero">
        <div className="container hero-shell">
          <div className="hero-copy">
            <div className="hero-brand-row"><Image className="hero-copy-logo" src="/brand/vera-user-logo.png" alt="Vera'nın Pazarı" width={88} height={88} /><span>Doğal ürünler<br />Doğadan sofranıza</span></div>
            <span className="eyebrow">Vera&apos;nın özenle seçtikleri</span>
            <h1>İyi ürün,<br /><em>güzel sofra.</em></h1>
            <p>Doğal, güvenilir ve lezzetli ürünleri Vera&apos;nın merakıyla buluyor; sofranıza samimiyetle getiriyoruz.</p>
            <div className="hero-actions">
              <a className="button button-accent" href={whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer"><MessageCircle size={18} /> Bilgi al <ArrowUpRight size={16} /></a>
              <a className="button button-ghost" href="#urunler">Ürünleri keşfet <ArrowDown size={16} /></a>
            </div>
            <div className="hero-proof"><span><b>01</b>Doğal seçim</span><span><b>02</b>Doğrudan iletişim</span><span><b>03</b>Samimi sofra</span></div>
          </div>
          <div className="hero-media">
            <Image className="hero-image" src="/brand/kus-yuvasi.jpg" alt="Kuş Yuvası köyü ve doğası" fill sizes="(max-width: 760px) 100vw, 1200px" priority />
            <div className="hero-image-caption"><span>Kuş Yuvası</span><p>Ürünün hikâyesi yetiştiği yerde başlar.</p><a href="/galeri" aria-label="Galeriyi gör"><ArrowUpRight size={19} /></a></div>
          </div>
        </div>
      </section>

      <section className="section catalog-section catalog-first" id="urunler">
        <div className="container">
          <div className="section-heading catalog-heading">
            <div><span className="section-number">01 / Ürünler</span><span className="eyebrow">Pazardaki güzellikler</span><h2>Vera&apos;nın <em>seçtikleri</em></h2></div>
            <p>Az ama iyi. Mevsiminde, güvenilir ve sofrada gerçekten fark yaratan ürünler.</p>
          </div>
          {products.length > 0 ? (
            <div className="product-grid">
              {products.map((product, index) => <ProductCard key={product.id} product={product} index={index} />)}
            </div>
          ) : (
            <div className="storefront-empty">
              <h3>Yeni ürünler hazırlanıyor</h3>
              <p>Vera pazarı düzenliyor. Çok yakında burada yeni lezzetler olacak.</p>
            </div>
          )}
        </div>
      </section>

      <section className="compact-info-section" id="hikayemiz">
        <div className="container compact-info-card">
          <article className="compact-story">
            <span className="info-number">02</span>
            <span className="eyebrow light">Vera&apos;nın hikâyesi</span>
            <h2>Her şey Vera&apos;nın merakıyla başladı.</h2>
            <p>Vera&apos;nın merakından ilham alıp doğal ürünleri, güvenilir üreticileri ve sıcak sofraları bir araya getirdik.</p>
            <a className="text-link light-link" href={whatsappUrl("Merhaba Vera! Sana selam vermek ve Vera'nın Pazarı'nın hikâyesini biraz daha yakından tanımak istiyorum. 🐾")} target="_blank" rel="noreferrer">Vera&apos;ya selam söyle ↗</a>
          </article>
          <article className="compact-steps">
            <span className="info-number">03</span>
            <span className="eyebrow light">Nasıl çalışır?</span>
            <h3>Üç adımda bilgi alın</h3>
            <ol><li><b>1</b><span><strong>Ürünü seç</strong>Merak ettiğin ürünü bul.</span></li><li><b>2</b><span><strong>Vera&apos;ya yaz</strong>WhatsApp&apos;tan bilgi sor.</span></li><li><b>3</b><span><strong>Bilgini al</strong>Size hızlıca dönüş yapalım.</span></li></ol>
          </article>
          <article className="compact-contact" id="iletisim">
            <span className="info-number">04</span>
            <span className="eyebrow light">Bize ulaş</span>
            <h3>Vera burada.</h3>
            <p>Ürün, stok ve teslimat bilgileri için bize yazın.</p>
            <a className="contact-main-button" href={whatsappUrl("Merhaba, Vera'nın Pazarı ile iletişime geçmek istiyorum.")} target="_blank" rel="noreferrer">WhatsApp&apos;tan bilgi al <ArrowRight size={17} /></a>
            <div className="compact-contact-links"><a className="whatsapp-channel-link" href={announcementChannel} target="_blank" rel="noreferrer"><WhatsAppIcon />WhatsApp Vera&apos;nın Pazarı Duyuru Kanalı <span>↗</span></a><span>{location}</span></div>
          </article>
        </div>
      </section>
    </main>
  );
}

function WhatsAppIcon() {
  return <svg aria-hidden="true" viewBox="0 0 32 32"><path fill="currentColor" d="M16 3.2A12.7 12.7 0 0 0 5.1 22.4L3.4 28.8l6.5-1.7A12.8 12.8 0 1 0 16 3.2Zm0 23.2c-2 0-4-.6-5.7-1.6l-.4-.2-3.8 1 1-3.7-.3-.4A10.4 10.4 0 1 1 16 26.4Zm5.7-7.8c-.3-.2-1.8-.9-2.1-1-.3-.1-.5-.2-.8.2l-1 1.2c-.2.3-.4.3-.7.1-1.9-.9-3.2-1.7-4.5-3.9-.3-.5.3-.5.9-1.7.1-.2.1-.5 0-.7l-1-2.4c-.3-.6-.5-.5-.8-.5h-.7c-.3 0-.7.1-1 .5-.3.4-1.3 1.3-1.3 3.1s1.3 3.6 1.5 3.8c.2.3 2.6 4 6.3 5.6 2.3 1 3.2 1.1 4.3.9.7-.1 1.8-.7 2-1.4.3-.7.3-1.4.2-1.5-.1-.3-.4-.4-.7-.5Z" /></svg>;
}
