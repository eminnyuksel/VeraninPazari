"use client";

import { LoaderCircle, Save } from "lucide-react";
import { useFormStatus } from "react-dom";

export function SubmitButton({ label = "Kaydet" }: { label?: string }) {
  const { pending } = useFormStatus();
  return <button disabled={pending} className="admin-primary">{pending ? <LoaderCircle className="animate-spin" size={18} /> : <Save size={18} />}{pending ? "Kaydediliyor" : label}</button>;
}
