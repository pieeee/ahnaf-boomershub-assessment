import { IDocument, deleteDocument } from "@app/lib/stores/useDriveStore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFileUpload } from "../FileUpload";
import styles from "@app/styles/components/breadcrumb.module.scss";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { openNewFolderModalStore } from "../FolderActionModal";
import { HiDownload, HiFolderAdd, HiPencilAlt, HiTrash } from "react-icons/hi";
import { RiFileUploadFill } from "react-icons/ri";

const BreadCrumbExpandMenu: React.FC<{ document: IDocument }> = ({
  document,
}) => {
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  const router = useRouter();
  const onUpload = useFileUpload();

  return (
    <>
      <button
        onClick={() => router.push(`/${document.type}/${document.id}`)}
        onContextMenu={(e) => {
          e.preventDefault();
          setAnchorPoint({ x: e.clientX, y: e.clientY });
          setOpen(true);
        }}
        className={styles["breadcrumb__item__menu-btn"]}
      >
        {document?.name}
      </button>
      <ControlledMenu
        anchorPoint={anchorPoint}
        state={isOpen ? "open" : "closed"}
        direction="right"
        onClose={() => setOpen(false)}
      >
        <MenuItem
          onClick={() =>
            openNewFolderModalStore({
              actionType: "create",
              parentId: document?.id,
              shouldNavigate: true,
            })
          }
          className={"menu-item"}
        >
          <HiFolderAdd className={"menu-item-icon"} />
          New folder
        </MenuItem>
        {document?.type === "folder" && (
          <MenuItem
            onClick={() => onUpload(document.id)}
            className={"menu-item"}
          >
            <RiFileUploadFill className={"menu-item-icon"} />
            File upload
          </MenuItem>
        )}
        {document?.type === "folder" && (
          <MenuItem
            onClick={() =>
              openNewFolderModalStore({
                actionType: "rename",
                parentId: document.id,
              })
            }
            className={"menu-item"}
          >
            <HiPencilAlt className={"menu-item-icon"} />
            Rename Folder
          </MenuItem>
        )}
        {document?.fileUrl && (
          <a href={document.fileUrl} target="_blank">
            <MenuItem className={"menu-item"}>
              <HiDownload className={"menu-item-icon"} />
              Download File
            </MenuItem>
          </a>
        )}
        <MenuItem
          className={"menu-item"}
          onClick={() => {
            deleteDocument(document.id);
            router.push("/");
          }}
        >
          <HiTrash className={"menu-item-icon"} />
          Delete {document?.type === "folder" ? "Folder" : "File"}
        </MenuItem>
      </ControlledMenu>
    </>
  );
};

export default BreadCrumbExpandMenu;
