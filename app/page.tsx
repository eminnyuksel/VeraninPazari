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
        <div className="container hero-grid">
          <div className="hero-copy">
            <span className="eyebrow">Doğallık sofranıza gelsin</span>
            <h1>Sevgiyle seçilen ürünler, güvenle kurulan sofralar.</h1>
            <p>Vera&apos;nın Pazarı&apos;nda kaliteli, doğal ve özenle hazırlanmış ürünleri keşfedin. Sipariş ve bilgi için bize WhatsApp&apos;tan ulaşın.</p>
            <div className="hero-actions">
              <a className="button" href="#urunler">Ürünleri İncele</a>
              <a className="button button-secondary" href={whatsappUrl("Merhaba, Vera'nın Pazarı ürünleri hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">WhatsApp&apos;tan Yaz</a>
            </div>
            <div className="trust-row">
              <span>✓ Özenle seçilmiş ürünler</span>
              <span>✓ Hızlı iletişim</span>
              <span>✓ Güvenli alışveriş</span>
            </div>
          </div>
          <div className="hero-visual" aria-label="Doğal pazar ürünleri">
            <img src="https://images.unsplash.com/photo-1488459716781-31db52582fe9?auto=format&fit=crop&w=1400&q=85" alt="Taze pazar ürünleri" />
            <div className="floating-note"><strong>Vera&apos;nın seçimi</strong><span>Taze • Doğal • Samimi</span></div>
          </div>
        </div>
      </section>

      <section className="section" id="urunler">
        <div className="container">
          <div className="section-heading">
            <div><span className="eyebrow">Ürünlerimiz</span><h2>Sizin için özenle seçtik</h2></div>
            <p>Güncel fiyat ve stok bilgisi için ürün kartındaki WhatsApp butonunu kullanabilirsiniz.</p>
          </div>
          <div className="product-grid">
            {products.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </section>

      <section className="section soft" id="hakkimizda">
        <div className="container about-grid">
          <div className="about-image"><img src="https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1200&q=80" alt="Yerel pazar tezgahı" /></div>
          <div className="about-copy"><span className="eyebrow">Hikâyemiz</span><h2>Küçük bir pazardan sıcak sofralara</h2><p>Vera&apos;nın Pazarı; güvenilir ürünleri, sade alışveriş deneyimini ve samimi iletişimi bir araya getirmek için kuruldu.</p><p>Her ürünü özenle seçiyor, sorularınıza doğrudan cevap veriyor ve sipariş sürecini mümkün olduğunca kolay tutuyoruz.</p><a className="text-link" href={whatsappUrl("Merhaba, Vera'nın Pazarı hakkında bilgi almak istiyorum.")} target="_blank" rel="noreferrer">Bizimle tanışın →</a></div>
        </div>
      </section>

      <section className="section" id="iletisim">
        <div className="container contact-card">
          <div><span className="eyebrow light">İletişim</span><h2>Aklınıza takılan her şeyi sorun</h2><p>Ürün, fiyat, stok ve teslimat bilgileri için bize ulaşın.</p></div>
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
