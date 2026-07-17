import { prisma } from "@/lib/prisma";
import type { Product } from "@/lib/types";

function serializeProduct(product: {
  id: bigint;
  slug: string;
  name: string;
  description: string;
  price: { toString(): string };
  oldPrice: { toString(): string } | null;
  image: string;
  galleryImages: string[];
  category: { id: number; name: string; slug: string };
  unit: string;
  featured: boolean;
  inStock: boolean;
  isActive: boolean;
  sortOrder: number;
}): Product {
  return {
    ...product,
    id: String(product.id),
    price: Number(product.price),
    oldPrice: product.oldPrice ? Number(product.oldPrice) : null,
  };
}

export async function getProducts(): Promise<Product[]> {
  const products = await prisma.product.findMany({
    where: { isActive: true },
    include: { category: { select: { id: true, name: true, slug: true } } },
    orderBy: [{ featured: "desc" }, { sortOrder: "asc" }, { createdAt: "desc" }],
  });
  return products.map(serializeProduct);
}

export async function getProduct(slug: string): Promise<Product | null> {
  const product = await prisma.product.findFirst({
    where: { slug, isActive: true },
    include: { category: { select: { id: true, name: true, slug: true } } },
  });
  return product ? serializeProduct(product) : null;
}
