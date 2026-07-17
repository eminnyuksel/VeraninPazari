# Vera'nın Pazarı

Vercel üzerinde yayınlanmak üzere hazırlanmış, Neon PostgreSQL kullanan Next.js tanıtım ve ürün kataloğu sitesi.

## Özellikler

- Mobil uyumlu modern tasarım
- Neon PostgreSQL ürün veritabanı
- Ürün detay sayfaları
- Hazır mesajlı WhatsApp yönlendirmesi
- Veritabanı erişilemezse örnek ürünlerle güvenli açılış
- Vercel uyumlu ortam değişkenleri

## Yerel kurulum

```bash
npm install
cp .env.example .env.local
npm run dev
```

`.env.local` dosyasına gerçek değerleri yazın. Bu dosya `.gitignore` içindedir ve GitHub'a gönderilmez.

## Neon veritabanı

Neon SQL Editor içinde `database/schema.sql` dosyasını çalıştırın. Ardından bağlantı adresini `DATABASE_URL` değişkenine ekleyin.

## Vercel yayını

1. GitHub reposunu Vercel'e import edin.
2. Project Settings → Environment Variables bölümüne aşağıdaki değerleri ekleyin:
   - `DATABASE_URL`
   - `NEXT_PUBLIC_WHATSAPP_NUMBER` (örnek: `905551112233`)
   - `NEXT_PUBLIC_PHONE`
   - `NEXT_PUBLIC_EMAIL`
   - `NEXT_PUBLIC_INSTAGRAM`
   - `NEXT_PUBLIC_LOCATION`
3. Deploy düğmesine basın.

## Ürün ekleme

Neon SQL Editor üzerinden örnek:

```sql
INSERT INTO products (slug, name, description, price, image_url, category, featured)
VALUES ('ornek-urun', 'Örnek Ürün', 'Ürün açıklaması', 250, 'https://...', 'Kategori', true);
```

> Güvenlik: Veritabanı bağlantı adresini kaynak koda veya GitHub'a eklemeyin. Daha önce açık şekilde paylaşıldıysa Neon panelinden parolayı yenileyin.
