import { Menu, MenuItem } from "@szhsin/react-menu";
import React from "react";
import { HiFolderAdd, HiPlus } from "react-icons/hi";
import styles from "@app/styles/layout/sidebar.module.scss";
import { openNewFolderModalStore } from "../FolderActionModal";
import { useRouter } from "next/router";
import { useFileUpload } from "../FileUpload";
import { RiFileUploadFill } from "react-icons/ri";

const FAB: React.FC<{ shouldFloat?: boolean }> = ({ shouldFloat = true }) => {
  const router = useRouter();
  const parentFolderId = router.query["folderId"] as string;
  const onUpload = useFileUpload();

  return (
    <Menu
      offsetY={-70}
      menuButton={
        <button
          className={`${styles["sidebar__new-action-btn"]} ${
            shouldFloat ? styles["sidebar__new-action-btn__fab"] : ""
          }`}
        >
          <HiPlus className={styles["sidebar__new-action-btn__icon"]} />
          New
        </button>
      }
      transition
    >
      <MenuItem
        onClick={() =>
          openNewFolderModalStore({
            actionType: "create",
            parentId: parentFolderId,
          })
        }
        className={styles["sidebar__menu-item"]}
      >
        <HiFolderAdd className={styles["sidebar__menu-item-icon"]} />
        New folder
      </MenuItem>
      {router.pathname !== "/file/[folderId]" && (
        <MenuItem
          onClick={() => onUpload(parentFolderId)}
          className={styles["sidebar__menu-item"]}
        >
          <RiFileUploadFill className={styles["sidebar__menu-item-icon"]} />
          File upload
        </MenuItem>
      )}
    </Menu>
  );
};

export default FAB;
