import { PackageOpen } from "lucide-react";

export function EmptyState({ title, description }: { title: string; description: string }) {
  return <div className="grid min-h-64 place-items-center rounded-2xl border border-dashed border-slate-300 bg-white p-8 text-center dark:border-slate-700 dark:bg-slate-900"><div><PackageOpen className="mx-auto mb-4 text-slate-300 dark:text-slate-600" size={42} /><h3 className="font-serif text-xl font-semibold">{title}</h3><p className="mt-1 text-sm text-slate-500">{description}</p></div></div>;
}
