export function whatsappUrl(message: string) {
  const configured = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905358431803";
  const digits = configured.replace(/\D/g, "");
  const number = digits.startsWith("0") ? `90${digits.slice(1)}` : digits;
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

export function productInfoMessage(product: { name: string; slug: string }) {
  const siteUrl = (process.env.NEXT_PUBLIC_SITE_URL || "https://veraninpazari.vercel.app").replace(/\/$/, "");
  return `Merhaba,\n\nVera'nın Pazarı üzerinden aşağıdaki ürün hakkında bilgi almak istiyorum.\n\nÜrün: ${product.name}\n\nÜrün Sayfası: ${siteUrl}/urunler/${product.slug}\n\nTeşekkür ederim.`;
}
