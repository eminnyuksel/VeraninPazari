"use client";

import { useActionState, useEffect, useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { LoaderCircle, Pencil, Plus, Save, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { createCategory, deleteCategory, updateCategory } from "@/app/admin/(panel)/categories/actions";
import { slugify } from "@/lib/slug";

type CategoryItem = { id: number; name: string; slug: string; sortOrder: number; isActive: boolean; productCount: number };

export function CategoryManager({ categories }: { categories: CategoryItem[] }) {
  return <div className="grid gap-6 lg:grid-cols-[380px_1fr]"><NewCategoryForm /><div className="space-y-3">{categories.map((category) => <CategoryCard key={category.id} category={category} />)}</div></div>;
}

function NewCategoryForm() {
  const router = useRouter();
  const [state, action, pending] = useActionState(createCategory, {});
  const [name, setName] = useState("");
  const [slug, setSlug] = useState("");
  useEffect(() => { if (state.message) { (state.success ? toast.success : toast.error)(state.message); if (state.success) { setName(""); setSlug(""); router.refresh(); } } }, [state, router]);
  return <form action={action} className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className="mb-5 flex items-center gap-3"><span className="grid size-10 place-items-center rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300"><Plus size={19} /></span><div><h2 className="font-serif text-xl font-semibold">Yeni kategori</h2><p className="text-xs text-slate-500">Ürünleri gruplamak için oluşturun.</p></div></div><div className="space-y-4"><Field label="Kategori adı"><input name="name" value={name} onChange={(event) => { setName(event.target.value); setSlug(slugify(event.target.value)); }} className="admin-input" required /></Field><Field label="Slug"><input name="slug" value={slug} onChange={(event) => setSlug(slugify(event.target.value))} className="admin-input" required /></Field><Field label="Sıra"><input name="sortOrder" type="number" min="0" defaultValue={categoriesDefaultOrder()} className="admin-input" required /></Field><label className="flex items-center gap-2 text-sm"><input name="isActive" type="checkbox" defaultChecked className="size-4 accent-emerald-700" />Aktif kategori</label><button disabled={pending} className="flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 text-sm font-semibold text-white">{pending ? <LoaderCircle className="animate-spin" size={17} /> : <Plus size={17} />}Oluştur</button></div></form>;
}

function CategoryCard({ category }: { category: CategoryItem }) {
  const router = useRouter();
  const [editing, setEditing] = useState(false);
  const [pendingDelete, startDelete] = useTransition();
  const action = updateCategory.bind(null, category.id);
  const [state, formAction, pending] = useActionState(action, {});
  useEffect(() => { if (state.message) { (state.success ? toast.success : toast.error)(state.message); if (state.success) { setEditing(false); router.refresh(); } } }, [state, router]);

  const remove = () => {
    if (!window.confirm(`“${category.name}” kategorisini silmek istediğinize emin misiniz?`)) return;
    startDelete(async () => { const result = await deleteCategory(category.id); (result.success ? toast.success : toast.error)(result.message); if (result.success) router.refresh(); });
  };

  if (!editing) return <article className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm dark:border-slate-800 dark:bg-slate-900 sm:flex-row sm:items-center"><div className="min-w-0 flex-1"><div className="flex items-center gap-2"><h3 className="truncate font-semibold">{category.name}</h3><span className={`rounded-full px-2 py-0.5 text-[10px] font-bold ${category.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>{category.isActive ? "Aktif" : "Pasif"}</span></div><p className="mt-1 text-xs text-slate-500">/{category.slug} • Sıra {category.sortOrder} • {category.productCount} ürün</p></div><div className="flex gap-2"><button onClick={() => setEditing(true)} className="inline-flex h-9 items-center gap-2 rounded-lg border border-slate-200 px-3 text-xs font-semibold hover:bg-slate-50 dark:border-slate-700 dark:hover:bg-slate-800"><Pencil size={14} />Düzenle</button><button disabled={pendingDelete} onClick={remove} className="grid size-9 place-items-center rounded-lg border border-red-200 text-red-600 hover:bg-red-50 dark:border-red-900 dark:hover:bg-red-950/30">{pendingDelete ? <LoaderCircle className="animate-spin" size={14} /> : <Trash2 size={14} />}</button></div></article>;

  return <form action={formAction} className="rounded-2xl border border-emerald-300 bg-white p-5 shadow-sm dark:border-emerald-800 dark:bg-slate-900"><div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4"><Field label="Kategori adı"><input name="name" defaultValue={category.name} className="admin-input" required /></Field><Field label="Slug"><input name="slug" defaultValue={category.slug} className="admin-input" required /></Field><Field label="Sıra"><input name="sortOrder" type="number" min="0" defaultValue={category.sortOrder} className="admin-input" required /></Field><label className="flex items-end gap-2 pb-3 text-sm"><input name="isActive" type="checkbox" defaultChecked={category.isActive} className="size-4 accent-emerald-700" />Aktif</label></div><div className="mt-4 flex justify-end gap-2"><button type="button" onClick={() => setEditing(false)} className="h-9 rounded-lg px-3 text-xs font-semibold text-slate-500">Vazgeç</button><button disabled={pending} className="inline-flex h-9 items-center gap-2 rounded-lg bg-emerald-700 px-3 text-xs font-semibold text-white">{pending ? <LoaderCircle className="animate-spin" size={14} /> : <Save size={14} />}Kaydet</button></div></form>;
}

function Field({ label, children }: { label: string; children: React.ReactNode }) { return <div><label className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">{label}</label>{children}</div>; }
function categoriesDefaultOrder() { return 0; }
