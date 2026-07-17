"use client";

import { useActionState, useEffect, useState } from "react";
import { toast } from "sonner";
import { slugify } from "@/lib/slug";
import type { ActionState } from "@/lib/validation";
import { ImageUploader } from "@/components/admin/ImageUploader";
import { RichTextEditor } from "@/components/admin/RichTextEditor";
import { SubmitButton } from "@/components/admin/SubmitButton";

type CategoryOption = { id: number; name: string };
type ProductFormValue = { name: string; slug: string; description: string; price: number; oldPrice: number | null; categoryId: number; image: string; galleryImages: string[]; unit: string; featured: boolean; inStock: boolean; isActive: boolean; sortOrder: number };

const emptyProduct: ProductFormValue = { name: "", slug: "", description: "", price: 0, oldPrice: null, categoryId: 0, image: "", galleryImages: [], unit: "adet", featured: false, inStock: true, isActive: true, sortOrder: 0 };

export function ProductForm({ action, categories, product }: { action: (state: ActionState, formData: FormData) => Promise<ActionState>; categories: CategoryOption[]; product?: ProductFormValue }) {
  const initial = product ?? emptyProduct;
  const [state, formAction] = useActionState(action, {});
  const [name, setName] = useState(initial.name);
  const [slug, setSlug] = useState(initial.slug);
  const [slugTouched, setSlugTouched] = useState(Boolean(product));
  const [description, setDescription] = useState(initial.description);
  const [image, setImage] = useState(initial.image ? [initial.image] : []);
  const [gallery, setGallery] = useState(initial.galleryImages);
  const [removedImages, setRemovedImages] = useState<string[]>([]);

  useEffect(() => { if (state.message) (state.success ? toast.success : toast.error)(state.message); }, [state]);
  const markRemoved = (url: string) => setRemovedImages((items) => items.includes(url) ? items : [...items, url]);
  const fieldError = (field: string) => state.errors?.[field]?.[0];

  return (
    <form action={formAction} className="space-y-6">
      <input type="hidden" name="description" value={description} />
      <input type="hidden" name="image" value={image[0] ?? ""} />
      <input type="hidden" name="galleryImages" value={JSON.stringify(gallery)} />
      <input type="hidden" name="removedImages" value={JSON.stringify(removedImages)} />
      <div className="grid gap-6 xl:grid-cols-[minmax(0,1.4fr)_minmax(300px,.6fr)]">
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"><h2 className="mb-5 font-serif text-xl font-semibold">Ürün bilgileri</h2><div className="grid gap-5 sm:grid-cols-2">
            <Field label="Ürün Adı" error={fieldError("name")} className="sm:col-span-2"><input name="name" value={name} onChange={(event) => { const next = event.target.value; setName(next); if (!slugTouched) setSlug(slugify(next)); }} required className="admin-input" /></Field>
            <Field label="URL Slug" error={fieldError("slug")}><input name="slug" value={slug} onChange={(event) => { setSlugTouched(true); setSlug(slugify(event.target.value)); }} required className="admin-input" /></Field>
            <Field label="Kategori" error={fieldError("categoryId")}><select name="categoryId" defaultValue={initial.categoryId || ""} required className="admin-input"><option value="" disabled>Kategori seçin</option>{categories.map((category) => <option key={category.id} value={category.id}>{category.name}</option>)}</select></Field>
            <div className="sm:col-span-2"><label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Açıklama</label><RichTextEditor initialValue={initial.description} onChange={setDescription} />{fieldError("description") && <p className="mt-1 text-xs text-red-600">{fieldError("description")}</p>}</div>
          </div></section>
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:p-6"><h2 className="mb-5 font-serif text-xl font-semibold">Fiyat ve stok</h2><div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            <Field label="Fiyat" error={fieldError("price")}><input name="price" type="number" min="0" step="0.01" defaultValue={initial.price} required className="admin-input" /></Field>
            <Field label="Eski Fiyat" error={fieldError("oldPrice")}><input name="oldPrice" type="number" min="0" step="0.01" defaultValue={initial.oldPrice ?? ""} className="admin-input" placeholder="Opsiyonel" /></Field>
            <Field label="Birim" error={fieldError("unit")}><input name="unit" defaultValue={initial.unit} required className="admin-input" placeholder="kg, adet, paket" /></Field>
            <Field label="Ürün Sırası" error={fieldError("sortOrder")}><input name="sortOrder" type="number" min="0" defaultValue={initial.sortOrder} required className="admin-input" /></Field>
          </div><div className="mt-5 grid gap-3 sm:grid-cols-3"><Switch name="inStock" label="Stokta" defaultChecked={initial.inStock} /><Switch name="featured" label="Öne çıkan ürün" defaultChecked={initial.featured} /><Switch name="isActive" label="Aktif / yayında" defaultChecked={initial.isActive} /></div></section>
        </div>
        <div className="space-y-6">
          <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><ImageUploader label="Ana ürün görseli" value={image} onChange={setImage} max={1} onRemove={markRemoved} />{fieldError("image") && <p className="mt-1 text-xs text-red-600">{fieldError("image")}</p>}<div className="mt-6"><ImageUploader label="Galeri görselleri" value={gallery} onChange={setGallery} multiple max={12} onRemove={markRemoved} /></div></section>
          <div className="sticky bottom-4 flex items-center justify-end gap-3 rounded-2xl border border-slate-200 bg-white/90 p-4 shadow-lg backdrop-blur dark:border-slate-800 dark:bg-slate-900/90"><SubmitButton label={product ? "Değişiklikleri kaydet" : "Ürünü kaydet"} /></div>
        </div>
      </div>
    </form>
  );
}

function Field({ label, error, children, className = "" }: { label: string; error?: string; children: React.ReactNode; className?: string }) { return <div className={className}><label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>{children}{error && <p className="mt-1 text-xs text-red-600">{error}</p>}</div>; }
function Switch({ name, label, defaultChecked }: { name: string; label: string; defaultChecked: boolean }) { return <label className="flex cursor-pointer items-center justify-between rounded-xl border border-slate-200 px-4 py-3 text-sm font-medium dark:border-slate-700"><span>{label}</span><input name={name} type="checkbox" defaultChecked={defaultChecked} className="size-4 accent-emerald-700" /></label>; }
