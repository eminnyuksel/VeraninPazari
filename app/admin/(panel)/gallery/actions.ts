"use server";

import { del, put } from "@vercel/blob";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import { requireAdmin } from "@/lib/admin-auth";
import type { ActionState } from "@/lib/validation";

const acceptedTypes = new Set(["image/jpeg", "image/png", "image/webp", "image/avif"]);
const maxImageSize = 8 * 1024 * 1024;

function parseGalleryForm(formData: FormData) {
  const image = String(formData.get("image") ?? "").trim();
  const caption = String(formData.get("caption") ?? "").trim();
  const sortOrder = Number(formData.get("sortOrder") ?? 0);
  const isActive = formData.get("isActive") === "on";
  try {
    new URL(image);
  } catch {
    return { error: "Galeri görseli yükleyin." } as const;
  }
  if (caption.length > 180) return { error: "Başlık en fazla 180 karakter olabilir." } as const;
  if (!Number.isInteger(sortOrder) || sortOrder < 0 || sortOrder > 100_000) return { error: "Geçerli bir sıra girin." } as const;
  return { data: { image, caption: caption || null, sortOrder, isActive } } as const;
}

function revalidateGallery() {
  revalidatePath("/");
  revalidatePath("/galeri");
  revalidatePath("/admin/gallery");
}

export async function uploadGalleryImage(formData: FormData) {
  await requireAdmin();
  const file = formData.get("file");
  if (!(file instanceof File) || file.size === 0) throw new Error("Yüklenecek görsel bulunamadı.");
  if (!acceptedTypes.has(file.type)) throw new Error("Yalnızca JPG, PNG, WebP veya AVIF yüklenebilir.");
  if (file.size > maxImageSize) throw new Error("Görsel boyutu en fazla 8 MB olabilir.");
  const safeName = file.name.toLocaleLowerCase("tr-TR").replace(/[^a-z0-9._-]+/g, "-");
  const blob = await put(`gallery/${Date.now()}-${safeName}`, file, { access: "public", addRandomSuffix: true });
  return { url: blob.url };
}

export async function createGalleryImage(_: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseGalleryForm(formData);
  if ("error" in parsed) return { message: parsed.error };
  await prisma.galleryImage.create({ data: parsed.data });
  revalidateGallery();
  redirect("/admin/gallery?created=1");
}

export async function updateGalleryImage(id: number, _: ActionState, formData: FormData): Promise<ActionState> {
  await requireAdmin();
  const parsed = parseGalleryForm(formData);
  if ("error" in parsed) return { message: parsed.error };
  await prisma.galleryImage.update({ where: { id }, data: parsed.data });
  revalidateGallery();
  return { success: true, message: "Galeri görseli güncellendi." };
}

export async function toggleGalleryImage(id: number): Promise<ActionState> {
  await requireAdmin();
  const item = await prisma.galleryImage.findUnique({ where: { id }, select: { isActive: true } });
  if (!item) return { message: "Galeri görseli bulunamadı." };
  await prisma.galleryImage.update({ where: { id }, data: { isActive: !item.isActive } });
  revalidateGallery();
  return { success: true, message: item.isActive ? "Görsel gizlendi." : "Görsel yayınlandı." };
}

export async function deleteGalleryImage(id: number): Promise<ActionState> {
  await requireAdmin();
  const item = await prisma.galleryImage.findUnique({ where: { id } });
  if (!item) return { message: "Galeri görseli bulunamadı." };
  await prisma.galleryImage.delete({ where: { id } });
  try {
    if (new URL(item.image).hostname.endsWith(".blob.vercel-storage.com")) await del(item.image);
  } catch {
    // Local and external fallback images do not need Blob cleanup.
  }
  revalidateGallery();
  return { success: true, message: "Galeri görseli silindi." };
}
