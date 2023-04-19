import {
  IDocument,
  deleteDocument,
  selectChildDocuments,
  selectRootDocuments,
  useDriveStore,
} from "@app/lib/stores/useDriveStore";
import { useRouter } from "next/router";
import React, { useState } from "react";
import styles from "@app/styles/components/folderTree.module.scss";
import { BiCaretRight, BiCaretDown } from "react-icons/Bi";
import { HiFolder, HiFolderAdd, HiPencilAlt, HiTrash } from "react-icons/hi";
import { FiHardDrive } from "react-icons/fi";
import { ControlledMenu, MenuItem } from "@szhsin/react-menu";
import { openNewFolderModalStore } from "../FolderActionModal";
import { RiFileUploadFill } from "react-icons/ri";
import { useFileUpload } from "../FileUpload";

const FolderTree: React.FC<{
  folder: IDocument;
  depth?: number;
  isRoot?: boolean;
}> = ({ folder: { name, id, parent }, depth = 0, isRoot = false }) => {
  // Using useRouter hook to get the current router instance
  const router = useRouter();

  // Initializing state variables
  const [isExpand, setIsExpand] = useState(false);
  const [isOpen, setOpen] = useState(false);
  const [anchorPoint, setAnchorPoint] = useState({ x: 0, y: 0 });

  // Using custom hook useDriveStore to fetch child folders based on isRoot flag and folder ID
  const childFolders = useDriveStore(
    isRoot
      ? selectRootDocuments("folder")
      : selectChildDocuments({ parentID: id, type: "folder" })
  );

  // file upload hoook
  const onUpload = useFileUpload();

  // Getting selected folder ID from router query parameters
  const selectedFolderId = router.query["folderId"] as string;

  // Function to handle click event on the left button
  const onClickLeft = () => {
    // Pushing the router to the root directory if isRoot flag is true, otherwise to the folder with the given ID
    router.push(isRoot ? "/" : `/folder/${id}`);
  };

  // Function to toggle the expand state
  const onToggleExpand = () => setIsExpand(!isExpand);

  return (
    <li
      onContextMenu={(e) => {
        e.preventDefault();
        setAnchorPoint({ x: e.clientX, y: e.clientY });
        setOpen(true);
      }}
    >
      {!isRoot && (
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
                parentId: id,
              })
            }
            className={"menu-item"}
          >
            <HiFolderAdd className={"menu-item-icon"} />
            New folder
          </MenuItem>
          <MenuItem onClick={() => onUpload(id)} className={"menu-item"}>
            <RiFileUploadFill className={"menu-item-icon"} />
            File upload
          </MenuItem>
          <MenuItem
            onClick={() =>
              openNewFolderModalStore({
                actionType: "rename",
                parentId: id,
              })
            }
            className={"menu-item"}
          >
            <HiPencilAlt className={"menu-item-icon"} />
            Rename Folder
          </MenuItem>
          <MenuItem
            onClick={() => {
              deleteDocument(id);
              router.push("/");
            }}
            className={"menu-item"}
          >
            <HiTrash className={"menu-item-icon"} />
            Delete Folder
          </MenuItem>
        </ControlledMenu>
      )}
      <div
        className={
          styles[
            selectedFolderId === id
              ? "folder-tree-list__item__selected"
              : "folder-tree-list__item"
          ]
        }
      >
        {[...Array(depth)].map((_, idx) => (
          <div key={idx} className={styles["depth-placeholder"]} />
        ))}
        <button onClick={onToggleExpand}>
          {isExpand ? <BiCaretDown /> : <BiCaretRight />}
        </button>
        {isRoot ? (
          <button onClick={onClickLeft} className={styles["folder-btn"]}>
            <FiHardDrive className={styles["folder-btn__icon"]} />
            My Drive
          </button>
        ) : (
          <button onClick={onClickLeft} className={styles["folder-btn"]}>
            <HiFolder className={styles["folder-btn__icon"]} />
            {name}
          </button>
        )}
      </div>
      {isExpand && (
        <ul className={styles["folder-tree-list__child"]}>
          {childFolders.map((folder) => (
            <FolderTree key={folder.id} folder={folder} depth={depth + 1} />
          ))}
        </ul>
      )}
    </li>
  );
};

export default FolderTree;
