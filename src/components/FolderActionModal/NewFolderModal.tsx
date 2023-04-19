import React, { useEffect, useState } from "react";
import {
  useNewFolderModalStore,
  closeNewFolderModalStore,
} from "./useNewFolderModalStore";
import Modal from "../Modal";
import styles from "@app/styles/components/folderModal.module.scss";
import {
  createDocument,
  renameDocument,
  selectDocumentInfo,
  useDriveStore,
} from "@app/lib/stores/useDriveStore";
import { useRouter } from "next/router";
import { v4 } from "uuid";

const NewFolderModal = () => {
  const { isModalOpen, modalAction, parentId, shouldNavigate } =
    useNewFolderModalStore((state) => ({
      isModalOpen: state.open,
      modalAction: state.actionType,
      parentId: state.parentId,
      shouldNavigate: state.shouldNavigate,
    }));

  const documentInfo = useDriveStore(selectDocumentInfo(parentId));

  const [folderName, setFolderName] = useState("");

  useEffect(() => {
    if (modalAction === "rename" && documentInfo) {
      setFolderName(documentInfo.name);
      return;
    }
    setFolderName("Untitled Folder");
  }, [documentInfo, modalAction]);

  const router = useRouter();

  const onCreateFolder = () => {
    if (modalAction === "rename" && parentId && folderName) {
      renameDocument({ id: parentId, name: folderName });
    } else {
      const id = v4();
      createDocument({
        type: "folder",
        name: folderName ?? "Untitled folder",
        parent: parentId,
        id,
      });
      if (shouldNavigate) {
        router.push(`/folder/${id}`);
      }
    }
    setFolderName("");
    closeNewFolderModalStore();
  };

  return (
    <Modal open={isModalOpen} onClose={closeNewFolderModalStore}>
      <div className={styles["folder-modal"]}>
        <h2>{modalAction === "create" ? "New folder" : "Rename Folder"}</h2>
        <input
          value={folderName}
          onChange={(e) => setFolderName(e.target.value)}
          type="text"
          name=""
          id=""
        />
        <div className={styles["folder-modal__btn-group"]}>
          <button onClick={closeNewFolderModalStore}>Cancel</button>
          <button onClick={onCreateFolder}>
            {modalAction === "create" ? "Create" : "Rename"}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default NewFolderModal;
