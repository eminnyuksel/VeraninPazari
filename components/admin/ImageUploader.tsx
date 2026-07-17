"use client";

import Image from "next/image";
import { useRef, useState } from "react";
import { ImagePlus, LoaderCircle, Trash2, UploadCloud } from "lucide-react";
import { toast } from "sonner";
import { uploadProductImage } from "@/app/admin/(panel)/products/actions";

export function ImageUploader({ label, value, onChange, multiple = false, max = 1, onRemove }: { label: string; value: string[]; onChange: (urls: string[]) => void; multiple?: boolean; max?: number; onRemove?: (url: string) => void }) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [dragging, setDragging] = useState(false);

  const uploadFiles = async (files: FileList | File[]) => {
    const selected = Array.from(files).slice(0, Math.max(0, max - value.length));
    if (!selected.length) return;
    setUploading(true);
    try {
      const uploaded: string[] = [];
      for (const file of selected) {
        const formData = new FormData();
        formData.set("file", file);
        const result = await uploadProductImage(formData);
        uploaded.push(result.url);
      }
      onChange(multiple ? [...value, ...uploaded] : uploaded.slice(-1));
      toast.success(`${uploaded.length} görsel yüklendi.`);
    } catch (error) {
      toast.error(error instanceof Error ? error.message : "Görsel yüklenemedi.");
    } finally {
      setUploading(false);
      if (inputRef.current) inputRef.current.value = "";
    }
  };

  const remove = (url: string) => {
    onChange(value.filter((item) => item !== url));
    onRemove?.(url);
  };

  return (
    <div>
      <label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>
      {value.length > 0 && <div className={`mb-3 grid gap-3 ${multiple ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-1"}`}>{value.map((url) => <div key={url} className="group relative overflow-hidden rounded-xl border border-slate-200 bg-slate-100 dark:border-slate-700 dark:bg-slate-800"><Image src={url} alt="Yüklenen ürün görseli" width={multiple ? 260 : 760} height={multiple ? 200 : 360} unoptimized className={`w-full object-cover ${multiple ? "h-28" : "h-56"}`} /><button type="button" onClick={() => remove(url)} className="absolute right-2 top-2 grid size-8 place-items-center rounded-lg bg-white/90 text-red-600 opacity-100 shadow transition sm:opacity-0 sm:group-hover:opacity-100" aria-label="Görseli kaldır"><Trash2 size={15} /></button></div>)}</div>}
      {value.length < max && <button type="button" onClick={() => inputRef.current?.click()} onDragOver={(event) => { event.preventDefault(); setDragging(true); }} onDragLeave={() => setDragging(false)} onDrop={(event) => { event.preventDefault(); setDragging(false); void uploadFiles(event.dataTransfer.files); }} className={`grid min-h-32 w-full place-items-center rounded-xl border-2 border-dashed p-5 text-center transition ${dragging ? "border-emerald-600 bg-emerald-50 dark:bg-emerald-950/30" : "border-slate-300 bg-slate-50 hover:border-emerald-500 dark:border-slate-700 dark:bg-slate-900"}`}><span>{uploading ? <LoaderCircle className="mx-auto animate-spin text-emerald-700" size={28} /> : value.length ? <ImagePlus className="mx-auto text-slate-400" size={28} /> : <UploadCloud className="mx-auto text-slate-400" size={30} />}<strong className="mt-2 block text-sm">{uploading ? "Yükleniyor…" : "Sürükleyin veya görsel seçin"}</strong><small className="text-xs text-slate-400">JPG, PNG, WebP, AVIF • En fazla 5 MB</small></span></button>}
      <input ref={inputRef} type="file" accept="image/jpeg,image/png,image/webp,image/avif" multiple={multiple} className="hidden" onChange={(event) => event.target.files && void uploadFiles(event.target.files)} />
    </div>
  );
}
