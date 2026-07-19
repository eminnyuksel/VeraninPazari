import Image from "next/image";
import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { LoginForm } from "@/components/admin/LoginForm";
import { ThemeToggle } from "@/components/admin/ThemeToggle";

export default async function AdminLoginPage() {
  const session = await auth();
  if (session?.user) redirect("/admin");

  return (
    <main className="grid min-h-screen bg-[#0b2b22] text-white lg:grid-cols-[1.1fr_.9fr]">
      <section className="relative hidden min-h-screen overflow-hidden lg:block">
        <Image src="/brand/kus-yuvasi.jpg" alt="Kuş Yuvası doğası" fill className="object-cover opacity-75" priority />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0b2b22]/30 to-[#0b2b22]" />
        <div className="absolute bottom-12 left-12 max-w-md border-l border-white/40 pl-7"><p className="text-[10px] font-bold uppercase tracking-[.25em] text-amber-200">Vera&apos;nın Pazarı</p><h2 className="mt-3 font-serif text-5xl font-medium leading-[.95]">Doğadan geleni<br />özenle yönetin.</h2></div>
      </section>
      <section className="relative flex min-h-screen items-center justify-center px-5 py-12">
        <div className="absolute right-5 top-5"><ThemeToggle /></div>
        <div className="w-full max-w-md">
          <div className="mb-10 flex items-center gap-4 border-b border-white/15 pb-7">
            <div className="grid size-16 place-items-center overflow-hidden rounded-full border border-white/20 bg-[#fffdf7]"><Image src="/brand/vera-user-logo.png" alt="Vera'nın Pazarı" width={72} height={72} priority /></div>
            <div><p className="text-[10px] font-bold uppercase tracking-[.22em] text-amber-200">Yönetim paneli</p><h1 className="mt-1 font-serif text-3xl font-medium">Tekrar hoş geldiniz</h1></div>
          </div>
          <p className="mb-7 max-w-sm text-sm leading-6 text-white/55">Ürünleri, kategorileri ve stok durumunu güvenli yönetim alanından güncelleyin.</p>
          <LoginForm />
          <p className="mt-8 text-xs text-white/35">Vera&apos;nın Pazarı · Güvenli admin erişimi</p>
        </div>
      </section>
    </main>
  );
}
