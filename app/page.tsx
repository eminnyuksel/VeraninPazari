import Image from "next/image";
import { ProductCard } from "@/components/ProductCard";
import { getProducts } from "@/lib/products";
import { whatsappUrl } from "@/lib/format";

export const dynamic = "force-dynamic";

export default async function Home() {
  const products = await getProducts();
  const phone = process.env.NEXT_PUBLIC_PHONE || "+90 5XX XXX XX XX";
  const email = process.env.NEXT_PUBLIC_EMAIL || "info@veraninpazari.com";
  const instagram = process.env.NEXT_PUBLIC_INSTAGRAM || "veraninpazari";
  const location = process.env.NEXT_PUBLIC_LOCATION || "İstanbul, Türkiye";

  return (
    <main>
      <section className="hero">
        <div className="container hero-shell">
          <Image className="hero-image" src="/brand/vera-hero.webp" alt="Vera doğal ürünlerle pazar tezgâhında" fill sizes="(max-width: 760px) 100vw, 1200px" priority />
          <div className="hero-shade" />
          <div className="hero-copy">
            <span className="eyebrow">Vera&apos;nın özenle seçtikleri</span>
            <h1>İyi ürün,<br /><em>güzel sofra.</em></h1>
            <p>Doğal, güvenilir ve lezzetli ürünleri Vera&apos;nın merakıyla buluyor; sofranıza samimiyetle getiriyoruz.</p>
            <div className="hero-actions">
              <a className="button" href="#urunler">Pazarı keşfet <span>↓</span></a>
              <a className="button button-secondary" href={whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp&apos;tan yaz <span>↗</span></a>
            </div>
          </div>
          <div className="vera-stamp"><Image src="/brand/vera-logo.png" alt="" width={76} height={76} /><div><strong>Vera onayladı</strong><span>Özenle seçildi</span></div></div>
        </div>
      </section>

      <section className="promise-strip" aria-label="Alışveriş avantajları">
        <div className="container promise-grid"><div><span>01</span><strong>Özenle seçilir</strong><p>Her ürün önce Vera&apos;nın pazarından geçer.</p></div><div><span>02</span><strong>Doğrudan konuşuruz</strong><p>Stok ve sipariş için hemen yanıt veririz.</p></div><div><span>03</span><strong>Keyifle paylaşılır</strong><p>Sofranıza iyi hissettiren lezzetler gelir.</p></div></div>
      </section>

      <section className="section" id="urunler">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Pazardaki güzellikler</span><h2>Vera&apos;nın seçtikleri</h2></div>
            <p>Az ama iyi. Mevsiminde, güvenilir ve sofrada gerçekten fark yaratan ürünler.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section vera-story" id="hikayemiz">
        <div className="container story-card">
          <div className="story-visual"><span className="story-orbit">VERA&apos;NIN PAZARI • İYİ ÜRÜN •</span><Image src="/brand/vera-logo.png" alt="Pazarın sahibi Vera" width={540} height={540} /></div>
          <div className="about-copy"><span className="eyebrow light">Pazarın sahibiyle tanışın</span><h2>Her şey Vera&apos;nın merakıyla başladı.</h2><p>Vera iyi olanı kokusundan anlar. Biz de onun merakından ilham alıp doğal ürünleri, güvenilir üreticileri ve sıcak sofraları bir araya getirdik.</p><p>Burası yalnızca bir ürün kataloğu değil; sade, dürüst ve doğrudan iletişim kurduğumuz küçük mahalle pazarımız.</p><a className="text-link light-link" href={whatsappUrl("Merhaba, Vera'nın Pazarı hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Vera&apos;ya selam söyle ↗</a></div>
        </div>
      </section>

      <section className="section order-section">
        <div className="container"><div className="section-heading compact"><div><span className="eyebrow">Nasıl çalışır?</span><h2>Üç adımda sofranızda</h2></div></div><div className="order-grid"><div><b>1</b><h3>Ürününü seç</h3><p>Pazardaki ürünlere göz at, sevdiğini bul.</p></div><div><b>2</b><h3>Vera&apos;ya yaz</h3><p>WhatsApp&apos;tan stok ve teslimat bilgisini sor.</p></div><div><b>3</b><h3>Keyfini çıkar</h3><p>Siparişini tamamla, gerisini bize bırak.</p></div></div></div>
      </section>

      <section className="section" id="iletisim">
        <div className="container contact-card">
          <div><span className="eyebrow light">Vera burada</span><h2>Bir pati uzağınızdayız.</h2><p>Ürün, fiyat, stok ve teslimat bilgileri için bize ulaşın.</p><a className="contact-main-button" href={whatsappUrl("Merhaba, Vera'nın Pazarı ile iletişime geçmek istiyorum.")} target="_blank" rel="noreferrer">WhatsApp&apos;tan konuşalım <span>↗</span></a></div>
          <div className="contact-list">
            <a href={whatsappUrl("Merhaba, Vera'nın Pazarı ile iletişime geçmek istiyorum.")} target="_blank" rel="noreferrer"><span>WhatsApp / Telefon</span><strong>{phone}</strong></a>
            <a href={`mailto:${email}`}><span>E-posta</span><strong>{email}</strong></a>
            <a href={`https://instagram.com/${instagram}`} target="_blank" rel="noreferrer"><span>Instagram</span><strong>@{instagram}</strong></a>
            <div><span>Konum</span><strong>{location}</strong></div>
          </div>
        </div>
      </section>
    </main>
  );
}
