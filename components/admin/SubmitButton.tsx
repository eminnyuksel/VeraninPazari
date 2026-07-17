"use client";

import { LoaderCircle, Save } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Kaydet" }: { label?: string }) {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="inline-flex h-11 items-center justify-center gap-2 rounded-xl bg-emerald-700 px-5 text-sm font-semibold text-white transition hover:bg-emerald-800 disabled:cursor-not-allowed disabled:opacity-60">{pending ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}{pending ? "Kaydediliyor" : label}</button>;
}
