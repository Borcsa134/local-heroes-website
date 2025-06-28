/*
  Warnings:

  - You are about to drop the column `cover_image_id` on the `news` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `news` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "enum__news_v_version_status" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "enum_news_status" AS ENUM ('draft', 'published');

-- DropForeignKey
ALTER TABLE "news" DROP CONSTRAINT "news_cover_image_id_media_id_fk";

-- DropIndex
DROP INDEX "news_cover_image_idx";

-- DropIndex
DROP INDEX "news_title_idx";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "cover_image_id",
DROP COLUMN "published",
ADD COLUMN     "_status" "enum_news_status" DEFAULT 'draft',
ADD COLUMN     "cover_image" VARCHAR,
ALTER COLUMN "title" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_news_v" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "version_title" VARCHAR,
    "version_author" VARCHAR,
    "version_slug" VARCHAR,
    "version_cover_image" VARCHAR,
    "version_content" JSONB,
    "version_published_at" TIMESTAMPTZ(3),
    "version_updated_at" TIMESTAMPTZ(3),
    "version_created_at" TIMESTAMPTZ(3),
    "version__status" "enum__news_v_version_status" DEFAULT 'draft',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latest" BOOLEAN,

    CONSTRAINT "_news_v_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "_news_v_created_at_idx" ON "_news_v"("created_at");

-- CreateIndex
CREATE INDEX "_news_v_latest_idx" ON "_news_v"("latest");

-- CreateIndex
CREATE INDEX "_news_v_parent_idx" ON "_news_v"("parent_id");

-- CreateIndex
CREATE INDEX "_news_v_updated_at_idx" ON "_news_v"("updated_at");

-- CreateIndex
CREATE INDEX "_news_v_version_version__status_idx" ON "_news_v"("version__status");

-- CreateIndex
CREATE INDEX "_news_v_version_version_created_at_idx" ON "_news_v"("version_created_at");

-- CreateIndex
CREATE INDEX "_news_v_version_version_slug_idx" ON "_news_v"("version_slug");

-- CreateIndex
CREATE INDEX "_news_v_version_version_updated_at_idx" ON "_news_v"("version_updated_at");

-- CreateIndex
CREATE INDEX "news__status_idx" ON "news"("_status");

-- AddForeignKey
ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_parent_id_news_id_fk" FOREIGN KEY ("parent_id") REFERENCES "news"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
