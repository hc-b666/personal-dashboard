/*
  Warnings:

  - Added the required column `is_public` to the `Project` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "is_public" BOOLEAN NOT NULL;
