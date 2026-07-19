import { PublicGallery } from "@/components/PublicGallery";
import { getGalleryImages } from "@/lib/gallery";

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const storedImages = await getGalleryImages();
  const images = storedImages.length > 0 ? storedImages : [{ id: 0, image: "/brand/kus-yuvasi.jpg", caption: "Kuş Yuvası" }];

  return (
    <main className="gallery-page">
      <div className="container">
        <div className="gallery-heading">
          <span className="eyebrow">Köyden kareler</span>
          <h1>Doğanın içinden</h1>
          <p>Vera&apos;nın pazarına ilham veren köylerden, doğadan ve üreticilerden fotoğraflar.</p>
        </div>
        <PublicGallery images={images} />
      </div>
    </main>
  );
}
