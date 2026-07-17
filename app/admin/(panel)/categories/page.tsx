import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { CategoryManager } from "@/components/admin/CategoryManager";

export const dynamic = "force-dynamic";

export default async function CategoriesPage() {
  const categories = await prisma.category.findMany({ include: { _count: { select: { products: true } } }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }] });
  const items = categories.map((category) => ({ id: category.id, name: category.name, slug: category.slug, sortOrder: category.sortOrder, isActive: category.isActive, productCount: category._count.products }));
  return <><PageHeader eyebrow="Katalog yapısı" title="Kategori Yönetimi" description="Kategorileri oluşturun, düzenleyin ve sayısal sıra alanıyla vitrin düzenini değiştirin." /><CategoryManager categories={items} /></>;
}
