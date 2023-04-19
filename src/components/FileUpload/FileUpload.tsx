import { createDocument } from "@app/lib/stores/useDriveStore";
import { createContext, useContext, useMemo, useRef, useState } from "react";
import { v4 } from "uuid";

interface IFileUploadContext {
  onUpload: (id: null | string | undefined) => void;
}

const FileUploadContext = createContext<IFileUploadContext>({
  onUpload: () => {},
});

const FileUploadContextProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [parentId, setParentId] = useState<null | string | undefined>(null);

  const handleUpload = () => {
    if (fileInputRef.current && fileInputRef.current.files) {
      const file = fileInputRef.current.files[0];
      const url = URL?.createObjectURL(file);

      createDocument({
        name: file.name,
        parent: parentId,
        id: v4(),
        type: "file",
        fileType: file.type,
        fileSize: file.size,
        fileUrl: url,
      });
    }
  };

  return (
    <FileUploadContext.Provider
      value={{
        onUpload: (id: typeof parentId) => {
          setParentId(id);
          fileInputRef.current?.click();
        },
      }}
    >
      <input
        type="file"
        ref={fileInputRef}
        style={{ display: "none" }}
        onChange={handleUpload}
      />
      {children}
    </FileUploadContext.Provider>
  );
};

export default FileUploadContextProvider;

export const useFileUpload = () => {
  const { onUpload } = useContext(FileUploadContext);
  return onUpload;
};
