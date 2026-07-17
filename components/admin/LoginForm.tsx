"use client";

import { useActionState } from "react";
import { LoaderCircle, LockKeyhole, Mail } from "lucide-react";
import { loginAction } from "@/app/admin/login/actions";
import type { ActionState } from "@/lib/validation";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label htmlFor="email" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">E-posta</label>
        <div className="relative">
          <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input id="email" name="email" type="email" autoComplete="email" required className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-slate-700 dark:bg-slate-900" placeholder="admin@veraninpazari.com" />
        </div>
        {state.errors?.email?.[0] && <p className="mt-1 text-xs text-red-600">{state.errors.email[0]}</p>}
      </div>
      <div>
        <label htmlFor="password" className="mb-2 block text-sm font-medium text-slate-700 dark:text-slate-200">Şifre</label>
        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
          <input id="password" name="password" type="password" autoComplete="current-password" required className="h-12 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-4 text-sm outline-none transition focus:border-emerald-600 focus:ring-4 focus:ring-emerald-600/10 dark:border-slate-700 dark:bg-slate-900" placeholder="••••••••••••" />
        </div>
        {state.errors?.password?.[0] && <p className="mt-1 text-xs text-red-600">{state.errors.password[0]}</p>}
      </div>
      {state.message && <div role="alert" className="rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700 dark:border-red-900 dark:bg-red-950/50 dark:text-red-300">{state.message}</div>}
      <button disabled={pending} className="flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-emerald-700 px-4 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">
        {pending && <LoaderCircle className="animate-spin" size={18} />}
        {pending ? "Giriş yapılıyor" : "Giriş yap"}
      </button>
    </form>
  );
}
