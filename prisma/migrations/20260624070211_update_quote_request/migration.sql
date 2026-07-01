/*
  Warnings:

  - You are about to drop the column `name` on the `quoterequest` table. All the data in the column will be lost.
  - Added the required column `businessName` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `businessType` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullName` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `QuoteRequest` table without a default value. This is not possible if the table is not empty.
  - Made the column `phone` on table `quoterequest` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE `quoterequest` DROP COLUMN `name`,
    ADD COLUMN `businessName` VARCHAR(191) NOT NULL,
    ADD COLUMN `businessType` VARCHAR(191) NOT NULL,
    ADD COLUMN `city` VARCHAR(191) NOT NULL,
    ADD COLUMN `fullName` VARCHAR(191) NOT NULL,
    ADD COLUMN `status` VARCHAR(191) NOT NULL DEFAULT 'Pending',
    ADD COLUMN `updatedAt` DATETIME(3) NOT NULL,
    MODIFY `phone` VARCHAR(191) NOT NULL;
