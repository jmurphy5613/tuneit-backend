/*
  Warnings:

  - Added the required column `liked` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "HistoryItem" ADD COLUMN     "liked" BOOLEAN NOT NULL;
