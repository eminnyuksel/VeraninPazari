import type { ReactNode } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

type PageHeaderProps = { eyebrow?: string; title: string; description?: string; actions?: ReactNode; actionHref?: string; actionLabel?: string };

export function PageHeader({ eyebrow, title, description, actions, actionHref, actionLabel }: PageHeaderProps) {
  return (
    <header className="mb-7 flex flex-col gap-5 border-b border-[#142820]/12 pb-6 sm:flex-row sm:items-end sm:justify-between dark:border-white/10">
      <div>
        {eyebrow && <p className="mb-2 text-[10px] font-bold uppercase tracking-[0.22em] text-[#b4503f] dark:text-amber-300">{eyebrow}</p>}
        <h1 className="font-serif text-3xl font-medium tracking-[-.035em] text-[#142820] dark:text-white sm:text-4xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {(actions || (actionHref && actionLabel)) && <div className="flex shrink-0 items-center gap-2">{actions}{actionHref && actionLabel && <Link href={actionHref} className="admin-primary"><Plus size={16} />{actionLabel}</Link>}</div>}
    </header>
  );
}
