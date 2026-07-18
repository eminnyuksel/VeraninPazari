"use client";

import Image from "next/image";
import { useActionState, useEffect, useState, useTransition } from "react";
import { Eye, EyeOff, LoaderCircle, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createGalleryImage, deleteGalleryImage, toggleGalleryImage, updateGalleryImage, uploadGalleryImage } from "@/app/admin/(panel)/gallery/actions";
import { ImageUploader } from "@/components/admin/ImageUploader";
import type { ActionState } from "@/lib/validation";

type GalleryItem = { id: number; image: string; caption: string | null; sortOrder: number; isActive: boolean };

export function GalleryManager({ items }: { items: GalleryItem[] }) {
  const [state, action, pending] = useActionState(createGalleryImage, {} as ActionState);
  const [image, setImage] = useState<string[]>([]);
  useEffect(() => { if (state.message) (state.success ? toast.success : toast.error)(state.message); }, [state]);

  return (
    <div className="grid gap-6 xl:grid-cols-[360px_1fr]">
      <form action={action} className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900">
        <h2 className="font-serif text-xl font-semibold">Yeni fotoğraf</h2>
        <p className="mb-5 mt-1 text-xs text-slate-500">Köy, doğa ve üretici fotoğraflarını yükleyin.</p>
        <input type="hidden" name="image" value={image[0] ?? ""} />
        <ImageUploader label="Galeri görseli" value={image} onChange={setImage} max={1} uploadAction={uploadGalleryImage} />
        <div className="mt-4 space-y-4"><Field label="Başlık (opsiyonel)"><input name="caption" className="admin-input" placeholder="Örn. Kuş Yuvası" /></Field><Field label="Sıra"><input name="sortOrder" type="number" min="0" defaultValue={items.length * 10} className="admin-input" /></Field><label className="flex items-center gap-2 text-sm"><input name="isActive" type="checkbox" defaultChecked className="size-4 accent-emerald-700" />Yayında</label></div>
        {state.message && !state.success && <p className="mt-3 text-xs text-red-600">{state.message}</p>}
        <button disabled={pending || image.length === 0} className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white disabled:opacity-50">{pending && <LoaderCircle className="animate-spin" size={17} />}Galeriye ekle</button>
      </form>
      <div className="space-y-4">{items.length === 0 ? <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center text-sm text-slate-500 dark:border-slate-700 dark:bg-slate-900">Henüz galeri fotoğrafı yok. İlk köy fotoğrafını yükleyin.</div> : items.map((item) => <GalleryRow key={item.id} item={item} />)}</div>
    </div>
  );
}

function GalleryRow({ item }: { item: GalleryItem }) {
  const update = updateGalleryImage.bind(null, item.id);
  const [state, action, pending] = useActionState(update, {} as ActionState);
  const [working, startTransition] = useTransition();
  useEffect(() => { if (state.message) (state.success ? toast.success : toast.error)(state.message); }, [state]);

  const toggle = () => startTransition(async () => { const result = await toggleGalleryImage(item.id); if (result.message) (result.success ? toast.success : toast.error)(result.message); });
  const remove = () => { if (!window.confirm("Bu galeri görseli kalıcı olarak silinsin mi?")) return; startTransition(async () => { const result = await deleteGalleryImage(item.id); if (result.message) (result.success ? toast.success : toast.error)(result.message); }); };

  return <form action={action} className="grid gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:grid-cols-[180px_1fr_auto] sm:items-center"><input type="hidden" name="image" value={item.image} /><Image src={item.image} alt={item.caption ?? "Galeri görseli"} width={360} height={230} unoptimized className="h-32 w-full rounded-xl object-cover sm:w-44" /><div className="grid gap-3 sm:grid-cols-2"><Field label="Başlık"><input name="caption" defaultValue={item.caption ?? ""} className="admin-input" /></Field><Field label="Sıra"><input name="sortOrder" type="number" min="0" defaultValue={item.sortOrder} className="admin-input" /></Field><label className="flex items-center gap-2 text-sm"><input name="isActive" type="checkbox" defaultChecked={item.isActive} className="size-4 accent-emerald-700" />Yayında</label></div><div className="flex gap-2 sm:flex-col"><button disabled={pending || working} className="grid size-10 place-items-center rounded-lg bg-emerald-700 text-white" aria-label="Kaydet">{pending ? <LoaderCircle className="animate-spin" size={16} /> : <Save size={16} />}</button><button type="button" disabled={working} onClick={toggle} className="grid size-10 place-items-center rounded-lg border border-slate-200 text-slate-600 dark:border-slate-700" aria-label={item.isActive ? "Gizle" : "Yayınla"}>{item.isActive ? <EyeOff size={16} /> : <Eye size={16} />}</button><button type="button" disabled={working} onClick={remove} className="grid size-10 place-items-center rounded-lg border border-red-200 text-red-600 dark:border-red-900" aria-label="Sil">{working ? <LoaderCircle className="animate-spin" size={16} /> : <Trash2 size={16} />}</button></div></form>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <label className="block text-xs font-medium text-slate-600 dark:text-slate-300">{label}<span className="mt-1.5 block">{children}</span></label>; }
