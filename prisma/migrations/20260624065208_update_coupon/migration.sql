/*
  Warnings:

  - You are about to drop the column `expiresAt` on the `coupon` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE `coupon` DROP COLUMN `expiresAt`,
    ADD COLUMN `expiryDate` DATETIME(3) NULL;
