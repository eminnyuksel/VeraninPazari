import { prisma } from "@/lib/prisma";
import { GalleryManager } from "@/components/admin/GalleryManager";
import { PageHeader } from "@/components/admin/PageHeader";

export const dynamic = "force-dynamic";

export default async function AdminGalleryPage() {
  const items = await prisma.galleryImage.findMany({ orderBy: [{ sortOrder: "asc" }, { createdAt: "desc" }], select: { id: true, image: true, caption: true, sortOrder: true, isActive: true } });
  return <><PageHeader eyebrow="Görsel yönetimi" title="Galeri" description="Köy fotoğraflarını yükleyin; sıra ve yayın durumunu yönetin. Yayındaki fotoğraflar site arka planında dönüşümlü görünür." /><GalleryManager items={items} /></>;
}
