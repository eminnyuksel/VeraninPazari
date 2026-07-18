import { getGalleryImages } from "@/lib/gallery";

/* Gallery images are user-managed remote URLs from Vercel Blob. */
/* eslint-disable @next/next/no-img-element */

export const dynamic = "force-dynamic";

export default async function GalleryPage() {
  const storedImages = await getGalleryImages();
  const images = storedImages.length > 0 ? storedImages : [{ id: 0, image: "/brand/kus-yuvasi.jpg", caption: "Kuş Yuvası" }];

  return (
    <main className="gallery-page">
      <div className="container">
        <div className="gallery-heading"><span className="eyebrow">Köyden kareler</span><h1>Galeri</h1><p>Vera&apos;nın pazarına ilham veren köylerden, doğadan ve üreticilerden fotoğraflar.</p></div>
        <div className="public-gallery-grid">{images.map((item) => <figure key={item.id}><img src={item.image} alt={item.caption || "Vera'nın Pazarı galeri fotoğrafı"} loading="lazy" />{item.caption && <figcaption>{item.caption}</figcaption>}</figure>)}</div>
      </div>
    </main>
  );
}
