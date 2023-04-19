import React from "react";
import Header from "./Header";
import Sidebar from "./Sidebar";
import styles from "@app/styles/layout/layout.module.scss";
import NewFolderModal from "../FolderActionModal";
import FAB from "./FAB";

interface ILayoutProps {
  children: React.ReactNode;
}

const Layout: React.FC<ILayoutProps> = ({ children }) => {
  return (
    <>
      <NewFolderModal />
      <FAB />
      <div className={styles["layout"]}>
        <Header />
        <div className={styles["layout__body"]}>
          <Sidebar />
          <div className={styles.layout__children}>{children}</div>
        </div>
      </div>
    </>
  );
};

export default Layout;
