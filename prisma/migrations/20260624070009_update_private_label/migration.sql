/*
  Warnings:

  - Added the required column `brandName` to the `PrivateLabelInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `country` to the `PrivateLabelInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `productType` to the `PrivateLabelInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `quantity` to the `PrivateLabelInquiry` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `PrivateLabelInquiry` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `privatelabelinquiry` ADD COLUMN `brandName` VARCHAR(191) NOT NULL,
    ADD COLUMN `country` VARCHAR(191) NOT NULL,
    ADD COLUMN `productType` VARCHAR(191) NOT NULL,
    ADD COLUMN `quantity` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'pending',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL;
