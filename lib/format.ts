export function formatPrice(price: number | null) {
  if (price === null) return "Fiyat için iletişime geçin";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(price);
}

export function whatsappUrl(message: string) {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905358431803";
  const digits = configured.replace(/\D/g, "");
  const number = digits.startsWith("0") ? `90${digits.slice(1)}` : digits;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function productOrderMessage(product: { name: string; price: number; slug: string }) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veraninpazari.vercel.app").replace(/\/$/, "");
  return `Merhaba,\n\nVera'nın Pazarı üzerinden aşağıdaki ürün için sipariş vermek istiyorum.\n\nÜrün: ${product.name}\n\nFiyat: ${formatPrice(product.price)}\n\nÜrün Sayfası: ${siteUrl}/urunler/${product.slug}\n\nTeşekkür ederim.`;
}
