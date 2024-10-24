-- AlterTable
ALTER TABLE `borrowbook` ADD COLUMN `finished` ENUM('yes', 'no') NOT NULL DEFAULT 'yes';
