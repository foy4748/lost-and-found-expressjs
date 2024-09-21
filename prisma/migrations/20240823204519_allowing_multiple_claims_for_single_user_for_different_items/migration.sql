/*
  Warnings:

  - A unique constraint covering the columns `[userId,foundById]` on the table `Claims` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "Claims_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "Claims_userId_foundById_key" ON "Claims"("userId", "foundById");
