/*
  Warnings:

  - You are about to drop the column `partnerId` on the `sales` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "sales" DROP CONSTRAINT "sales_partnerId_fkey";

-- AlterTable
ALTER TABLE "sales" DROP COLUMN "partnerId";
