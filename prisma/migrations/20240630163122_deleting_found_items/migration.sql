-- DropForeignKey
ALTER TABLE "Claims" DROP CONSTRAINT "Claims_foundById_fkey";

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "Claims_foundById_fkey" FOREIGN KEY ("foundById") REFERENCES "FoundBy"("id") ON DELETE CASCADE ON UPDATE CASCADE;
