import {
  selectChildDocuments,
  useDriveStore,
} from "@app/lib/stores/useDriveStore";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React from "react";
const BreadCrumb = dynamic(() => import("@app/components/BreadCrumb"));
const Docuemnts = dynamic(() => import("@app/components/Documents"));

const Folder = () => {
  const router = useRouter();
  const folderId = router.query["folderId"] as string;

  const folders = useDriveStore(
    selectChildDocuments({ parentID: folderId, type: "folder" })
  );
  const files = useDriveStore(
    selectChildDocuments({ parentID: folderId, type: "file" })
  );

  return (
    <div>
      <BreadCrumb />
      <Docuemnts documents={folders} type="folder" />
      <Docuemnts documents={files} type="file" />
    </div>
  );
};

export default Folder;
