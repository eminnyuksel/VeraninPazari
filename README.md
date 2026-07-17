# Vera'nın Pazarı

Vera'nın Pazarı için Next.js 15, Prisma, Neon PostgreSQL, Auth.js ve Vercel Blob ile geliştirilmiş mağaza ve yönetim paneli.

## Özellikler

- `/admin/login` üzerinden güvenli yönetici girişi
- HttpOnly Auth.js oturumu, bcrypt ile parola doğrulama ve korumalı admin sayfaları
- Ürün ve kategori ekleme, düzenleme, silme, sıralama ve yayınlama
- Sürükle-bırak Vercel Blob görsel yükleme ve galeri yönetimi
- Dashboard istatistikleri ve son güncellenen ürünler
- Neon PostgreSQL'den dinamik mağaza kataloğu
- Ürün bazlı, hazır mesaj içeren WhatsApp sipariş bağlantıları
- Responsive tasarım, koyu/açık tema, toast bildirimleri ve form doğrulama

## Gereksinimler

- Node.js 20.19 veya üzeri
- pnpm 10 veya üzeri
- Neon PostgreSQL projesi
- Vercel Blob store

## Yerel kurulum

```bash
pnpm install
copy .env.example .env.local
pnpm db:deploy
pnpm db:seed
pnpm dev
```

`.env.local` içindeki `ADMIN_PASSWORD` en az 12 karakter olmalıdır. Seed tamamlandıktan sonra bu değer yalnızca ilk admini oluşturmak veya parolasını yenilemek için kullanılır; veritabanında yalnızca bcrypt özeti tutulur.

`AUTH_SECRET` üretmek için `npx auth secret` komutunu kullanabilirsiniz.

## Ortam değişkenleri

| Değişken | Açıklama |
| --- | --- |
| `DATABASE_URL` | Neon pooled bağlantı adresi; uygulama tarafından kullanılır. |
| `DIRECT_URL` | Neon direct bağlantı adresi; migration işlemleri için kullanılır. |
| `AUTH_SECRET` | Auth.js oturum imzalama anahtarı. |
| `BLOB_READ_WRITE_TOKEN` | Vercel Blob yükleme ve silme anahtarı. |
| `ADMIN_EMAIL` | Seed edilecek yönetici e-postası. |
| `ADMIN_PASSWORD` | Seed edilecek yönetici parolası. |
| `NEXT_PUBLIC_SITE_URL` | Ürün mesajındaki kanonik site adresi. |
| `NEXT_PUBLIC_WHATSAPP_NUMBER` | Ülke koduyla, boşluksuz numara. Varsayılan: `905358431803`. |
| `NEXT_PUBLIC_PHONE` | Sitede görüntülenecek telefon numarası. |

## Veritabanı

Şema kaynağı `prisma/schema.prisma`, sürümlü değişiklikler ise `prisma/migrations` altındadır.

```bash
pnpm db:generate
pnpm db:migrate
pnpm db:deploy
pnpm db:seed
```

İlk migration eski `products` tablosundaki ürünleri koruyarak kategori ilişkisini ve yeni yönetim alanlarını ekler.

## Vercel yayını

1. Vercel projesinde Neon veritabanını ve Vercel Blob store'u bağlayın.
2. `.env.example` içindeki production değişkenlerini Vercel Environment Variables alanına ekleyin.
3. İlk admin için yerelde veya güvenli bir CI ortamında `pnpm db:seed` çalıştırın.
4. GitHub `main` branch'ine gönderin. `vercel-build` migration'ları uygular ve production build'i üretir.

Admin işlemleri doğrudan PostgreSQL'e yazılır ve ilgili sayfaları yeniden doğrular. Ürün/fiyat/stok/görsel değişiklikleri için kod değişikliği veya yeniden deploy gerekmez.

## Güvenlik notları

- `.env`, Neon bağlantıları, `AUTH_SECRET` ve Blob token'ı GitHub'a gönderilmemelidir.
- Admin işlemleri sunucu tarafında tekrar kimlik doğrulaması yapar.
- Görsel yüklemeleri MIME türü ve 5 MB dosya sınırıyla doğrulanır.
- Ürün açıklamaları kaydedilmeden önce güvenli HTML etiketleriyle sınırlandırılır.
- Admin parolası en az 12 karakter olmalı ve düzenli aralıklarla yenilenmelidir.
