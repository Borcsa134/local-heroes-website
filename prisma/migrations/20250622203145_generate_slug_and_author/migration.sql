/*
  Warnings:

  - A unique constraint covering the columns `[title]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `events` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[slug]` on the table `news` will be added. If there are existing duplicate values, this will fail.
  - Made the column `title` on table `events` required. This step will fail if there are existing NULL values in that column.
  - Made the column `title` on table `news` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "events" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "news" ALTER COLUMN "title" SET NOT NULL;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "name" VARCHAR DEFAULT 'editor';

-- CreateIndex
CREATE UNIQUE INDEX "events_title_idx" ON "events"("title");

-- CreateIndex
CREATE UNIQUE INDEX "events_slug_idx" ON "events"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "news_slug_idx" ON "news"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "news_title_idx" ON "news"("title");