/*
  Warnings:

  - You are about to drop the column `cover_image_id` on the `events` table. All the data in the column will be lost.
  - You are about to drop the column `published` on the `events` table. All the data in the column will be lost.

*/
-- CreateEnum
CREATE TYPE "enum__events_v_version_status" AS ENUM ('draft', 'published');

-- CreateEnum
CREATE TYPE "enum_events_status" AS ENUM ('draft', 'published');

-- DropForeignKey
ALTER TABLE "events" DROP CONSTRAINT "events_cover_image_id_media_id_fk";

-- DropIndex
DROP INDEX "events_cover_image_idx";

-- AlterTable
ALTER TABLE "events" DROP COLUMN "cover_image_id",
DROP COLUMN "published",
ADD COLUMN     "_status" "enum_events_status" DEFAULT 'draft',
ADD COLUMN     "cover_image" VARCHAR,
ALTER COLUMN "title" DROP NOT NULL;

-- CreateTable
CREATE TABLE "_events_v" (
    "id" SERIAL NOT NULL,
    "parent_id" INTEGER,
    "version_title" VARCHAR,
    "version_author" VARCHAR,
    "version_slug" VARCHAR,
    "version_regular_event" BOOLEAN DEFAULT false,
    "version_content" JSONB,
    "version_published_at" TIMESTAMPTZ(3),
    "version_updated_at" TIMESTAMPTZ(3),
    "version_created_at" TIMESTAMPTZ(3),
    "version__status" "enum__events_v_version_status" DEFAULT 'draft',
    "created_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMPTZ(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "latest" BOOLEAN,
    "version_cover_image" VARCHAR,
    "version_event_date" TIMESTAMPTZ(3),

    CONSTRAINT "_events_v_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "users_sessions" (
    "_order" INTEGER NOT NULL,
    "_parent_id" INTEGER NOT NULL,
    "id" VARCHAR NOT NULL,
    "created_at" TIMESTAMPTZ(3),
    "expires_at" TIMESTAMPTZ(3) NOT NULL,

    CONSTRAINT "users_sessions_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "_events_v_created_at_idx" ON "_events_v"("created_at");

-- CreateIndex
CREATE INDEX "_events_v_latest_idx" ON "_events_v"("latest");

-- CreateIndex
CREATE INDEX "_events_v_parent_idx" ON "_events_v"("parent_id");

-- CreateIndex
CREATE INDEX "_events_v_updated_at_idx" ON "_events_v"("updated_at");

-- CreateIndex
CREATE INDEX "_events_v_version_version__status_idx" ON "_events_v"("version__status");

-- CreateIndex
CREATE INDEX "_events_v_version_version_created_at_idx" ON "_events_v"("version_created_at");

-- CreateIndex
CREATE INDEX "_events_v_version_version_slug_idx" ON "_events_v"("version_slug");

-- CreateIndex
CREATE INDEX "_events_v_version_version_title_idx" ON "_events_v"("version_title");

-- CreateIndex
CREATE INDEX "_events_v_version_version_updated_at_idx" ON "_events_v"("version_updated_at");

-- CreateIndex
CREATE INDEX "users_sessions_order_idx" ON "users_sessions"("_order");

-- CreateIndex
CREATE INDEX "users_sessions_parent_id_idx" ON "users_sessions"("_parent_id");

-- CreateIndex
CREATE INDEX "events__status_idx" ON "events"("_status");

-- AddForeignKey
ALTER TABLE "_events_v" ADD CONSTRAINT "_events_v_parent_id_events_id_fk" FOREIGN KEY ("parent_id") REFERENCES "events"("id") ON DELETE SET NULL ON UPDATE NO ACTION;

-- AddForeignKey
ALTER TABLE "users_sessions" ADD CONSTRAINT "users_sessions_parent_id_fk" FOREIGN KEY ("_parent_id") REFERENCES "users"("id") ON DELETE CASCADE ON UPDATE NO ACTION;
