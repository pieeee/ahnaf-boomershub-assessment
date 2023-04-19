import { selectBreadcrumb, useDriveStore } from "@app/lib/stores/useDriveStore";
import { useRouter } from "next/router";
import React, { useMemo } from "react";
import { HiChevronRight } from "react-icons/hi";
import styles from "@app/styles/components/breadcrumb.module.scss";
import BreadCrumbCollapseMenu from "./BreadCrumbCollapseMenu";
import BreadCrumbExpandMenu from "./BreadCrumbExpandMenu";

const BreadCrumb = () => {
  const router = useRouter();
  const folderID = router.query["folderId"] as string;
  const breadCrumb = useDriveStore(selectBreadcrumb(folderID));

  /**
   * Returns a breadcrumb list object that contains a collapsed and expanded version of the provided breadcrumb array.
   */
  const breadCrumbList = useMemo(() => {
    if (breadCrumb.length <= 2) {
      return { collapse: null, expand: breadCrumb };
    }
    return {
      collapse: breadCrumb.slice(0, breadCrumb.length - 2),
      expand: breadCrumb.slice(breadCrumb.length - 2),
    };
  }, [breadCrumb]);

  return (
    <div className={styles["breadcrumb"]}>
      {breadCrumbList.collapse ? (
        <BreadCrumbCollapseMenu documets={breadCrumbList.collapse} />
      ) : (
        <button
          className={styles["breadcrumb__item__menu-btn"]}
          role="button"
          onClick={() => router.push("/")}
        >
          My Drive
        </button>
      )}
      {breadCrumbList?.expand &&
        breadCrumbList.expand.map((doc, idx) => (
          <div key={idx} className={styles["breadcrumb__item"]}>
            <HiChevronRight />
            <BreadCrumbExpandMenu document={doc} />
          </div>
        ))}
    </div>
  );
};

export default BreadCrumb;
