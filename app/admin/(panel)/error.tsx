"use client";

export default function AdminError({ reset }: { error: Error & { digest?: string }; reset: () => void }) {
  return <div className="grid min-h-[60vh] place-items-center text-center"><div><p className="text-xs font-bold uppercase tracking-[.18em] text-red-600">Bir hata oluştu</p><h2 className="mt-2 font-serif text-3xl font-semibold">Veriler yüklenemedi</h2><p className="mt-2 text-sm text-slate-500">Bağlantıyı kontrol edip yeniden deneyin.</p><button onClick={reset} className="mt-5 rounded-xl bg-slate-900 px-4 py-2.5 text-sm font-semibold text-white dark:bg-white dark:text-slate-900">Tekrar dene</button></div></div>;
}
