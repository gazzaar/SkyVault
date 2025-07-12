-- DropForeignKey
ALTER TABLE "File" DROP CONSTRAINT "File_folderID_fkey";

-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_folderID_fkey" FOREIGN KEY ("folderID") REFERENCES "Folder"("id") ON DELETE CASCADE ON UPDATE CASCADE;
