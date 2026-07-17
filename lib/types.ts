export type Product = {
  id: number;
  slug: string;
  name: string;
  description: string;
  price: number | null;
  image_url: string;
  category: string;
  featured: boolean;
  active: boolean;
};
