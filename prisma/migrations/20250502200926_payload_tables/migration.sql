/*
  Warnings:

  - You are about to drop the column `fullname` on the `users` table. All the data in the column will be lost.
  - You are about to drop the column `username` on the `users` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "users" DROP COLUMN "fullname",
DROP COLUMN "username",
ADD COLUMN     "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "hash" VARCHAR,
ADD COLUMN     "lock_until" TIMESTAMPTZ(3),
ADD COLUMN     "login_attempts" DECIMAL DEFAULT 0,
ADD COLUMN     "reset_password_expiration" TIMESTAMPTZ(3),
ADD COLUMN     "reset_password_token" VARCHAR,
ADD COLUMN     "salt" VARCHAR,
ADD COLUMN     "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ALTER COLUMN "email" SET DATA TYPE VARCHAR;

-- CreateTable
CREATE TABLE "events" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "author" VARCHAR,
    "slug" VARCHAR,
    "cover_image_id" INTEGER,
    "event_date" TIMESTAMPTZ(3),
    "regular_event" BOOLEAN DEFAULT false,
    "content" JSONB,
    "published" BOOLEAN DEFAULT false,
    "published_at" TIMESTAMPTZ(3),
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "events_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "media" (
    "id" SERIAL NOT NULL,
    "alt" VARCHAR,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "url" VARCHAR,
    "thumbnail_u_r_l" VARCHAR,
    "filename" VARCHAR,
    "mime_type" VARCHAR,
    "filesize" DECIMAL,
    "width" DECIMAL,
    "height" DECIMAL,
    "focal_x" DECIMAL,
    "focal_y" DECIMAL,
    "sizes_thumbnail_url" VARCHAR,
    "sizes_thumbnail_width" DECIMAL,
    "sizes_thumbnail_height" DECIMAL,
    "sizes_thumbnail_mime_type" VARCHAR,
    "sizes_thumbnail_filesize" DECIMAL,
    "sizes_thumbnail_filename" VARCHAR,
    "sizes_card_url" VARCHAR,
    "sizes_card_width" DECIMAL,
    "sizes_card_height" DECIMAL,
    "sizes_card_mime_type" VARCHAR,
    "sizes_card_filesize" DECIMAL,
    "sizes_card_filename" VARCHAR,
    "sizes_tablet_url" VARCHAR,
    "sizes_tablet_width" DECIMAL,
    "sizes_tablet_height" DECIMAL,
    "sizes_tablet_mime_type" VARCHAR,
    "sizes_tablet_filesize" DECIMAL,
    "sizes_tablet_filename" VARCHAR,

    CONSTRAINT "media_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "news" (
    "id" SERIAL NOT NULL,
    "title" VARCHAR,
    "published" BOOLEAN DEFAULT false,
    "author" VARCHAR,
    "slug" VARCHAR,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "content" JSONB,
    "published_at" TIMESTAMPTZ(3),
    "cover_image_id" INTEGER,

    CONSTRAINT "news_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_locked_documents" (
    "id" SERIAL NOT NULL,
    "global_slug" VARCHAR,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payload_locked_documents_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_locked_documents_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "users_id" INTEGER,
    "news_id" INTEGER,
    "media_id" INTEGER,
    "events_id" INTEGER,

    CONSTRAINT "payload_locked_documents_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_migrations" (
    "id" SERIAL NOT NULL,
    "name" VARCHAR,
    "batch" DECIMAL,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payload_migrations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_preferences" (
    "id" SERIAL NOT NULL,
    "key" VARCHAR,
    "value" JSONB,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "payload_preferences_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "payload_preferences_rels" (
    "id" SERIAL NOT NULL,
    "order" INTEGER,
    "parent_id" INTEGER NOT NULL,
    "path" VARCHAR NOT NULL,
    "users_id" INTEGER,

    CONSTRAINT "payload_preferences_rels_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "discord_users" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "fullname" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "discord_users_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "events_cover_image_idx" ON "events"("cover_image_id");

-- CreateIndex
CREATE INDEX "events_created_at_idx" ON "events"("created_at");

-- CreateIndex
CREATE INDEX "events_updated_at_idx" ON "events"("updated_at");

-- CreateIndex
CREATE UNIQUE INDEX "media_filename_idx" ON "media"("filename");

-- CreateIndex
CREATE INDEX "media_created_at_idx" ON "media"("created_at");

-- CreateIndex
CREATE INDEX "media_sizes_card_sizes_card_filename_idx" ON "media"("sizes_card_filename");

-- CreateIndex
CREATE INDEX "media_sizes_tablet_sizes_tablet_filename_idx" ON "media"("sizes_tablet_filename");

-- CreateIndex
CREATE INDEX "media_sizes_thumbnail_sizes_thumbnail_filename_idx" ON "media"("sizes_thumbnail_filename");

-- CreateIndex
CREATE INDEX "media_updated_at_idx" ON "media"("updated_at");

-- CreateIndex
CREATE INDEX "news_cover_image_idx" ON "news"("cover_image_id");

-- CreateIndex
CREATE INDEX "news_created_at_idx" ON "news"("created_at");

-- CreateIndex
CREATE INDEX "news_updated_at_idx" ON "news"("updated_at");

-- CreateIndex
CREATE INDEX "payload_locked_documents_created_at_idx" ON "payload_locked_documents"("created_at");

-- CreateIndex
CREATE INDEX "payload_locked_documents_global_slug_idx" ON "payload_locked_documents"("global_slug");

-- CreateIndex
CREATE INDEX "payload_locked_documents_updated_at_idx" ON "payload_locked_documents"("updated_at");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_events_id_idx" ON "payload_locked_documents_rels"("events_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_media_id_idx" ON "payload_locked_documents_rels"("media_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_news_id_idx" ON "payload_locked_documents_rels"("news_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_order_idx" ON "payload_locked_documents_rels"("order");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_parent_idx" ON "payload_locked_documents_rels"("parent_id");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_path_idx" ON "payload_locked_documents_rels"("path");

-- CreateIndex
CREATE INDEX "payload_locked_documents_rels_users_id_idx" ON "payload_locked_documents_rels"("users_id");

-- CreateIndex
CREATE INDEX "payload_migrations_created_at_idx" ON "payload_migrations"("created_at");

-- CreateIndex
CREATE INDEX "payload_migrations_updated_at_idx" ON "payload_migrations"("updated_at");

-- CreateIndex
CREATE INDEX "payload_preferences_created_at_idx" ON "payload_preferences"("created_at");

-- CreateIndex
CREATE INDEX "payload_preferences_key_idx" ON "payload_preferences"("key");

-- CreateIndex
CREATE INDEX "payload_preferences_updated_at_idx" ON "payload_preferences"("updated_at");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_order_idx" ON "payload_preferences_rels"("order");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_parent_idx" ON "payload_preferences_rels"("parent_id");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_path_idx" ON "payload_preferences_rels"("path");

-- CreateIndex
CREATE INDEX "payload_preferences_rels_users_id_idx" ON "payload_preferences_rels"("users_id");

-- CreateIndex
CREATE UNIQUE INDEX "discord_users_email_key" ON "discord_users"("email");

-- CreateIndex
CREATE INDEX "users_created_at_idx" ON "users"("created_at");

-- CreateIndex
CREATE INDEX "users_updated_at_idx" ON "users"("updated_at");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_events_fk" FOREIGN KEY ("events_id") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_media_fk" FOREIGN KEY ("media_id") REFERENCES "media"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_news_fk" FOREIGN KEY ("news_id") REFERENCES "news"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_locked_documents"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_locked_documents_rels" ADD CONSTRAINT "payload_locked_documents_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_parent_fk" FOREIGN KEY ("parent_id") REFERENCES "payload_preferences"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "payload_preferences_rels" ADD CONSTRAINT "payload_preferences_rels_users_fk" FOREIGN KEY ("users_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;

-- RenameIndex
ALTER INDEX "users_email_key" RENAME TO "users_email_idx";
