-- DropIndex
DROP INDEX `Account_userId_fkey` ON `Account`;

-- DropIndex
DROP INDEX `Session_userId_fkey` ON `Session`;

-- AlterTable
ALTER TABLE `Ama` ADD COLUMN `cid` VARCHAR(191) NULL;
