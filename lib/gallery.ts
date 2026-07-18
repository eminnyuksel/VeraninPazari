import { prisma } from "@/lib/prisma";

export async function getGalleryImages() {
  return prisma.galleryImage.findMany({
    where: { isActive: true },
    orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }],
    select: { id: true, image: true, caption: true },
  });
}
