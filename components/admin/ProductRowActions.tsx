"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { Eye, EyeOff, ExternalLink, LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { deleteProduct, toggleProductStatus } from "@/app/admin/(panel)/products/actions";

export function ProductRowActions({ id, slug, isActive }: { id: string; slug: string; isActive: boolean }) {
  const router = useRouter();
  const [pending, startTransition] = useTransition();

  const run = (action: () => Promise<{ success?: boolean; message?: string }>, after?: () => void) => startTransition(async () => {
    const result = await action();
    if (result.success) { toast.success(result.message); after?.(); router.refresh(); } else toast.error(result.message ?? "İşlem tamamlanamadı.");
  });

  return (
    <div className="flex items-center justify-end gap-1">
      <Link href={`/urunler/${slug}`} target="_blank" title="Önizle" className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><ExternalLink size={15} /></Link>
      <Link href={`/admin/products/${id}/edit`} title="Düzenle" className="grid size-8 place-items-center rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800"><Pencil size={15} /></Link>
      <button disabled={pending} title={isActive ? "Gizle" : "Yayınla"} onClick={() => run(() => toggleProductStatus(id))} className="grid size-8 place-items-center rounded-lg text-amber-600 hover:bg-amber-50 dark:hover:bg-amber-950/30">{pending ? <LoaderCircle className="animate-spin" size={15} /> : isActive ? <EyeOff size={15} /> : <Eye size={15} />}</button>
      <button disabled={pending} title="Sil" onClick={() => { if (window.confirm("Bu ürünü ve ilişkili görsellerini kalıcı olarak silmek istediğinize emin misiniz?")) run(() => deleteProduct(id)); }} className="grid size-8 place-items-center rounded-lg text-red-600 hover:bg-red-50 dark:hover:bg-red-950/30"><Trash2 size={15} /></button>
    </div>
  );
}
