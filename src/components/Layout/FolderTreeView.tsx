import React from "react";
import FolderTree from "../FolderTree";
import styles from "@app/styles/components/folderTree.module.scss";

const FolderTreeView = () => {
  return (
    <ul className={styles["folder-tree-list"]}>
      <FolderTree
        folder={{
          name: "My Drive",
          parent: null,
          id: "",
          createdAt: "",
          type: "folder",
        }}
        isRoot
      />
    </ul>
  );
};

export default FolderTreeView;
