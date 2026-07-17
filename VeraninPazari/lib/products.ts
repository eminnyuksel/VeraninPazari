import { neon } from "@neondatabase/serverless";
import type { Product } from "./types";

const fallbackProducts: Product[] = [
  {
    id: 1,
    slug: "dogal-koy-yumurtasi",
    name: "Doğal Köy Yumurtası",
    description: "Günlük, taze ve özenle seçilmiş doğal köy yumurtaları.",
    price: 180,
    image_url: "https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1200&q=80",
    category: "Kahvaltılık",
    featured: true,
    active: true
  },
  {
    id: 2,
    slug: "ev-yapimi-eriste",
    name: "Ev Yapımı Erişte",
    description: "Geleneksel yöntemlerle hazırlanan, katkısız ev eriştesi.",
    price: 140,
    image_url: "https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=1200&q=80",
    category: "Ev Yapımı",
    featured: true,
    active: true
  },
  {
    id: 3,
    slug: "mevsimlik-recel",
    name: "Mevsimlik Reçel",
    description: "Mevsim meyveleriyle küçük partiler halinde hazırlanır.",
    price: 165,
    image_url: "https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80",
    category: "Tatlı",
    featured: false,
    active: true
  }
];

function getSql() {
  if (!process.env.DATABASE_URL) return null;
  return neon(process.env.DATABASE_URL);
}

export async function getProducts(): Promise<Product[]> {
  const sql = getSql();
  if (!sql) return fallbackProducts;

  try {
    const rows = await sql`
      SELECT id, slug, name, description, price::float8 AS price,
             image_url, category, featured, active
      FROM products
      WHERE active = true
      ORDER BY featured DESC, created_at DESC
    `;
    return rows.length ? (rows as Product[]) : fallbackProducts;
  } catch (error) {
    console.error("Products could not be loaded:", error);
    return fallbackProducts;
  }
}

export async function getProduct(slug: string): Promise<Product | null> {
  const products = await getProducts();
  return products.find((product) => product.slug === slug) ?? null;
}
