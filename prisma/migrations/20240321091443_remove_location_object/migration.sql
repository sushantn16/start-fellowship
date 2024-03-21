/*
  Warnings:

  - You are about to drop the column `locationId` on the `Startup` table. All the data in the column will be lost.
  - You are about to drop the `Location` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `city` to the `Startup` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `Startup` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Startup" DROP CONSTRAINT "Startup_locationId_fkey";

-- AlterTable
ALTER TABLE "Startup" DROP COLUMN "locationId",
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "country" TEXT NOT NULL;

-- DropTable
DROP TABLE "Location";
