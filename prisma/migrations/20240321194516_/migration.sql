-- AddForeignKey
ALTER TABLE "File" ADD CONSTRAINT "File_startupId_fkey" FOREIGN KEY ("startupId") REFERENCES "Startup"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
