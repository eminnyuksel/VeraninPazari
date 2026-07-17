"use server";

import { AuthError } from "next-auth";
import { signIn } from "@/auth";
import { signInSchema, type ActionState } from "@/lib/validation";

export async function loginAction(_: ActionState, formData: FormData): Promise<ActionState> {
  const parsed = signInSchema.safeParse({
    email: formData.get("email"),
    password: formData.get("password"),
  });

  if (!parsed.success) {
    return { message: "Giriş bilgilerini kontrol edin.", errors: parsed.error.flatten().fieldErrors };
  }

  try {
    await signIn("credentials", { ...parsed.data, redirectTo: "/admin" });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      return { message: "E-posta veya şifre hatalı." };
    }
    throw error;
  }
}
