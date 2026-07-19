import type { Metadata } from "next";
import "./globals.css";
import "./editorial.css";
import { AppProviders } from "@/components/admin/AppProviders";
import { SiteChrome } from "@/components/SiteChrome";

export const metadata: Metadata = {
  title: "Vera'nın Pazarı | Doğal ve Özenle Seçilmiş Ürünler",
  description: "Vera'nın Pazarı ürünlerini keşfedin ve WhatsApp üzerinden kolayca bilgi alın.",
  icons: { icon: "/brand/vera-user-logo.png", apple: "/brand/vera-user-logo.png" },
  openGraph: {
    title: "Vera'nın Pazarı",
    description: "Doğal ve özenle seçilmiş ürünler.",
    type: "website"
  }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="tr">
      <body>
        <AppProviders>
          <SiteChrome>{children}</SiteChrome>
        </AppProviders>
      </body>
    </html>
  );
}
