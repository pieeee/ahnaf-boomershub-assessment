import React from "react";
import styles from "@app/styles/layout/sidebar.module.scss";
import dynamic from "next/dynamic";
import FAB from "./FAB";

const FolderTreeView = dynamic(() => import("./FolderTreeView"), {
  ssr: false,
});

const Sidebar = () => {
  return (
    <div className={styles.sidebar}>
      <FAB shouldFloat={false} />
      <FolderTreeView />
    </div>
  );
};

export default Sidebar;
