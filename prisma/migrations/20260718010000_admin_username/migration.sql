ALTER TABLE "admins" ADD COLUMN "username" VARCHAR(80);

UPDATE "admins"
SET "username" = LOWER(SPLIT_PART("email", '@', 1))
WHERE "username" IS NULL;

ALTER TABLE "admins" ALTER COLUMN "username" SET NOT NULL;

CREATE UNIQUE INDEX "admins_username_key" ON "admins"("username");
