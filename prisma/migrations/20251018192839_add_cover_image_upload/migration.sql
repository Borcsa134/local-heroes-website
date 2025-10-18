/*
  Warnings:

  - You are about to drop the column `version_cover_image` on the `_events_v` table. All the data in the column will be lost.
  - You are about to drop the column `version_cover_image` on the `_news_v` table. All the data in the column will be lost.
  - You are about to drop the column `cover_image` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `alt` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sizes_tablet_filename` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sizes_tablet_filesize` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sizes_tablet_height` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sizes_tablet_mime_type` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sizes_tablet_url` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `sizes_tablet_width` on the `media` table. All the data in the column will be lost.
  - You are about to drop the column `cover_image` on the `news` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "media_sizes_tablet_sizes_tablet_filename_idx";

-- AlterTable
ALTER TABLE "_events_v" DROP COLUMN "version_cover_image",
ADD COLUMN     "version_cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "_news_v" DROP COLUMN "version_cover_image",
ADD COLUMN     "version_cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "events" DROP COLUMN "cover_image",
ADD COLUMN     "cover_image_id" INTEGER;

-- AlterTable
ALTER TABLE "media" DROP COLUMN "alt",
DROP COLUMN "sizes_tablet_filename",
DROP COLUMN "sizes_tablet_filesize",
DROP COLUMN "sizes_tablet_height",
DROP COLUMN "sizes_tablet_mime_type",
DROP COLUMN "sizes_tablet_url",
DROP COLUMN "sizes_tablet_width";

-- AlterTable
ALTER TABLE "news" DROP COLUMN "cover_image",
ADD COLUMN     "cover_image_id" INTEGER;

-- CreateIndex
CREATE INDEX "_events_v_version_version_cover_image_idx" ON "_events_v"("version_cover_image_id");

-- CreateIndex
CREATE INDEX "_news_v_version_version_cover_image_idx" ON "_news_v"("version_cover_image_id");

-- CreateIndex
CREATE INDEX "events_cover_image_idx" ON "events"("cover_image_id");

-- CreateIndex
CREATE INDEX "news_cover_image_idx" ON "news"("cover_image_id");

-- AddForeignKey
ALTER TABLE "events" ADD CONSTRAINT "events_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "news" ADD CONSTRAINT "news_cover_image_id_media_id_fk" FOREIGN KEY ("cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_news_v" ADD CONSTRAINT "_news_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_version_cover_image_id_media_id_fk" FOREIGN KEY ("version_cover_image_id") REFERENCES "media"("id") ON DELETE SET NULL ON UPDATE NO ACTION;
