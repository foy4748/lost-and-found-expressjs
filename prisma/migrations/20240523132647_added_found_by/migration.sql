/*
  Warnings:

  - You are about to drop the column `foundItemId` on the `Claims` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[foundById]` on the table `Claims` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `foundById` to the `Claims` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Claims" DROP CONSTRAINT "Claims_foundItemId_fkey";

-- DropIndex
DROP INDEX "Claims_foundItemId_key";

-- AlterTable
ALTER TABLE "Claims" DROP COLUMN "foundItemId",
ADD COLUMN     "foundById" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "FoundItems" ADD COLUMN     "claimsId" TEXT,
ADD COLUMN     "isItemFound" BOOLEAN NOT NULL DEFAULT false;

-- CreateTable
CREATE TABLE "FoundBy" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "foundItemId" TEXT NOT NULL,

    CONSTRAINT "FoundBy_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Claims_foundById_key" ON "Claims"("foundById");

-- AddForeignKey
ALTER TABLE "FoundBy" ADD CONSTRAINT "FoundBy_userId_fkey" FOREIGN KEY ("userId") REFERENCES "Users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundBy" ADD CONSTRAINT "FoundBy_foundItemId_fkey" FOREIGN KEY ("foundItemId") REFERENCES "FoundItems"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "FoundItems" ADD CONSTRAINT "FoundItems_claimsId_fkey" FOREIGN KEY ("claimsId") REFERENCES "Claims"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Claims" ADD CONSTRAINT "Claims_foundById_fkey" FOREIGN KEY ("foundById") REFERENCES "FoundBy"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
