import { redirect } from "next/navigation";
import { auth } from "@/auth";
import { prisma } from "@/lib/prisma";

export async function requireAdmin() {
  const session = await auth();
  if (!session?.user || session.user.role !== "admin") redirect("/admin/login");
  const admin = await prisma.admin.findUnique({
    where: { id: session.user.id },
    select: { id: true, email: true, name: true, isActive: true },
  });
  if (!admin?.isActive) redirect("/admin/login");
  return admin;
}
