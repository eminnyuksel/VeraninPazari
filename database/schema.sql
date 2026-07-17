CREATE TABLE IF NOT EXISTS products (
  id BIGSERIAL PRIMARY KEY,
  slug VARCHAR(180) UNIQUE NOT NULL,
  name VARCHAR(180) NOT NULL,
  description TEXT NOT NULL,
  price NUMERIC(12, 2),
  image_url TEXT NOT NULL,
  category VARCHAR(100) NOT NULL DEFAULT 'Diğer',
  featured BOOLEAN NOT NULL DEFAULT FALSE,
  active BOOLEAN NOT NULL DEFAULT TRUE,
  created_at TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE INDEX IF NOT EXISTS products_active_featured_idx ON products (active, featured);

INSERT INTO products (slug, name, description, price, image_url, category, featured)
VALUES
('dogal-koy-yumurtasi', 'Doğal Köy Yumurtası', 'Günlük, taze ve özenle seçilmiş doğal köy yumurtaları.', 180, 'https://images.unsplash.com/photo-1506976785307-8732e854ad03?auto=format&fit=crop&w=1200&q=80', 'Kahvaltılık', TRUE),
('ev-yapimi-eriste', 'Ev Yapımı Erişte', 'Geleneksel yöntemlerle hazırlanan, katkısız ev eriştesi.', 140, 'https://images.unsplash.com/photo-1556761223-4c4282c73f77?auto=format&fit=crop&w=1200&q=80', 'Ev Yapımı', TRUE),
('mevsimlik-recel', 'Mevsimlik Reçel', 'Mevsim meyveleriyle küçük partiler halinde hazırlanır.', 165, 'https://images.unsplash.com/photo-1590080875515-8a3a8dc5735e?auto=format&fit=crop&w=1200&q=80', 'Tatlı', FALSE)
ON CONFLICT (slug) DO NOTHING;
