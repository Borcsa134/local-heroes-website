-- CreateEnum
CREATE TYPE "enum_users_role" AS ENUM ('admin', 'editor');

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "role" "enum_users_role" NOT NULL DEFAULT 'editor';

-- RenameIndex
ALTER INDEX "discord_users_email_key" RENAME TO "discord_users_email_unique";
