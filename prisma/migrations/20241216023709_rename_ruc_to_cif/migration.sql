/*
  Warnings:

  - You are about to drop the column `RUC` on the `Company` table. All the data in the column will be lost.
  - Added the required column `CIF` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- Renombrar la columna RUC a CIF en la tabla Company
ALTER TABLE "Company" RENAME COLUMN "RUC" TO "CIF";

