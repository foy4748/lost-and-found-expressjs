-- DropForeignKey
ALTER TABLE "FoundBy" DROP CONSTRAINT "FoundBy_foundItemId_fkey";

-- DropForeignKey
ALTER TABLE "FoundItems" DROP CONSTRAINT "FoundItems_claimsId_fkey";

-- AddForeignKey
ALTER TABLE "FoundBy" ADD CONSTRAINT "FoundBy_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES "FoundItems"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundItems" ADD CONSTRAINT "FoundItems_claimsId_fkey" FOREIGN KEY ("claimsId") REFERENCES "Claims"("id") ON DELETE CASCADE ON UPDATE CASCADE;
