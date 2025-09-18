-- AlterTable
ALTER TABLE "_events_v" ADD COLUMN     "version_summary" VARCHAR;

-- AlterTable
ALTER TABLE "events" ADD COLUMN     "summary" VARCHAR;
