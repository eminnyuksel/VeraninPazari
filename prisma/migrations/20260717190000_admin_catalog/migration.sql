CREATE TABLE IF NOT EXISTS "products" (
  "id" BIGSERIAL PRIMARY KEY,
  "slug" VARCHAR(180) NOT NULL UNIQUE,
  "name" VARCHAR(180) NOT NULL,
  "description" TEXT NOT NULL,
  "price" NUMERIC(12,2),
  "image_url" TEXT NOT NULL,
  "category" VARCHAR(100) NOT NULL DEFAULT 'Diğer',
  "featured" BOOLEAN NOT NULL DEFAULT FALSE,
  "active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

CREATE TABLE IF NOT EXISTS "categories" (
  "id" SERIAL PRIMARY KEY,
  "name" VARCHAR(100) NOT NULL UNIQUE,
  "slug" VARCHAR(120) NOT NULL UNIQUE,
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);

INSERT INTO "categories" ("name", "slug", "sort_order")
SELECT "category",
  COALESCE(NULLIF(LOWER(REGEXP_REPLACE(TRANSLATE("category", 'ÇĞİÖŞÜçğıöşü', 'CGIOSUcgiosu'), '[^a-zA-Z0-9]+', '-', 'g')), ''), 'kategori') || '-' || ROW_NUMBER() OVER (ORDER BY "category"),
  ROW_NUMBER() OVER (ORDER BY "category")
FROM (SELECT DISTINCT "category" FROM "products" WHERE "category" IS NOT NULL) legacy_categories
ON CONFLICT ("name") DO NOTHING;

INSERT INTO "categories" ("name", "slug", "sort_order")
SELECT 'Diğer', 'diger', 0
WHERE NOT EXISTS (SELECT 1 FROM "categories")
ON CONFLICT DO NOTHING;

ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "old_price" NUMERIC(12,2);
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "category_id" INTEGER;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "image" TEXT;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "gallery_images" TEXT[] NOT NULL DEFAULT ARRAY[]::TEXT[];
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "unit" VARCHAR(40) NOT NULL DEFAULT 'adet';
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "in_stock" BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "is_active" BOOLEAN NOT NULL DEFAULT TRUE;
ALTER TABLE "products" ADD COLUMN IF NOT EXISTS "sort_order" INTEGER NOT NULL DEFAULT 0;

UPDATE "products" p SET "category_id" = c."id"
FROM "categories" c WHERE c."name" = p."category" AND p."category_id" IS NULL;
UPDATE "products" SET "image" = "image_url" WHERE "image" IS NULL;
UPDATE "products" SET "is_active" = "active";
UPDATE "products" SET "price" = 0 WHERE "price" IS NULL;

ALTER TABLE "products" ALTER COLUMN "category_id" SET NOT NULL;
ALTER TABLE "products" ALTER COLUMN "image" SET NOT NULL;
ALTER TABLE "products" ALTER COLUMN "price" SET NOT NULL;

DO $$ BEGIN
  IF NOT EXISTS (SELECT 1 FROM pg_constraint WHERE conname = 'products_category_id_fkey') THEN
    ALTER TABLE "products" ADD CONSTRAINT "products_category_id_fkey"
      FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
  END IF;
END $$;

ALTER TABLE "products" DROP COLUMN IF EXISTS "category";
ALTER TABLE "products" DROP COLUMN IF EXISTS "image_url";
ALTER TABLE "products" DROP COLUMN IF EXISTS "active";

DROP INDEX IF EXISTS "products_active_featured_idx";
CREATE INDEX IF NOT EXISTS "products_is_active_featured_sort_order_idx" ON "products" ("is_active", "featured", "sort_order");
CREATE INDEX IF NOT EXISTS "products_category_id_sort_order_idx" ON "products" ("category_id", "sort_order");
CREATE INDEX IF NOT EXISTS "categories_is_active_sort_order_idx" ON "categories" ("is_active", "sort_order");

CREATE TABLE IF NOT EXISTS "admins" (
  "id" TEXT PRIMARY KEY,
  "email" VARCHAR(190) NOT NULL UNIQUE,
  "name" VARCHAR(120) NOT NULL,
  "password_hash" TEXT NOT NULL,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "last_login_at" TIMESTAMPTZ,
  "created_at" TIMESTAMPTZ NOT NULL DEFAULT NOW(),
  "updated_at" TIMESTAMPTZ NOT NULL DEFAULT NOW()
);
