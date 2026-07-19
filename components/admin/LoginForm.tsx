"use client";

import { useActionState } from "react";
import { ArrowRight, LoaderCircle, LockKeyhole, UserRound } from "lucide-react";
import { loginAction } from "@/app/admin/login/actions";
import type { ActionState } from "@/lib/validation";

const initialState: ActionState = {};

export function LoginForm() {
  const [state, formAction, pending] = useActionState(loginAction, initialState);
  return (
    <form action={formAction} className="space-y-5">
      <div><label htmlFor="username" className="mb-2 block text-xs font-semibold text-white/75">Kullanıcı adı</label><div className="relative"><UserRound className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" size={18} /><input id="username" name="username" type="text" autoComplete="username" required className="h-13 w-full rounded-[7px] border border-white/18 bg-white/6 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-200 focus:ring-4 focus:ring-amber-200/10" placeholder="Kullanıcı adınız" /></div>{state.errors?.username?.[0] && <p className="mt-1 text-xs text-rose-300">{state.errors.username[0]}</p>}</div>
      <div><label htmlFor="password" className="mb-2 block text-xs font-semibold text-white/75">Şifre</label><div className="relative"><LockKeyhole className="absolute left-3 top-1/2 -translate-y-1/2 text-white/35" size={18} /><input id="password" name="password" type="password" autoComplete="current-password" required className="h-13 w-full rounded-[7px] border border-white/18 bg-white/6 pl-10 pr-4 text-sm text-white outline-none transition placeholder:text-white/25 focus:border-amber-200 focus:ring-4 focus:ring-amber-200/10" placeholder="••••••••••••" /></div>{state.errors?.password?.[0] && <p className="mt-1 text-xs text-rose-300">{state.errors.password[0]}</p>}</div>
      {state.message && <div role="alert" className="rounded-[7px] border border-rose-300/25 bg-rose-950/30 px-4 py-3 text-sm text-rose-200">{state.message}</div>}
      <button disabled={pending} className="flex h-13 w-full items-center justify-between rounded-[7px] bg-[#f2e3c4] px-4 text-sm font-bold text-[#0b2b22] transition hover:bg-white disabled:cursor-not-allowed disabled:opacity-60"><span className="flex items-center gap-2">{pending && <LoaderCircle className="animate-spin" size={18} />}{pending ? "Giriş yapılıyor" : "Giriş yap"}</span><ArrowRight size={18} /></button>
    </form>
  );
}
