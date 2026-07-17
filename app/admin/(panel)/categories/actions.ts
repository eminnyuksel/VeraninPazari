"use server";

import { revalidatePath } from "next/cache";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { categorySchema, type ActionState } from "@/lib/validation";

function parseCategory(formData: FormData) {
  return categorySchema.safeParse({ name: formData.get("name"), slug: formData.get("slug"), sortOrder: formData.get("sortOrder"), isActive: formData.get("isActive") });
}

function revalidateCategories() {
  revalidatePath("/");
  revalidatePath("/admin/categories");
  revalidatePath("/admin/products");
}

export async function createCategory(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseCategory(formData);
  if (!parsed.success) return { message: "Kategori alanlarını kontrol edin.", errors: parsed.error.flatten().fieldErrors };
  try {
    await prisma.category.create({ data: parsed.data });
    revalidateCategories();
    return { success: true, message: "Kategori oluşturuldu." };
  } catch (error) {
    console.error("Category create failed", error);
    return { message: "Kategori oluşturulamadı. Ad ve slug benzersiz olmalı." };
  }
}

export async function updateCategory(id: number, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseCategory(formData);
  if (!parsed.success) return { message: "Kategori alanlarını kontrol edin.", errors: parsed.error.flatten().fieldErrors };
  try {
    await prisma.category.update({ where: { id }, data: parsed.data });
    revalidateCategories();
    return { success: true, message: "Kategori güncellendi." };
  } catch (error) {
    console.error("Category update failed", error);
    return { message: "Kategori güncellenemedi." };
  }
}

export async function deleteCategory(id: number): Promise<ActionState> {
  await requireAdmin();
  const productCount = await prisma.product.count({ where: { categoryId: id } });
  if (productCount > 0) return { message: "Bu kategoride ürün bulunduğu için silinemez." };
  await prisma.category.delete({ where: { id } });
  revalidateCategories();
  return { success: true, message: "Kategori silindi." };
}
