import { notFound } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { updateProduct } from "@/app/admin/(panel)/products/actions";
import { ProductForm } from "@/components/admin/ProductForm";
import { PageHeader } from "@/components/admin/PageHeader";

export default async function EditProductPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  if (!/^\d+$/.test(id)) notFound();
  const [product, categories] = await Promise.all([
    prisma.product.findUnique({ where: { id: BigInt(id) } }),
    prisma.category.findMany({ orderBy: [{ sortOrder: "asc" }, { name: "asc" }], select: { id: true, name: true } }),
  ]);
  if (!product) notFound();

  const value = { name: product.name, slug: product.slug, description: product.description, price: Number(product.price), oldPrice: product.oldPrice ? Number(product.oldPrice) : null, categoryId: product.categoryId, image: product.image, galleryImages: product.galleryImages, unit: product.unit, featured: product.featured, inStock: product.inStock, isActive: product.isActive, sortOrder: product.sortOrder };
  const action = updateProduct.bind(null, id);
  return <><PageHeader eyebrow="Ürün düzenle" title={product.name} description="Değişiklikler kaydedildiğinde vitrine anında yansır." /><ProductForm action={action} categories={categories} product={value} /></>;
}
