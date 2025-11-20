/*
  Warnings:

  - The values [RODA2,RODA4] on the enum `Parkir_jenisKendaraan` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterTable
ALTER TABLE `parkir` MODIFY `jenisKendaraan` ENUM('roda2', 'roda4') NOT NULL;
