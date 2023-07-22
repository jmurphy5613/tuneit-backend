/*
  Warnings:

  - You are about to drop the column `songId` on the `HistoryItem` table. All the data in the column will be lost.
  - You are about to drop the `Song` table. If the table is not empty, all the data it contains will be lost.
  - Added the required column `album` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `albumArt` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `artist` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `duration` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `title` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uri` to the `HistoryItem` table without a default value. This is not possible if the table is not empty.
  - Added the required column `displayName` to the `User` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "HistoryItem" DROP CONSTRAINT "HistoryItem_songId_fkey";

-- AlterTable
ALTER TABLE "HistoryItem" DROP COLUMN "songId",
ADD COLUMN     "album" TEXT NOT NULL,
ADD COLUMN     "albumArt" TEXT NOT NULL,
ADD COLUMN     "artist" TEXT NOT NULL,
ADD COLUMN     "duration" INTEGER NOT NULL,
ADD COLUMN     "title" TEXT NOT NULL,
ADD COLUMN     "uri" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "User" ADD COLUMN     "displayName" TEXT NOT NULL;

-- DropTable
DROP TABLE "Song";
