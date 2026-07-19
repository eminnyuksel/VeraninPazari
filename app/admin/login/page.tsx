import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ThemeToggle } from "@/components/admin/ThemeToggle";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="relative grid min-h-screen place-items-center overflow-hidden bg-[#f3f5f1] px-5 py-10 text-slate-900 dark:bg-slate-950 dark:text-white">
      <div className="absolute right-5 top-5"><ThemeToggle /></div>
      <div className="absolute -left-24 top-20 size-72 rounded-full bg-emerald-200/45 blur-3xl dark:bg-emerald-900/20" />
      <div className="absolute -right-20 bottom-0 size-80 rounded-full bg-amber-200/50 blur-3xl dark:bg-amber-900/10" />
      <section className="relative z-10 w-full max-w-md rounded-[28px] border border-white/70 bg-white/85 p-6 shadow-2xl shadow-emerald-950/10 backdrop-blur-xl dark:border-slate-800 dark:bg-slate-900/85 sm:p-10">
        <div className="mb-8 flex items-center gap-4">
          <div className="grid size-16 place-items-center overflow-hidden rounded-2xl bg-amber-100"><Image src="/brand/vera-user-logo.png" alt="Vera'nın Pazarı" width={72} height={72} priority /></div>
          <div><p className="text-xs font-bold uppercase tracking-[.22em] text-emerald-700 dark:text-emerald-400">Yönetim paneli</p><h1 className="font-serif text-2xl font-semibold">Tekrar hoş geldiniz</h1></div>
        </div>
        <p className="mb-7 text-sm leading-6 text-slate-500 dark:text-slate-400">Ürünleri, kategorileri ve stok durumunu güvenli yönetim alanından güncelleyin.</p>
        <LoginForm />
        <p className="mt-7 text-center text-xs text-slate-400">Vera&apos;nın Pazarı • Güvenli admin erişimi</p>
      </section>
    </main>
  );
}
