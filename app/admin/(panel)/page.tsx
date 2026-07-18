import Image from "next/image";
import Link from "next/link";
import { Boxes, CircleCheck, CircleOff, PackageCheck, PackageX } from "lucide-react";
import { prisma } from "@/lib/prisma";
import { PageHeader } from "@/components/admin/PageHeader";
import { EmptyState } from "@/components/admin/EmptyState";

export const dynamic = "force-dynamic";

export default async function AdminDashboardPage() {
  const [total, active, inactive, inStock, outOfStock, recentProducts] = await Promise.all([
    prisma.product.count(),
    prisma.product.count({ where: { isActive: true } }),
    prisma.product.count({ where: { isActive: false } }),
    prisma.product.count({ where: { inStock: true } }),
    prisma.product.count({ where: { inStock: false } }),
    prisma.product.findMany({ include: { category: true }, orderBy: { updatedAt: "desc" }, take: 6 }),
  ]);

  const cards = [
    { label: "Toplam Ürün", value: total, icon: Boxes, color: "bg-slate-900 text-white dark:bg-slate-700" },
    { label: "Aktif Ürün", value: active, icon: CircleCheck, color: "bg-emerald-700 text-white" },
    { label: "Pasif Ürün", value: inactive, icon: CircleOff, color: "bg-amber-500 text-white" },
    { label: "Stokta Olan", value: inStock, icon: PackageCheck, color: "bg-sky-600 text-white" },
    { label: "Stokta Olmayan", value: outOfStock, icon: PackageX, color: "bg-rose-600 text-white" },
  ];

  return (
    <>
      <PageHeader eyebrow="Genel bakış" title="Dashboard" description="Kataloğun güncel durumunu ve son değişiklikleri tek ekrandan takip edin." actionHref="/admin/products/new" actionLabel="Yeni ürün" />
      <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {cards.map(({ label, value, icon: Icon, color }) => <article key={label} className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm dark:border-slate-800 dark:bg-slate-900"><div className={`mb-5 grid size-10 place-items-center rounded-xl ${color}`}><Icon size={19} /></div><strong className="font-serif text-3xl">{value}</strong><p className="mt-1 text-xs font-medium text-slate-500">{label}</p></article>)}
      </section>
      <section className="mt-8">
        <div className="mb-4 flex items-center justify-between"><div><h2 className="font-serif text-2xl font-semibold">Son güncellenen ürünler</h2><p className="text-sm text-slate-500">Katalogdaki en son altı değişiklik</p></div><Link href="/admin/products" className="text-sm font-semibold text-emerald-700 dark:text-emerald-400">Tümünü gör →</Link></div>
        {recentProducts.length === 0 ? <EmptyState title="Henüz ürün yok" description="İlk ürününüzü ekleyerek kataloğu oluşturmaya başlayın." /> : <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white dark:border-slate-800 dark:bg-slate-900"><div className="divide-y divide-slate-100 dark:divide-slate-800">{recentProducts.map((product) => <Link key={String(product.id)} href={`/admin/products/${product.id}/edit`} className="flex items-center gap-4 p-4 transition hover:bg-slate-50 dark:hover:bg-slate-800/50"><Image src={product.image} alt="" width={52} height={52} className="size-13 rounded-xl object-cover" unoptimized /><div className="min-w-0 flex-1"><strong className="block truncate text-sm">{product.name}</strong><span className="text-xs text-slate-500">{product.category.name} • {product.unit}</span></div><div className="text-right"><span className={`rounded-full px-2.5 py-1 text-[11px] font-semibold ${product.isActive ? "bg-emerald-50 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300" : "bg-slate-100 text-slate-500 dark:bg-slate-800"}`}>{product.isActive ? "Yayında" : "Gizli"}</span><time className="mt-1 block text-[11px] text-slate-400">{new Intl.DateTimeFormat("tr-TR", { dateStyle: "medium", timeStyle: "short" }).format(product.updatedAt)}</time></div></Link>)}</div></div>}
      </section>
    </>
  );
}
