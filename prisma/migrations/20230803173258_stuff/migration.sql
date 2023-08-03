-- DropForeignKey
ALTER TABLE "HistoryItem" DROP CONSTRAINT "HistoryItem_userId_fkey";

-- AddForeignKey
ALTER TABLE "HistoryItem" ADD CONSTRAINT "HistoryItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
