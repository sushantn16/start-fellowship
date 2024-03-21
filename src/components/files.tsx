import { ChangeEvent, useEffect, useState } from "react";
import { Input } from "./ui/input";
import { createFile, getFiles } from "@/services/file.service";

interface FileProps {
  startupId: number;
}

export default function Files({ startupId }: FileProps) {
  const [files, setFiles] = useState<File[]>([]);

  const fetchFiles = async () => {
    const filesData = await getFiles(startupId);
    setFiles(filesData);
  };

  const handleFileSend = async (e: ChangeEvent<HTMLInputElement>) => {
    const fileInput = e.target;
    if (!fileInput.files) {
      console.warn("no file was chosen");
      return;
    }

    if (!fileInput.files || fileInput.files.length === 0) {
      console.warn("files list is empty");
      return;
    }

    await createFile(fileInput.files[0], startupId);

    /** Reset file input */
    e.target.type = "text";
    e.target.type = "file";

    fetchFiles();
  };

  useEffect(() => {
    fetchFiles();
  }, [startupId]);

  return (
    <div>
      <h1>Files</h1>
      <div>
        {files.map((file: any, index: any) => (
          <div key={index}>
            <a href={`/uploads/${file.name}`}>{file.name}</a>
          </div>
        ))}
      </div>
      <div>
        <label>
          <Input
            type="file"
            onChange={handleFileSend}
          />
        </label>
      </div>
    </div>
  );
}