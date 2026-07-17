import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { createProduct } from "@/app/admin/(panel)/products/actions";
import { ProductForm } from "@/components/admin/ProductForm";
import { PageHeader } from "@/components/admin/PageHeader";

export default async function NewProductPage() {
  const categories = await prisma.category.findMany({ where: { isActive: true }, orderBy: [{ sortOrder: "asc" }, { name: "asc" }], select: { id: true, name: true } });
  return <><PageHeader eyebrow="Yeni kayıt" title="Yeni Ürün" description="Ürün bilgilerini, görsellerini ve yayın ayarlarını tamamlayın." />{categories.length === 0 ? <div className="rounded-2xl border border-amber-200 bg-amber-50 p-5 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950/40 dark:text-amber-200">Ürün eklemeden önce en az bir kategori oluşturmalısınız. <Link href="/admin/categories" className="font-bold underline">Kategori oluştur</Link></div> : <ProductForm action={createProduct} categories={categories} />}</>;
}
