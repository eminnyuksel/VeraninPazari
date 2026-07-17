export function formatPrice(price: number | null) {
  if (price === null) return "Fiyat için iletişime geçin";
  return new Intl.NumberFormat("tr-TR", {
    style: "currency",
    currency: "TRY",
    maximumFractionDigits: 0
  }).format(price);
}

export function whatsappUrl(message: string) {
  const number = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || "905XXXXXXXXX";
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
