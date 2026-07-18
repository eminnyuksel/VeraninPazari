CREATE TABLE "gallery_images" (
  "id" SERIAL PRIMARY KEY,
  "image" TEXT NOT NULL,
  "caption" VARCHAR(180),
  "sort_order" INTEGER NOT NULL DEFAULT 0,
  "is_active" BOOLEAN NOT NULL DEFAULT TRUE,
  "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,
  "updated_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX "gallery_images_is_active_sort_order_idx"
ON "gallery_images"("is_active", "sort_order");
