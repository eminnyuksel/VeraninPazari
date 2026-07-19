import Image from "next/image";
import { Search } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";
import { ProductRowActions } from "@/components/admin/ProductRowActions";

export const dynamic = "force-dynamic";

export default async function ProductsPage({ searchParams }: { searchParams: Promise<{ q?: string }> }) {
  const query = (await searchParams).q?.trim() ?? "";
  const products = await prisma.product.findMany({
    where: query ? { OR: [{ name: { contains: query, mode: "insensitive" } }, { slug: { contains: query, mode: "insensitive" } }, { category: { name: { contains: query, mode: "insensitive" } } }] } : undefined,
    include: { category: true },
    orderBy: [{ sortOrder: "asc" }, { updatedAt: "desc" }],
  });

  return (
    <>
      <PageHeader eyebrow="Katalog" title="Ürün Yönetimi" description="Ürünleri düzenleyin, stok ve yayın durumlarını kontrol edin." actionHref="/admin/products/new" actionLabel="Yeni ürün" />
      <form className="mb-5 flex max-w-lg items-center gap-2 rounded-[8px] border border-slate-300 bg-white px-3 dark:border-slate-800 dark:bg-slate-900">
        <Search size={17} className="text-slate-400" />
        <input name="q" defaultValue={query} placeholder="Ürün, slug veya kategori ara…" className="h-12 min-w-0 flex-1 bg-transparent text-sm outline-none" />
        <button className="min-h-11 px-2 text-xs font-semibold text-emerald-800">Ara</button>
      </form>
      {products.length === 0 ? <EmptyState title={query ? "Sonuç bulunamadı" : "Henüz ürün yok"} description={query ? "Arama ifadesini değiştirerek yeniden deneyin." : "Yeni ürün butonuyla kataloğa ilk ürününü ekleyin."} /> : (
        <div className="admin-panel overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="border-b border-slate-200 bg-[#f6f3eb] text-[10px] uppercase tracking-[.12em] text-slate-500 dark:border-slate-800 dark:bg-slate-900"><tr><th className="px-4 py-3">Görsel</th><th className="px-4 py-3">Ürün</th><th className="px-4 py-3">Kategori</th><th className="px-4 py-3">Birim</th><th className="px-4 py-3">Stok</th><th className="px-4 py-3">Yayın</th><th className="px-4 py-3">Güncelleme</th><th className="px-4 py-3 text-right">İşlemler</th></tr></thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">{products.map((product) => <tr key={String(product.id)} className="hover:bg-[#f8f5ed] dark:hover:bg-slate-800/30"><td className="px-4 py-3"><Image src={product.image} alt="" width={48} height={48} unoptimized className="size-12 rounded-[6px] object-cover" /></td><td className="px-4 py-3"><strong className="block max-w-52 truncate">{product.name}</strong><span className="text-xs text-slate-400">/{product.slug}</span></td><td className="px-4 py-3">{product.category.name}</td><td className="px-4 py-3">{product.unit}</td><td className="px-4 py-3"><Badge active={product.inStock} activeText="Stokta" passiveText="Tükendi" /></td><td className="px-4 py-3"><Badge active={product.isActive} activeText="Yayında" passiveText="Gizli" /></td><td className="px-4 py-3 text-xs text-slate-500">{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(product.updatedAt)}</td><td className="px-4 py-3"><ProductRowActions id={String(product.id)} slug={product.slug} isActive={product.isActive} /></td></tr>)}</tbody>
          </table>
        </div>
      )}
    </>
  );
}

function Badge({ active, activeText, passiveText }: { active: boolean; activeText: string; passiveText: string }) {
  return <span className={`inline-flex rounded-[5px] px-2.5 py-1 text-[11px] font-semibold ${active ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-rose-50 text-rose-700 dark:bg-rose-950 dark:text-rose-300"}`}>{active ? activeText : passiveText}</span>;
}
