import type { ReactNode } from "react";
import Link from "next/link";
import { Plus } from "lucide-react";

type PageHeaderProps = {
  eyebrow?: string;
  title: string;
  description?: string;
  actions?: ReactNode;
  actionHref?: string;
  actionLabel?: string;
};

export function PageHeader({ eyebrow, title, description, actions, actionHref, actionLabel }: PageHeaderProps) {
  return (
    <header className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
      <div>
        {eyebrow && <p className="mb-1 text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">{eyebrow}</p>}
        <h1 className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white sm:text-3xl">{title}</h1>
        {description && <p className="mt-2 max-w-2xl text-sm text-slate-500 dark:text-slate-400">{description}</p>}
      </div>
      {(actions || (actionHref && actionLabel)) && (
        <div className="flex shrink-0 items-center gap-2">
          {actions}
          {actionHref && actionLabel && (
            <Link href={actionHref} className="inline-flex h-10 items-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800">
              <Plus size={16} /> {actionLabel}
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
