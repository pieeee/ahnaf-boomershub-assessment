import { IDocument, deleteDocument } from "@app/lib/stores/useDriveStore";
import React from "react";
import styles from "@app/styles/components/folders.module.scss";
import { useRouter } from "next/router";
import { HiDownload, HiFolder, HiPencilAlt, HiTrash } from "react-icons/hi";
import { BsThreeDotsVertical } from "react-icons/bs";
import { AiFillFile } from "react-icons/ai";
import { Menu, MenuItem } from "@szhsin/react-menu";
import { openNewFolderModalStore } from "../FolderActionModal";

const Documents: React.FC<{
  documents: IDocument[];
  type: "file" | "folder";
}> = ({ documents, type }) => {
  const router = useRouter();

  if (!documents || documents.length === 0) {
    return <></>;
  }

  return (
    <div className={styles.folders}>
      <div className={styles["folders__header"]}>
        <span>{type === "file" ? "Files" : "Folders"}</span>
      </div>
      <div className={styles["folders__container"]}>
        {documents.map((doc) => (
          <div
            onClick={(e) => {
              if (e.detail === 2) {
                router.push(`/${doc.type}/${doc.id}`);
              }
            }}
            key={doc.id}
            className={styles["folder-item"]}
          >
            {type === "file" ? (
              <AiFillFile className={styles["folder-item__icon"]} />
            ) : (
              <HiFolder className={styles["folder-item__icon"]} />
            )}
            <span>{doc.name}</span>

            <Menu
              menuButton={
                <button>
                  <BsThreeDotsVertical />
                </button>
              }
              transition
            >
              {doc?.type === "folder" && (
                <MenuItem
                  onClick={() =>
                    openNewFolderModalStore({
                      actionType: "rename",
                      parentId: doc.id,
                    })
                  }
                  className={"menu-item"}
                >
                  <HiPencilAlt className={"menu-item-icon"} />
                  Rename Folder
                </MenuItem>
              )}
              {doc?.fileUrl && (
                <a href={doc.fileUrl} target="_blank">
                  <MenuItem className={"menu-item"}>
                    <HiDownload className={"menu-item-icon"} />
                    Download File
                  </MenuItem>
                </a>
              )}
              <MenuItem
                className={"menu-item"}
                onClick={() => {
                  deleteDocument(doc.id);
                  // router.push("/");
                }}
              >
                <HiTrash className={"menu-item-icon"} />
                Delete {doc?.type === "folder" ? "Folder" : "File"}
              </MenuItem>
            </Menu>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Documents;
