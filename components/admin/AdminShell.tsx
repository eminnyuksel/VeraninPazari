import Image from "next/image";
import Link from "next/link";
import { BarChart3, Boxes, ExternalLink, FolderTree, Images, LogOut } from "lucide-react";
import { signOut } from "@/auth";
import { ThemeToggle } from "@/components/admin/ThemeToggle";

const navigation = [
  { href: "/admin", label: "Dashboard", icon: BarChart3 },
  { href: "/admin/products", label: "Ürünler", icon: Boxes },
  { href: "/admin/categories", label: "Kategoriler", icon: FolderTree },
  { href: "/admin/gallery", label: "Galeri", icon: Images },
];

export function AdminShell({ children, adminName }: { children: React.ReactNode; adminName: string }) {
  return (
    <div className="admin-shell min-h-screen bg-[#f2efe7] text-[#142820] dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-white/10 bg-[#0b2b22] px-5 py-6 text-white md:flex md:flex-col">
        <Link href="/admin" className="flex items-center gap-3 border-b border-white/10 pb-6">
          <span className="grid size-12 place-items-center overflow-hidden rounded-full border border-white/20 bg-[#fffdf7]"><Image src="/brand/vera-user-logo.png" alt="" width={54} height={54} /></span>
          <span><strong className="block font-serif text-base font-medium">Vera&apos;nın Pazarı</strong><small className="text-[10px] uppercase tracking-[.2em] text-emerald-200/60">Yönetim</small></span>
        </Link>
        <nav className="mt-8 space-y-1">
          {navigation.map(({ href, label, icon: Icon }, index) => <Link key={href} href={href} className="flex min-h-12 items-center gap-3 border-b border-white/8 px-2 text-sm font-medium text-white/68 transition hover:border-amber-200/40 hover:text-white"><span className="text-[9px] text-amber-200/55">0{index + 1}</span><Icon size={18} />{label}</Link>)}
        </nav>
        <div className="mt-auto space-y-2">
          <Link href="/" target="_blank" className="flex min-h-11 items-center gap-3 px-2 text-sm text-white/55 transition hover:text-white"><ExternalLink size={17} />Siteyi görüntüle</Link>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button className="flex min-h-11 w-full items-center gap-3 border-t border-white/10 px-2 text-sm text-rose-300 transition hover:text-white"><LogOut size={17} />Çıkış yap</button>
          </form>
        </div>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-20 border-b border-[#142820]/10 bg-[#f7f4ec]/88 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <nav className="flex gap-1 overflow-x-auto md:hidden">{navigation.map(({ href, label }) => <Link key={href} href={href} className="flex min-h-11 items-center whitespace-nowrap border-b-2 border-transparent px-3 py-2 text-xs font-semibold text-slate-600 transition hover:border-emerald-800 dark:text-slate-300">{label}</Link>)}</nav>
            <div className="ml-auto flex items-center gap-3"><span className="hidden text-right text-xs text-slate-500 sm:block"><strong className="block text-sm text-[#142820] dark:text-slate-200">{adminName}</strong>Yönetici</span><ThemeToggle /></div>
          </div>
        </header>
        <main className="mx-auto max-w-[1500px] p-4 sm:p-7 lg:p-10">{children}</main>
      </div>
    </div>
  );
}
