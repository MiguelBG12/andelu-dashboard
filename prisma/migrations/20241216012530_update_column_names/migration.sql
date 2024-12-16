/*
  Warnings:

  - You are about to drop the column `generatedImage` on the `Company` table. All the data in the column will be lost.
  - You are about to drop the column `profileImage` on the `Company` table. All the data in the column will be lost.
  - Added the required column `logoCompany` to the `Company` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
-- Eliminar las columnas anteriores
ALTER TABLE "Company" DROP COLUMN "generatedImage",
DROP COLUMN "profileImage";

-- Agregar nuevas columnas con valores predeterminados temporales
ALTER TABLE "Company" 
ADD COLUMN "logoCompany" TEXT NOT NULL DEFAULT 'placeholder_logo',
ADD COLUMN "uniformCompany" TEXT NOT NULL DEFAULT 'placeholder_uniform';

-- Opcional: Remover los valores predeterminados después de la migración
ALTER TABLE "Company" ALTER COLUMN "logoCompany" DROP DEFAULT;
ALTER TABLE "Company" ALTER COLUMN "uniformCompany" DROP DEFAULT;
