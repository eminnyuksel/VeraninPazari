import { z } from "zod";

const checkbox = z.preprocess((value) => value === "on" || value === "true" || value === true, z.boolean());
export const signInSchema = z.object({
  username: z.string().trim().toLowerCase().min(3, "Kullanıcı adı en az 3 karakter olmalı.").max(80).regex(/^[a-z0-9._-]+$/, "Kullanıcı adı geçersiz."),
  password: z.string().min(8, "Şifre en az 8 karakter olmalı.").max(128),
});

export const productSchema = z.object({
  name: z.string().trim().min(2, "Ürün adı en az 2 karakter olmalı.").max(180),
  slug: z.string().trim().min(2).max(180).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug formatı geçersiz."),
  categoryId: z.coerce.number().int().positive("Kategori seçin."),
  description: z.string().trim().min(10, "Açıklama en az 10 karakter olmalı.").max(20_000),
  unit: z.string().trim().min(1, "Birim gerekli.").max(40),
  image: z.string().url("Ana ürün görseli gerekli."),
  galleryImages: z.array(z.string().url()).max(12, "En fazla 12 galeri görseli eklenebilir."),
  inStock: checkbox,
  featured: checkbox,
  isActive: checkbox,
  sortOrder: z.coerce.number().int().min(0).max(100_000),
});

export const categorySchema = z.object({
  name: z.string().trim().min(2, "Kategori adı en az 2 karakter olmalı.").max(100),
  slug: z.string().trim().min(2).max(120).regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/, "Slug formatı geçersiz."),
  sortOrder: z.coerce.number().int().min(0).max(100_000),
  isActive: checkbox,
});

export type ActionState = {
  success?: boolean;
  message?: string;
  errors?: Record<string, string[]>;
};
