"use server";

import { del, put } from "@vercel/blob";
import sanitizeHtml from "sanitize-html";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import { productSchema, type ActionState } from "@/lib/validation";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxImageSize = 5 * 1024 * 1024;

function parseProductForm(formData: FormData) {
  let galleryImages: unknown = [];
  try {
    galleryImages = JSON.parse(String(formData.get("galleryImages") ?? "[]"));
  } catch {
    galleryImages = [];
  }

  return productSchema.safeParse({
    name: formData.get("name"),
    slug: formData.get("slug"),
    categoryId: formData.get("categoryId"),
    description: formData.get("description"),
    unit: formData.get("unit"),
    image: formData.get("image"),
    galleryImages,
    inStock: formData.get("inStock"),
    featured: formData.get("featured"),
    isActive: formData.get("isActive"),
    sortOrder: formData.get("sortOrder"),
  });
}

function sanitizeDescription(description: string) {
  return sanitizeHtml(description, {
    allowedTags: ["p", "br", "strong", "em", "u", "ul", "ol", "li", "h2", "h3", "blockquote"],
    allowedAttributes: {},
  });
}

function revalidateCatalog(slug?: string) {
  revalidatePath("/");
  revalidatePath("/admin");
  revalidatePath("/admin/products");
  if (slug) revalidatePath(`/urunler/${slug}`);
}

export async function uploadProductImage(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("Yüklenecek görsel bulunamadı.");
  if (!acceptedTypes.has(file.type)) throw new Error("Yalnızca JPG, PNG, WebP veya AVIF yüklenebilir.");
  if (file.size > maxImageSize) throw new Error("Görsel boyutu en fazla 5 MB olabilir.");

  const safeName = file.name.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9._-]+/g, "-");
  const blob = await put(`products/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
  return { url: blob.url };
}

export async function removeProductImage(url: string) {
  await requireAdmin();
  const parsed = new URL(url);
  if (!parsed.hostname.endsWith(".blob.vercel-storage.com")) return { success: true };
  await del(url);
  return { success: true };
}

export async function createProduct(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) return { message: "Form alanlarını kontrol edin.", errors: parsed.error.flatten().fieldErrors };

  const data = { ...parsed.data, price: 0, oldPrice: null, description: sanitizeDescription(parsed.data.description) };
  try {
    const product = await prisma.product.create({ data });
    revalidateCatalog(product.slug);
  } catch (error) {
    console.error("Product create failed", error);
    return { message: "Ürün kaydedilemedi. Slug daha önce kullanılmış olabilir." };
  }

  redirect("/admin/products?created=1");
}

export async function updateProduct(id: string, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseProductForm(formData);
  if (!parsed.success) return { message: "Form alanlarını kontrol edin.", errors: parsed.error.flatten().fieldErrors };

  const productId = BigInt(id);
  const current = await prisma.product.findUnique({ where: { id: productId }, select: { slug: true } });
  if (!current) return { message: "Ürün bulunamadı." };

  try {
    const product = await prisma.product.update({
      where: { id: productId },
      data: { ...parsed.data, price: 0, oldPrice: null, description: sanitizeDescription(parsed.data.description) },
    });
    revalidateCatalog(current.slug);
    revalidateCatalog(product.slug);
    try {
      const removedImages = JSON.parse(String(formData.get("removedImages") ?? "[]")) as string[];
      const liveImages = new Set([product.image, ...product.galleryImages]);
      const removableBlobUrls = removedImages.filter((url) => {
        try { return !liveImages.has(url) && new URL(url).hostname.endsWith(".blob.vercel-storage.com"); } catch { return false; }
      });
      if (removableBlobUrls.length) await del(removableBlobUrls);
    } catch (error) {
      console.error("Removed blob cleanup failed", error);
    }
  } catch (error) {
    console.error("Product update failed", error);
    return { message: "Değişiklikler kaydedilemedi. Slug benzersiz olmalı." };
  }

  return { success: true, message: "Ürün başarıyla güncellendi." };
}

export async function deleteProduct(id: string): Promise<ActionState> {
  await requireAdmin();
  const productId = BigInt(id);
  const product = await prisma.product.findUnique({ where: { id: productId } });
  if (!product) return { message: "Ürün bulunamadı." };

  await prisma.product.delete({ where: { id: productId } });
  const blobUrls = [product.image, ...product.galleryImages].filter((url) => {
    try { return new URL(url).hostname.endsWith(".blob.vercel-storage.com"); } catch { return false; }
  });
  if (blobUrls.length) await del(blobUrls).catch((error) => console.error("Blob cleanup failed", error));
  revalidateCatalog(product.slug);
  return { success: true, message: "Ürün silindi." };
}

export async function toggleProductStatus(id: string): Promise<ActionState> {
  await requireAdmin();
  const productId = BigInt(id);
  const product = await prisma.product.findUnique({ where: { id: productId }, select: { isActive: true, slug: true } });
  if (!product) return { message: "Ürün bulunamadı." };
  await prisma.product.update({ where: { id: productId }, data: { isActive: !product.isActive } });
  revalidateCatalog(product.slug);
  return { success: true, message: product.isActive ? "Ürün gizlendi." : "Ürün yayınlandı." };
}
