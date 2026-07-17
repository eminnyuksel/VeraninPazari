export type Product = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  oldPrice: number | null;
  image: string;
  galleryImages: string[];
  category: { id: number; name: string; slug: string };
  unit: string;
  featured: boolean;
  inStock: boolean;
  isActive: boolean;
  sortOrder: number;
};
