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
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-slate-950 dark:text-slate-100">
      <aside className="fixed inset-y-0 left-0 z-30 hidden w-64 border-r border-slate-200 bg-white px-4 py-5 dark:border-slate-800 dark:bg-slate-900 md:flex md:flex-col">
        <Link href="/admin" className="flex items-center gap-3 px-2">
          <span className="grid size-11 place-items-center overflow-hidden rounded-xl bg-amber-100"><Image src="/brand/vera-user-logo.png" alt="" width={50} height={50} /></span>
          <span><strong className="block font-serif text-base">Vera&apos;nın Pazarı</strong><small className="text-xs text-slate-500">Yönetim paneli</small></span>
        </Link>
        <nav className="mt-10 space-y-1">
          {navigation.map(({ href, label, icon: Icon }) => <Link key={href} href={href} className="flex min-h-11 items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-600 transition hover:bg-emerald-50 hover:text-emerald-800 dark:text-slate-300 dark:hover:bg-emerald-950/40 dark:hover:text-emerald-300"><Icon size={18} />{label}</Link>)}
        </nav>
        <div className="mt-auto space-y-2">
          <Link href="/" target="_blank" className="flex items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-slate-500 transition hover:bg-slate-100 dark:hover:bg-slate-800"><ExternalLink size={17} />Siteyi görüntüle</Link>
          <form action={async () => { "use server"; await signOut({ redirectTo: "/admin/login" }); }}>
            <button className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm text-red-600 transition hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-950/30"><LogOut size={17} />Çıkış yap</button>
          </form>
        </div>
      </aside>
      <div className="md:pl-64">
        <header className="sticky top-0 z-20 border-b border-slate-200/80 bg-white/85 px-4 py-3 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 sm:px-7">
          <div className="flex items-center justify-between gap-4">
            <nav className="flex gap-1 overflow-x-auto md:hidden">{navigation.map(({ href, label }) => <Link key={href} href={href} className="flex min-h-11 items-center whitespace-nowrap rounded-lg px-3 py-2 text-xs font-semibold text-slate-600 dark:text-slate-300">{label}</Link>)}</nav>
            <div className="ml-auto flex items-center gap-3"><span className="hidden text-right text-xs text-slate-500 sm:block"><strong className="block text-sm text-slate-800 dark:text-slate-200">{adminName}</strong>Yönetici</span><ThemeToggle /></div>
          </div>
        </header>
        <main className="p-4 sm:p-7 lg:p-9">{children}</main>
      </div>
    </div>
  );
}
