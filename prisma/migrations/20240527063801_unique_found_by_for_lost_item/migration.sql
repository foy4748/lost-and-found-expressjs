/*
  Warnings:

  - A unique constraint covering the columns `[foundItemId]` on the table `FoundBy` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "FoundBy_foundItemId_key" ON "FoundBy"("foundItemId");
