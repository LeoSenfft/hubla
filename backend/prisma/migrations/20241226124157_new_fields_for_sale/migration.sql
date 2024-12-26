/*
  Warnings:

  - You are about to drop the `Sale` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "Sale";

-- CreateTable
CREATE TABLE "sales" (
    "id" SERIAL NOT NULL,
    "typeId" INTEGER NOT NULL,
    "saleDate" TIMESTAMP(3) NOT NULL,
    "product" TEXT NOT NULL,
    "value" DOUBLE PRECISION NOT NULL,
    "vendor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "sales_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "sale_types" (
    "id" SERIAL NOT NULL,
    "description" TEXT NOT NULL,
    "nature" TEXT NOT NULL,

    CONSTRAINT "sale_types_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "sales" ADD CONSTRAINT "sales_typeId_fkey" FOREIGN KEY ("typeId") REFERENCES "sale_types"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
